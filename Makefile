# Thoughts10x Development Makefile
.PHONY: help install dev build test clean docker-up docker-down

help: ## Show this help message
	@echo "Thoughts10x Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

install: ## Install all dependencies
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing backend dependencies..."
	cd backend && pip install -r requirements.txt
	@echo "Dependencies installed!"

dev: ## Start development servers
	@echo "Starting development environment..."
	docker-compose up --build

dev-local: ## Start development servers locally (without Docker)
	@echo "Starting local development..."
	@echo "Make sure PostgreSQL is running locally"
	@echo "Starting backend in background..."
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
	@echo "Starting frontend..."
	cd frontend && npm run dev

build: ## Build both frontend and backend
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Building backend..."
	cd backend && docker build -t thoughts10x-backend .

test: ## Run all tests
	@echo "Running frontend tests..."
	cd frontend && npm run test
	@echo "Running backend tests..."
	cd backend && python -m pytest

test-frontend: ## Run frontend tests only
	cd frontend && npm run test

test-backend: ## Run backend tests only
	cd backend && python -m pytest

lint: ## Run linting
	@echo "Linting frontend..."
	cd frontend && npm run lint
	@echo "Linting backend..."
	cd backend && black . && isort . && flake8 .

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

clean: ## Clean up dependencies and build artifacts
	@echo "Cleaning frontend..."
	cd frontend && rm -rf node_modules .next
	@echo "Cleaning backend..."
	cd backend && find . -type d -name "__pycache__" -exec rm -rf {} +
	@echo "Cleaning Docker..."
	docker-compose down -v
	docker system prune -f

setup-db: ## Setup database (run migrations)
	@echo "Setting up database..."
	cd backend && python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"

reset-db: ## Reset database
	@echo "Resetting database..."
	docker-compose stop db
	docker-compose rm -f db
	docker volume rm thoughts10x_postgres_data
	docker-compose up -d db
	sleep 5
	$(MAKE) setup-db

status: ## Check development environment status
	@echo "Development Environment Status:"
	@echo "Docker containers:"
	docker-compose ps
	@echo ""
	@echo "Frontend dependencies:"
	cd frontend && npm list --depth=0 2>/dev/null || echo "Frontend dependencies not installed"
	@echo ""
	@echo "Backend dependencies:"
	cd backend && pip list | grep -E "(fastapi|uvicorn|sqlalchemy)" || echo "Backend dependencies not installed" 