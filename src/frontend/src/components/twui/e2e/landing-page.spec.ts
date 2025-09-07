import { test, expect } from '@playwright/test';

test.describe('TaleWeaver UI Landing Page', () => {
  test('should display the landing page with onboarding component', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForSelector('twui-app');
    await page.waitForSelector('twui-onboarding');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('TaleWeaver UI');
    
    // Verify the main components are present
    const app = page.locator('twui-app');
    await expect(app).toBeVisible();
    
    const onboarding = page.locator('twui-onboarding');
    await expect(onboarding).toBeVisible();
    
    // Take a screenshot of the full page
    await page.screenshot({ 
      path: 'e2e/screenshots/landing-page-full.png',
      fullPage: true 
    });
  });
  
  test('should display landing page on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForSelector('twui-app');
    await page.waitForSelector('twui-onboarding');
    
    // Verify components are still visible on mobile
    const app = page.locator('twui-app');
    await expect(app).toBeVisible();
    
    const onboarding = page.locator('twui-onboarding');
    await expect(onboarding).toBeVisible();
    
    // Take a mobile screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/landing-page-mobile.png',
      fullPage: true 
    });
  });
  
  test('should display landing page on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForSelector('twui-app');
    await page.waitForSelector('twui-onboarding');
    
    // Take a tablet screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/landing-page-tablet.png',
      fullPage: true 
    });
  });
});