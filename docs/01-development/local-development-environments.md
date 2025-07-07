# Local Development Environments

## Overview

A consistent local development environment is crucial for productivity and reducing "works on my machine" issues. This guide covers Docker setups, debugging configurations, and development tool configurations.

## Docker Development Environment

### Docker Compose Configuration
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: fullstack_db
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user"]
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app
      - /app/__pycache__
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    environment:
      - DATABASE_URL=postgresql://dev_user:dev_password@postgres:5432/fullstack_db
      - REDIS_URL=redis://redis:6379
      - DEBUG=true
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
```

### Development Dockerfiles
```dockerfile
# backend/Dockerfile.dev
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install development dependencies
RUN pip install debugpy ipython black isort flake8

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 dev && chown -R dev:dev /app
USER dev

# Expose port for debugger
EXPOSE 5678

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

```dockerfile
# frontend/Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## IDE Configuration

### VS Code Configuration
```json
// .vscode/settings.json
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "python.formatting.blackArgs": ["--line-length", "88"],
  "python.sortImports.args": ["--profile", "black"],
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "files.associations": {
    "*.env*": "dotenv"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/backend/app/main.py",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
      "jinja": true,
      "justMyCode": false,
      "env": {
        "DATABASE_URL": "postgresql://dev_user:dev_password@localhost:5432/fullstack_db"
      }
    },
    {
      "name": "Python: Remote Debug",
      "type": "python",
      "request": "attach",
      "host": "localhost",
      "port": 5678,
      "pathMappings": [
        {
          "localRoot": "${workspaceFolder}/backend",
          "remoteRoot": "/app"
        }
      ]
    },
    {
      "name": "Next.js: Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/frontend",
      "runtimeArgs": ["--inspect"],
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    }
  ]
}
```

### PyCharm Configuration
```xml
<!-- .idea/runConfigurations/FastAPI_Debug.xml -->
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="FastAPI Debug" type="Python.FastAPI">
    <module name="backend" />
    <option name="uvicornOptions" value="--reload --host 0.0.0.0 --port 8000" />
    <option name="target" value="$PROJECT_DIR$/backend/app/main.py" />
    <option name="application" value="app" />
    <option name="additionalOptions" value="" />
    <option name="envs">
      <map>
        <entry key="DATABASE_URL" value="postgresql://dev_user:dev_password@localhost:5432/fullstack_db" />
      </map>
    </option>
  </configuration>
</component>
```

## Development Scripts

### Makefile
```makefile
# Makefile
.PHONY: help dev stop clean test lint format

help:
	@echo "Available commands:"
	@echo "  dev       - Start development environment"
	@echo "  stop      - Stop development environment"
	@echo "  clean     - Clean up containers and volumes"
	@echo "  test      - Run tests"
	@echo "  lint      - Run linting"
	@echo "  format    - Format code"

dev:
	@echo "🚀 Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "✅ Development environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

stop:
	@echo "🛑 Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

clean:
	@echo "🧹 Cleaning up..."
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f

test:
	@echo "🧪 Running tests..."
	docker-compose -f docker-compose.dev.yml exec backend pytest
	docker-compose -f docker-compose.dev.yml exec frontend npm test

lint:
	@echo "🔍 Running linting..."
	docker-compose -f docker-compose.dev.yml exec backend flake8 app/
	docker-compose -f docker-compose.dev.yml exec frontend npm run lint

format:
	@echo "🎨 Formatting code..."
	docker-compose -f docker-compose.dev.yml exec backend black app/
	docker-compose -f docker-compose.dev.yml exec backend isort app/
	docker-compose -f docker-compose.dev.yml exec frontend npm run format

db-reset:
	@echo "🔄 Resetting database..."
	docker-compose -f docker-compose.dev.yml exec postgres psql -U dev_user -d fullstack_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
	docker-compose -f docker-compose.dev.yml exec backend alembic upgrade head

logs:
	docker-compose -f docker-compose.dev.yml logs -f

shell-backend:
	docker-compose -f docker-compose.dev.yml exec backend bash

shell-frontend:
	docker-compose -f docker-compose.dev.yml exec frontend sh

shell-db:
	docker-compose -f docker-compose.dev.yml exec postgres psql -U dev_user -d fullstack_db
```

## Environment Configuration

### Environment Variables
```bash
# .env.dev
# Database
DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/fullstack_db
DATABASE_TEST_URL=postgresql://dev_user:dev_password@localhost:5432/fullstack_test_db

# Redis
REDIS_URL=redis://localhost:6379

# Backend
DEBUG=true
SECRET_KEY=dev-secret-key-change-in-production
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# External APIs (use test/development keys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Hot Reload Configuration
```python
# backend/app/main.py - Development mode setup
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Enable hot reload in development
if os.getenv("DEBUG") == "true":
    import debugpy
    debugpy.listen(("0.0.0.0", 5678))
    print("🐛 Debugger listening on port 5678")

app = FastAPI(
    title="Fullstack Template API",
    debug=os.getenv("DEBUG") == "true",
    reload=os.getenv("DEBUG") == "true"
)

# Development CORS
if os.getenv("DEBUG") == "true":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
```

## Debugging Configuration

### Remote Debugging
```python
# backend/app/debug.py
import debugpy
import os

def setup_debugger():
    if os.getenv("DEBUG") == "true":
        debugpy.listen(("0.0.0.0", 5678))
        print("🐛 Debugger is ready. Attach VS Code debugger to port 5678")
        
        # Optional: Wait for debugger to attach
        if os.getenv("DEBUG_WAIT") == "true":
            print("⏳ Waiting for debugger to attach...")
            debugpy.wait_for_client()
            print("✅ Debugger attached!")
```

### Browser Debugging
```javascript
// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Enable source maps in development
  ...(process.env.NODE_ENV === "development" && {
    webpack: (config, { dev }) => {
      if (dev) {
        config.devtool = 'eval-source-map'
      }
      return config
    }
  })
}

module.exports = nextConfig
```

## Performance Optimization

### Development Performance
```yaml
# docker-compose.dev.yml optimizations
services:
  postgres:
    # Use tmpfs for faster database operations in development
    tmpfs:
      - /var/lib/postgresql/data
    # Reduce checkpoint frequency for development
    command: postgres -c checkpoint_segments=32 -c checkpoint_completion_target=0.9
    
  redis:
    # Disable persistence in development
    command: redis-server --save "" --appendonly no
```

### File Watching Optimization
```json
// .vscode/settings.json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/.hg/store/**": true,
    "**/__pycache__/**": true,
    "**/.pytest_cache/**": true,
    "**/venv/**": true,
    "**/.venv/**": true
  }
}
```

## Troubleshooting

### Common Issues
```bash
# Port conflicts
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9

# Docker issues
docker system prune -af
docker volume prune -f

# Database connection issues
docker-compose -f docker-compose.dev.yml logs postgres
docker-compose -f docker-compose.dev.yml exec postgres psql -U dev_user -d fullstack_db -c "SELECT 1"

# Node modules issues
rm -rf frontend/node_modules
cd frontend && npm install

# Python dependencies issues
docker-compose -f docker-compose.dev.yml exec backend pip install -r requirements.txt
```

### Health Checks
```python
# backend/app/health.py
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint for development"""
    try:
        db = next(get_db())
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "environment": "development"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")
```

This guide provides a comprehensive foundation for setting up consistent, efficient local development environments that support debugging, testing, and rapid iteration. 