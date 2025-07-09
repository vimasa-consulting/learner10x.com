#!/bin/bash

# Complete Persona Structure Setup Script
# Creates all persona folders by tier structure

echo "Setting up complete persona folder structure by tier..."

# Create main personas directory if it doesn't exist
mkdir -p personas

# Function to create persona folder with README
create_persona_folder() {
    local tier=$1
    local function_name=$2
    local persona_name=$3
    local persona_title=$4
    local folder_path="personas/${function_name}/${tier}/${persona_name}"
    
    mkdir -p "$folder_path"
    
    # Create README.md for the persona
    cat > "$folder_path/README.md" << EOF
# ${persona_title} (${persona_name})

## 🎭 **Persona Overview**
**Function**: ${function_name}  
**Tier**: ${tier}  
**Name**: ${persona_name}  
**Title**: ${persona_title}

## 🎯 **Role & Responsibilities**
[To be defined based on specific persona requirements]

## 📋 **Key Skills**
- [Skill 1]
- [Skill 2]
- [Skill 3]

## 🚀 **Current Focus**
- [Current task 1]
- [Current task 2]

## 📊 **Progress Tracking**
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## 📝 **Notes**
[Persona-specific notes and observations]

---
*Last updated: $(date +%Y-%m-%d)*
EOF
}

# Function to create function-level README
create_function_readme() {
    local function_name=$1
    local function_title=$2
    local folder_path="personas/${function_name}"
    
    cat > "$folder_path/README.md" << EOF
# ${function_title} Function

## 🎯 **Function Overview**
**Function**: ${function_name}  
**Title**: ${function_title}

## 🏗️ **Tier Structure**
- **Tier 1**: Strategic Leadership
- **Tier 2**: Operational Management  
- **Tier 3**: Specialized Execution

## 👥 **Personas by Tier**

### Tier 1 - Strategic Leadership
[To be populated with Tier 1 personas]

### Tier 2 - Operational Management
[To be populated with Tier 2 personas]

### Tier 3 - Specialized Execution
[To be populated with Tier 3 personas]

## 📊 **Function Status**
- **Total Personas**: [Count]
- **Active Personas**: [Count]
- **Completed Tasks**: [Count]

---
*Last updated: $(date +%Y-%m-%d)*
EOF
}

# 1. DEVELOPMENT FUNCTION
echo "Setting up Development function..."
create_function_readme "development" "Development"

# Tier 1 - Development
create_persona_folder "tier1" "development" "dev" "Dev (DevOps Engineer)"

# Tier 2 - Development
create_persona_folder "tier2" "development" "backend" "Backend Developer"
create_persona_folder "tier2" "development" "frontend" "Frontend Developer"
create_persona_folder "tier2" "development" "fullstack" "Full Stack Developer"
create_persona_folder "tier2" "development" "mobile" "Mobile Developer"
create_persona_folder "tier2" "development" "data" "Data Engineer"

# Tier 3 - Development
create_persona_folder "tier3" "development" "react" "React Specialist"
create_persona_folder "tier3" "development" "node" "Node.js Specialist"
create_persona_folder "tier3" "development" "python" "Python Specialist"
create_persona_folder "tier3" "development" "java" "Java Specialist"
create_persona_folder "tier3" "development" "database" "Database Specialist"
create_persona_folder "tier3" "development" "api" "API Specialist"
create_persona_folder "tier3" "development" "testing" "Testing Specialist"
create_persona_folder "tier3" "development" "security" "Security Specialist"
create_persona_folder "tier3" "development" "performance" "Performance Specialist"
create_persona_folder "tier3" "development" "devops" "DevOps Specialist"

# 2. DESIGN FUNCTION
echo "Setting up Design function..."
create_function_readme "design" "Design"

# Tier 1 - Design
create_persona_folder "tier1" "design" "dara" "Dara (Design Director)"

# Tier 2 - Design
create_persona_folder "tier2" "design" "uxie" "UX Designer"
create_persona_folder "tier2" "design" "vida" "Visual Designer"
create_persona_folder "tier2" "design" "ira" "Interaction Designer"
create_persona_folder "tier2" "design" "rena" "Research Designer"
create_persona_folder "tier2" "design" "tina" "Technical Designer"

