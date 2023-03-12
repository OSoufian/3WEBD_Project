import { test, expect } from "@playwright/test";

test("Normal behavior", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Rechercher").click();
  await page.getByPlaceholder("Rechercher").fill("blin");
  await page
    .getByText("Blind Orion Searching for the Rising SunView Details1")
    .click();
  await page.getByPlaceholder("Rechercher").click();
  await page.getByRole("link", { name: "View Details" }).click();
  await page
    .getByRole("link", { name: "Wikipedia link for more details" })
    .click();
});

test('test pagination', async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.goto("http://localhost:3000/");
  await page.locator('#root div').filter({ hasText: 'Mandala of the Sun God SuryaView DetailsBlind Orion Searching for the Rising Sun' }).nth(3).click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.locator('div').filter({ hasText: 'Sunset on the SeaView Details' }).getByRole('link', { name: 'View Details' }).click();
  await page.locator('#ArtworkDetails_mainContainer__5nvuK').getByRole('link', { name: 'Accueil' }).click();
});

test('test inexistant artwork', async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.goto("http://localhost:3000/");
  await page.goto('http://localhost:3000/artworks/54');
});
