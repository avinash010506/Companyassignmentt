import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { CheckSquare, LogOut } from "lucide-react";

export function AppHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CheckSquare className="h-4 w-4" />
          </span>
          <span>Taskly</span>
        </Link>
        {user && (
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground sm:inline-flex"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              Projects
            </Link>
            <span className="hidden text-xs text-muted-foreground md:inline">{user.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({ to: "/auth" });
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
