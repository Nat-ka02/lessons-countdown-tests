import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('Page Rendering', async ({ page }) => {

    await page.goto(process.env.HOME_PAGE_URL);

    await expect(page.getByRole('heading', { name: 'Lessons Countdown' })).toBeVisible();
    await expect(page.locator('.menu-button-container')).toBeVisible();

    await page.locator('.menu-button-container').click();

    await expect(page.locator('.open')).toBeVisible();

    await expect(page.locator('div:has-text("Edit mode")')).toBeVisible();
    await expect(page.locator('#edit-mode')).toBeVisible();
    await expect(page.locator('div:has-text("Dark mode")')).toBeVisible();
    await expect(page.locator('#dark-mode')).toBeVisible();
    await expect(page.locator('div:has-text("Invert colors on start")')).toBeVisible();
    await expect(page.locator('#invert-colors')).toBeVisible();

});