import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bug,
  Search,
  Github,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  ArrowRight,
  Copy,
  RefreshCw,
  FileText,
  Package,
  Globe,
  Terminal,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type DiagnosisStatus = "idle" | "scanning" | "complete" | "error";

interface Issue {
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  description: string;
  fix?: string;
}

export default function RepoDoctor() {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<DiagnosisStatus>("idle");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleDiagnose = () => {
    if (!repoUrl.trim()) return;
    setStatus("scanning");
    setProgress(0);
    // Reset any previous results by clearing intervalId
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("complete");
          return 100;
        }
        return p + 2;
      });
    }, 80);
  };

  // Reset to idle when URL changes
  const handleUrlChange = (value: string) => {
    setRepoUrl(value);
    if (status === "complete" || status === "error") {
      setStatus("idle");
    }
  };

  const sampleIssues: Issue[] = status === "complete" ? [
    { severity: "critical", category: "Dependencies", title: "Vulnerable package: lodash@4.17.20", description: "lodash contains a prototype pollution vulnerability (CVE-2020-8203).", fix: "Update lodash to version 4.17.21+" },
    { severity: "warning", category: "Configuration", title: "Missing .env.example file", description: "No environment variable template found. This makes onboarding difficult for new contributors.", fix: "Create a .env.example file with placeholder values" },
    { severity: "warning", category: "Docker", title: "Dockerfile uses outdated base image", description: "The Dockerfile uses node:16 which reached EOL in September 2023.", fix: "Update base image to node:20-alpine" },
    { severity: "info", category: "Scripts", title: "No test script defined", description: "package.json is missing a test script, making CI configuration harder.", fix: 'Add "test": "jest" to package.json scripts' },
    { severity: "critical", category: "Security", title: "API keys in source code", description: "Potential API key found in src/config.ts: 'sk-...' matches OpenAI key pattern.", fix: "Move API keys to environment variables" },
    { severity: "info", category: "Documentation", title: "README missing setup instructions", description: "The README has no development setup or installation guide.", fix: "Add development setup section to README" },
  ] : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg">
            <Bug className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Repository Doctor</h1>
            <p className="text-sm text-muted-foreground">
              Diagnose startup failures, dependency issues, and broken configs in any GitHub repository.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border bg-card/30 backdrop-blur-sm p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={repoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="pl-9 h-12"
              onKeyDown={(e) => e.key === "Enter" && handleDiagnose()}
            />
          </div>
          <Button
            size="lg"
            onClick={handleDiagnose}
            disabled={!repoUrl.trim() || status === "scanning"}
            className="h-12 shrink-0"
          >
            {status === "scanning" ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Diagnosing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Diagnose Repository
              </>
            )}
          </Button>
        </div>

        {status === "scanning" && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Analyzing repository...</span>
              <span className="text-primary font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
            <div className="flex flex-wrap gap-2 mt-3">
              {["Cloning repo", "Analyzing dependencies", "Checking scripts", "Scanning configs", "Security audit"].map((step, i) => (
                <Badge
                  key={step}
                  variant={progress > (i + 1) * 20 ? "success" : progress > i * 20 ? "warning" : "outline"}
                  className="text-[10px]"
                >
                  {progress > (i + 1) * 20 ? "✓" : "○"} {step}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {status === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Summary */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10">
                      <Bug className="h-7 w-7 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Diagnosis Complete</h3>
                      <p className="text-sm text-muted-foreground">
                        Found 6 issues (2 critical, 2 warnings, 2 info)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      Export Report
                    </Button>
                    <Button size="sm">
                      Fix All Issues
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues */}
            <div className="space-y-3">
              {sampleIssues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border bg-card/30 p-4 transition-all hover:bg-card/50"
                >
                  <div className="flex items-start gap-3">
                    {issue.severity === "critical" ? (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                    ) : issue.severity === "warning" ? (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                    ) : (
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={issue.severity === "critical" ? "destructive" : issue.severity === "warning" ? "warning" : "default"}
                          className="text-[10px]"
                        >
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          {issue.category}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-medium">{issue.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{issue.description}</p>
                      {issue.fix && (
                        <div className="mt-2 flex items-start gap-2 rounded-lg bg-primary/5 p-2.5">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          <span className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Recommended fix:</span> {issue.fix}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
