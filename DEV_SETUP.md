# Development Environment Setup

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **Docker** and **Docker Compose**
- **Git**
- **Make** (optional, for convenience commands)

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
make install

# Or manually:
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
```

### 2. Environment Setup

Create environment files:

```bash
# Backend environment
cp backend/.env.example backend/.env

# Edit backend/.env with your actual values:
# - DATABASE_URL (local PostgreSQL or use Docker)
# - CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
# - OPENAI_API_KEY
# - Other API keys as needed
```

### 3. Start Development Environment

#### Option A: Using Docker (Recommended)
```bash
# Start all services (database, backend, frontend)
make dev

# Or directly:
docker-compose up --build
```

#### Option B: Local Development
```bash
# Start PostgreSQL locally (or use Docker just for DB)
docker-compose up -d db

# Start backend and frontend
make dev-local
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs
- **Database**: localhost:5432 (postgres/postgres)

## Development Commands

### Using Make (Recommended)

```bash
make help                 # Show all available commands
make install             # Install dependencies
make dev                 # Start development environment
make dev-local           # Start local development (no Docker)
make test               # Run all tests
make lint               # Run linting
make clean              # Clean up
make status             # Check environment status
```

### Manual Commands

#### Frontend
```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run test             # Run tests
npm run lint             # Run linting
```

#### Backend
```bash
cd backend
uvicorn app.main:app --reload    # Start development server
python -m pytest                # Run tests
black . && isort . && flake8 .  # Run linting
```

## Project Structure

```
thoughts10x/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   ├── lib/               # Utility functions
│   │   └── stores/            # Zustand stores
│   ├── public/                # Static assets
│   └── package.json
├── backend/                    # FastAPI application
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── core/              # Core configuration
│   │   ├── models/            # Database models
│   │   ├── services/          # Business logic
│   │   └── utils/             # Utility functions
│   ├── requirements.txt
│   └── Dockerfile
├── docs/                       # Documentation
├── docker-compose.yml          # Development environment
├── Makefile                    # Development commands
└── README.md
```

## Database Setup

### Using Docker (Recommended)
```bash
# Start PostgreSQL in Docker
docker-compose up -d db

# Setup database tables
make setup-db
```

### Using Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb thoughts10x

# Update backend/.env with local DATABASE_URL
DATABASE_URL=postgresql://username:password@localhost:5432/thoughts10x

# Setup database tables
cd backend && python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

## Authentication Setup (Clerk)

1. **Create Clerk Account**: Sign up at https://clerk.com
2. **Create Application**: Create a new application in your Clerk dashboard
3. **Get API Keys**: Copy your publishable and secret keys
4. **Update Environment Variables**:
   ```bash
   # In backend/.env
   CLERK_SECRET_KEY=your-clerk-secret-key
   CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key

   # In frontend/.env.local
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   ```

## AI Setup

### OpenAI API
1. Get API key from https://platform.openai.com/
2. Add to backend/.env:
   ```
   OPENAI_API_KEY=your-openai-api-key
   ```

### Vector Database (Pinecone)
1. Sign up at https://pinecone.io/
2. Create an index
3. Add to backend/.env:
   ```
   PINECONE_API_KEY=your-pinecone-api-key
   PINECONE_ENVIRONMENT=your-pinecone-environment
   ```

## Testing

### Frontend Testing
```bash
cd frontend
npm run test              # Run unit tests with Vitest
npm run test:watch        # Watch mode
npm run test:e2e          # Run E2E tests with Playwright
```

### Backend Testing
```bash
cd backend
python -m pytest                    # Run all tests
python -m pytest -v                 # Verbose output
python -m pytest --cov=app         # With coverage
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes using ports 3000 or 8000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:8000 | xargs kill -9
   ```

2. **Database Connection Issues**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps
   
   # Reset database
   make reset-db
   ```

3. **Frontend Build Issues**
   ```bash
   # Clear Next.js cache
   cd frontend && rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backend Import Issues**
   ```bash
   # Ensure you're in the backend directory
   cd backend
   
   # Check Python path
   python -c "import sys; print(sys.path)"
   
   # Install dependencies
   pip install -r requirements.txt
   ```

## Production Deployment

### Environment Variables
Ensure all production environment variables are set:
- Database URL (production PostgreSQL)
- API keys (Clerk, OpenAI, Pinecone)
- Monitoring (Sentry DSN)

### Frontend (Netlify)
```bash
cd frontend
npm run build
# Deploy to Netlify
```

### Backend (Railway)
```bash
# Deploy to Railway
railway deploy
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Create a pull request

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation in `/docs`
3. Create an issue in the GitHub repository 