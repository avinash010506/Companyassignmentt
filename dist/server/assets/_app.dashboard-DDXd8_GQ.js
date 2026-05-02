import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { u as useAuth, s as supabase } from "./router-CS4IbErV.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { FolderKanban, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import "@supabase/supabase-js";
import "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
function Dashboard() {
  const {
    user
  } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    overdue: 0
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    (async () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const [projects, tasks, recentRes] = await Promise.all([supabase.from("projects").select("id"), supabase.from("tasks").select("id, status, due_date"), supabase.from("tasks").select("id, title, status, due_date, project_id, projects(name)").order("updated_at", {
        ascending: false
      }).limit(6)]);
      const t = tasks.data ?? [];
      setStats({
        projects: projects.data?.length ?? 0,
        todo: t.filter((x) => x.status === "todo").length,
        inProgress: t.filter((x) => x.status === "in_progress").length,
        done: t.filter((x) => x.status === "done").length,
        overdue: t.filter((x) => x.status !== "done" && x.due_date && x.due_date < today).length
      });
      setRecent(recentRes.data ?? []);
      setLoading(false);
    })();
  }, [user]);
  const cards = [{
    label: "Projects",
    value: stats.projects,
    icon: FolderKanban,
    tone: "text-primary"
  }, {
    label: "To do",
    value: stats.todo,
    icon: Clock,
    tone: "text-muted-foreground"
  }, {
    label: "In progress",
    value: stats.inProgress,
    icon: Clock,
    tone: "text-warning"
  }, {
    label: "Completed",
    value: stats.done,
    icon: CheckCircle2,
    tone: "text-success"
  }, {
    label: "Overdue",
    value: stats.overdue,
    icon: AlertTriangle,
    tone: "text-destructive"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "An overview of your team's work." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", children: cards.map((c) => /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsx(c.icon, { className: `h-4 w-4 ${c.tone}` })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-2xl font-semibold", children: loading ? "—" : c.value })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Recent tasks" }),
        /* @__PURE__ */ jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-1 text-sm text-primary hover:underline", children: [
          "All projects ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "divide-y divide-border p-0", children: [
        recent.length === 0 && !loading && /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No tasks yet. Create a project to get started." }),
        recent.map((t) => {
          const overdue = t.status !== "done" && t.due_date && t.due_date < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
          return /* @__PURE__ */ jsxs(Link, { to: "/projects/$projectId", params: {
            projectId: t.project_id
          }, className: "flex items-center justify-between gap-3 p-4 hover:bg-accent/40", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "truncate font-medium", children: t.title }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: t.projects?.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              overdue && /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Overdue" }),
              /* @__PURE__ */ jsx(StatusBadge, { status: t.status })
            ] })
          ] }, t.id);
        })
      ] })
    ] })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    todo: {
      label: "To do",
      cls: "bg-muted text-muted-foreground"
    },
    in_progress: {
      label: "In progress",
      cls: "bg-warning/15 text-warning"
    },
    done: {
      label: "Done",
      cls: "bg-success/15 text-success"
    }
  };
  const it = map[status];
  return /* @__PURE__ */ jsx("span", { className: `rounded-md px-2 py-0.5 text-xs font-medium ${it.cls}`, children: it.label });
}
export {
  Dashboard as component
};
