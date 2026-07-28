import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  Bug,
  Network,
  GitPullRequest,
  FileText,
  ClipboardList,
  Rocket,
  Puzzle,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCommandPalette } from "@/hooks/useCommandPalette";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Code2, label: "AI Workspace", path: "/workspace" },
  { icon: Bug, label: "Repo Doctor", path: "/repo-doctor" },
  { icon: Network, label: "Architecture", path: "/architecture" },
  { icon: GitPullRequest, label: "PR Review", path: "/pr-review" },
  { icon: FileText, label: "Docs Generator", path: "/docs" },
  { icon: ClipboardList, label: "AI Planning", path: "/planning" },
  { icon: Rocket, label: "Deployments", path: "/deployments" },
  { icon: Puzzle, label: "Marketplace", path: "/marketplace" },
  { icon: Users, label: "LeadForge", path: "/lead-forge" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { open: openCommandPalette } = useCommandPalette();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border/50 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold"
          >
            Acme
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item.path} delayDuration={collapsed ? 100 : 1000}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      collapsed && "justify-center px-2",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="text-xs">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border/50 p-2 space-y-1">
        <Tooltip delayDuration={collapsed ? 100 : 1000}>
          <TooltipTrigger asChild>
            <button
              onClick={openCommandPalette}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <Command className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <span className="flex-1 text-left">Commands</span>
              )}
              {!collapsed && (
                <kbd className="rounded-md border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              )}
            </button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" className="text-xs">
              Command Palette (⌘K)
            </TooltipContent>
          )}
        </Tooltip>

        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-2",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
