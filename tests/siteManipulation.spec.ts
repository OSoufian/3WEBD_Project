import { test, expect } from "@playwright/test";

test('Search feature', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Recherche avancée' }).click();
  await page.getByRole('checkbox').check();
  await page.getByPlaceholder('Rechercher').click();
  await page.getByPlaceholder('Rechercher').fill('blin');
  await page.getByRole('link', { name: 'View Details' }).click();
});

test('test inexistant artwork', async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.goto("http://localhost:3000/");
  await page.goto('http://localhost:3000/artworks/54');
  await page.goto('http://localhost:3000/artworks/-54');
});

test('Advanced search feature', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Recherche avancée' }).click();
  await page.getByRole('checkbox').check();
  await page.getByLabel('Artiste ou culture').click();
  await page.getByLabel('Artiste ou culture').fill('James');
});