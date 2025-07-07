#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📚 Comprehensive Documentation Framework Setup${NC}"
echo -e "${BLUE}Choose your documentation setup approach:${NC}"
echo ""
echo "1. Complete Framework (all categories)"
echo "2. Individual Categories (choose specific ones)"
echo "3. Custom Project Documentation Setup"
echo ""

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local response
    
    read -p "$prompt [$default]: " response
    echo "${response:-$default}"
}

# Function to clone a repository
clone_repo() {
    local repo_name="$1"
    local display_name="$2"
    
    if [ -d "$repo_name" ]; then
        echo -e "${YELLOW}⚠️  $display_name already exists, skipping...${NC}"
    else
        echo -e "${BLUE}📦 Cloning $display_name...${NC}"
        git clone "https://github.com/niranjanbala/$repo_name.git" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ $display_name cloned successfully${NC}"
        else
            echo -e "${RED}❌ Failed to clone $display_name${NC}"
            echo -e "${YELLOW}Note: Repository might not exist yet. Create it manually from the category-repos folder.${NC}"
        fi
    fi
}

# Get setup choice
SETUP_CHOICE=$(prompt_with_default "Choose setup option (1-3)" "1")

case $SETUP_CHOICE in
    1)
        echo -e "\n${BLUE}🎯 Setting up Complete Documentation Framework...${NC}"
        
        # Clone all category repositories
        echo -e "\n${BLUE}📚 Cloning all documentation categories...${NC}"
        
        clone_repo "development-guides" "Development Guides"
        clone_repo "architecture-guides" "Architecture Guides"
        clone_repo "performance-scaling" "Performance & Scaling"
        clone_repo "product-development" "Product Development"
        clone_repo "security-guides" "Security Guides"
        clone_repo "testing-qa" "Testing & QA"
        clone_repo "deployment" "Deployment"
        clone_repo "operations-maintenance" "Operations & Maintenance"
        clone_repo "team-process" "Team Process"
        clone_repo "advanced-topics" "Advanced Topics"
        
        echo -e "\n${GREEN}🎉 Complete documentation framework setup complete!${NC}"
        ;;
        
    2)
        echo -e "\n${BLUE}🎯 Individual Category Selection...${NC}"
        echo -e "\nAvailable categories:"
        echo "1. 📚 Development Guides"
        echo "2. 🏗️ Architecture Guides"
        echo "3. 🚀 Performance & Scaling"
        echo "4. 🎯 Product Development"
        echo "5. 🔒 Security Guides"
        echo "6. 📊 Testing & QA"
        echo "7. 🚀 Deployment"
        echo "8. 🔧 Operations & Maintenance"
        echo "9. 👥 Team Process"
        echo "10. 🎓 Advanced Topics"
        echo ""
        
        CATEGORIES=$(prompt_with_default "Enter category numbers (e.g., 1,3,4)" "1,3,4")
        
        # Process selected categories
        IFS=',' read -ra SELECTED <<< "$CATEGORIES"
        for i in "${SELECTED[@]}"; do
            case $i in
                1) clone_repo "development-guides" "Development Guides" ;;
                2) clone_repo "architecture-guides" "Architecture Guides" ;;
                3) clone_repo "performance-scaling" "Performance & Scaling" ;;
                4) clone_repo "product-development" "Product Development" ;;
                5) clone_repo "security-guides" "Security Guides" ;;
                6) clone_repo "testing-qa" "Testing & QA" ;;
                7) clone_repo "deployment" "Deployment" ;;
                8) clone_repo "operations-maintenance" "Operations & Maintenance" ;;
                9) clone_repo "team-process" "Team Process" ;;
                10) clone_repo "advanced-topics" "Advanced Topics" ;;
                *) echo -e "${RED}❌ Invalid category: $i${NC}" ;;
            esac
        done
        
        echo -e "\n${GREEN}🎉 Selected categories setup complete!${NC}"
        ;;
        
    3)
        echo -e "\n${BLUE}🎯 Custom Project Documentation Setup...${NC}"
        
        # Get project details
        echo -e "\n${YELLOW}Project Configuration:${NC}"
        PROJECT_NAME=$(prompt_with_default "Project name" "my-project")
        PROJECT_DESCRIPTION=$(prompt_with_default "Project description" "A modern software project with comprehensive documentation")
        TECH_STACK=$(prompt_with_default "Primary tech stack" "Full-stack web application")
        TEAM_SIZE=$(prompt_with_default "Team size" "5-10 developers")
        
        # Documentation preferences
        echo -e "\n${YELLOW}Documentation Preferences:${NC}"
        echo "Which documentation areas are most important for your project?"
        echo "1. Development Guides"
        echo "2. Architecture & Design"
        echo "3. Performance & Scaling"
        echo "4. Product Development"
        echo "5. Security & Operations"
        echo "6. All categories"
        DOC_FOCUS=$(prompt_with_default "Choose focus (1-6)" "6")
        
        # Create project-specific documentation structure
        echo -e "\n${BLUE}🔧 Creating custom documentation structure...${NC}"
        
        mkdir -p docs/{development,architecture,performance,product,security,testing,deployment,operations,team-process,advanced}
        
        # Create a project-specific README
        cat > PROJECT_README.md << EOF
