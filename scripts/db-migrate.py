#!/usr/bin/env python3
"""
Database migration helper for Convex.
Provides utilities for schema management and data migrations.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional


def load_convex_config() -> Dict[str, Any]:
    """Load Convex configuration from the project."""
    env_path = Path(".env.local")
    if not env_path.exists():
        print("⚠  No .env.local found. Run 'bun convex dev --once' first.")
        return {}

    config = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                config[key.strip()] = value.strip()
    return config


def validate_schema() -> bool:
    """
    Validate that the Convex schema is properly defined.
    Returns True if valid, False otherwise.
    """
    schema_path = Path("src/convex/schema.ts")
    if not schema_path.exists():
        print("✗ Schema file not found at src/convex/schema.ts")
        return False
    
    with open(schema_path) as f:
        content = f.read()
    
    checks = ["defineSchema", "defineTable", "v.string", "v.number"]
    for check in checks:
        if check not in content:
            print(f"✗ Schema missing: {check}")
            return False
    
    print("✓ Schema validation passed")
    return True


def list_tables() -> List[str]:
    """Extract table names from the schema definition."""
    schema_path = Path("src/convex/schema.ts")
    if not schema_path.exists():
        return []
    
    tables = []
    with open(schema_path) as f:
        content = f.read()
    
    for line in content.split("\n"):
        if "defineTable" in line:
            # Extract table name from pattern: tableName: defineTable({
            parts = line.strip().split(":")
            if len(parts) >= 2:
                table_name = parts[0].strip()
                tables.append(table_name)
    
    return tables


def generate_migration_report() -> Dict[str, Any]:
    """Generate a report about the current database schema state."""
    tables = list_tables()
    config = load_convex_config()
    
    report = {
        "timestamp": datetime.now().isoformat(),
        "tables_count": len(tables),
        "tables": tables,
        "convex_configured": bool(config.get("VITE_CONVEX_URL")),
        "schema_valid": validate_schema(),
    }
    
    return report


def main():
    """Main entry point for the migration tool."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Database migration and schema tools")
    parser.add_argument("--validate", action="store_true", help="Validate the schema")
    parser.add_argument("--list-tables", action="store_true", help="List all defined tables")
    parser.add_argument("--report", action="store_true", help="Generate full migration report")
    
    args = parser.parse_args()
    
    if args.validate:
        sys.exit(0 if validate_schema() else 1)
    
    if args.list_tables:
        tables = list_tables()
        print(f"\nDefined tables ({len(tables)}):")
        for table in tables:
            print(f"  • {table}")
        print()
    
    if args.report or not any([args.validate, args.list_tables]):
        report = generate_migration_report()
        print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
