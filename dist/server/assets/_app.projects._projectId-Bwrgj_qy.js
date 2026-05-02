import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { R as Route, u as useAuth, s as supabase } from "./router-CS4IbErV.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { L as Label, I as Input } from "./label-4pBKAOFV.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, T as Textarea, e as DialogFooter } from "./dialog-B2TZORrj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp, ArrowLeft, Plus, Trash2, UserPlus, Crown } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-fMRf3trd.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tabs";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const taskSchema = z.object({
  title: z.string().trim().min(2, "Title too short").max(120),
  description: z.string().trim().max(1e3).optional(),
  priority: z.enum(["low", "medium", "high"]),
  assignee_id: z.string().nullable(),
  due_date: z.string().nullable()
});
function ProjectDetail() {
  const {
    projectId
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState(null);
  async function load() {
    const [p, m, t] = await Promise.all([supabase.from("projects").select("*").eq("id", projectId).maybeSingle(), supabase.from("project_members").select("id, user_id, role, profiles(full_name, email)").eq("project_id", projectId), supabase.from("tasks").select("*").eq("project_id", projectId).order("created_at", {
      ascending: false
    })]);
    if (p.error) toast.error(p.error.message);
    setProject(p.data ?? null);
    const ms = m.data ?? [];
    setMembers(ms);
    setTasks(t.data ?? []);
    setMyRole(ms.find((x) => x.user_id === user?.id)?.role ?? null);
    setLoading(false);
  }
  useEffect(() => {
    if (user) load();
  }, [user, projectId]);
  const isAdmin = myRole === "admin";
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" });
  if (!project) {
    return /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Project not found or you don't have access." }),
      /* @__PURE__ */ jsx(Link, { to: "/projects", className: "mt-4 inline-block text-sm text-primary hover:underline", children: "Back to projects" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Projects"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: project.name }),
          project.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: project.description })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: isAdmin ? "default" : "secondary", children: isAdmin ? "Admin" : "Member" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "tasks", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "tasks", children: [
          "Tasks (",
          tasks.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "members", children: [
          "Members (",
          members.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "tasks", className: "mt-5", children: /* @__PURE__ */ jsx(TasksPanel, { tasks, members, isAdmin, currentUserId: user.id, projectId, onChange: load }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "members", className: "mt-5", children: /* @__PURE__ */ jsx(MembersPanel, { members, isAdmin, projectId, ownerId: project.owner_id, onChange: load }) })
    ] })
  ] });
}
function TasksPanel({
  tasks,
  members,
  isAdmin,
  currentUserId,
  projectId,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee_id: "unassigned",
    due_date: ""
  });
  const memberMap = useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    members.forEach((mm) => m.set(mm.user_id, mm));
    return m;
  }, [members]);
  async function createTask(e) {
    e.preventDefault();
    const parsed = taskSchema.safeParse({
      title: form.title,
      description: form.description || void 0,
      priority: form.priority,
      assignee_id: form.assignee_id === "unassigned" ? null : form.assignee_id,
      due_date: form.due_date || null
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const {
      error
    } = await supabase.from("tasks").insert({
      project_id: projectId,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      priority: parsed.data.priority,
      assignee_id: parsed.data.assignee_id,
      due_date: parsed.data.due_date,
      created_by: currentUserId
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Task added");
    setForm({
      title: "",
      description: "",
      priority: "medium",
      assignee_id: "unassigned",
      due_date: ""
    });
    setOpen(false);
    onChange();
  }
  async function updateStatus(t, status) {
    const {
      error
    } = await supabase.from("tasks").update({
      status
    }).eq("id", t.id);
    if (error) return toast.error(error.message);
    onChange();
  }
  async function deleteTask(t) {
    if (!confirm("Delete this task?")) return;
    const {
      error
    } = await supabase.from("tasks").delete().eq("id", t.id);
    if (error) return toast.error(error.message);
    toast.success("Task deleted");
    onChange();
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const columns = [{
    key: "todo",
    label: "To do"
  }, {
    key: "in_progress",
    label: "In progress"
  }, {
    key: "done",
    label: "Done"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gap-1.5", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " New task"
      ] }) }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Create a task" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: createTask, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "tt", children: "Title" }),
            /* @__PURE__ */ jsx(Input, { id: "tt", value: form.title, onChange: (e) => setForm({
              ...form,
              title: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "td", children: "Description" }),
            /* @__PURE__ */ jsx(Textarea, { id: "td", value: form.description, onChange: (e) => setForm({
              ...form,
              description: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { children: "Priority" }),
              /* @__PURE__ */ jsxs(Select, { value: form.priority, onValueChange: (v) => setForm({
                ...form,
                priority: v
              }), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "low", children: "Low" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "medium", children: "Medium" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "high", children: "High" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dd", children: "Due date" }),
              /* @__PURE__ */ jsx(Input, { id: "dd", type: "date", value: form.due_date, onChange: (e) => setForm({
                ...form,
                due_date: e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Assignee" }),
            /* @__PURE__ */ jsxs(Select, { value: form.assignee_id, onValueChange: (v) => setForm({
              ...form,
              assignee_id: v
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "unassigned", children: "Unassigned" }),
                members.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m.user_id, children: m.profiles?.full_name || m.profiles?.email }, m.user_id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: busy, children: busy ? "Adding…" : "Add task" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 lg:grid-cols-3", children: columns.map((col) => {
      const colTasks = tasks.filter((t) => t.status === col.key);
      return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card/50 p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: col.label }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: colTasks.length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          colTasks.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-1 py-3 text-xs text-muted-foreground", children: "No tasks" }),
          colTasks.map((t) => {
            const overdue = t.status !== "done" && t.due_date && t.due_date < today;
            const assignee = t.assignee_id ? memberMap.get(t.assignee_id) : null;
            const canEdit = isAdmin || t.assignee_id === currentUserId;
            return /* @__PURE__ */ jsxs(Card, { className: "space-y-2 p-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: t.title }),
                isAdmin && /* @__PURE__ */ jsx("button", { onClick: () => deleteTask(t), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] }),
              t.description && /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-xs text-muted-foreground", children: t.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(PriorityBadge, { p: t.priority }),
                t.due_date && /* @__PURE__ */ jsxs("span", { className: `rounded-md px-1.5 py-0.5 text-xs ${overdue ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`, children: [
                  overdue ? "Overdue · " : "",
                  t.due_date
                ] }),
                assignee && /* @__PURE__ */ jsx("span", { className: "rounded-md bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground", children: assignee.profiles?.full_name || assignee.profiles?.email })
              ] }),
              canEdit && /* @__PURE__ */ jsxs(Select, { value: t.status, onValueChange: (v) => updateStatus(t, v), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "h-7 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "todo", children: "To do" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "in_progress", children: "In progress" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "done", children: "Done" })
                ] })
              ] })
            ] }, t.id);
          })
        ] })
      ] }, col.key);
    }) })
  ] });
}
function PriorityBadge({
  p
}) {
  const map = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-primary/10 text-primary",
    high: "bg-destructive/15 text-destructive"
  };
  return /* @__PURE__ */ jsx("span", { className: `rounded-md px-1.5 py-0.5 text-xs font-medium capitalize ${map[p]}`, children: p });
}
const memberSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  role: z.enum(["admin", "member"])
});
function MembersPanel({
  members,
  isAdmin,
  projectId,
  ownerId,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    email: "",
    role: "member"
  });
  async function addMember(e) {
    e.preventDefault();
    const parsed = memberSchema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const {
      data: profile,
      error: pErr
    } = await supabase.from("profiles").select("id").eq("email", parsed.data.email).maybeSingle();
    if (pErr || !profile) {
      setBusy(false);
      return toast.error("No user with that email. They need to sign up first.");
    }
    const {
      error
    } = await supabase.from("project_members").insert({
      project_id: projectId,
      user_id: profile.id,
      role: parsed.data.role
    });
    setBusy(false);
    if (error) return toast.error(error.message.includes("duplicate") ? "Already a member" : error.message);
    toast.success("Member added");
    setForm({
      email: "",
      role: "member"
    });
    setOpen(false);
    onChange();
  }
  async function changeRole(m, role) {
    const {
      error
    } = await supabase.from("project_members").update({
      role
    }).eq("id", m.id);
    if (error) return toast.error(error.message);
    toast.success("Role updated");
    onChange();
  }
  async function removeMember(m) {
    if (m.user_id === ownerId) return toast.error("Cannot remove the project owner");
    if (!confirm("Remove this member?")) return;
    const {
      error
    } = await supabase.from("project_members").delete().eq("id", m.id);
    if (error) return toast.error(error.message);
    toast.success("Member removed");
    onChange();
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    isAdmin && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gap-1.5", children: [
        /* @__PURE__ */ jsx(UserPlus, { className: "h-4 w-4" }),
        " Add member"
      ] }) }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add a team member" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: addMember, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "me", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "me", type: "email", value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), placeholder: "teammate@company.com" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "User must already have a Taskly account." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Role" }),
            /* @__PURE__ */ jsxs(Select, { value: form.role, onValueChange: (v) => setForm({
              ...form,
              role: v
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "member", children: "Member" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: busy, children: busy ? "Adding…" : "Add member" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { className: "divide-y divide-border p-0", children: members.map((m) => {
      const isOwner = m.user_id === ownerId;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary", children: (m.profiles?.full_name || m.profiles?.email || "?").slice(0, 1).toUpperCase() }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 truncate font-medium", children: [
              m.profiles?.full_name || m.profiles?.email,
              isOwner && /* @__PURE__ */ jsx(Crown, { className: "h-3.5 w-3.5 text-warning" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-muted-foreground", children: m.profiles?.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          isAdmin && !isOwner ? /* @__PURE__ */ jsxs(Select, { value: m.role, onValueChange: (v) => changeRole(m, v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-28 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "member", children: "Member" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" })
            ] })
          ] }) : /* @__PURE__ */ jsx(Badge, { variant: m.role === "admin" ? "default" : "secondary", className: "capitalize", children: m.role }),
          isAdmin && !isOwner && /* @__PURE__ */ jsx("button", { onClick: () => removeMember(m), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, m.id);
    }) })
  ] });
}
export {
  ProjectDetail as component
};
