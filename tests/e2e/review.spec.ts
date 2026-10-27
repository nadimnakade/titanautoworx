import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("fills the viewport after scrolling (C1)", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(600);
    await page.getByRole("button", { name: /open menu/i }).click();
    const box = (await page.getByRole("dialog").boundingBox())!;
    expect(box.height).toBeGreaterThan(800);
  });

  test("traps focus and restores it on close (I4)", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /open menu/i });
    await trigger.click();
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => !!document.activeElement?.closest("[role=dialog]"));
      expect(inside).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  });

  test("carousel has arrows on mobile (I5)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /next transformations/i })).toBeVisible();
  });
});

test.describe("reduced motion (C2)", () => {
  test.use({ reducedMotion: "reduce" });
  for (const path of ["/", "/services", "/about", "/our-work"]) {
    test(`${path}: nothing stuck invisible, no page errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(path);
      await page.waitForTimeout(800);
      const hidden = await page.evaluate(() =>
        Array.from(document.querySelectorAll("main *")).filter((el) => getComputedStyle(el).opacity === "0" && !el.closest("[aria-hidden=true]")).length,
      );
      expect(hidden).toBe(0);
      expect(errors).toEqual([]);
    });
  }
});

test("about stats are real numbers in server HTML (I1)", async ({ request }) => {
  const html = await (await request.get("/about")).text();
  expect(html).toContain("2,500");
  expect(html).not.toMatch(/>0<!-- -->\+/);
});

test("footer hides placeholder social links (I7)", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('footer a[href="https://facebook.com/"]')).toHaveCount(0);
});
