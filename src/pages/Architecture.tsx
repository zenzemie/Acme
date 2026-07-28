import { useState } from "react";
import { motion } from "framer-motion";
import {
  Network,
  GitBranch,
  Database,
  Shield,
  FileJson,
  Download,
  Search,
  Layers,
  Box,
  ArrowRight,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const architectureViews = [
  {
    id: "overview",
    label: "Overview",
    icon: Layers,
    content: {
      title: "System Architecture Overview",
      description: "High-level architecture diagram and component relationships",
      components: [
        { name: "Frontend (React)", status: "analyzed", deps: ["API Gateway", "Auth Service"] },
        { name: "API Gateway", status: "analyzed", deps: ["Auth Service", "User Service", "Data Service"] },
        { name: "Auth Service", status: "analyzed", deps: ["Database"] },
        { name: "User Service", status: "analyzed", deps: ["Database", "Cache"] },
        { name: "Data Service", status: "analyzed", deps: ["Database", "Queue"] },
        { name: "Database (PostgreSQL)", status: "analyzed", deps: [] },
        { name: "Cache (Redis)", status: "analyzed", deps: [] },
        { name: "Message Queue", status: "analyzed", deps: ["Worker Service"] },
        { name: "Worker Service", status: "analyzed", deps: ["Database"] },
      ],
    },
  },
  {
    id: "dependencies",
    label: "Dependencies",
    icon: GitBranch,
    content: {
      title: "Dependency Map",
      description: "Complete dependency graph showing relationships between components",
    },
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    content: {
      title: "Database Schema",
      description: "Entity relationships, indexes, and query patterns",
      tables: [
        { name: "users", columns: ["id (PK)", "email", "name", "created_at"], indexes: ["email"] },
        { name: "projects", columns: ["id (PK)", "name", "owner_id (FK)", "status"], indexes: ["owner_id"] },
        { name: "tasks", columns: ["id (PK)", "title", "project_id (FK)", "assignee_id (FK)", "status", "priority"], indexes: ["project_id", "assignee_id"] },
      ],
    },
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    content: {
      title: "Security Report",
      description: "Security analysis, vulnerabilities, and recommendations",
    },
  },
];

const summaryCards = [
  { label: "Total Components", value: "9", icon: Box, color: "from-indigo-500 to-purple-500" },
  { label: "Dependencies", value: "14", icon: GitBranch, color: "from-cyan-500 to-blue-500" },
  { label: "Database Tables", value: "12", icon: Database, color: "from-emerald-500 to-teal-500" },
  { label: "API Endpoints", value: "43", icon: FileJson, color: "from-amber-500 to-orange-500" },
];

export default function Architecture() {
  const [activeView, setActiveView] = useState("overview");

  const activeContent = architectureViews.find((v) => v.id === activeView)?.content;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
            <Network className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Architecture Intelligence</h1>
            <p className="text-sm text-muted-foreground">
              Analyze codebases and produce architecture diagrams, dependency maps, and security reports.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="glass-card">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Enter GitHub URL or select a project..." className="pl-9 h-11" />
        </div>
        <Button size="lg" className="h-11">
          <Search className="mr-2 h-4 w-4" />
          Analyze
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
          <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
            {architectureViews.map((view) => {
              const Icon = view.icon;
              return (
                <TabsTrigger key={view.id} value={view.id} className="gap-2 px-4 py-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{view.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <AnimatedTabContent value="overview" activeValue={activeView}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{activeContent?.title}</CardTitle>
                <CardDescription>{activeContent?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {architectureViews[0].content.components?.map((comp, i) => (
                    <motion.div
                      key={comp.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border bg-card/40 p-4 transition-all hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{comp.name}</span>
                        <Badge variant={comp.status === "analyzed" ? "success" : "outline"} className="text-[10px]">
                          {comp.status}
                        </Badge>
                      </div>
                      {comp.deps.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {comp.deps.map((dep) => (
                            <Badge key={dep} variant="outline" className="text-[10px] text-muted-foreground">
                              ← {dep}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedTabContent>

          <AnimatedTabContent value="database" activeValue={activeView}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{architectureViews[2].content.title}</CardTitle>
                <CardDescription>{architectureViews[2].content.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {architectureViews[2].content.tables?.map((table) => (
                    <Card key={table.name} className="bg-muted/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-mono">{table.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          {table.columns.map((col) => (
                            <div key={col} className="flex items-center gap-2 text-xs font-mono">
                              <div className="h-1 w-1 rounded-full bg-primary/50" />
                              <span>{col}</span>
                            </div>
                          ))}
                        </div>
                        {table.indexes && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {table.indexes.map((idx) => (
                              <Badge key={idx} variant="secondary" className="text-[10px]">
                                idx: {idx}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedTabContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function AnimatedTabContent({
  value,
  activeValue,
  children,
}: {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}) {
  if (value !== activeValue) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
