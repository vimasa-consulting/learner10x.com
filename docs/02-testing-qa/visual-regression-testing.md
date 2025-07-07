# Visual Regression Testing

## Overview

Visual regression testing ensures UI consistency by automatically detecting visual changes in your application. This guide covers tools, implementation strategies, and CI/CD integration for maintaining visual quality.

## Tools & Setup

### 1. Playwright Visual Testing
```typescript
// tests/visual/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual test', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Hide dynamic elements
    await page.locator('[data-testid="current-time"]').evaluate(el => el.style.visibility = 'hidden');
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('homepage.png');
  });

  test('login form visual test', async ({ page }) => {
    await page.goto('/login');
    
    // Test different states
    await expect(page).toHaveScreenshot('login-empty.png');
    
    // Fill form with validation errors
    await page.fill('[data-testid="email"]', 'invalid-email');
    await page.click('[data-testid="submit"]');
    await page.waitForSelector('[data-testid="error-message"]');
    
    await expect(page).toHaveScreenshot('login-validation-errors.png');
  });

  test('responsive design visual test', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('dashboard-tablet.png');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('dashboard-desktop.png');
  });
});
```

### 2. Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Configure for visual testing
  expect: {
    // Threshold for pixel difference
    threshold: 0.2,
    // Threshold for ratio of different pixels
    toHaveScreenshot: { threshold: 0.2 },
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Storybook Visual Testing
```javascript
// .storybook/test-runner.js
import { injectAxe, checkA11y } from 'axe-playwright';

module.exports = {
  async preRender(page, context) {
    await injectAxe(page);
  },
  
  async postRender(page, context) {
    // Accessibility testing
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
    
    // Visual regression testing
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler.innerHTML();
    
    // Hide dynamic content
    await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-testid*="time"], [data-testid*="random"]');
      elements.forEach(el => el.style.visibility = 'hidden');
    });
    
    // Take screenshot
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${context.title}.png`);
  },
};
```

```javascript
// stories/Button.stories.js
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    // Visual testing parameters
    chromatic: {
      viewports: [320, 1200],
      delay: 300,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
```

## Component Testing Strategies

### 1. React Testing Library with Visual Snapshots
```typescript
// src/components/__tests__/Button.visual.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Visual Tests', () => {
  test('renders all button variants', () => {
    const { container } = render(
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button sizes', () => {
    const { container } = render(
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button states', () => {
    const { container } = render(
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### 2. Percy Visual Testing Integration
```typescript
// tests/visual/percy.spec.ts
import { test } from '@playwright/test';

test.describe('Percy Visual Tests', () => {
  test('percy visual testing', async ({ page }) => {
    // Navigate to pages and take Percy snapshots
    const pages = [
      { name: 'Homepage', url: '/' },
      { name: 'Login', url: '/login' },
      { name: 'Dashboard', url: '/dashboard' },
      { name: 'Settings', url: '/settings' },
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      
      // Hide dynamic elements
      await page.evaluate(() => {
        const dynamicElements = document.querySelectorAll(
          '[data-testid*="time"], [data-testid*="date"], .loading-spinner'
        );
        dynamicElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.visibility = 'hidden';
          }
        });
      });
      
      // Take Percy snapshot
      await page.evaluate((name) => {
        // @ts-ignore
        if (window.percy) {
          // @ts-ignore
          window.percy.snapshot(name);
        }
      }, pageInfo.name);
    }
  });

  test('percy responsive testing', async ({ page }) => {
    await page.goto('/');
    
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1200, height: 800 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500); // Let responsive changes settle
      
      await page.evaluate((name) => {
        // @ts-ignore
        if (window.percy) {
          // @ts-ignore
          window.percy.snapshot(`Homepage - ${name}`);
        }
      }, viewport.name);
    }
  });
});
```

## Cross-Browser Testing

### 1. BrowserStack Integration
```javascript
// tests/cross-browser/browserstack.config.js
const capabilities = [
  {
    'bstack:options': {
      os: 'Windows',
      osVersion: '10',
      browserVersion: 'latest',
      local: 'false',
      seleniumVersion: '4.0.0',
    },
    browserName: 'Chrome',
  },
  {
    'bstack:options': {
      os: 'Windows',
      osVersion: '10',
      browserVersion: 'latest',
    },
    browserName: 'Firefox',
  },
  {
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Big Sur',
      browserVersion: 'latest',
    },
    browserName: 'Safari',
  },
  {
    'bstack:options': {
      osVersion: '14.0',
      deviceName: 'iPhone 12',
      realMobile: 'true',
    },
    browserName: 'safari',
  },
];

// tests/cross-browser/visual-cross-browser.spec.ts
import { test, expect } from '@playwright/test';

for (const capability of capabilities) {
  test.describe(`Visual tests on ${capability.browserName}`, () => {
    test.use({ 
      ...capability,
      baseURL: process.env.BROWSERSTACK_URL 
    });

    test('homepage renders correctly', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for comparison
      await expect(page).toHaveScreenshot(`homepage-${capability.browserName}.png`);
    });
  });
}
```

## CI/CD Integration

### 1. GitHub Actions Configuration
```yaml
# .github/workflows/visual-tests.yml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Run Playwright visual tests
      run: npx playwright test --project=chromium tests/visual/
      env:
        CI: true
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload screenshots
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: screenshots
        path: test-results/
        retention-days: 30

  percy-tests:
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
    
    - name: Percy Test
      run: npx percy exec -- npm run test:visual
      env:
        PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### 2. Automated Screenshot Updates
```javascript
// scripts/update-screenshots.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function updateScreenshots() {
  console.log('🔄 Updating visual regression test screenshots...');
  
  try {
    // Remove existing screenshots
    const testResultsDir = path.join(__dirname, '../test-results');
    if (fs.existsSync(testResultsDir)) {
      fs.rmSync(testResultsDir, { recursive: true });
    }
    
    // Run tests with --update-snapshots
    execSync('npx playwright test --update-snapshots tests/visual/', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('✅ Screenshots updated successfully!');
    console.log('📝 Please review the changes and commit the updated screenshots.');
    
  } catch (error) {
    console.error('❌ Failed to update screenshots:', error.message);
    process.exit(1);
  }
}

updateScreenshots();
```

## Best Practices

### 1. Stabilizing Tests
```typescript
// utils/test-helpers.ts
export class VisualTestHelpers {
  static async waitForAnimations(page: Page) {
    // Disable CSS animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  }

  static async hideDynamicContent(page: Page) {
    // Hide elements that change frequently
    const selectors = [
      '[data-testid*="time"]',
      '[data-testid*="date"]', 
      '[data-testid*="random"]',
      '.loading-spinner',
      '.toast-notification'
    ];
    
    for (const selector of selectors) {
      await page.locator(selector).evaluateAll(elements => {
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.visibility = 'hidden';
          }
        });
      });
    }
  }

  static async mockDynamicData(page: Page) {
    // Mock APIs that return dynamic data
    await page.route('**/api/current-time', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ time: '2024-01-01T12:00:00Z' })
      });
    });

    await page.route('**/api/random-content', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ content: 'Fixed content for testing' })
      });
    });
  }

  static async setFixedViewport(page: Page, device = 'desktop') {
    const viewports = {
      mobile: { width: 375, height: 667 },
      tablet: { width: 768, height: 1024 },
      desktop: { width: 1200, height: 800 }
    };
    
    await page.setViewportSize(viewports[device] || viewports.desktop);
  }
}
```

### 2. Test Organization
```typescript
// tests/visual/pages/homepage.visual.spec.ts
import { test, expect } from '@playwright/test';
import { VisualTestHelpers } from '../../utils/test-helpers';

test.describe('Homepage Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await VisualTestHelpers.waitForAnimations(page);
    await VisualTestHelpers.mockDynamicData(page);
  });

  test('homepage hero section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toHaveScreenshot('hero-section.png');
  });

  test('homepage features section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const featuresSection = page.locator('[data-testid="features-section"]');
    await expect(featuresSection).toHaveScreenshot('features-section.png');
  });

  test('homepage responsive design', async ({ page }) => {
    const devices = ['mobile', 'tablet', 'desktop'];
    
    for (const device of devices) {
      await VisualTestHelpers.setFixedViewport(page, device);
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot(`homepage-${device}.png`);
    }
  });
});
```

This comprehensive visual regression testing setup ensures consistent UI quality across different browsers, devices, and deployment environments while maintaining efficient CI/CD integration. 