# Documentation Framework Makefile
.PHONY: help setup check-links check-docs validate lint clean update-toc

help: ## Show this help message
	@echo "Documentation Framework Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

setup: ## Set up documentation project
	@echo "Setting up documentation project..."
	@chmod +x setup-new-project.sh
	@chmod +x maintain-docs.sh
	@echo "Documentation framework ready!"

check-docs: ## Check documentation health
	@echo "Checking documentation health..."
	@./maintain-docs.sh

check-links: ## Check for broken internal links
	@echo "Checking for broken internal links..."
	@find docs -name "*.md" -type f -exec grep -l "](\./" {} \; | while read file; do \
		echo "Checking links in $$file..."; \
		grep -o "](\.\/[^)]*)" "$$file" | sed 's/](\.\///g' | sed 's/)$$//g' | while read link; do \
			if [ ! -e "$$link" ]; then \
				echo "  ❌ Broken link: $$link"; \
			fi; \
		done; \
	done || echo "✅ No broken internal links found"

validate: ## Validate markdown files
	@echo "Validating markdown files..."
	@find docs -name "*.md" -type f | wc -l | xargs echo "Total markdown files:"
	@find docs -name "*.md" -type f -exec wc -l {} \; | awk '{sum += $$1} END {print "Total lines of documentation:", sum}'

lint: ## Lint markdown files (if markdownlint is installed)
	@echo "Linting markdown files..."
	@if command -v markdownlint >/dev/null 2>&1; then \
		markdownlint docs/; \
	else \
		echo "markdownlint not installed. Install with: npm install -g markdownlint-cli"; \
	fi

update-toc: ## Update table of contents in README files
	@echo "Updating table of contents..."
	@find docs -name "README.md" -type f -exec echo "Updating TOC in: {}" \;

clean: ## Clean up temporary files
	@echo "Cleaning up temporary files..."
	@find . -name ".DS_Store" -delete
	@find . -name "*.tmp" -delete
	@find . -name "*.bak" -delete
	@echo "Cleanup complete!"

word-count: ## Count words in documentation
	@echo "Documentation word count:"
	@find docs -name "*.md" -type f -exec wc -w {} \; | awk '{sum += $$1} END {print "Total words:", sum}'

spell-check: ## Check spelling (if aspell is installed)
	@echo "Checking spelling..."
	@if command -v aspell >/dev/null 2>&1; then \
		find docs -name "*.md" -type f -exec aspell check {} \; ; \
	else \
		echo "aspell not installed. Install with: brew install aspell (macOS) or apt-get install aspell (Ubuntu)"; \
	fi

serve: ## Serve documentation locally (if Python is available)
	@echo "Starting local documentation server..."
	@if command -v python3 >/dev/null 2>&1; then \
		cd docs && python3 -m http.server 8080; \
	elif command -v python >/dev/null 2>&1; then \
		cd docs && python -m SimpleHTTPServer 8080; \
	else \
		echo "Python not available. Install Python to serve documentation locally."; \
	fi

status: ## Show documentation status
	@echo "Documentation Framework Status:"
	@echo ""
	@echo "📊 Statistics:"
	@find docs -name "*.md" -type f | wc -l | xargs echo "  Total markdown files:"
	@find docs -name "*.md" -type f -exec wc -l {} \; | awk '{sum += $$1} END {print "  Total lines:", sum}'
	@find docs -name "*.md" -type f -exec wc -w {} \; | awk '{sum += $$1} END {print "  Total words:", sum}'
	@echo ""
	@echo "📁 Documentation Structure:"
	@find docs -type d | sort
	@echo ""
	@echo "🔧 Available Tools:"
	@command -v markdownlint >/dev/null 2>&1 && echo "  ✅ markdownlint" || echo "  ❌ markdownlint (install with: npm install -g markdownlint-cli)"
	@command -v aspell >/dev/null 2>&1 && echo "  ✅ aspell" || echo "  ❌ aspell (install with package manager)"
	@command -v python3 >/dev/null 2>&1 && echo "  ✅ python3" || echo "  ❌ python3" 