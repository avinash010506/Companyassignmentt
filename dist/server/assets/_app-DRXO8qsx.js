import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { u as useAuth } from "./router-CS4IbErV.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { CheckSquare, LogOut } from "lucide-react";
import "@supabase/supabase-js";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function AppHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(CheckSquare, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx("span", { children: "Taskly" })
    ] }),
    user && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/dashboard",
          className: "hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex",
          activeProps: { className: "text-foreground bg-accent" },
          children: "Dashboard"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/projects",
          className: "hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex",
          activeProps: { className: "text-foreground bg-accent" },
          children: "Projects"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "hidden text-xs text-muted-foreground md:inline", children: user.email }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: async () => {
            await signOut();
            navigate({ to: "/auth" });
          },
          children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" })
        }
      )
    ] })
  ] }) });
}
function AppLayout() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [loading, user, navigate]);
  if (loading || !user) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground", children: "Loading…" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(AppHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-6xl px-4 py-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  AppLayout as component
};
