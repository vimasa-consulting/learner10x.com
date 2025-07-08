#!/bin/bash

# Infrastructure Setup Script for learner10x.com
# Phase 1, Task 1: Infrastructure Setup (#40)
# 
# This script sets up the development environment and infrastructure

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on macOS or Linux
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    else
        error "Unsupported operating system: $OSTYPE"
        exit 1
    fi
    log "Detected OS: $OS"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        error "Node.js version 18 or higher is required. Current version: $(node --version)"
        exit 1
    fi
    success "Node.js $(node --version) is installed"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        error "npm is not installed"
        exit 1
    fi
    success "npm $(npm --version) is installed"
    
    # Check Docker (optional)
    if command -v docker &> /dev/null; then
        success "Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) is installed"
        DOCKER_AVAILABLE=true
    else
        warning "Docker is not installed. Some features will not be available."
        DOCKER_AVAILABLE=false
    fi
    
    # Check Docker Compose (optional)
    if command -v docker-compose &> /dev/null; then
        success "Docker Compose $(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1) is installed"
        DOCKER_COMPOSE_AVAILABLE=true
    else
        warning "Docker Compose is not installed. Some features will not be available."
        DOCKER_COMPOSE_AVAILABLE=false
    fi
}

# Create necessary directories
create_directories() {
    log "Creating necessary directories..."
    
    directories=(
        "data"
        "logs"
        "logs/nginx"
        "infrastructure/config/ssl"
        "infrastructure/monitoring"
        "infrastructure/deployment"
        "infrastructure/scripts"
        "public/assets"
        "src/lib/infrastructure"
    )
    
    for dir in "${directories[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            success "Created directory: $dir"
        else
            log "Directory already exists: $dir"
        fi
    done
}

# Setup environment files
setup_environment() {
    log "Setting up environment configuration..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            success "Created .env.local from .env.example"
            warning "Please update .env.local with your actual configuration values"
        else
            error ".env.example not found"
            exit 1
        fi
    else
        log ".env.local already exists"
    fi
    
    # Set appropriate permissions
    chmod 600 .env.local
    success "Set secure permissions on .env.local"
}

# Install dependencies
install_dependencies() {
    log "Installing Node.js dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    success "Dependencies installed successfully"
}

# Setup Git hooks (optional)
setup_git_hooks() {
    log "Setting up Git hooks..."
    
    if [ -d ".git" ]; then
        # Create pre-commit hook
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for learner10x.com

echo "Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues before committing."
    exit 1
fi

# Run type checking
npm run type-check
if [ $? -ne 0 ]; then
    echo "Type checking failed. Please fix the issues before committing."
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
        
        chmod +x .git/hooks/pre-commit
        success "Git pre-commit hook installed"
    else
        warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Setup Docker environment
setup_docker() {
    if [ "$DOCKER_AVAILABLE" = true ] && [ "$DOCKER_COMPOSE_AVAILABLE" = true ]; then
        log "Setting up Docker environment..."
        
        # Create Docker network if it doesn't exist
        if ! docker network ls | grep -q "learner10x-network"; then
            docker network create learner10x-network
            success "Created Docker network: learner10x-network"
        else
            log "Docker network already exists: learner10x-network"
        fi
        
        success "Docker environment setup complete"
    else
        warning "Docker or Docker Compose not available. Skipping Docker setup."
    fi
}

# Verify installation
verify_installation() {
    log "Verifying installation..."
    
    # Check if the application can start
    log "Testing application startup..."
    timeout 30s npm run build > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        success "Application builds successfully"
    else
        error "Application build failed"
        exit 1
    fi
    
    # Test health endpoint (if server is running)
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        success "Health endpoint is accessible"
    else
        log "Health endpoint not accessible (server may not be running)"
    fi
}

# Main setup function
main() {
    log "Starting infrastructure setup for learner10x.com..."
    
    detect_os
    check_prerequisites
    create_directories
    setup_environment
    install_dependencies
    setup_git_hooks
    setup_docker
    verify_installation
    
    success "Infrastructure setup completed successfully!"
    
    echo ""
    echo "Next steps:"
    echo "1. Update .env.local with your configuration values"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Visit http://localhost:3000 to see your application"
    echo ""
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "Docker commands:"
        echo "- Run 'docker-compose up -d' to start all services"
        echo "- Run 'docker-compose down' to stop all services"
        echo ""
    fi
}

# Run main function
main "$@"
