import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('Page Rendering', async ({ page }) => {

    await page.goto(process.env.HOME_PAGE_URL);

    await expect(page.getByRole('heading', { name: 'Lessons Countdown' })).toBeVisible();
    await expect(page.locator('.menu-button')).toBeVisible();

    await page.locator('.menu-button').click();

    await expect(page.locator('#aside.open')).toBeVisible();


    await expect(page.locator('div:has(#edit-mode):has-text("Edit mode")')).toBeVisible();
    await expect(page.locator('div:has(#dark-mode):has-text("Dark mode")')).toBeVisible();
    await expect(page.locator('div:has(#invert-colors):has-text("Invert colors on start")')).toBeVisible();

});

