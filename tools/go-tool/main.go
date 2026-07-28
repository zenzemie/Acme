package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// ProjectInfo holds metadata about the project
type ProjectInfo struct {
	Name        string `json:"name"`
	Version     string `json:"version"`
	Files       int    `json:"files"`
	Directories int    `json:"directories"`
	LinesOfCode int    `json:"linesOfCode"`
}

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	command := os.Args[1]

	switch command {
	case "info":
		showProjectInfo()
	case "check":
		runHealthCheck()
	case "clean":
		cleanProject()
	case "version":
		fmt.Println("Acme Platform Tools v1.0.0")
	default:
		fmt.Printf("Unknown command: %s\n", command)
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Println(`Usage: go-tool <command>

Commands:
  info    - Show project information
  check   - Run health checks on the project
  clean   - Clean build artifacts
  version - Show tool version`)
}

func showProjectInfo() {
	info := ProjectInfo{
		Name:    "acme-platform",
		Version: "1.0.0",
	}

	err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}

		// Skip excluded directories
		if info.IsDir() {
			skipDirs := map[string]bool{
				"node_modules": true,
				".git":         true,
				"dist":         true,
				".vite":        true,
			}
			if skipDirs[info.Name()] {
				return filepath.SkipDir
			}
			info.Directories++
			return nil
		}

		info.Files++

		// Count lines if it's a source file
		ext := strings.ToLower(filepath.Ext(path))
		sourceExts := map[string]bool{
			".ts": true, ".tsx": true, ".js": true, ".jsx": true,
			".go": true, ".py": true, ".css": true, ".html": true,
			".json": true, ".md": true, ".sh": true, ".yaml": true,
		}

		if sourceExts[ext] {
			content, err := os.ReadFile(path)
			if err == nil {
				info.LinesOfCode += len(strings.Split(string(content), "\n"))
			}
		}

		return nil
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading project: %v\n", err)
		os.Exit(1)
	}

	data, _ := json.MarshalIndent(info, "", "  ")
	fmt.Println(string(data))
}

func runHealthCheck() {
	checks := []struct {
		name string
		file string
	}{
		{"package.json", "package.json"},
		{"TypeScript config", "tsconfig.json"},
		{"Tailwind config", "tailwind.config.ts"},
		{"Vite config", "vite.config.ts"},
		{"Dockerfile", "Dockerfile"},
		{"Makefile", "Makefile"},
	}

	fmt.Println("Running health checks...")
	fmt.Println()

	allPassed := true
	for _, check := range checks {
		_, err := os.Stat(check.file)
		if err == nil {
			fmt.Printf("  ✓ %s found\n", check.name)
		} else {
			fmt.Printf("  ✗ %s missing\n", check.name)
			allPassed = false
		}
	}

	// Check Node.js
	_, err := exec.LookPath("node")
	if err == nil {
		fmt.Println("  ✓ Node.js installed")
	} else {
		fmt.Println("  ✗ Node.js not found")
		allPassed = false
	}

	// Check Go
	_, err = exec.LookPath("go")
	if err == nil {
		fmt.Println("  ✓ Go installed")
	} else {
		fmt.Println("  ○ Go not found (optional)")
	}

	fmt.Println()
	if allPassed {
		fmt.Println("All health checks passed!")
	} else {
		fmt.Println("Some checks failed. See above for details.")
		os.Exit(1)
	}
}

func cleanProject() {
	dirs := []string{"dist", ".vite", "node_modules/.cache"}
	files := []string{"bun.lock"}

	fmt.Println("Cleaning project...")

	for _, dir := range dirs {
		if err := os.RemoveAll(dir); err == nil {
			fmt.Printf("  ✓ Removed %s\n", dir)
		}
	}

	for _, file := range files {
		if err := os.Remove(file); err == nil {
			fmt.Printf("  ✓ Removed %s\n", file)
		}
	}

	fmt.Println("Clean complete!")
}