# Tier 3 - Design
create_persona_folder "tier3" "design" "wire" "Wireframe Specialist"
create_persona_folder "tier3" "design" "proto" "Prototype Specialist"
create_persona_folder "tier3" "design" "flow" "User Flow Specialist"
create_persona_folder "tier3" "design" "usab" "Usability Specialist"
create_persona_folder "tier3" "design" "nav" "Navigation Specialist"
create_persona_folder "tier3" "design" "content" "Content Designer"
create_persona_folder "tier3" "design" "site" "Site Designer"
create_persona_folder "tier3" "design" "test" "Design Tester"
create_persona_folder "tier3" "design" "data" "Data Designer"
create_persona_folder "tier3" "design" "tax" "Taxonomy Specialist"
create_persona_folder "tier3" "design" "user" "User Research Specialist"
create_persona_folder "tier3" "design" "insight" "Insight Analyst"
create_persona_folder "tier3" "design" "comp" "Component Designer"
create_persona_folder "tier3" "design" "front" "Frontend Designer"
create_persona_folder "tier3" "design" "tech" "Technical Designer"
create_persona_folder "tier3" "design" "system" "Design System Specialist"
create_persona_folder "tier3" "design" "color" "Color Specialist"
create_persona_folder "tier3" "design" "type" "Typography Specialist"
create_persona_folder "tier3" "design" "icon" "Icon Designer"
create_persona_folder "tier3" "design" "brand" "Brand Designer"

# 3. TESTING FUNCTION
echo "Setting up Testing function..."
create_function_readme "testing" "Testing"

# Tier 1 - Testing
create_persona_folder "tier1" "testing" "tess" "Tess (Testing Director)"

# Tier 2 - Testing
create_persona_folder "tier2" "testing" "qa" "QA Engineer"
create_persona_folder "tier2" "testing" "automation" "Automation Engineer"
create_persona_folder "tier2" "testing" "performance" "Performance Tester"
create_persona_folder "tier2" "testing" "security" "Security Tester"
create_persona_folder "tier2" "testing" "user" "User Acceptance Tester"

# Tier 3 - Testing
create_persona_folder "tier3" "testing" "unit" "Unit Testing Specialist"
create_persona_folder "tier3" "testing" "integration" "Integration Testing Specialist"
create_persona_folder "tier3" "testing" "e2e" "End-to-End Testing Specialist"
create_persona_folder "tier3" "testing" "api" "API Testing Specialist"
create_persona_folder "tier3" "testing" "ui" "UI Testing Specialist"
create_persona_folder "tier3" "testing" "mobile" "Mobile Testing Specialist"
create_persona_folder "tier3" "testing" "accessibility" "Accessibility Testing Specialist"
create_persona_folder "tier3" "testing" "load" "Load Testing Specialist"
create_persona_folder "tier3" "testing" "penetration" "Penetration Testing Specialist"
create_persona_folder "tier3" "testing" "usability" "Usability Testing Specialist"

# 4. ARCHITECTURE FUNCTION
echo "Setting up Architecture function..."
create_function_readme "architecture" "Architecture"

# Tier 1 - Architecture
create_persona_folder "tier1" "architecture" "arch" "Arch (Architecture Director)"

# Tier 2 - Architecture
create_persona_folder "tier2" "architecture" "system" "System Architect"
create_persona_folder "tier2" "architecture" "data" "Data Architect"
create_persona_folder "tier2" "architecture" "security" "Security Architect"
create_persona_folder "tier2" "architecture" "cloud" "Cloud Architect"
create_persona_folder "tier2" "architecture" "solution" "Solution Architect"

# Tier 3 - Architecture
create_persona_folder "tier3" "architecture" "microservices" "Microservices Specialist"
create_persona_folder "tier3" "architecture" "api" "API Architecture Specialist"
create_persona_folder "tier3" "architecture" "database" "Database Architecture Specialist"
create_persona_folder "tier3" "architecture" "scalability" "Scalability Specialist"
create_persona_folder "tier3" "architecture" "performance" "Performance Architecture Specialist"
create_persona_folder "tier3" "architecture" "security" "Security Architecture Specialist"
create_persona_folder "tier3" "architecture" "monitoring" "Monitoring Architecture Specialist"
create_persona_folder "tier3" "architecture" "deployment" "Deployment Architecture Specialist"
create_persona_folder "tier3" "architecture" "integration" "Integration Architecture Specialist"
create_persona_folder "tier3" "architecture" "patterns" "Design Patterns Specialist"

# 5. DEVOPS FUNCTION
echo "Setting up DevOps function..."
create_function_readme "devops" "DevOps"

# Tier 1 - DevOps
create_persona_folder "tier1" "devops" "ops" "Ops (DevOps Director)"

