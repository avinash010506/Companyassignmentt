import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, where } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowLeft, UserPlus, Crown } from "lucide-react";

export const Route = createFileRoute("/_app/projects/$projectId")({
  component: ProjectDetail,
});

type TaskStatus = "todo" | "in_progress" | "done";
type TaskPriority = "low" | "medium" | "high";
type Role = "admin" | "member";

interface Project { id: string; name: string; description: string | null; owner_id: string }
interface Member { id: string; user_id: string; role: Role; profiles: { full_name: string | null; email: string } | null }
interface Task {
  id: string; title: string; description: string | null;
  status: TaskStatus; priority: TaskPriority;
  assignee_id: string | null; due_date: string | null;
  created_by: string;
}

const taskSchema = z.object({
  title: z.string().trim().min(2, "Title too short").max(120),
  description: z.string().trim().max(1000).optional(),
  priority: z.enum(["low", "medium", "high"]),
  assignee_id: z.string().nullable(),
  due_date: z.string().nullable(),
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState<Role | null>(null);

  async function load() {
    try {
      const pDoc = await getDoc(doc(db, "projects", projectId));
      if (!pDoc.exists()) {
        setLoading(false);
        return;
      }
      setProject({ id: pDoc.id, ...pDoc.data() } as Project);

      const mSnap = await getDocs(query(collection(db, "project_members"), where("project_id", "==", projectId)));
      const ms = mSnap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Member));
      for (const m of ms) {
         const profileDoc = await getDoc(doc(db, "profiles", m.user_id));
         m.profiles = profileDoc.exists() ? (profileDoc.data() as any) : null;
      }
      setMembers(ms);

      const tSnap = await getDocs(query(collection(db, "tasks"), where("project_id", "==", projectId)));
      const ts = tSnap.docs.map(d => ({ id: d.id, ...d.data() } as Task));
      ts.sort((a, b) => new Date((b as any).created_at || 0).getTime() - new Date((a as any).created_at || 0).getTime());
      setTasks(ts);

      setMyRole(ms.find((x) => x.user_id === user?.uid)?.role ?? null);
      setLoading(false);
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, projectId]);

  const isAdmin = myRole === "admin";

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!project) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-muted-foreground">Project not found or you don't have access.</p>
        <Link to="/projects" className="mt-4 inline-block text-sm text-primary hover:underline">Back to projects</Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Projects
        </Link>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
            {project.description && <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>}
          </div>
          <Badge variant={isAdmin ? "default" : "secondary"}>{isAdmin ? "Admin" : "Member"}</Badge>
        </div>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks ({tasks.length})</TabsTrigger>
          <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-5">
          <TasksPanel
            tasks={tasks}
            members={members}
            isAdmin={isAdmin}
            currentUserId={user!.uid}
            projectId={projectId}
            onChange={load}
          />
        </TabsContent>

        <TabsContent value="members" className="mt-5">
          <MembersPanel members={members} isAdmin={isAdmin} projectId={projectId} ownerId={project.owner_id} onChange={load} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------- Tasks ------------------------- */

