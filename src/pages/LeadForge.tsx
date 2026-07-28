import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  Globe,
  MapPin,
  Building2,
  TrendingUp,
  Filter,
  ArrowUpRight,
  MoreHorizontal,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const leads = [
  { company: "TechFlow Inc", industry: "SaaS", contact: "Sarah Chen", email: "sarah@techflow.io", location: "San Francisco, CA", score: 92, status: "qualified" as const },
  { company: "OpenSource Labs", industry: "Developer Tools", contact: "Marcus Johnson", email: "marcus@oslabs.dev", location: "Austin, TX", score: 88, status: "contacted" as const },
  { company: "ScaleUp Corp", industry: "Enterprise", contact: "Priya Patel", email: "priya@scaleup.com", location: "New York, NY", score: 85, status: "new" as const },
  { company: "CloudBase Systems", industry: "Infrastructure", contact: "Alex Kim", email: "alex@cloudbase.io", location: "Seattle, WA", score: 78, status: "new" as const },
  { company: "DataPulse Analytics", industry: "Analytics", contact: "Jordan Lee", email: "jordan@datapulse.com", location: "Chicago, IL", score: 74, status: "contacted" as const },
  { company: "NexGen Solutions", industry: "Consulting", contact: "Taylor Wong", email: "taylor@nexgen.dev", location: "Denver, CO", score: 71, status: "new" as const },
];

const stats = [
  { label: "Total Leads", value: "156", change: "+12", icon: Users },
  { label: "Qualified", value: "43", change: "+5", icon: Star },
  { label: "Contacted", value: "28", change: "+8", icon: Mail },
  { label: "Conversion Rate", value: "18.7%", change: "+2.3%", icon: TrendingUp },
];

export default function LeadForge() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">LeadForge</h1>
            <p className="text-sm text-muted-foreground">
              Discover businesses, organize leads, and plan outreach campaigns.
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
        {stats.map((stat) => {
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

      {/* Search and actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search leads by company, contact, or industry..." className="pl-9 h-11" />
        </div>
        <Button variant="outline" className="h-11">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" className="h-11">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button className="h-11">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </motion.div>

      {/* Leads table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">All Leads</CardTitle>
            <CardDescription>Manage and track your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Company</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Industry</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Contact</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Location</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Score</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-xs font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <motion.tr
                      key={lead.company}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/30 last:border-0 group"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{lead.company}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">{lead.industry}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground hidden sm:table-cell">{lead.industry}</td>
                      <td className="py-3 hidden md:table-cell">
                        <div>
                          <p className="text-sm">{lead.contact}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-muted-foreground hidden lg:table-cell">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.location}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={lead.score} className="h-1.5 w-12" />
                          <span className="text-sm font-medium">{lead.score}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={lead.status === "qualified" ? "success" : lead.status === "contacted" ? "warning" : "outline"}
                          className="text-[10px] capitalize"
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Mail className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Phone className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
