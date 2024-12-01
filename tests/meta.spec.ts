import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle("Linked Out Admin Page");
});
