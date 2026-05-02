import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { u as useAuth } from "./router-CS4IbErV.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { CheckSquare, ArrowRight, Users, BarChart3 } from "lucide-react";
import "@supabase/supabase-js";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function Landing() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) navigate({
      to: "/dashboard"
    });
  }, [loading, user, navigate]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-background via-background to-secondary/40", children: [
    /* @__PURE__ */ jsxs("header", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(CheckSquare, { className: "h-4 w-4" }) }),
        "Taskly"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: "Sign in" }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-6xl px-4 py-16 sm:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground", children: "Team Task Manager" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl", children: [
          "Ship work together, ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "without the chaos." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg", children: "Create projects, assign tasks with role-based access, and watch progress unfold on a clean, shared dashboard." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center gap-3", children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2", children: [
          "Get started ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-3", children: [{
        icon: CheckSquare,
        title: "Tasks & status",
        desc: "Track todo, in progress, and done with priorities & due dates."
      }, {
        icon: Users,
        title: "Roles built-in",
        desc: "Admins manage projects and members. Members focus on their work."
      }, {
        icon: BarChart3,
        title: "Live dashboard",
        desc: "See what's overdue, what's shipped, and what's next at a glance."
      }].map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-medium text-foreground", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] })
  ] });
}
export {
  Landing as component
};
