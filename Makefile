.PHONY: dev build typecheck lint clean docker-up docker-build setup deploy

# Development
dev:
	bun run dev

build:
	bun run build

typecheck:
	bun tsc --noEmit

lint:
	bun run lint

clean:
	rm -rf dist/
	rm -rf .vite/
	rm -rf node_modules/

# Docker
docker-build:
	docker build -t acme-platform .

docker-up:
	docker compose up -d

docker-down:
	docker compose down

# Setup
setup:
	@echo "Running setup..."
	bun install
	bun convex dev --once
	@echo "Setup complete!"

# Python tools
python-setup:
	cd scripts && pip install -r requirements.txt 2>/dev/null || true

analyze:
	python3 scripts/analyze-code.py

migrate-db:
	python3 scripts/db-migrate.py

# Go tools
go-tools:
	cd tools/go-tool && go build -o ../../bin/go-tool .

# Deploy
deploy:
	bun run build
	@echo "Build ready for deployment"

# Help
help:
	@echo "Available commands:"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make typecheck   - Run TypeScript type checking"
	@echo "  make setup       - Install dependencies and configure"
	@echo "  make docker-up   - Start Docker containers"
	@echo "  make analyze     - Run code analysis with Python"
	@echo "  make deploy      - Build for deployment"
