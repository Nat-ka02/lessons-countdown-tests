import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('Adding new countdown', async ({ page }) => {

    await page.goto(process.env.HOME_PAGE_URL);

    await page.locator('.menu-button').click();
    await page.locator('div #edit-mode').click();

    await expect(page.locator('#dummy-event, .dummy-event active')).toBeVisible();
    await page.locator('.dummy-event:has-text("Add new countdown")').click();

    await expect(page.getByRole('heading', { name: 'Add countdown' })).toBeVisible();

    await page.locator('label:has-text("Name") + input').fill("Nazwa 1234");

    await page.locator('#dialog-submit-button:has-text("Add")').click();

    await expect(page.locator('#event-header-1:has-text("Nazwa 1234")')).toBeVisible;

});