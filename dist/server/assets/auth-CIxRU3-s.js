import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { u as useAuth, s as supabase } from "./router-CS4IbErV.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { L as Label, I as Input } from "./label-4pBKAOFV.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-fMRf3trd.js";
import { CheckSquare } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-tabs";
const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72)
});
const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Enter your password").max(72)
});
function AuthPage() {
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
  const [busy, setBusy] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [signup, setSignup] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  async function handleLogin(e) {
    e.preventDefault();
    const parsed = loginSchema.safeParse(login);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
  }
  async function handleSignup(e) {
    e.preventDefault();
    const parsed = signupSchema.safeParse(signup);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const {
      error
    } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: parsed.data.fullName
        }
      }
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created!");
  }
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/40 px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(CheckSquare, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Welcome to Taskly" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sign in or create an account to continue" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "login", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "login", children: "Sign in" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: "Create account" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "login", className: "mt-5", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "le", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "le", type: "email", value: login.email, onChange: (e) => setLogin({
            ...login,
            email: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "lp", children: "Password" }),
          /* @__PURE__ */ jsx(Input, { id: "lp", type: "password", value: login.password, onChange: (e) => setLogin({
            ...login,
            password: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Signing in…" : "Sign in" })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "signup", className: "mt-5", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "sn", children: "Full name" }),
          /* @__PURE__ */ jsx(Input, { id: "sn", value: signup.fullName, onChange: (e) => setSignup({
            ...signup,
            fullName: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "se", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "se", type: "email", value: signup.email, onChange: (e) => setSignup({
            ...signup,
            email: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "sp", children: "Password" }),
          /* @__PURE__ */ jsx(Input, { id: "sp", type: "password", value: signup.password, onChange: (e) => setSignup({
            ...signup,
            password: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: busy, children: busy ? "Creating…" : "Create account" })
      ] }) })
    ] }) })
  ] }) });
}
export {
  AuthPage as component
};
