import { motion } from "framer-motion";
import {
  Rocket,
  Globe,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  GitBranch,
  RefreshCw,
  ExternalLink,
  Terminal,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const deployments = [
  {
    project: "taskflow-saas",
    branch: "main",
    status: "live" as const,
    url: "https://taskflow-saas.forge.app",
    time: "2 hours ago",
    commit: "8a3f2b1",
    provider: "Vercel",
  },
  {
    project: "docs-engine",
    branch: "main",
    status: "building" as const,
    url: null,
    time: "5 minutes ago",
    commit: "d4e5f6a",
    provider: "Railway",
  },
  {
    project: "legacy-migration",
    branch: "staging",
    status: "failed" as const,
    url: null,
    time: "1 hour ago",
    commit: "b7c8d9e",
    provider: "Docker",
  },
  {
    project: "api-core",
    branch: "main",
    status: "live" as const,
    url: "https://api-core.forge.app",
    time: "1 day ago",
    commit: "f0a1b2c",
    provider: "Fly.io",
  },
];

const providers = [
  { name: "Vercel", icon: "▲", description: "Frontend deployments" },
  { name: "Railway", icon: "⚡", description: "Full-stack deployments" },
  { name: "Fly.io", icon: "🪰", description: "Container deployments" },
  { name: "Docker", icon: "🐳", description: "Custom container builds" },
];

const stats = [
  { label: "Total Deployments", value: "47" },
  { label: "Active", value: "3" },
  { label: "Failed", value: "2" },
  { label: "Avg. Deploy Time", value: "2m 34s" },
];

export default function Deployments() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Deployments</h1>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Deploy applications to any cloud provider and manage CI/CD pipelines.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deployment List */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">RECENT DEPLOYMENTS</h2>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>

          <div className="space-y-3">
            {deployments.map((dep, i) => (
              <motion.div
                key={`${dep.project}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-card transition-all hover:border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {dep.status === "live" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        </div>
                      ) : dep.status === "building" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                          <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                          <XCircle className="h-5 w-5 text-rose-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{dep.project}</span>
                          <Badge
                            variant={dep.status === "live" ? "success" : dep.status === "building" ? "warning" : "destructive"}
                            className="text-[10px]"
                          >
                            {dep.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            {dep.branch}
                          </span>
                          <span>{dep.commit}</span>
                          <span>{dep.provider}</span>
                          <span>{dep.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {dep.url && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Terminal className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            <Rocket className="mr-2 h-4 w-4" />
            New Deployment
          </Button>
        </motion.div>

        {/* Providers */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="text-sm font-medium text-muted-foreground">CONNECTED PROVIDERS</h2>
          <div className="space-y-3">
            {providers.map((provider) => (
              <Card key={provider.name} className="glass-card transition-all hover:border-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">
                      {provider.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">{provider.description}</p>
                    </div>
                    <Badge variant="success" className="text-[10px]">Connected</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Globe className="mr-2 h-4 w-4" />
            Connect Provider
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
