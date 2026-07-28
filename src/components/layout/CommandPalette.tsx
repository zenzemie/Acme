import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Code2, Bug, Network, GitPullRequest, FileText, ClipboardList, Rocket, Puzzle, Users, Command, ArrowRight, Hash, Sparkles } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils";

const defaultCommands = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, action: "/dashboard", category: "Navigate" },
  { id: "workspace", label: "AI Workspace", icon: Code2, action: "/workspace", category: "Navigate" },
  { id: "repo-doctor", label: "Repository Doctor", icon: Bug, action: "/repo-doctor", category: "Navigate" },
  { id: "architecture", label: "Architecture Intelligence", icon: Network, action: "/architecture", category: "Navigate" },
  { id: "pr-review", label: "PR Review", icon: GitPullRequest, action: "/pr-review", category: "Navigate" },
  { id: "docs", label: "Documentation Generator", icon: FileText, action: "/docs", category: "Navigate" },
  { id: "planning", label: "AI Planning", icon: ClipboardList, action: "/planning", category: "Navigate" },
  { id: "deployments", label: "Deployments", icon: Rocket, action: "/deployments", category: "Navigate" },
  { id: "marketplace", label: "Plugin Marketplace", icon: Puzzle, action: "/marketplace", category: "Navigate" },
  { id: "lead-forge", label: "LeadForge", icon: Users, action: "/lead-forge", category: "Navigate" },
];

const suggestionCommands = [
  { id: "new-project", label: "New Project", icon: Sparkles, action: "/workspace", category: "Actions" },
  { id: "analyze-repo", label: "Analyze Repository", icon: Network, action: "/architecture", category: "Actions" },
  { id: "deploy-now", label: "Deploy Project", icon: Rocket, action: "/deployments", category: "Actions" },
];

const categories = ["Navigate", "Actions"] as const;

export default function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allCommands = [...defaultCommands, ...suggestionCommands];

  const filtered = query.trim()
    ? allCommands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category?.toLowerCase().includes(query.toLowerCase()),
      )
    : allCommands;

  const grouped = filtered.reduce(
    (acc, cmd) => {
      const cat = cmd.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(cmd);
      return acc;
    },
    {} as Record<string, typeof filtered>,
  );

  // Maintain order by categories
  const orderedGroups = categories
    .filter((c) => grouped[c])
    .map((c) => ({ category: c, items: grouped[c] }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const executeCommand = useCallback(
    (cmd: (typeof allCommands)[0]) => {
      close();
      navigate(cmd.action);
    },
    [close, navigate],
  );

  const flatItems = filtered;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter" && flatItems[selectedIndex]) {
      executeCommand(flatItems[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-2xl shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 border-b border-border/50 px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search commands or navigate..."
                  className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden shrink-0 items-center gap-1 rounded-md border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:flex">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                {orderedGroups.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <Hash className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">No results for "{query}"</p>
                  </div>
                ) : (
                  orderedGroups.map((group) => (
                    <div key={group.category}>
                      <div className="px-2 py-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                          {group.category}
                        </span>
                      </div>
                      {group.items.map((cmd) => {
                        const idx = flatItems.indexOf(cmd);
                        const isSelected = idx === selectedIndex;
                        const Icon = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => executeCommand(cmd)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80 hover:bg-accent/50",
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="flex-1">{cmd.label}</span>
                            <ArrowRight
                              className={cn(
                                "h-3 w-3 text-muted-foreground/30 transition-opacity",
                                isSelected ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
