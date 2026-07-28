#!/usr/bin/env python3
"""
Code analysis tool that provides insights about the codebase.
Counts lines, detects file types, and identifies patterns.
"""

import json
import os
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any, Counter as CounterType, Dict, List, Tuple


# File extensions to exclude from analysis
EXCLUDE_DIRS = {
    "node_modules", ".git", "dist", ".vite",
    "convex/_generated", "bun.lock",
}

LANGUAGE_MAP: Dict[str, str] = {
    ".ts": "TypeScript",
    ".tsx": "TypeScript React",
    ".js": "JavaScript",
    ".jsx": "JavaScript React",
    ".py": "Python",
    ".go": "Go",
    ".css": "CSS",
    ".html": "HTML",
    ".json": "JSON",
    ".md": "Markdown",
    ".yaml": "YAML",
    ".yml": "YAML",
    ".sh": "Shell",
    ".bash": "Shell",
    ".dockerfile": "Dockerfile",
    ".conf": "Config",
    ".toml": "TOML",
    ".svg": "SVG",
}


def should_exclude(path: Path) -> bool:
    """Check if a path should be excluded from analysis."""
    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True
    return False


def analyze_file(filepath: Path) -> Dict[str, Any]:
    """Analyze a single file and return its statistics."""
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        return {"error": "Could not read file"}

    lines = content.split("\n")
    non_empty = sum(1 for line in lines if line.strip())
    comment_lines = sum(
        1 for line in lines if line.strip().startswith(("//", "#", "/*", "*", "--"))
    )

    return {
        "path": str(filepath),
        "extension": filepath.suffix,
        "total_lines": len(lines),
        "code_lines": non_empty,
        "comment_lines": comment_lines,
        "size_bytes": filepath.stat().st_size,
    }


def analyze_codebase(root_dir: Path) -> Dict[str, Any]:
    """Analyze the entire codebase and produce statistics."""
    files_analyzed = 0
    total_lines = 0
    total_code_lines = 0
    extensions: CounterType[str] = Counter()
    languages: CounterType[str] = Counter()
    language_lines: Dict[str, int] = defaultdict(int)
    largest_files: List[Dict[str, Any]] = []

    for filepath in root_dir.rglob("*"):
        if not filepath.is_file() or should_exclude(filepath):
            continue

        info = analyze_file(filepath)
        if "error" in info:
            continue

        files_analyzed += 1
        total_lines += info["total_lines"]
        total_code_lines += info["code_lines"]

        ext = info["extension"].lower()
        extensions[ext] += 1

        lang = LANGUAGE_MAP.get(ext, ext.lstrip(".").capitalize() or "Unknown")
        languages[lang] += 1
        language_lines[lang] += info["code_lines"]

        largest_files.append(info)

    # Sort by code lines descending
    largest_files.sort(key=lambda x: x["code_lines"], reverse=True)

    return {
        "summary": {
            "total_files": files_analyzed,
            "total_lines": total_lines,
            "total_code_lines": total_code_lines,
        },
        "languages": {
            lang: {
                "files": languages[lang],
                "lines": language_lines[lang],
            }
            for lang in sorted(languages, key=lambda l: language_lines[l], reverse=True)
        },
        "largest_files": largest_files[:10],
    }


def main():
    """Main entry point."""
    root = Path.cwd()
    
    print(f"\n📊 Analyzing codebase: {root.name}")
    print("=" * 60)
    
    results = analyze_codebase(root)
    summary = results["summary"]
    
    print(f"\nFiles analyzed: {summary['total_files']}")
    print(f"Total lines:    {summary['total_lines']}")
    print(f"Code lines:     {summary['total_code_lines']}")
    
    print("\nLanguages:\n")
    for lang, info in results["languages"].items():
        pct = (info["lines"] / summary["total_code_lines"] * 100) if summary["total_code_lines"] > 0 else 0
        bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
        print(f"  {lang:20s} {bar} {pct:5.1f}% ({info['files']} files)")
    
    print(f"\nLargest files:\n")
    for f in results["largest_files"][:5]:
        print(f"  • {f['path']:50s} {f['code_lines']:6d} lines")
    
    print("\n" + "=" * 60)
    
    if "--json" in sys.argv:
        print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
