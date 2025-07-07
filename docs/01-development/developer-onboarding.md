# Developer Onboarding Guide

## Welcome to the Team! 🚀

This guide will help you get up and running with our fullstack template quickly and efficiently.

## Prerequisites

### Required Tools
- **Node.js**: Version 18.0.0 or higher
- **Python**: Version 3.11 or higher
- **Docker**: Latest version with Docker Compose
- **Git**: Version control system
- **IDE**: VS Code (recommended) or your preferred editor

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "@bradlc/vscode-tailwindcss",
    "ms-python.python",
    "ms-python.flake8",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Getting Started

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/[your-org]/fullstack-template.git
cd fullstack-template

# Install dependencies
make install

# Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### 2. Environment Configuration
Update the following files with your local settings:

#### `.env` (Root)
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db

# Redis
REDIS_URL=redis://localhost:6379

# Environment
NODE_ENV=development
ENVIRONMENT=development
```

#### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### `backend/.env`
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/fullstack_db
REDIS_URL=redis://localhost:6379
DEBUG=true
CORS_ORIGINS=http://localhost:3000
```

### 3. Start Development Environment
```bash
# Start all services
make dev

# Or start services individually
make dev-backend  # Backend only
make dev-frontend # Frontend only
```

### 4. Verify Setup
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/docs
- **Database**: Check connection via API health endpoint

## Project Structure

```
fullstack-template/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # FastAPI application
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core functionality
│   │   ├── models/        # Database models
│   │   └── main.py        # Application entry point
│   └── requirements.txt
├── docs/                  # Documentation
└── Makefile              # Development commands
```

## Development Workflow

### 1. Branch Management
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. Code Quality
```bash
# Run linting
make lint

# Run tests
make test

# Run type checking
make type-check

# Format code
make format
```

### 3. Database Changes
```bash
# Create migration
cd backend
alembic revision --autogenerate -m "Add new table"

# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

## Common Tasks

### Adding New API Endpoint
1. Create endpoint in `backend/app/api/endpoints/`
2. Add route to `backend/app/api/api.py`
3. Create tests in `tests/api/`
4. Update API documentation

### Adding New React Component
1. Create component in `frontend/src/components/`
2. Add to component index file
3. Create tests in `__tests__/`
4. Add Storybook story if applicable

### Environment Variables
1. Add to `.env.example` files
2. Update environment configuration docs
3. Add validation in config files
4. Update deployment scripts

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -ti:3000
lsof -ti:8000

# Kill process
kill -9 [PID]
```

#### Database Connection Issues
```bash
# Reset database
make db-reset

# Check Docker containers
docker-compose ps

# View logs
docker-compose logs postgres
```

#### Module Not Found Errors
```bash
# Clear node modules and reinstall
rm -rf frontend/node_modules
cd frontend && npm install

# Clear Python cache
find . -name "*.pyc" -delete
find . -name "__pycache__" -type d -exec rm -rf {} +
```

#### Docker Issues
```bash
# Reset Docker environment
make clean
docker system prune -af

# Rebuild containers
docker-compose build --no-cache
```

## Development Standards

### Code Style
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + isort + flake8
- **Commits**: Conventional Commits format
- **Naming**: camelCase (JS/TS), snake_case (Python)

### Testing Requirements
- **Unit Tests**: Required for all business logic
- **Integration Tests**: Required for API endpoints
- **E2E Tests**: Required for critical user flows
- **Coverage**: Minimum 80% for new code

### Documentation
- **README**: Update for new features
- **API Docs**: Auto-generated with OpenAPI
- **Code Comments**: For complex business logic
- **Architecture Decisions**: Document in ADR format

## Getting Help

### Internal Resources
- **Team Chat**: #development channel
- **Code Reviews**: Required for all PRs
- **Office Hours**: Daily 2-3 PM EST
- **Documentation**: This docs folder

### External Resources
- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

## Your First Contribution

### Suggested First Tasks
1. **Fix a small bug** - Look for `good-first-issue` labels
2. **Update documentation** - Improve this onboarding guide
3. **Add tests** - Increase test coverage
4. **Refactor component** - Improve code quality

### Checklist for First PR
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] PR description is clear
- [ ] No sensitive data in commits
- [ ] Branch is up to date with main

## Next Steps

1. **Complete setup verification** - Ensure all services are running
2. **Review codebase** - Explore existing code structure
3. **Read architecture docs** - Understand system design
4. **Join team meetings** - Daily standups and planning
5. **Pick first task** - Start with something small

## Feedback

This onboarding guide is a living document. Please submit improvements via:
- **GitHub Issues**: For bugs or missing information
- **Pull Requests**: For direct improvements
- **Team Feedback**: During retrospectives

Welcome to the team! 🎉 