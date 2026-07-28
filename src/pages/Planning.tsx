import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Lightbulb,
  AlertTriangle,
  Clock,
  Users,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Circle,
  FileCode,
  Calendar,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const samplePlan = {
  title: "Task Management SaaS",
  description: "A full-featured task management application with team collaboration, real-time updates, and cloud sync.",
  timeline: "4-6 weeks",
  team: "2-3 developers",
  riskLevel: "medium",
  milestones: [
    {
      title: "Foundation",
      duration: "Week 1-2",
      status: "completed",
      tasks: [
        { text: "Project scaffolding and CI/CD setup", status: "done" },
        { text: "Database schema design and migration", status: "done" },
        { text: "Authentication system (email + OAuth)", status: "done" },
        { text: "Basic API structure and routing", status: "done" },
      ],
    },
    {
      title: "Core Features",
      duration: "Week 2-4",
      status: "in-progress",
      tasks: [
        { text: "Task CRUD operations", status: "in-progress" },
        { text: "Board and list views", status: "pending" },
        { text: "Real-time collaboration with WebSockets", status: "pending" },
        { text: "Team management and permissions", status: "pending" },
      ],
    },
    {
      title: "Polish & Deploy",
      duration: "Week 4-6",
      status: "pending",
      tasks: [
        { text: "UI/UX refinements and responsive design", status: "pending" },
        { text: "Performance optimization and caching", status: "pending" },
        { text: "Testing and QA", status: "pending" },
        { text: "Production deployment", status: "pending" },
      ],
    },
  ],
  risks: [
    { risk: "Real-time sync complexity", mitigation: "Use WebSocket with fallback to polling", severity: "medium" },
    { risk: "Database performance under load", mitigation: "Implement caching layer with Redis", severity: "low" },
    { risk: "Team onboarding time", mitigation: "Create comprehensive setup documentation", severity: "low" },
  ],
};

export default function Planning() {
  const [input, setInput] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">AI Planning</h1>
            <p className="text-sm text-muted-foreground">
              Turn ideas into complete implementation plans with milestones, task lists, and timelines.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="space-y-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you want to build. For example: 'A real-time task management SaaS with team collaboration, Kanban boards, and Slack integration.'"
                className="min-h-[100px] resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Be as specific as possible for better results.
                </p>
                <Button disabled={!input.trim()}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sample Plan */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { icon: Target, label: "Timeline", value: samplePlan.timeline },
            { icon: Users, label: "Team Size", value: samplePlan.team },
            { icon: AlertTriangle, label: "Risk Level", value: samplePlan.riskLevel, highlight: true },
            { icon: FileCode, label: "Est. Tasks", value: "24 tasks" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="glass-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className={cn("text-sm font-semibold capitalize", item.highlight && "text-amber-400")}>
                      {item.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Implementation Plan</h2>
          <div className="space-y-4">
            {samplePlan.milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cn(
                  "glass-card border-l-4",
                  milestone.status === "completed" && "border-l-emerald-500",
                  milestone.status === "in-progress" && "border-l-amber-500",
                  milestone.status === "pending" && "border-l-muted",
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={milestone.status === "completed" ? "success" : milestone.status === "in-progress" ? "warning" : "outline"}
                          className="text-[10px]"
                        >
                          {milestone.status === "completed" && "✓"}
                          {milestone.status === "in-progress" && "○"}
                          {milestone.status === "pending" && "◌"} {milestone.status}
                        </Badge>
                        <CardTitle className="text-base">{milestone.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {milestone.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {milestone.tasks.map((task, j) => (
                        <div key={j} className="flex items-center gap-3">
                          {task.status === "done" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : task.status === "in-progress" ? (
                            <Circle className="h-4 w-4 fill-amber-400/30 text-amber-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/30" />
                          )}
                          <span className={cn(
                            "text-sm",
                            task.status === "done" && "text-muted-foreground line-through",
                            task.status === "in-progress" && "text-foreground",
                            task.status === "pending" && "text-muted-foreground",
                          )}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Risk Assessment</CardTitle>
            <CardDescription>Identified risks and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {samplePlan.risks.map((risk, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border bg-card/30 p-3">
                  <AlertTriangle className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    risk.severity === "high" ? "text-rose-400" : risk.severity === "medium" ? "text-amber-400" : "text-blue-400",
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{risk.risk}</span>
                      <Badge variant={risk.severity === "high" ? "destructive" : risk.severity === "medium" ? "warning" : "outline"} className="text-[10px]">
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
