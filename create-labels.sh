#!/bin/bash

# Script to create labels in the GitHub repository

echo "Creating labels for learner10x.com repository..."

# Function to create a label
create_label() {
    local name="$1"
    local color="$2"
    local description="$3"
    
    echo "Creating label: $name"
    
    gh label create "$name" \
        --color "$color" \
        --description "$description" \
        --repo vimasa-consulting/learner10x.com
    
    if [ $? -eq 0 ]; then
        echo "✅ Created label: $name"
    else
        echo "❌ Failed to create label: $name (may already exist)"
    fi
}

# Create priority labels
create_label "high-priority" "d73a4a" "High priority issues that need immediate attention"
create_label "medium-priority" "fbca04" "Medium priority issues for normal development cycle"
create_label "low-priority" "0e8a16" "Low priority issues for future consideration"

# Create functionality labels
create_label "frontend" "1d76db" "Frontend development tasks"
create_label "backend" "5319e7" "Backend development tasks"
create_label "mobile" "fef2c0" "Mobile app development"
create_label "ai" "d93f0b" "Artificial intelligence and machine learning"
create_label "api" "006b75" "API development and integration"
create_label "security" "d93f0b" "Security-related tasks"
create_label "testing" "fef2c0" "Testing and quality assurance"
create_label "performance" "1d76db" "Performance optimization"
create_label "seo" "0e8a16" "Search engine optimization"
create_label "accessibility" "5319e7" "Accessibility improvements"
create_label "analytics" "1d76db" "Analytics and data tracking"
create_label "documentation" "0075ca" "Documentation tasks"
create_label "infrastructure" "5319e7" "Infrastructure and DevOps"
create_label "launch" "d93f0b" "Launch and deployment"
create_label "epic" "5319e7" "Epic issues that contain multiple tasks"
create_label "user-experience" "1d76db" "User experience improvements"
create_label "content-management" "0075ca" "Content management system"
create_label "monitoring" "5319e7" "Monitoring and alerting"
create_label "data" "1d76db" "Data management and migration"
create_label "compliance" "d93f0b" "Compliance and legal requirements"
create_label "marketing" "0e8a16" "Marketing and promotion"
create_label "user-guides" "0075ca" "User guides and documentation"
create_label "technical-writing" "0075ca" "Technical writing tasks"
create_label "search" "1d76db" "Search functionality"
create_label "authentication" "5319e7" "Authentication and authorization"
create_label "learning" "0e8a16" "Learning system features"
create_label "realtime" "1d76db" "Real-time features"
create_label "collaboration" "0e8a16" "Collaboration features"
create_label "react-native" "1d76db" "React Native development"
create_label "machine-learning" "d93f0b" "Machine learning tasks"
create_label "community" "0e8a16" "Community features"
create_label "social" "0e8a16" "Social features"
create_label "developer" "0075ca" "Developer tools and portals"
create_label "internationalization" "1d76db" "Internationalization (i18n)"
create_label "localization" "1d76db" "Localization tasks"
create_label "gamification" "0e8a16" "Gamification features"
create_label "user-engagement" "0e8a16" "User engagement features"
create_label "compliance" "d93f0b" "Compliance requirements"
create_label "backup" "5319e7" "Backup and recovery"
create_label "disaster-recovery" "5319e7" "Disaster recovery"
create_label "onboarding" "1d76db" "User onboarding"
create_label "conversion" "0e8a16" "Conversion optimization"
create_label "recommendations" "1d76db" "Recommendation systems"
create_label "content" "0075ca" "Content-related tasks"
create_label "quality-assurance" "fef2c0" "Quality assurance"
create_label "automation" "5319e7" "Automation tasks"
create_label "production" "d93f0b" "Production deployment"
create_label "strategy" "0075ca" "Strategic planning"
create_label "integration" "5319e7" "System integration"
create_label "scalability" "5319e7" "Scalability planning"
create_label "legal" "d93f0b" "Legal requirements"
create_label "gdpr" "d93f0b" "GDPR compliance"
create_label "optimization" "1d76db" "Optimization tasks"

echo ""
echo "🎉 Labels created successfully!"
echo "Now you can create issues with these labels." 