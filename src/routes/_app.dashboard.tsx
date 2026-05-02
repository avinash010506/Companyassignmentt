import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, FolderKanban, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

interface Stats {
  projects: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

interface RecentTask {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  due_date: string | null;
  project_id: string;
  projects: { name: string } | null;
}

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ projects: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 });
  const [recent, setRecent] = useState<RecentTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const today = new Date().toISOString().slice(0, 10);
      const [projects, tasks, recentRes] = await Promise.all([
        supabase.from("projects").select("id"),
        supabase.from("tasks").select("id, status, due_date"),
        supabase
          .from("tasks")
          .select("id, title, status, due_date, project_id, projects(name)")
          .order("updated_at", { ascending: false })
          .limit(6),
      ]);

      const t = tasks.data ?? [];
      setStats({
        projects: projects.data?.length ?? 0,
        todo: t.filter((x) => x.status === "todo").length,
        inProgress: t.filter((x) => x.status === "in_progress").length,
        done: t.filter((x) => x.status === "done").length,
        overdue: t.filter((x) => x.status !== "done" && x.due_date && x.due_date < today).length,
      });
      setRecent((recentRes.data ?? []) as RecentTask[]);
      setLoading(false);
    })();
  }, [user]);

  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban, tone: "text-primary" },
    { label: "To do", value: stats.todo, icon: Clock, tone: "text-muted-foreground" },
    { label: "In progress", value: stats.inProgress, icon: Clock, tone: "text-warning" },
    { label: "Completed", value: stats.done, icon: CheckCircle2, tone: "text-success" },
    { label: "Overdue", value: stats.overdue, icon: AlertTriangle, tone: "text-destructive" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of your team's work.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Card key={c.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <c.icon className={`h-4 w-4 ${c.tone}`} />
            </div>
            <div className="mt-2 text-2xl font-semibold">{loading ? "—" : c.value}</div>
          </Card>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent tasks</h2>
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Card className="divide-y divide-border p-0">
          {recent.length === 0 && !loading && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No tasks yet. Create a project to get started.
            </div>
          )}
          {recent.map((t) => {
            const overdue = t.status !== "done" && t.due_date && t.due_date < new Date().toISOString().slice(0, 10);
            return (
              <Link
                key={t.id}
                to="/projects/$projectId"
                params={{ projectId: t.project_id }}
                className="flex items-center justify-between gap-3 p-4 hover:bg-accent/40"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.projects?.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  {overdue && <Badge variant="destructive">Overdue</Badge>}
                  <StatusBadge status={t.status} />
                </div>
              </Link>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "todo" | "in_progress" | "done" }) {
  const map = {
    todo: { label: "To do", cls: "bg-muted text-muted-foreground" },
    in_progress: { label: "In progress", cls: "bg-warning/15 text-warning" },
    done: { label: "Done", cls: "bg-success/15 text-success" },
  } as const;
  const it = map[status];
  return <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${it.cls}`}>{it.label}</span>;
}
