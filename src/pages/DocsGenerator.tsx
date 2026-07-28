import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  BookOpen,
  Download,
  Copy,
  Sparkles,
  FileType,
  List,
  Globe,
  Terminal,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const docTypes = [
  { id: "readme", label: "README", icon: BookOpen, description: "Generate comprehensive README files" },
  { id: "api", label: "API Docs", icon: Globe, description: "Document endpoints, schemas, and examples" },
  { id: "setup", label: "Setup Guide", icon: Terminal, description: "Installation and configuration guides" },
  { id: "changelog", label: "Changelog", icon: List, description: "Release notes and version history" },
];

const generatedDoc = `# TaskFlow API

## Overview
TaskFlow is a real-time task management API built with TypeScript and Node.js.

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+

### Installation

\`\`\`bash
git clone https://github.com/example/taskflow.git
cd taskflow
npm install
cp .env.example .env
npm run dev
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/login\` - User login
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/refresh\` - Refresh token

### Tasks
- \`GET /api/tasks\` - List all tasks
- \`POST /api/tasks\` - Create a task
- \`GET /api/tasks/:id\` - Get task details
- \`PUT /api/tasks/:id\` - Update a task
- \`DELETE /api/tasks/:id\` - Delete a task

## Database Schema

### Users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | User email |
| name | VARCHAR(100) | Display name |

### Tasks
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR(200) | Task title |
| status | ENUM | pending/in_progress/done |`;

export default function DocsGenerator() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Documentation Generator</h1>
            <p className="text-sm text-muted-foreground">
              Automatically create README files, API docs, setup guides, and release notes.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Controls */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-4 lg:col-span-1"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Document Type</CardTitle>
              <CardDescription>Choose what to generate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {docTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    className="flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-left transition-all hover:border-border/50 hover:bg-card/50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Source</CardTitle>
              <CardDescription>Repository or project URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="https://github.com/username/repo" />
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Documentation
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">README.md</CardTitle>
                <CardDescription>Generated preview</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-muted/30 p-4">
                <pre className="overflow-x-auto text-sm leading-relaxed">
                  <code>{generatedDoc}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
