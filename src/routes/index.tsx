import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { CheckSquare, Users, BarChart3, Zap, Shield, LayoutDashboard, Clock, AlertTriangle, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, user, navigate]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
      {/* Premium Elegant Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[700px] w-[700px] rounded-full bg-primary/20 opacity-40 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[30%] -right-[15%] h-[800px] w-[800px] rounded-full bg-blue-600/20 opacity-30 blur-[150px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-background/50' : 'bg-transparent py-2'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-blue-500 to-indigo-600 shadow-lg shadow-primary/20">
              <CheckSquare className="h-5 w-5 text-white" />
            </span>
            TeamSpace
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Platform</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Workflow</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 text-white hover:opacity-90 font-medium px-8 rounded-full shadow-lg shadow-primary/25 border border-white/10 transition-all hover:scale-105">
                Access Workspace
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-36 pb-20">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 text-center lg:pt-16 pb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-lg shadow-primary/5 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Shield className="h-4 w-4" />
            <span>Team Workspace</span>
          </div>
          <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight sm:text-7xl mb-6 text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Orchestrate our workflow.<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-indigo-400 bg-clip-text text-transparent">With absolute precision.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            The central hub for our team's task management. Experience a frictionless, real-time workspace designed to elevate our internal productivity to new heights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link to="/auth">
              <Button className="h-11 px-8 text-sm font-medium bg-gradient-to-r from-primary via-blue-500 to-indigo-600 text-white rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all group border border-white/10 w-full sm:w-auto">
                Login to Dashboard
                <ChevronRight className="ml-2 h-4 w-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Hero Image/Dashboard Preview */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-2 shadow-[0_0_80px_-20px_rgba(124,58,237,0.3)] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 rounded-2xl pointer-events-none"></div>
            <div className="rounded-xl border border-white/5 bg-background/90 relative flex flex-col text-left overflow-hidden shadow-inner">
              
              {/* Mock App Header */}
              <div className="flex items-center justify-between border-b border-white/5 bg-card/50 px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-inner">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">Internal Release</h3>
                    <p className="text-xs text-white/50">Core Engineering Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['bg-blue-500', 'bg-purple-500', 'bg-indigo-500'].map((color, i) => (
                      <div key={i} className={`h-8 w-8 rounded-full border-2 border-background ${color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm relative z-${3-i}`}>
                        {['JD', 'AM', 'RJ'][i]}
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="hidden sm:flex h-9 px-4 bg-white/10 hover:bg-white/20 text-white gap-2 ml-2 rounded-full border border-white/5">
                    <CheckSquare className="h-4 w-4 text-primary" /> New Task
                  </Button>
                </div>
              </div>

              {/* Mock Kanban Board */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-gradient-to-b from-transparent to-background/50">
                {/* To Do Column */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm text-white/80">To Do</h4>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60">3</span>
                  </div>
                  
                  <div className="rounded-xl border border-white/5 bg-card/60 p-4 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="rounded bg-blue-500/20 px-2 py-1 text-[10px] font-semibold text-blue-400">Design</span>
                      <Shield className="h-4 w-4 text-white/30 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-medium text-sm text-white/90 mb-4 leading-snug">Create highly premium landing page visuals</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Nov 12</span>
                      </div>
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">AM</div>
                    </div>
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm text-white">In Progress</h4>
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">2</span>
                  </div>
                  
                  <div className="rounded-xl border border-primary/30 bg-card/80 p-4 shadow-lg shadow-primary/5 ring-1 ring-primary/20 relative overflow-hidden cursor-pointer">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500"></div>
                    <div className="flex justify-between items-start mb-3 pl-1">
                      <span className="rounded bg-purple-500/20 px-2 py-1 text-[10px] font-semibold text-purple-400">Engineering</span>
                    </div>
                    <p className="font-medium text-sm text-white mb-4 leading-snug pl-1">Implement real-time WebSocket sync</p>
                    <div className="flex items-center justify-between pl-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Today</span>
                      </div>
                      <div className="flex -space-x-1.5">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-card flex items-center justify-center text-[9px] font-bold text-white z-10">JD</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm text-white/50">Done</h4>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/40">12</span>
                  </div>
                  
                  <div className="rounded-xl border border-white/5 bg-card/30 p-4 opacity-60">
                    <div className="flex justify-between items-start mb-3">
                      <span className="rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-500">Infrastructure</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                    </div>
                    <p className="font-medium text-sm mb-4 line-through text-white/50 leading-snug">Setup CI/CD pipeline actions</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                        <span>Deployed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 relative">
          <div className="mb-16 max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 text-white">Engineered for perfection.</h2>
            <p className="text-lg text-white/60">Every detail meticulously crafted to provide the ultimate task management experience for our team.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: CheckSquare, title: "Smart Issue Tracking", desc: "Organize tasks with custom statuses, priorities, and deadlines. Keep everyone aligned instantly.", color: "text-blue-400" },
              { icon: Users, title: "Granular Access Control", desc: "Internal role-based permissions. Admins manage the workspace, while members focus on execution.", color: "text-purple-400" },
              { icon: LayoutDashboard, title: "Real-time Synchronization", desc: "Live updates across all clients instantly. See exactly what's happening the moment it happens.", color: "text-indigo-400" },
              { icon: Zap, title: "Edge Infrastructure", desc: "Built on modern edge infrastructure. Instant load times and optimistic UI updates.", color: "text-cyan-400" },
              { icon: Shield, title: "Internal Security", desc: "End-to-end encryption, secure auth protocols, and automated backups keep our data completely safe.", color: "text-emerald-400" },
              { icon: BarChart3, title: "Velocity Analytics", desc: "Gain critical insights into team velocity, bottleneck identification, and productivity trends.", color: "text-pink-400" },
            ].map((f, i) => (
              <div key={i} className="group rounded-2xl border border-white/5 bg-card/40 p-8 hover:bg-card/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{f.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="border-t border-white/5 bg-card/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">A streamlined workflow.</h2>
              <p className="text-lg text-white/60">A simple methodology designed for maximum internal operational efficiency.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-white/10"></div>
              
              {[
                { step: "01", title: "Initialize Project", desc: "Set up the project context, invite necessary engineers, and configure roles." },
                { step: "02", title: "Architect Issues", desc: "Break down the technical vision into manageable issues, assign DRIs, and set precise deadlines." },
                { step: "03", title: "Execute & Deploy", desc: "Track velocity on real-time kanban boards. Move issues to resolution and maintain momentum." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-start">
                  <div className="h-16 w-16 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 text-white font-mono font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background pb-12 pt-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4 text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white shadow-md">
                <CheckSquare className="h-3.5 w-3.5" />
              </span>
              TeamSpace
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Internal task management portal engineered for our high-velocity team.
            </p>
          </div>
          <div className="flex md:justify-end gap-16">
            <div>
              <h4 className="font-semibold text-sm text-white mb-5">Internal Links</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link to="/auth" className="hover:text-white transition-colors">Dashboard Login</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Company Wiki</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Engineering Docs</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-xs text-white/40">
          <div>&copy; {new Date().getFullYear()} Internal Company Tools. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
