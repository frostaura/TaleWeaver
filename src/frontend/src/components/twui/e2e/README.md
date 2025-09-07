# TaleWeaver UI E2E Testing

This directory contains Playwright end-to-end tests for the TaleWeaver UI components.

## Setup

The tests are configured to run against the local development server on `http://localhost:3333`.

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure the development server is running:
   ```bash
   npm start
   ```

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"
```

### Run specific test file
```bash
npx playwright test landing-page.spec.ts
npx playwright test quickstory-page.spec.ts
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

## Test Structure

- `landing-page.spec.ts` - Tests for the main landing page with onboarding component
- `quickstory-page.spec.ts` - Tests for the quick story page
- `screenshots/` - Directory containing captured screenshots from test runs

## Screenshots

Tests automatically capture screenshots for:
- Desktop viewport (1200x800)
- Mobile viewport (375x667) 
- Tablet viewport (768x1024)

Screenshots are saved in the `e2e/screenshots/` directory.

## Configuration

The Playwright configuration is in `playwright.config.ts` and includes:
- Chrome browser testing
- Mobile device emulation
- Automatic server startup
- Screenshot capture on test failure
- HTML reporting

## Pages Tested

Currently testing:
- `/` - Landing page with onboarding component
- `/quickstory.html` - Quick story creation page

Additional pages available for testing:
- `/customstory.html`
- `/parentallock.html`
- `/privacy.html`
- `/profile.html`
- `/settings.html`
- `/upgrade.html`