function TasksPanel({
  tasks, members, isAdmin, currentUserId, projectId, onChange,
}: {
  tasks: Task[]; members: Member[]; isAdmin: boolean; currentUserId: string; projectId: string; onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", priority: "medium" as TaskPriority,
    assignee_id: "unassigned" as string, due_date: "",
  });

  const memberMap = useMemo(() => {
    const m = new Map<string, Member>();
    members.forEach((mm) => m.set(mm.user_id, mm));
    return m;
  }, [members]);

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    const parsed = taskSchema.safeParse({
      title: form.title,
      description: form.description || undefined,
      priority: form.priority,
      assignee_id: form.assignee_id === "unassigned" ? null : form.assignee_id,
      due_date: form.due_date || null,
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    try {
      await addDoc(collection(db, "tasks"), {
        project_id: projectId,
        title: parsed.data.title,
        description: parsed.data.description ?? null,
        priority: parsed.data.priority,
        assignee_id: parsed.data.assignee_id,
        due_date: parsed.data.due_date,
        created_by: currentUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "todo",
      });
      setBusy(false);
    } catch (e: any) {
      setBusy(false);
      return toast.error(e.message);
    }
    toast.success("Task added");
    setForm({ title: "", description: "", priority: "medium", assignee_id: "unassigned", due_date: "" });
    setOpen(false);
    onChange();
  }

  async function updateStatus(t: Task, status: TaskStatus) {
    try {
      await updateDoc(doc(db, "tasks", t.id), { status, updated_at: new Date().toISOString() });
      onChange();
    } catch (e: any) {
      return toast.error(e.message);
    }
  }

  async function deleteTask(t: Task) {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteDoc(doc(db, "tasks", t.id));
      toast.success("Task deleted");
      onChange();
    } catch (e: any) {
      return toast.error(e.message);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const columns: { key: TaskStatus; label: string }[] = [
    { key: "todo", label: "To do" },
    { key: "in_progress", label: "In progress" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5"><Plus className="h-4 w-4" /> New task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create a task</DialogTitle></DialogHeader>
            <form onSubmit={createTask} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="tt">Title</Label>
                <Input id="tt" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="td">Description</Label>
                <Textarea id="td" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as TaskPriority })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dd">Due date</Label>
                  <Input id="dd" type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Assignee</Label>
                <Select value={form.assignee_id} onValueChange={(v) => setForm({ ...form, assignee_id: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {members.map((m) => (
                      <SelectItem key={m.user_id} value={m.user_id}>
                        {m.profiles?.full_name || m.profiles?.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={busy}>{busy ? "Adding…" : "Add task"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="rounded-xl border border-border bg-card/50 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-medium">{col.label}</h3>
                <span className="text-xs text-muted-foreground">{colTasks.length}</span>
              </div>
              <div className="space-y-2">
                {colTasks.length === 0 && (
                  <p className="px-1 py-3 text-xs text-muted-foreground">No tasks</p>
                )}
                {colTasks.map((t) => {
                  const overdue = t.status !== "done" && t.due_date && t.due_date < today;
                  const assignee = t.assignee_id ? memberMap.get(t.assignee_id) : null;
                  const canEdit = isAdmin || t.assignee_id === currentUserId;
                  return (
                    <Card key={t.id} className="space-y-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm">{t.title}</div>
                        {isAdmin && (
                          <button onClick={() => deleteTask(t)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      {t.description && <p className="line-clamp-2 text-xs text-muted-foreground">{t.description}</p>}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <PriorityBadge p={t.priority} />
                        {t.due_date && (
                          <span className={`rounded-md px-1.5 py-0.5 text-xs ${overdue ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`}>
                            {overdue ? "Overdue · " : ""}{t.due_date}
                          </span>
                        )}
                        {assignee && (
                          <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
                            {assignee.profiles?.full_name || assignee.profiles?.email}
                          </span>
                        )}
                      </div>
                      {canEdit && (
                        <Select value={t.status} onValueChange={(v) => updateStatus(t, v as TaskStatus)}>
                          <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To do</SelectItem>
                            <SelectItem value="in_progress">In progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriorityBadge({ p }: { p: TaskPriority }) {
  const map = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-primary/10 text-primary",
    high: "bg-destructive/15 text-destructive",
  } as const;
  return <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium capitalize ${map[p]}`}>{p}</span>;
}

/* ------------------------- Members ------------------------- */

const memberSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  role: z.enum(["admin", "member"]),
});

function MembersPanel({
  members, isAdmin, projectId, ownerId, onChange,
}: {
  members: Member[]; isAdmin: boolean; projectId: string; ownerId: string; onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<{ email: string; role: Role }>({ email: "", role: "member" });

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    const parsed = memberSchema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    try {
      const pSnap = await getDocs(query(collection(db, "profiles"), where("email", "==", parsed.data.email)));
      if (pSnap.empty) {
        setBusy(false);
        return toast.error("No user with that email. They need to sign up first.");
      }
      const profile = { id: pSnap.docs[0].id };
      
      await addDoc(collection(db, "project_members"), {
        project_id: projectId, user_id: profile.id, role: parsed.data.role, created_at: new Date().toISOString()
      });
      setBusy(false);
      toast.success("Member added");
      setForm({ email: "", role: "member" });
      setOpen(false);
      onChange();
    } catch (e: any) {
      setBusy(false);
      return toast.error(e.message.includes("duplicate") ? "Already a member" : e.message);
    }
  }

  async function changeRole(m: Member, role: Role) {
    try {
      await updateDoc(doc(db, "project_members", m.id), { role });
      toast.success("Role updated");
      onChange();
    } catch (e: any) {
      return toast.error(e.message);
    }
  }

  async function removeMember(m: Member) {
    if (m.user_id === ownerId) return toast.error("Cannot remove the project owner");
    if (!confirm("Remove this member?")) return;
    try {
      await deleteDoc(doc(db, "project_members", m.id));
      toast.success("Member removed");
      onChange();
    } catch (e: any) {
      return toast.error(e.message);
    }
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1.5"><UserPlus className="h-4 w-4" /> Add member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add a team member</DialogTitle></DialogHeader>
              <form onSubmit={addMember} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="me">Email</Label>
                  <Input id="me" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="teammate@company.com" />
                  <p className="text-xs text-muted-foreground">User must already have a Taskly account.</p>
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter><Button type="submit" disabled={busy}>{busy ? "Adding…" : "Add member"}</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Card className="divide-y divide-border p-0">
        {members.map((m) => {
          const isOwner = m.user_id === ownerId;
          return (
            <div key={m.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                  {(m.profiles?.full_name || m.profiles?.email || "?").slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 truncate font-medium">
                    {m.profiles?.full_name || m.profiles?.email}
                    {isOwner && <Crown className="h-3.5 w-3.5 text-warning" />}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{m.profiles?.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAdmin && !isOwner ? (
                  <Select value={m.role} onValueChange={(v) => changeRole(m, v as Role)}>
                    <SelectTrigger className="h-8 w-28 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={m.role === "admin" ? "default" : "secondary"} className="capitalize">{m.role}</Badge>
                )}
                {isAdmin && !isOwner && (
                  <button onClick={() => removeMember(m)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
