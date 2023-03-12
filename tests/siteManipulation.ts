import { test, expect } from "@playwright/test";

test('Search feature', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Rechercher').click();
  await page.getByPlaceholder('Rechercher').fill('bli');
  await page.getByRole('link', { name: 'View Details' }).click();
});

test('test inexistant artwork', async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.goto("http://localhost:3000/");
  await page.goto('http://localhost:3000/artworks/54');
  await page.goto('http://localhost:3000/artworks/-54');
});
