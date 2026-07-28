import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Code2,
  Bug,
  Network,
  GitPullRequest,
  FileText,
  ClipboardList,
  Rocket,
  Puzzle,
  Users,
  ChevronRight,
  Star,
  Github,
  Command,
  ArrowRight,
  Check,
  Layers,
  Zap,
  Shield,
  Globe,
  Infinity,
  Cpu,
  BookOpen,
  Bot,
  Workflow,
  Cloud,
  PanelRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const features = [
  {
    icon: Bot,
    title: "AI Software Engineer",
    description: "Describe what you want to build in natural language and watch the platform plan, code, debug, and deploy it autonomously.",
    gradient: "from-indigo-500 to-purple-500",
    highlights: ["Natural language requests", "Autonomous execution", "Self-healing code", "Multi-file edits"],
  },
  {
    icon: Bug,
    title: "Repository Doctor",
    description: "Paste any GitHub URL and the platform automatically diagnoses startup failures, dependency issues, missing env vars, and broken configs.",
    gradient: "from-rose-500 to-orange-500",
    highlights: ["Instant diagnosis", "Dependency detection", "Env var discovery", "One-click fixes"],
  },
  {
    icon: Network,
    title: "Architecture Intelligence",
    description: "Analyze entire codebases to produce architecture diagrams, dependency maps, database schemas, and comprehensive API docs.",
    gradient: "from-cyan-500 to-blue-500",
    highlights: ["Architecture diagrams", "Dependency mapping", "Security reports", "Onboarding guides"],
  },
  {
    icon: GitPullRequest,
    title: "AI PR Review",
    description: "Automatically review pull requests for bugs, security issues, performance problems, and style inconsistencies.",
    gradient: "from-emerald-500 to-teal-500",
    highlights: ["Bug detection", "Security audit", "Performance review", "Style enforcement"],
  },
  {
    icon: FileText,
    title: "Documentation Generator",
    description: "Generate comprehensive README files, API docs, setup guides, deployment instructions, and changelogs automatically.",
    gradient: "from-violet-500 to-indigo-500",
    highlights: ["README generation", "API documentation", "Setup guides", "Release notes"],
  },
  {
    icon: ClipboardList,
    title: "AI Planning",
    description: "Turn any idea into a complete implementation plan with milestones, task breakdowns, architecture decisions, and timelines.",
    gradient: "from-amber-500 to-yellow-500",
    highlights: ["Task breakdown", "Milestone planning", "Risk assessment", "Timeline estimation"],
  },
  {
    icon: Rocket,
    title: "Deployment Engine",
    description: "Deploy applications to any cloud provider and generate CI/CD pipelines automatically. One-click deployments built-in.",
    gradient: "from-pink-500 to-rose-500",
    highlights: ["Multi-cloud deploy", "CI/CD generation", "Rollback support", "Env management"],
  },
  {
    icon: Puzzle,
    title: "Plugin Marketplace",
    description: "Extend with community-built agents, workflows, integrations, templates, and deployment targets.",
    gradient: "from-indigo-500 to-cyan-500",
    highlights: ["Community plugins", "Custom agents", "Workflow templates", "Theme support"],
  },
  {
    icon: Users,
    title: "LeadForge",
    description: "Discover and organize potential customers from public business data with intelligent outreach planning and CRM tools.",
    gradient: "from-purple-500 to-pink-500",
    highlights: ["Business discovery", "CRM integration", "Outreach planning", "Analytics dashboard"],
  },
];

const stats = [
  { value: "100%", label: "Open Source" },
  { value: "10+", label: "Core Features" },
  { value: "∞", label: "Extensible" },
  { value: "0", label: "Vendor Lock-in" },
];

const testimonials = [
  {
    quote: "The platform completely changed how our team ships software. The AI engineer alone saves us 20+ hours per week.",
    author: "Sarah Chen",
    role: "CTO, TechFlow",
    avatar: "SC",
  },
  {
    quote: "The Repository Doctor feature is incredible. We connected our legacy codebase and it diagnosed 15 issues in seconds.",
    author: "Marcus Johnson",
    role: "Lead Developer, OpenSource Labs",
    avatar: "MJ",
  },
  {
    quote: "I've never seen an open-source tool with this level of polish. It rivals any commercial product I've used.",
    author: "Priya Patel",
    role: "Engineering Manager, ScaleUp Inc",
    avatar: "PP",
  },
];

function AnimatedCodeBlock() {
  const code = `// Build a SaaS with the platform
const app = await Platform.create({
  name: "my-saas",
});

await app.generate({
  description: "A task management SaaS with teams",
  features: ["auth", "realtime", "billing"],
});

console.log(app.url);
// → https://my-saas.app`;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card/40 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground/60">workspace — bash</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="block font-mono leading-relaxed">
          {code.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line.startsWith("//") ? (
                <span className="text-muted-foreground/40">{line}</span>
              ) : line.startsWith("console") || line.startsWith("// →") ? (
                <span className="text-emerald-400/80">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </span>
          ))}
        </code>
      </pre>
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-transparent bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Acme</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">
              Beta
            </Badge>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#plugins" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Marketplace
            </a>
            <a href="#open-source" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Open Source
            </a>
            <Link
              to="/auth"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Button size="sm" onClick={() => navigate("/auth")}>
              Get Started
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              Sign in
            </Button>
            <Button size="sm" onClick={() => navigate("/auth")}>
              Start
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20"
      >
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px]" />
        <div className="absolute right-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-xs">
              <Star className="mr-1.5 h-3 w-3 text-amber-400" />
              Full-Stack Application Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Build Anything.
            <br />
            <span className="text-gradient">Ship Everything.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            A full-stack application platform with AI-powered development tools.
            Build, debug, deploy, and maintain software — all from natural language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="xl"
              onClick={() => navigate("/auth")}
              className="group relative overflow-hidden"
            >                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-20" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="group"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> No credit card
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Free & open source
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> MIT licensed
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Self-hostable
            </span>
          </motion.div>
        </div>

        {/* Code demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto mt-16 w-full max-w-2xl px-4"
        >
          <AnimatedCodeBlock />
        </motion.div>

        <div className="mt-8 h-20" />
      </motion.section>

      {/* Stats Section */}
      <section className="relative border-y border-border/50 bg-card/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Badge variant="secondary" className="mb-4">Everything You Need</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              One Platform.
              <br />
              <span className="text-gradient">Infinite Possibilities.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The platform combines every tool a developer needs into one cohesive workspace.
              No more context switching between a dozen different services.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary/80">
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border/50 bg-card/20 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Loved by <span className="text-gradient">Developers</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border bg-card/30 backdrop-blur-sm p-6"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="relative py-24">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Github className="mr-1.5 h-3 w-3" />
              100% Open Source
            </Badge>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Free Forever.
              <br />
              <span className="text-gradient">Built by the Community.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything is free and open source.
              Premium features focus on convenience, not lock-in. No tricks, no bait-and-switch.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => navigate("/auth")}>
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
                <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground group-hover:text-foreground">
                  12.4k
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-border/50 bg-gradient-to-b from-background to-card/30 py-24">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Ready to Ship Faster?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Build better software, faster.
              It's free, it's open source, and it's waiting for you.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" onClick={() => navigate("/auth")} className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-20" />
              </Button>
              <Button size="xl" variant="outline" onClick={() => navigate("/auth")}>
                <Command className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="font-semibold">Acme</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Full-stack application platform.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="transition-colors hover:text-foreground">Features</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Marketplace</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Community</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">About</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Blog</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Careers</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Acme. Open source under the MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
}
