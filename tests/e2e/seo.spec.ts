import { expect, test } from "@playwright/test";

test("sitemap lists all pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of ["/services", "/our-work", "/projects", "/towing", "/parts", "/about", "/contact"]) expect(xml).toContain(p);
});

test("pages have unique titles and JSON-LD", async ({ page }) => {
  await page.goto("/our-work");
  await expect(page).toHaveTitle("Our Work | Titan Autoworx");
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(ld!)["@type"]).toBe("AutoRepair");
});

test("og image renders", async ({ request }) => {
  const r = await request.get("/opengraph-image");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image/png");
});
