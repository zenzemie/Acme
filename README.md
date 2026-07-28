<div align="center">
  <br/>
  <img src="public/icon.svg" alt="Logo" width="80" height="80" />
  <h1 align="center">Acme Platform</h1>
  <p align="center">
    <strong>Full-stack application platform with AI-powered development tools</strong>
  </p>

  <p align="center">
    <a href="https://github.com/zenzemie/Acme/actions/workflows/ci.yml">
      <img src="https://github.com/zenzemie/Acme/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="https://github.com/zenzemie/Acme/actions/workflows/deploy.yml">
      <img src="https://github.com/zenzemie/Acme/actions/workflows/deploy.yml/badge.svg" alt="Deploy" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-5.6-brightgreen" alt="TS" />
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/react-18.3-61DAFB?logo=react" alt="React" />
    </a>
    <a href="https://bun.sh/">
      <img src="https://img.shields.io/badge/bun-1.3-black?logo=bun" alt="Bun" />
    </a>
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs" />
    <img src="https://img.shields.io/github/stars/zenzemie/Acme?style=social" alt="Stars" />
  </p>

  <p align="center">
    <a href="#features">Features</a> ·
    <a href="#getting-started">Getting Started</a> ·
    <a href="#tech-stack">Tech Stack</a> ·
    <a href="#project-structure">Structure</a> ·
    <a href="#contributing">Contributing</a>
  </p>

  <br/>
</div>

---

## Features

- **AI Software Engineer** — Natural language to working software
- **Repository Doctor** — Auto-diagnose startup failures, deps, env vars
- **Architecture Intelligence** — Codebase analysis with diagrams & reports
- **AI PR Review** — Automated reviews for bugs, security, performance
- **Documentation Generator** — READMEs, API docs, changelogs
- **AI Planning** — Milestones, task lists, and timelines from ideas
- **Deployment Engine** — CI/CD pipelines and cloud deployment
- **Plugin Marketplace** — Extend with community-built plugins
- **LeadForge** — Business discovery and CRM tools

## Getting Started

```bash
git clone https://github.com/zenzemie/Acme.git
cd Acme
bun install
bun convex dev --once
bun run dev
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Convex (reactive real-time) |
| Auth | Convex Auth |
| UI | shadcn/ui (Radix + Tailwind) |
| Build | Vite 6 |
| Package | Bun 1.3 |
| CI/CD | GitHub Actions |

## Project Structure

```
src/
├── convex/               # Backend schema & auth
├── components/
│   ├── layout/           # Navigation, sidebar, command palette
│   └── ui/               # shadcn/ui primitives
├── hooks/                # React hooks
├── lib/                  # Utilities
├── pages/                # Application pages (12 routes)
├── App.tsx               # Router + auth
├── main.tsx              # Entry point
└── index.css             # Global styles

scripts/                  # Python & Shell tools
tools/go-tool/            # Go tooling
```

## Language Diversity

This repository intentionally uses multiple programming languages:

| Language | Purpose |
|---|---|
| TypeScript / JavaScript | Main application code |
| Python | Code analysis & migration tools |
| Go | CLI tools for repo maintenance |
| Shell (Bash) | Setup & deployment scripts |
| Dockerfile | Containerization |
| CSS | Styling |
| HTML | Entry point |
| YAML | CI/CD configuration |
| Makefile | Build automation |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).
