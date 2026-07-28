<div align="center">
  <br/>
  <img src="public/forge.svg" alt="ForgeAI Logo" width="80" height="80" />
  <h1 align="center">🔥 ForgeAI</h1>
  <p align="center">
    <strong>The Open-Source AI Software Engineering Platform</strong>
    <br />
    Plan · Build · Debug · Deploy · Maintain — All from natural language.
  </p>

  <p align="center">
    <a href="https://github.com/zenzemie/Acme/actions/workflows/ci.yml">
      <img src="https://github.com/zenzemie/Acme/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
    </a>
    <a href="https://github.com/zenzemie/Acme/actions/workflows/deploy.yml">
      <img src="https://github.com/zenzemie/Acme/actions/workflows/deploy.yml/badge.svg" alt="Deploy Status" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-5.6-brightgreen" alt="TypeScript" />
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/react-18.3-61DAFB?logo=react" alt="React" />
    </a>
    <a href="https://convex.dev/">
      <img src="https://img.shields.io/badge/convex-1.17-purple" alt="Convex" />
    </a>
    <a href="https://bun.sh/">
      <img src="https://img.shields.io/badge/bun-1.3-black?logo=bun" alt="Bun" />
    </a>
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs Welcome" />
    <img src="https://img.shields.io/github/stars/zenzemie/Acme?style=social" alt="Stars" />
  </p>

  <br/>

  <p align="center">
    <a href="#-features">Features</a> ·
    <a href="#-getting-started">Getting Started</a> ·
    <a href="#-tech-stack">Tech Stack</a> ·
    <a href="#-project-structure">Structure</a> ·
    <a href="#-contributing">Contributing</a> ·
    <a href="#-license">License</a>
  </p>

  <br/>
</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Software Engineer** | Natural language → working software. Describe, and ForgeAI builds it. |
| 🔬 **Repository Doctor** | Paste any GitHub URL — auto-diagnose startup failures, deps, env vars. |
| 🏗️ **Architecture Intelligence** | Full codebase analysis: diagrams, dependency maps, security reports. |
| 👀 **AI PR Review** | Automated review for bugs, security, performance, style. |
| 📝 **Documentation Generator** | READMEs, API docs, setup guides, changelogs — auto-generated. |
| 📋 **AI Planning** | Turn ideas into milestones, task lists, and timelines. |
| 🚀 **Deployment Engine** | One-click deploy to any cloud + auto CI/CD pipelines. |
| 🧩 **Plugin Marketplace** | Extend with community agents, workflows, themes, integrations. |
| 💼 **LeadForge** | Discover & organize business leads with intelligent outreach. |

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.3
- [Node.js](https://nodejs.org/) >= 18 (for Convex)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/zenzemie/Acme.git
cd Acme

# Install dependencies
bun install

# Set up Convex (local dev)
bun convex dev --once

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173` (or the port Freebuff assigns).

### Environment Variables

Create a `.env.local` file (Convex generates this automatically for local dev):

| Variable | Description |
|---|---|
| `VITE_CONVEX_URL` | Convex deployment URL (auto-generated) |
| `VITE_CONVEX_SITE_URL` | Convex site URL (auto-generated) |

For AI features, add your provider key:

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key (for AI features) |
| `ANTHROPIC_API_KEY` | Anthropic API key (alternative) |

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend / Database** | Convex (reactive real-time backend) |
| **Auth** | Convex Auth (email, GitHub OAuth, Google OAuth) |
| **UI Library** | shadcn/ui (Radix primitives + Tailwind) |
| **Build Tool** | Vite 6 |
| **Package Manager** | Bun 1.3 |
| **CI/CD** | GitHub Actions |

## 📁 Project Structure

```
src/
├── convex/               # Convex backend (schema, auth config)
├── components/
│   ├── layout/           # Sidebar, DashboardLayout, CommandPalette
│   └── ui/               # shadcn/ui component primitives
├── hooks/                # useTheme, useCommandPalette, useToast
├── lib/                  # Utility functions (cn, absoluteUrl)
├── pages/                # All app pages
│   ├── Landing.tsx       # Landing page
│   ├── Auth.tsx          # Auth (sign-in / sign-up)
│   ├── Dashboard.tsx     # Main dashboard
│   ├── Workspace.tsx     # AI Workspace chat interface
│   ├── RepoDoctor.tsx    # Repository diagnostics
│   ├── Architecture.tsx  # Architecture intelligence
│   ├── PRReview.tsx      # AI PR review
│   ├── DocsGenerator.tsx # Documentation generator
│   ├── Planning.tsx      # AI planning
│   ├── Deployments.tsx   # Deployment management
│   ├── Marketplace.tsx   # Plugin marketplace
│   └── LeadForge.tsx     # Lead generation & CRM
├── App.tsx               # Router + auth protection
├── main.tsx              # Entry point with providers
└── index.css             # Global styles + theme
```

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/my-idea`
3. **Commit** your changes: `git commit -m 'Add my awesome feature'`
4. **Push**: `git push origin feature/my-idea`
5. **Open a Pull Request**

### Development

```bash
# Type check
bun tsc --noEmit

# Build
bun run build

# Preview production build
bun run preview
```

## 📄 License

This project is **100% open source** under the [MIT License](LICENSE).

Everything required to use ForgeAI locally is free. Premium offerings (hosted cloud, collaboration, enterprise management) focus on convenience, not lock-in.

---

<div align="center">
  <sub>Built with ❤️ by the ForgeAI community</sub>
  <br/>
  <sub>⭐ Star us on GitHub — it helps!</sub>
</div>
