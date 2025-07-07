#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📚 Setting up your new project documentation...${NC}"

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
PROJECT_NAME=$(prompt_with_default "Project name" "my-project")
PROJECT_DESCRIPTION=$(prompt_with_default "Project description" "A modern software project with comprehensive documentation")
TECH_STACK=$(prompt_with_default "Primary tech stack" "Full-stack web application")
TEAM_SIZE=$(prompt_with_default "Team size" "5-10 developers")

# Documentation preferences
echo -e "\n${YELLOW}Documentation Preferences:${NC}"
echo "Which documentation areas are most important for your project? (select categories)"
echo "1. Development Guides"
echo "2. Architecture & Design"
echo "3. Performance & Scaling"
echo "4. Product Development"
echo "5. Security & Operations"
echo "6. All categories"
DOC_FOCUS=$(prompt_with_default "Choose focus (1-6)" "6")

# Update project files
echo -e "\n${BLUE}🔧 Customizing documentation for your project...${NC}"

# Update README with project-specific information
if [[ -f "README.md" ]]; then
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

1. **Browse Documentation**: Start with [docs/README.md](./docs/README.md)
2. **Choose Your Focus**: Select the most relevant guides for your current needs
3. **Implement**: Follow the actionable guidance in each section
4. **Customize**: Adapt the examples to your specific tech stack and requirements

## Contributing to Documentation

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project's documentation.

## Original Framework

This documentation is based on the [Comprehensive Documentation Framework](https://github.com/niranjanbala/fullstack-template) by Niranjan Bala.
EOF
    
    echo -e "${GREEN}✓ Created project-specific README${NC}"
fi

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

# Initialize git repository
echo -e "\n${BLUE}📦 Initializing git repository...${NC}"
git init
git add .
git commit -m "Initial commit: $PROJECT_NAME Documentation

- Generated from comprehensive documentation framework
- Project: $PROJECT_NAME
- Tech Stack: $TECH_STACK  
- Team Size: $TEAM_SIZE
- Ready for documentation and development"

echo -e "${GREEN}✓ Git repository initialized${NC}"

# Final instructions
echo -e "\n${GREEN}🎉 Documentation setup complete!${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Review PROJECT_README.md for your project overview"
echo -e "2. Browse docs/README.md to explore available guides"
echo -e "3. Customize the documentation for your specific tech stack"
echo -e "4. Share with your team and start implementing best practices"
echo -e "\n${YELLOW}Happy documenting! 📚${NC}"