# Tier 2 - DevOps
create_persona_folder "tier2" "devops" "platform" "Platform Engineer"
create_persona_folder "tier2" "devops" "infrastructure" "Infrastructure Engineer"
create_persona_folder "tier2" "devops" "automation" "Automation Engineer"
create_persona_folder "tier2" "devops" "monitoring" "Monitoring Engineer"
create_persona_folder "tier2" "devops" "security" "Security Engineer"

# Tier 3 - DevOps
create_persona_folder "tier3" "devops" "ci" "CI/CD Specialist"
create_persona_folder "tier3" "devops" "kubernetes" "Kubernetes Specialist"
create_persona_folder "tier3" "devops" "docker" "Docker Specialist"
create_persona_folder "tier3" "devops" "aws" "AWS Specialist"
create_persona_folder "tier3" "devops" "azure" "Azure Specialist"
create_persona_folder "tier3" "devops" "gcp" "GCP Specialist"
create_persona_folder "tier3" "devops" "terraform" "Terraform Specialist"
create_persona_folder "tier3" "devops" "ansible" "Ansible Specialist"
create_persona_folder "tier3" "devops" "prometheus" "Prometheus Specialist"
create_persona_folder "tier3" "devops" "grafana" "Grafana Specialist"

# 6. MARKETING FUNCTION
echo "Setting up Marketing function..."
create_function_readme "marketing" "Marketing"

# Tier 1 - Marketing
create_persona_folder "tier1" "marketing" "mark" "Mark (Marketing Director)"

# Tier 2 - Marketing
create_persona_folder "tier2" "marketing" "digital" "Digital Marketing Manager"
create_persona_folder "tier2" "marketing" "content" "Content Marketing Manager"
create_persona_folder "tier2" "marketing" "analytics" "Analytics Manager"
create_persona_folder "tier2" "marketing" "seo" "SEO Manager"
create_persona_folder "tier2" "marketing" "social" "Social Media Manager"

# Tier 3 - Marketing
create_persona_folder "tier3" "marketing" "ana" "Ana (Analytics Specialist)"
create_persona_folder "tier3" "marketing" "seo" "SEO Specialist"
create_persona_folder "tier3" "marketing" "ppc" "PPC Specialist"
create_persona_folder "tier3" "marketing" "social" "Social Media Specialist"
create_persona_folder "tier3" "marketing" "content" "Content Creation Specialist"
create_persona_folder "tier3" "marketing" "email" "Email Marketing Specialist"
create_persona_folder "tier3" "marketing" "conversion" "Conversion Optimization Specialist"
create_persona_folder "tier3" "marketing" "brand" "Brand Marketing Specialist"
create_persona_folder "tier3" "marketing" "growth" "Growth Marketing Specialist"
create_persona_folder "tier3" "marketing" "affiliate" "Affiliate Marketing Specialist"

# 7. PRODUCT FUNCTION
echo "Setting up Product function..."
create_function_readme "product" "Product"

# Tier 1 - Product
create_persona_folder "tier1" "product" "prod" "Prod (Product Director)"

# Tier 2 - Product
create_persona_folder "tier2" "product" "manager" "Product Manager"
create_persona_folder "tier2" "product" "owner" "Product Owner"
create_persona_folder "tier2" "product" "strategy" "Product Strategist"
create_persona_folder "tier2" "product" "analytics" "Product Analytics Manager"
create_persona_folder "tier2" "product" "growth" "Product Growth Manager"

# Tier 3 - Product
create_persona_folder "tier3" "product" "research" "Product Research Specialist"
create_persona_folder "tier3" "product" "user" "User Research Specialist"
create_persona_folder "tier3" "product" "data" "Product Data Specialist"
create_persona_folder "tier3" "product" "metrics" "Product Metrics Specialist"
create_persona_folder "tier3" "product" "roadmap" "Product Roadmap Specialist"
create_persona_folder "tier3" "product" "backlog" "Product Backlog Specialist"
create_persona_folder "tier3" "product" "features" "Feature Management Specialist"
create_persona_folder "tier3" "product" "experiments" "Product Experiments Specialist"
create_persona_folder "tier3" "product" "feedback" "Product Feedback Specialist"
create_persona_folder "tier3" "product" "launch" "Product Launch Specialist"

# 8. SECURITY FUNCTION
echo "Setting up Security function..."
create_function_readme "security" "Security"

# Tier 1 - Security
create_persona_folder "tier1" "security" "sec" "Sec (Security Director)"

# Tier 2 - Security
create_persona_folder "tier2" "security" "appsec" "Application Security Engineer"
create_persona_folder "tier2" "security" "infrasec" "Infrastructure Security Engineer"
create_persona_folder "tier2" "security" "compliance" "Compliance Engineer"
create_persona_folder "tier2" "security" "threat" "Threat Intelligence Engineer"
create_persona_folder "tier2" "security" "incident" "Incident Response Engineer"

