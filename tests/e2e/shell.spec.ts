import { expect, test } from "@playwright/test";

test("header has 7 nav links and quote CTA", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link")).toHaveCount(7);
  await expect(page.getByRole("banner").getByRole("link", { name: /request a quote/i })).toBeVisible();
});

test("footer shows contact email", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toContainText("info@titanautoworx.mt");
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("menu button opens dialog with links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Our Work" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("action bar visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("mobile-action-bar")).toBeVisible();
  });
});

test("action bar hidden on desktop", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("mobile-action-bar")).toBeHidden();
});
