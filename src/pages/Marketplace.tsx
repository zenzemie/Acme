import { useState } from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
  Search,
  Star,
  Download,
  TrendingUp,
  Bot,
  Workflow,
  Link2,
  Layout,
  Palette,
  Rocket,
  Filter,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All", icon: Puzzle },
  { id: "agents", label: "AI Agents", icon: Bot },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "templates", label: "Templates", icon: Layout },
  { id: "themes", label: "Themes", icon: Palette },
  { id: "deployments", label: "Deployment", icon: Rocket },
];

const plugins = [
  { name: "Code Review Agent", author: "@forge-ai", downloads: "12.4k", rating: 4.8, type: "agent", description: "Automated code review with deep analysis", featured: true },
  { name: "Supabase Integration", author: "@community", downloads: "8.2k", rating: 4.6, type: "integration", description: "Full Supabase database and auth support", featured: true },
  { name: "React Component Generator", author: "@forge-ai", downloads: "6.7k", rating: 4.5, type: "agent", description: "Generate React components from descriptions", featured: true },
  { name: "Vercel Deploy", author: "@forge-ai", downloads: "5.1k", rating: 4.7, type: "deployment", description: "One-click Vercel deployment", featured: false },
  { name: "Dark Theme Pro", author: "@designer", downloads: "4.3k", rating: 4.4, type: "theme", description: "Premium dark theme with custom colors", featured: false },
  { name: "Docker Workflow", author: "@devops", downloads: "3.8k", rating: 4.3, type: "workflow", description: "Automated Docker build and deploy pipeline", featured: false },
  { name: "SaaS Starter", author: "@forge-ai", downloads: "9.5k", rating: 4.9, type: "templates", description: "Complete SaaS starter with auth and billing", featured: true },
  { name: "PostgreSQL Integration", author: "@community", downloads: "7.2k", rating: 4.5, type: "integration", description: "Direct PostgreSQL connection and management", featured: false },
  { name: "GitHub Actions Workflow", author: "@devops", downloads: "6.1k", rating: 4.6, type: "workflow", description: "CI/CD pipeline for GitHub Actions", featured: false },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? plugins
    : plugins.filter((p) => p.type === activeCategory);

  const featured = plugins.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg">
            <Puzzle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Plugin Marketplace</h1>
            <p className="text-sm text-muted-foreground">
              Extend ForgeAI with community-built agents, workflows, integrations, and more.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and categories */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search plugins..." className="pl-9 h-11" />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Featured */}
      {activeCategory === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            <Star className="mr-1.5 inline h-4 w-4 text-amber-400" />
            FEATURED PLUGINS
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((plugin, i) => (
              <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-card group cursor-pointer transition-all hover:border-primary/30 hover:shadow-xl">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="text-[10px]">{plugin.type}</Badge>
                      <Badge variant="warning" className="text-[10px]">
                        <Star className="mr-1 h-3 w-3" />Featured
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{plugin.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{plugin.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {plugin.rating}
                        </span>
                        <span>·</span>
                        <span>{plugin.downloads} downloads</span>
                      </div>
                      <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All plugins */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          {activeCategory === "all" ? "ALL PLUGINS" : `${activeCategory.toUpperCase()} PLUGINS`}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plugin, i) => (
            <motion.div
              key={plugin.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="glass-card group cursor-pointer transition-all hover:border-primary/30 hover:shadow-xl">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-3 text-[10px]">{plugin.type}</Badge>
                  <h3 className="font-semibold mb-1">{plugin.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{plugin.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {plugin.rating}
                      </span>
                      <span>·</span>
                      <span>{plugin.downloads}</span>
                    </div>
                    <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="mr-1 h-3 w-3" />
                      Install
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
