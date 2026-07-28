import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    externalId: v.string(),
  }).index("by_email", ["email"]),

  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.id("users"),
    githubUrl: v.optional(v.string()),
    framework: v.optional(v.string()),
    language: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("archived"), v.literal("analyzing")),
    lastAnalyzed: v.optional(v.number()),
  }).index("by_owner", ["ownerId"]),

  conversations: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
        content: v.string(),
        timestamp: v.number(),
        metadata: v.optional(v.any()),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  analyses: defineTable({
    projectId: v.id("projects"),
    type: v.union(
      v.literal("architecture"),
      v.literal("dependency"),
      v.literal("security"),
      v.literal("performance"),
      v.literal("documentation"),
    ),
    status: v.union(v.literal("pending"), v.literal("running"), v.literal("complete"), v.literal("failed")),
    result: v.optional(v.any()),
    error: v.optional(v.string()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_project_type", ["projectId", "type"]),

  pullRequests: defineTable({
    projectId: v.id("projects"),
    prNumber: v.number(),
    title: v.string(),
    description: v.optional(v.string()),
    author: v.string(),
    status: v.union(v.literal("pending_review"), v.literal("reviewing"), v.literal("reviewed"), v.literal("approved"), v.literal("changes_requested")),
    reviewResults: v.optional(
      v.object({
        bugs: v.array(v.string()),
        security: v.array(v.string()),
        maintainability: v.array(v.string()),
        performance: v.array(v.string()),
        style: v.array(v.string()),
        overallScore: v.number(),
        summary: v.string(),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  deployments: defineTable({
    projectId: v.id("projects"),
    provider: v.string(),
    status: v.union(v.literal("pending"), v.literal("building"), v.literal("deploying"), v.literal("live"), v.literal("failed"), v.literal("rolled_back")),
    url: v.optional(v.string()),
    branch: v.string(),
    commitHash: v.optional(v.string()),
    logs: v.optional(v.array(v.string())),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_project", ["projectId"]),

  plugins: defineTable({
    name: v.string(),
    description: v.string(),
    author: v.string(),
    version: v.string(),
    type: v.union(v.literal("agent"), v.literal("workflow"), v.literal("integration"), v.literal("template"), v.literal("theme"), v.literal("deployment")),
    downloads: v.number(),
    rating: v.number(),
    sourceUrl: v.string(),
    readme: v.optional(v.string()),
    installs: v.number(),
    featured: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_type", ["type"]),

  leads: defineTable({
    company: v.string(),
    website: v.optional(v.string()),
    industry: v.optional(v.string()),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactRole: v.optional(v.string()),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.object({ platform: v.string(), url: v.string() }))),
    score: v.optional(v.number()),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("converted"), v.literal("disqualified")),
    notes: v.optional(v.string()),
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),
});
