import { test, expect } from '@playwright/test';

test.describe('TaleWeaver UI Quick Story Page', () => {
  test('should display the quick story page', async ({ page }) => {
    await page.goto('/quickstory.html');
    
    // Wait for the app to load
    await page.waitForSelector('twui-app');
    await page.waitForSelector('twui-quickstory');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('TaleWeaver UI');
    
    // Verify the main components are present
    const app = page.locator('twui-app');
    await expect(app).toBeVisible();
    
    const quickstory = page.locator('twui-quickstory');
    await expect(quickstory).toBeVisible();
    
    // Take a screenshot of the quick story page
    await page.screenshot({ 
      path: 'e2e/screenshots/quickstory-page-desktop.png',
      fullPage: true 
    });
  });
  
  test('should display quick story page on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/quickstory.html');
    
    // Wait for the app to load
    await page.waitForSelector('twui-app');
    await page.waitForSelector('twui-quickstory');
    
    // Take a mobile screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/quickstory-page-mobile.png',
      fullPage: true 
    });
  });
});