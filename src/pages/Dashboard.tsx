import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  GitPullRequest,
  Bug,
  Rocket,
  Plus,
  ArrowRight,
  Clock,
  Star,
  Activity,
  Users,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "New Workspace", icon: Code2, action: "/workspace", color: "from-indigo-500 to-purple-500" },
  { label: "Analyze Repo", icon: Bug, action: "/repo-doctor", color: "from-rose-500 to-orange-500" },
  { label: "Review PRs", icon: GitPullRequest, action: "/pr-review", color: "from-emerald-500 to-teal-500" },
  { label: "Deploy Project", icon: Rocket, action: "/deployments", color: "from-cyan-500 to-blue-500" },
];

const recentProjects = [
  { name: "taskflow-saas", status: "active", language: "TypeScript", lastAction: "Built auth system" },
  { name: "docs-engine", status: "active", language: "Python", lastAction: "Generated API docs" },
  { name: "legacy-migration", status: "analyzing", language: "Java", lastAction: "Analyzing dependencies" },
];

const activityItems = [
  { action: "Deployed taskflow-saas to production", time: "2 min ago", icon: Rocket },
  { action: "Completed PR review for docs-engine", time: "15 min ago", icon: GitPullRequest },
  { action: "Fixed 3 bugs in legacy-migration", time: "1 hour ago", icon: Bug },
  { action: "Generated architecture report for api-core", time: "2 hours ago", icon: Activity },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back. Here's what's happening with your projects.
          </p>
        </div>
        <Button onClick={() => navigate("/workspace")} className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Workspace
        </Button>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Active Projects", value: "4", change: "+2", icon: Layers },
          { label: "PRs Reviewed", value: "27", change: "+5", icon: GitPullRequest },
          { label: "Deployments", value: "12", change: "+3", icon: Rocket },
          { label: "Issues Fixed", value: "89", change: "+12", icon: Bug },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs">
                  <span className="text-emerald-400">{stat.change}</span>
                  <span className="text-muted-foreground">this week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">QUICK ACTIONS</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.action)}
                className="group flex items-center gap-4 rounded-xl border bg-card/30 p-4 text-left transition-all duration-200 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">Get started →</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Projects</CardTitle>
              <CardDescription>Your most recent workspaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProjects.map((project) => (
                <button
                  key={project.name}
                  onClick={() => navigate("/workspace")}
                  className="flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-left transition-all hover:border-border/50 hover:bg-card/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{project.name}</span>
                      <Badge variant={project.status === "active" ? "success" : "warning"} className="text-[10px]">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{project.lastAction} · {project.language}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
                </button>
              ))}
              <Button variant="outline" className="w-full" size="sm" onClick={() => navigate("/workspace")}>
                <Plus className="mr-2 h-3.5 w-3.5" />
                New Project
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Latest actions across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {activityItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 border-b border-border/30 py-3 last:border-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/5">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl shadow-primary/30"
          onClick={() => navigate("/workspace")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
