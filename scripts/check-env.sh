#!/usr/bin/env bash
set -euo pipefail

echo "Checking environment configuration..."
echo ""

required_vars=(
    "VITE_CONVEX_URL"
)

missing=0

for var in "${required_vars[@]}"; do
    if [ -z "${!var:-}" ]; then
        echo "  ✗ $var is not set"
        missing=$((missing + 1))
    else
        echo "  ✓ $var is set"
    fi
done

optional_vars=(
    "OPENAI_API_KEY"
    "ANTHROPIC_API_KEY"
)

echo ""
echo "Optional variables:"
for var in "${optional_vars[@]}"; do
    if [ -z "${!var:-}" ]; then
        echo "  ○ $var is not set (optional)"
    else
        echo "  ✓ $var is set"
    fi
done

echo ""
if [ "$missing" -gt 0 ]; then
    echo "ERROR: $missing required variable(s) missing."
    exit 1
else
    echo "All required environment variables are configured."
    exit 0
fi
