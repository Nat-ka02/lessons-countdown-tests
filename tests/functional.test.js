import { test, expect } from '@playwright/test';
import 'dotenv/config';

let sharedPage;

test.describe.serial('Countdown full flow', () => {

  test.beforeAll(async ({ browser }) => {

    sharedPage = await browser.newPage();
    await sharedPage.goto(process.env.HOME_PAGE_URL);

    const header = sharedPage.locator('.main-header:has-text("Lessons Countdown")');
    await header.locator('.menu-button').click();
    const leftPanel = sharedPage.locator('#aside.open');
    await leftPanel.locator('#edit-mode').check();
    await header.locator('.menu-button').click();
  });
  
  test('Adding new countdown', async () => {
    await sharedPage.locator('#dummy-event:has-text("Add new countdown")').click();

    const dialog = sharedPage.locator('#dialog:has-text("Add countdown")');
    await dialog.getByRole('textbox', { name: 'Name' }).fill('First');
    await dialog.getByRole('textbox', { name: 'Start date' }).fill('2026-01-12T10:00');
    await dialog.getByRole('textbox', { name: 'Duration' }).fill('10:00');

    const dialogColorOption = await dialog.locator('.dialog-color');
    await dialogColorOption.click();
    const colorList = await dialogColorOption.locator('.dialog-color-picker');
    await colorList.locator('.countdown-color-1').click();

    await dialog.locator('#dialog-repeating').check();
    await dialog.getByRole('button', { name: 'Add' }).click();
    await dialog.getByRole('button', { name: 'Close' }).click();

    const event = sharedPage.locator('#event-top-info-0:has-text("First")');
    await expect(event).toBeVisible();
  });

  test('Edit countdown', async () => {
    const icon = sharedPage.locator('#event-settings-button-0');
    await icon.click();

    const iconList = sharedPage.locator('#floating-menu-0');
    await iconList.locator('#floating-edit-0:has-text("Edit")').click();

    const dialog = sharedPage.locator('#dialog:has-text("Edit countdown")');
    await dialog.getByRole('textbox', { name: 'Name' }).fill('Edit');
    await dialog.getByRole('textbox', { name: 'Start date' }).fill('2026-03-20T15:00');
    await dialog.getByRole('textbox', { name: 'Duration' }).fill('05:00');

    const dialogColorOption = await dialog.locator('.dialog-color');
    await dialogColorOption.click();
    const colorList = await dialogColorOption.locator('.dialog-color-picker');
    await colorList.locator('.countdown-color-2').click();

    await dialog.locator('#dialog-repeating').check();
    await dialog.getByRole('button', { name: 'Edit' }).click();
    await dialog.getByRole('button', { name: 'Close' }).click();
  });

  test.afterAll(async () => {
    await sharedPage.close();
  });

  test('Adding new countdown - without data', async () => {
    await sharedPage.locator('#dummy-event:has-text("Add new countdown")').click();

    const dialog = sharedPage.locator('#dialog:has-text("Add countdown")');
    await dialog.getByRole('textbox', { name: 'Start date' }).clear();
    await dialog.getByRole('textbox', { name: 'Duration' }).clear();
    await dialog.getByRole('button', { name: 'Add' }).click();
  });
});