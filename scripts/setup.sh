#!/usr/bin/env bash
set -euo pipefail

echo "================================================"
echo "  Setting up the development environment..."
echo "================================================"
echo ""

# Check prerequisites
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "ERROR: $1 is not installed. Please install it first."
        exit 1
    fi
    echo "  ✓ $1 found: $(command -v $1)"
}

check_command "bun"
check_command "node"
check_command "git"

echo ""

# Install dependencies
echo "→ Installing project dependencies..."
bun install
echo "  ✓ Dependencies installed"
echo ""

# Setup Convex
echo "→ Configuring Convex..."
bun convex dev --once 2>/dev/null || echo "  ⚠ Convex setup skipped (run manually: bun convex dev --once)"
echo ""

# Setup Python tools
echo "→ Setting up Python tools..."
if command -v python3 &> /dev/null; then
    cd scripts
    if [ -f "requirements.txt" ]; then
        pip3 install -r requirements.txt 2>/dev/null || true
    fi
    cd ..
    echo "  ✓ Python tools ready"
else
    echo "  ⚠ Python not found, skipping Python tools"
fi
echo ""

# Setup Go tools
echo "→ Setting up Go tools..."
if command -v go &> /dev/null; then
    cd tools/go-tool
    go build -o ../../bin/go-tool . 2>/dev/null || echo "  ⚠ Go build skipped"
    cd ../..
    echo "  ✓ Go tools ready"
else
    echo "  ⚠ Go not found, skipping Go tools"
fi
echo ""

# Create env file if missing
if [ ! -f ".env.local" ]; then
    echo "→ Creating .env.local..."
    cat > .env.local << 'EOF'
# Convex
# VITE_CONVEX_URL=your-convex-url
# VITE_CONVEX_SITE_URL=your-convex-site-url
EOF
    echo "  ✓ .env.local created (edit with your values)"
fi
echo ""

echo "================================================"
echo "  Setup complete!"
echo ""
echo "  Start developing:"
echo "    bun run dev"
echo ""
echo "  Other commands:"
echo "    make typecheck    - Type check"
echo "    make build        - Production build"
echo "    make analyze      - Code analysis"
echo "================================================"
