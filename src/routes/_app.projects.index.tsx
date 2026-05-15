import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, where } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, FolderKanban } from "lucide-react";

export const Route = createFileRoute("/_app/projects/")({
  component: ProjectsPage,
});

interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
}

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  description: z.string().trim().max(500).optional(),
});

function ProjectsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!user) return;
    try {
      const q = query(collection(db, "projects"), where("owner_id", "==", user.uid));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProjectRow));
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setItems(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    try {
      await addDoc(collection(db, "projects"), {
        name: parsed.data.name,
        description: parsed.data.description || null,
        owner_id: user.uid,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setBusy(false);
    } catch (error: any) {
      setBusy(false);
      return toast.error(error.message);
    }
    toast.success("Project created");
    setOpen(false);
    setForm({ name: "", description: "" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">All teams and initiatives you belong to.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5"><Plus className="h-4 w-4" /> New project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a project</DialogTitle>
            </DialogHeader>
            <form onSubmit={createProject} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="pn">Name</Label>
                <Input id="pn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Marketing site relaunch" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pd">Description</Label>
                <Textarea id="pd" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What's this project about?" />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create project"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card className="p-10 text-center">
          <FolderKanban className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-3 font-medium">No projects yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Create your first project to start assigning tasks.</p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to="/projects/$projectId" params={{ projectId: p.id }}>
              <Card className="group h-full p-5 transition hover:border-primary/50 hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  {p.owner_id === user?.uid && (
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">Owner</span>
                  )}
                </div>
                <h3 className="mt-4 font-medium text-foreground">{p.name}</h3>
                {p.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
