import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitPullRequest,
  XCircle,
  AlertTriangle,
  Shield,
  Zap,
  ThumbsUp,
  GitBranch,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const reviewResults = {
  overallScore: 87,
  summary: "This PR is well-structured with good test coverage. A few minor issues to address before merging.",
  sections: [
    {
      category: "Bugs",
      icon: XCircle,
      color: "text-rose-400",
      items: [
        { severity: "medium", file: "src/api/users.ts", line: 42, message: "Potential race condition in user update handler. Consider using a transaction." },
      ],
    },
    {
      category: "Security",
      icon: Shield,
      color: "text-amber-400",
      items: [
        { severity: "low", file: "src/middleware/auth.ts", line: 15, message: "Rate limiting should be added to auth endpoints." },
      ],
    },
    {
      category: "Performance",
      icon: Zap,
      color: "text-cyan-400",
      items: [
        { severity: "low", file: "src/utils/format.ts", line: 88, message: "Large array iteration could be optimized with a Map lookup." },
      ],
    },
    {
      category: "Style",
      icon: FileCode,
      color: "text-blue-400",
      items: [
        { severity: "info", file: "src/components/Header.tsx", line: 22, message: "Unused import detected: 'useEffect'." },
        { severity: "info", file: "src/styles/global.css", line: 120, message: "Consider using CSS custom properties for colors." },
      ],
    },
  ],
};



export default function PRReview() {
  const [prUrl, setPrUrl] = useState("");
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
            <GitPullRequest className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">AI PR Review</h1>
            <p className="text-sm text-muted-foreground">
              Automatically review pull requests for bugs, security issues, and maintainability.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <GitBranch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            placeholder="https://github.com/username/repo/pull/123"
            className="pl-9 h-11"
          />
        </div>
        <Button size="lg" className="h-11" onClick={() => prUrl && setReviewed(true)}>
          <GitPullRequest className="mr-2 h-4 w-4" />
          Review PR
        </Button>
      </motion.div>

      <AnimatePresence>
        {reviewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 34}`}
                          strokeDashoffset={`${2 * Math.PI * 34 * (1 - reviewResults.overallScore / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold">{reviewResults.overallScore}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Review Complete</h3>
                      <p className="text-sm text-muted-foreground">{reviewResults.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-1 rounded-full border bg-card/50 px-3 py-1">
                        <ThumbsUp className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs text-muted-foreground">{i === 1 ? "Approve" : i === 2 ? "Comment" : "Request"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Findings */}
            <div className="grid gap-4 lg:grid-cols-2">
              {reviewResults.sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass-card h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("h-4 w-4", section.color)} />
                          <CardTitle className="text-sm">{section.category}</CardTitle>
                          <Badge variant="outline" className="ml-auto text-[10px]">
                            {section.items.length} {section.items.length === 1 ? "issue" : "issues"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.items.map((item, j) => (
                            <div key={j} className="rounded-lg border bg-card/30 p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "warning" : "outline"} className="text-[10px]">
                                  {item.severity}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-mono">{item.file}:{item.line}</span>
                              </div>
                              <p className="text-sm">{item.message}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