# Tier 3 - Security
create_persona_folder "tier3" "security" "penetration" "Penetration Testing Specialist"
create_persona_folder "tier3" "security" "vulnerability" "Vulnerability Assessment Specialist"
create_persona_folder "tier3" "security" "code" "Secure Code Review Specialist"
create_persona_folder "tier3" "security" "network" "Network Security Specialist"
create_persona_folder "tier3" "security" "cloud" "Cloud Security Specialist"
create_persona_folder "tier3" "security" "identity" "Identity & Access Management Specialist"
create_persona_folder "tier3" "security" "encryption" "Encryption Specialist"
create_persona_folder "tier3" "security" "compliance" "Compliance Specialist"
create_persona_folder "tier3" "security" "forensics" "Digital Forensics Specialist"
create_persona_folder "tier3" "security" "monitoring" "Security Monitoring Specialist"

# 9. PERFORMANCE FUNCTION
echo "Setting up Performance function..."
create_function_readme "performance" "Performance"

# Tier 1 - Performance
create_persona_folder "tier1" "performance" "perf" "Perf (Performance Director)"

# Tier 2 - Performance
create_persona_folder "tier2" "performance" "frontend" "Frontend Performance Engineer"
create_persona_folder "tier2" "performance" "backend" "Backend Performance Engineer"
create_persona_folder "tier2" "performance" "database" "Database Performance Engineer"
create_persona_folder "tier2" "performance" "infrastructure" "Infrastructure Performance Engineer"
create_persona_folder "tier2" "performance" "monitoring" "Performance Monitoring Engineer"

# Tier 3 - Performance
create_persona_folder "tier3" "performance" "web" "Web Performance Specialist"
create_persona_folder "tier3" "performance" "mobile" "Mobile Performance Specialist"
create_persona_folder "tier3" "performance" "api" "API Performance Specialist"
create_persona_folder "tier3" "performance" "database" "Database Performance Specialist"
create_persona_folder "tier3" "performance" "caching" "Caching Specialist"
create_persona_folder "tier3" "performance" "cdn" "CDN Specialist"
create_persona_folder "tier3" "performance" "optimization" "Optimization Specialist"
create_persona_folder "tier3" "performance" "profiling" "Profiling Specialist"
create_persona_folder "tier3" "performance" "load" "Load Testing Specialist"
create_persona_folder "tier3" "performance" "monitoring" "Performance Monitoring Specialist"

# Create main personas README
cat > "personas/README.md" << EOF
# Personas Directory

## 🎭 **Persona-Based Development Framework**

This directory contains all personas organized by function and tier structure for the learner10x.com platform.

## 🏗️ **Structure Overview**

### Functions (9 Total)
1. **Development** - Technical implementation and coding
2. **Design** - User experience and visual design
3. **Testing** - Quality assurance and testing
4. **Architecture** - System design and structure
5. **DevOps** - Operations and infrastructure
6. **Marketing** - Promotion and analytics
7. **Product** - Product management and strategy
8. **Security** - Security and compliance
9. **Performance** - Performance optimization

### Tiers (3 Levels)
- **Tier 1**: Strategic Leadership (Directors)
- **Tier 2**: Operational Management (Managers/Engineers)
- **Tier 3**: Specialized Execution (Specialists)

## 📊 **Persona Count**
- **Total Functions**: 9
- **Total Tiers**: 3
- **Total Personas**: 105+
- **Tier 1 Personas**: 9 (1 per function)
- **Tier 2 Personas**: 45 (5 per function)
- **Tier 3 Personas**: 51+ (specialized roles)

## 🎯 **Usage**

Each persona folder contains:
- \`README.md\` - Persona overview and responsibilities
- Progress tracking and current focus
- Skills and expertise areas
- Notes and observations

## 📝 **Maintenance**

- Update persona READMEs regularly
- Track progress and achievements
- Document role evolution
- Maintain skill matrices

---
*Last updated: $(date +%Y-%m-%d)*
EOF

echo "✅ Complete persona folder structure created!"
echo "📁 Created 9 functions with 3 tiers each"
echo "👥 Total personas: 105+"
echo "📝 Each persona has a README.md with template"
echo ""
echo "🎯 Next steps:"
echo "1. Customize each persona's README.md"
echo "2. Add specific responsibilities and skills"
echo "3. Track progress and achievements"
echo "4. Update persona details as needed" 