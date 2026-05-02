import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { u as useAuth, s as supabase } from "./router-CS4IbErV.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { L as Label, I as Input } from "./label-4pBKAOFV.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, T as Textarea, e as DialogFooter } from "./dialog-B2TZORrj.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { Plus, FolderKanban } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  description: z.string().trim().max(500).optional()
});
function ProjectsPage() {
  const {
    user
  } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });
  const [busy, setBusy] = useState(false);
  async function load() {
    const {
      data,
      error
    } = await supabase.from("projects").select("*").order("created_at", {
      ascending: false
    });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    if (user) load();
  }, [user]);
  async function createProject(e) {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const {
      error
    } = await supabase.from("projects").insert({
      name: parsed.data.name,
      description: parsed.data.description || null,
      owner_id: user.id
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Project created");
    setOpen(false);
    setForm({
      name: "",
      description: ""
    });
    load();
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Projects" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "All teams and initiatives you belong to." })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " New project"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Create a project" }) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: createProject, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "pn", children: "Name" }),
              /* @__PURE__ */ jsx(Input, { id: "pn", value: form.name, onChange: (e) => setForm({
                ...form,
                name: e.target.value
              }), placeholder: "Marketing site relaunch" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "pd", children: "Description" }),
              /* @__PURE__ */ jsx(Textarea, { id: "pd", value: form.description, onChange: (e) => setForm({
                ...form,
                description: e.target.value
              }), placeholder: "What's this project about?" })
            ] }),
            /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: busy, children: busy ? "Creating…" : "Create project" }) })
          ] })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) : items.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx(FolderKanban, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 font-medium", children: "No projects yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Create your first project to start assigning tasks." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: items.map((p) => /* @__PURE__ */ jsx(Link, { to: "/projects/$projectId", params: {
      projectId: p.id
    }, children: /* @__PURE__ */ jsxs(Card, { className: "group h-full p-5 transition hover:border-primary/50 hover:shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(FolderKanban, { className: "h-5 w-5" }) }),
        p.owner_id === user?.id && /* @__PURE__ */ jsx("span", { className: "rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground", children: "Owner" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-medium text-foreground", children: p.name }),
      p.description && /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: p.description })
    ] }) }, p.id)) })
  ] });
}
export {
  ProjectsPage as component
};
