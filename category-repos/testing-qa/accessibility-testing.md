# Accessibility Testing

## Overview

Accessibility testing ensures your application is usable by people with disabilities. This guide covers automated tools, manual testing approaches, and WCAG compliance strategies for building inclusive applications.

## Automated Accessibility Testing

### 1. Axe-Core Integration
```typescript
// tests/accessibility/axe.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('login form accessibility', async ({ page }) => {
    await page.goto('/login');
    
    // Test form in different states
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('#third-party-widget') // Exclude external widgets
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
    
    // Test with validation errors
    await page.fill('[data-testid="email"]', 'invalid-email');
    await page.click('[data-testid="submit"]');
    await page.waitForSelector('[data-testid="error-message"]');
    
    const errorStateScan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(errorStateScan.violations).toEqual([]);
  });

  test('dashboard with dynamic content', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Wait for async content to load
    await page.waitForSelector('[data-testid="dashboard-content"]');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

### 2. Jest-Axe for Component Testing
```typescript
// src/components/__tests__/Button.a11y.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  test('button is accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('disabled button is accessible', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('button with icon is accessible', async () => {
    const { container } = render(
      <Button>
        <span aria-hidden="true">🚀</span>
        Launch
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('button group is accessible', async () => {
    const { container } = render(
      <div role="group" aria-label="Action buttons">
        <Button>Save</Button>
        <Button>Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 3. Pa11y Integration
```javascript
// tests/accessibility/pa11y.test.js
const pa11y = require('pa11y');

const testUrls = [
  'http://localhost:3000/',
  'http://localhost:3000/login',
  'http://localhost:3000/dashboard',
  'http://localhost:3000/settings',
];

describe('Pa11y Accessibility Tests', () => {
  testUrls.forEach(url => {
    test(`accessibility test for ${url}`, async () => {
      const results = await pa11y(url, {
        standard: 'WCAG2AA',
        timeout: 30000,
        wait: 2000,
        chromeLaunchConfig: {
          executablePath: process.env.CHROME_PATH,
          args: ['--no-sandbox', '--disable-dev-shm-usage']
        },
        actions: [
          'wait for element [data-testid="main-content"] to be visible',
          'click element [data-testid="menu-toggle"]',
          'wait for 1000ms'
        ]
      });
      
      expect(results.issues).toHaveLength(0);
    }, 60000);
  });
});
```

## Manual Testing Approaches

### 1. Keyboard Navigation Testing
```typescript
// tests/accessibility/keyboard-navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test('tab navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Start from the top
    await page.keyboard.press('Tab');
    
    // Verify focus order
    const focusableElements = [
      '[data-testid="skip-link"]',
      '[data-testid="main-nav-home"]',
      '[data-testid="main-nav-about"]',
      '[data-testid="main-nav-contact"]',
      '[data-testid="cta-button"]',
    ];
    
    for (const selector of focusableElements) {
      const element = page.locator(selector);
      await expect(element).toBeFocused();
      await page.keyboard.press('Tab');
    }
  });

  test('skip link functionality', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="skip-link"]')).toBeFocused();
    
    // Activate skip link
    await page.keyboard.press('Enter');
    
    // Verify main content is focused
    await expect(page.locator('[data-testid="main-content"]')).toBeFocused();
  });

  test('modal keyboard interaction', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Open modal
    await page.click('[data-testid="open-modal"]');
    await page.waitForSelector('[data-testid="modal"]');
    
    // Verify focus is trapped in modal
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="modal-close"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="modal-confirm"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="modal-cancel"]')).toBeFocused();
    
    // Tab should cycle back to close button
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="modal-close"]')).toBeFocused();
    
    // Escape should close modal
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });
});
```

### 2. Screen Reader Testing
```typescript
// tests/accessibility/screen-reader.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Screen Reader Support', () => {
  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(h => h.evaluate(el => parseInt(el.tagName.substring(1))))
    );
    
    // Verify h1 exists and is first
    expect(headingLevels[0]).toBe(1);
    
    // Verify no heading levels are skipped
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test('images have appropriate alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      const role = await img.getAttribute('role');
      
      // Images should have alt text or be decorative
      if (ariaHidden !== 'true' && role !== 'presentation') {
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('form labels are properly associated', async ({ page }) => {
    await page.goto('/contact');
    
    const inputs = await page.locator('input, textarea, select').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      if (id) {
        // Check for associated label
        const label = await page.locator(`label[for="${id}"]`).count();
        expect(label > 0 || ariaLabel || ariaLabelledby).toBeTruthy();
      }
    }
  });

  test('live regions announce dynamic content', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for live regions
    const liveRegions = await page.locator('[aria-live]').all();
    expect(liveRegions.length).toBeGreaterThan(0);
    
    // Trigger dynamic content update
    await page.click('[data-testid="refresh-data"]');
    
    // Verify status message appears in live region
    await expect(page.locator('[aria-live="polite"]')).toContainText('Data refreshed');
  });
});
```

## Component Accessibility Patterns

### 1. Accessible Form Components
```typescript
// src/components/FormField.tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required, 
  children 
}) => {
  const fieldId = React.useId();
  const errorId = React.useId();
  
  const childWithProps = React.cloneElement(children, {
    id: fieldId,
    'aria-describedby': error ? errorId : undefined,
    'aria-invalid': error ? 'true' : 'false',
    required,
  });
  
  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-label">
        {label}
        {required && <span aria-label="required">*</span>}
      </label>
      
      {childWithProps}
      
      {error && (
        <div 
          id={errorId}
          className="form-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};

// Usage
<FormField 
  label="Email Address" 
  error={emailError} 
  required
>
  <input 
    type="email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>
```

### 2. Accessible Modal Component
```typescript
// src/components/Modal.tsx
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const titleId = React.useId();
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      // Save current focus
      const previousFocus = document.activeElement as HTMLElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Trap focus
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
```

## CI/CD Integration

### 1. GitHub Actions Configuration
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  accessibility-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Start application
      run: npm start &
      
    - name: Wait for app to be ready
      run: npx wait-on http://localhost:3000
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Run accessibility tests
      run: npx playwright test tests/accessibility/
    
    - name: Run Pa11y tests
      run: npm run test:pa11y
    
    - name: Upload accessibility reports
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: accessibility-reports
        path: |
          playwright-report/
          accessibility-reports/
        retention-days: 30

  lighthouse-ci:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.12.x
        lhci autorun
      env:
        LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 2. Lighthouse CI Configuration
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/login',
        'http://localhost:3000/dashboard',
      ],
      startServerCommand: 'npm start',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'github',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
```

## Accessibility Checklist

### 1. WCAG 2.1 AA Compliance
```markdown
## Perceivable
- [ ] Images have appropriate alt text
- [ ] Videos have captions and transcripts
- [ ] Color is not the only way to convey information
- [ ] Text has sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Text can be resized up to 200% without loss of functionality

## Operable
- [ ] All functionality is available via keyboard
- [ ] No content flashes more than 3 times per second
- [ ] Users have enough time to read content
- [ ] Navigation is consistent across pages
- [ ] Page has a proper heading structure

## Understandable
- [ ] Page language is identified
- [ ] Page has a descriptive title
- [ ] Labels and instructions are provided for form inputs
- [ ] Error messages are clear and helpful
- [ ] Content appears and operates in predictable ways

## Robust
- [ ] HTML is valid and semantic
- [ ] Content works with assistive technologies
- [ ] ARIA attributes are used correctly
- [ ] Focus management is handled properly
```

### 2. Testing Checklist
```typescript
// tests/accessibility/checklist.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Accessibility Checklist', () => {
  test('page structure accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link
    const skipLink = page.locator('[data-testid="skip-link"]');
    await expect(skipLink).toBeVisible();
    
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check page title
    await expect(page).toHaveTitle(/./);
    
    // Check language attribute
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang');
  });

  test('form accessibility', async ({ page }) => {
    await page.goto('/contact');
    
    // Check form labels
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
    
    // Check error handling
    const submitButton = page.locator('[type="submit"]');
    await submitButton.click();
    
    const errorMessages = page.locator('[role="alert"]');
    await expect(errorMessages).toHaveCount(1);
  });
});
```

This comprehensive accessibility testing strategy ensures your application meets WCAG guidelines and provides an inclusive experience for all users. 