# $PROJECT_NAME Documentation

$PROJECT_DESCRIPTION

## Tech Stack
$TECH_STACK

## Team
- Team Size: $TEAM_SIZE
- Project Type: $TECH_STACK

## Documentation Structure

This project uses a comprehensive documentation framework covering:

- **📚 Development Guides** - Complete development practices and patterns
- **🏗️ Architecture & Design** - System architecture and design patterns
- **🚀 Performance & Scaling** - Performance optimization and scaling strategies
- **🎯 Product Development** - Product management and development methodology
- **🔒 Security & Operations** - Security implementation and operational practices

## Quick Start

1. **Browse Documentation**: Start with the most relevant guides for your current needs
2. **Choose Your Focus**: Select the categories that matter most to your project
3. **Implement**: Follow the actionable guidance in each section
4. **Customize**: Adapt the examples to your specific tech stack and requirements

## Contributing to Documentation

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project's documentation.

## Original Framework

This documentation is based on the [Comprehensive Documentation Framework](https://github.com/niranjanbala/fullstack-template) by Niranjan Bala.
EOF
        
        # Create a contributing guide
        cat > CONTRIBUTING.md << EOF
# Contributing to $PROJECT_NAME Documentation

## How to Contribute

1. **Report Issues**: Found outdated information or broken links? Create an issue
2. **Suggest Improvements**: Have ideas for better documentation? We'd love to hear them
3. **Add Examples**: Share real-world examples from your implementation
4. **Update Content**: Help keep the documentation current and accurate

## Documentation Standards

- **Clear and Actionable**: Every guide should be immediately useful
- **Real-World Examples**: Include practical code examples and implementations
- **Up-to-Date**: Ensure information reflects current best practices
- **Consistent Format**: Follow the established documentation structure

## Making Changes

1. Fork the repository
2. Create a feature branch: \`git checkout -b update-documentation\`
3. Make your changes
4. Test all links and code examples
5. Submit a pull request with a clear description

## Documentation Categories

Focus your contributions on these areas:
- Development practices and patterns
- Architecture and design decisions
- Performance optimization techniques
- Product development processes
- Security and operational procedures

Thank you for helping improve our documentation! 🙏
EOF
        
        # Create a simple documentation maintenance script
        cat > maintain-docs.sh << 'EOF'
#!/bin/bash

# Simple documentation maintenance script
echo "🔍 Checking documentation health..."

# Check for broken internal links (basic check)
echo "📝 Checking markdown files..."
find docs -name "*.md" -type f | wc -l | xargs echo "Total markdown files:"

# Check for TODO items in documentation
echo "📋 Checking for TODO items..."
grep -r "TODO\|FIXME\|XXX" docs/ || echo "No TODO items found"

# List recently modified files
echo "📅 Recently modified documentation:"
find docs -name "*.md" -type f -mtime -7 -exec ls -la {} \; | head -10

echo "✅ Documentation health check complete"
EOF
        
        chmod +x maintain-docs.sh
        
        echo -e "${GREEN}✓ Created project-specific documentation structure${NC}"
        ;;
        
    *)
        echo -e "${RED}❌ Invalid option selected${NC}"
        exit 1
        ;;
esac

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo -e "\n${BLUE}📦 Initializing git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Documentation Framework Setup

- Set up comprehensive documentation framework
- Selected setup option: $SETUP_CHOICE
- Ready for documentation and development"
    
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${YELLOW}⚠️  Git repository already exists${NC}"
fi

# Final instructions
echo -e "\n${GREEN}🎉 Documentation framework setup complete!${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"

case $SETUP_CHOICE in
    1)
        echo -e "1. Browse individual category repositories for detailed guides"
        echo -e "2. Each category has its own README with specific guidance"
        echo -e "3. Use 'make status' to check documentation health"
        echo -e "4. Customize the documentation for your specific tech stack"
        ;;
    2)
        echo -e "1. Browse the selected category repositories"
        echo -e "2. Each category has its own README with specific guidance"
        echo -e "3. Clone additional categories as needed"
        echo -e "4. Customize the documentation for your specific tech stack"
        ;;
    3)
        echo -e "1. Review PROJECT_README.md for your project overview"
        echo -e "2. Start adding content to the docs/ folders"
        echo -e "3. Use maintain-docs.sh to check documentation health"
        echo -e "4. Customize the structure for your specific needs"
        ;;
esac

echo -e "5. Share with your team and start implementing best practices"
echo -e "\n${YELLOW}Available Commands:${NC}"
echo -e "  make help     - Show all available commands"
echo -e "  make status   - Check documentation status"
echo -e "  make validate - Validate markdown files"
echo -e "  make serve    - Serve documentation locally"

echo -e "\n${YELLOW}Happy documenting! 📚${NC}"
