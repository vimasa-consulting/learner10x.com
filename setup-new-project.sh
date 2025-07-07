#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up your new fullstack project...${NC}"

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local response
    
    read -p "$prompt [$default]: " response
    echo "${response:-$default}"
}

# Get project details
echo -e "\n${YELLOW}Project Configuration:${NC}"
PROJECT_NAME=$(prompt_with_default "Project name" "my-app")
PROJECT_DESCRIPTION=$(prompt_with_default "Project description" "A fullstack application built with Next.js and FastAPI")

# Database configuration
echo -e "\n${YELLOW}Database Configuration:${NC}"
DB_NAME=$(prompt_with_default "Database name" "${PROJECT_NAME//-/_}")

# Update project files
echo -e "\n${BLUE}🔧 Updating project files...${NC}"

# Update package.json
if [[ -f "frontend/package.json" ]]; then
    sed -i'' -e "s/\"name\": \"frontend\"/\"name\": \"$PROJECT_NAME-frontend\"/" frontend/package.json
    echo -e "${GREEN}✓ Updated frontend package.json${NC}"
fi

# Initialize git repository
echo -e "\n${BLUE}📦 Initializing git repository...${NC}"
git init
git add .
git commit -m "Initial commit: $PROJECT_NAME

- Generated from fullstack-template
- Next.js 14 + FastAPI + PostgreSQL
- Configured for $PROJECT_NAME
- Ready for development"

echo -e "${GREEN}✓ Git repository initialized${NC}"

# Final instructions
echo -e "\n${GREEN}🎉 Project setup complete!${NC}"
echo -e "\n${YELLOW}Happy coding! 🚀${NC}"
