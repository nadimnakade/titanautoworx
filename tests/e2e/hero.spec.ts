import { expect, test } from "@playwright/test";

test("hero copy, CTAs and trust row", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText(/expert automotive/i);
  await expect(h1).toContainText(/care for every road\./i);
  const hero = page.getByTestId("hero");
  await expect(hero.getByRole("link", { name: /request a quote/i })).toHaveAttribute("href", "/contact");
  await expect(hero.getByRole("link", { name: /chat on whatsapp/i })).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await expect(hero.getByTestId("trust-item")).toHaveCount(6);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("headline visible immediately, no canvas", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const op = await h1.evaluate((el) => {
      const words = el.querySelectorAll("[data-word]");
      return Math.min(...Array.from(words).map((w) => Number(getComputedStyle(w).opacity)));
    });
    expect(op).toBe(1);
    await expect(page.locator("[data-testid=hero] canvas")).toHaveCount(0);
  });
});

test.describe("no webgl", () => {
  test("falls back without canvas", async ({ page }) => {
    await page.addInitScript(() => {
      const orig = HTMLCanvasElement.prototype.getContext;
      // @ts-expect-error test stub
      HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
        if (/webgl/.test(type)) return null;
        return orig.call(this, type, ...rest);
      };
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator("[data-testid=hero] canvas")).toHaveCount(0);
    await expect(page.getByTestId("hero-fallback")).toBeVisible();
  });
});
