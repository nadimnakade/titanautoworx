import { expect, test } from "@playwright/test";

test("services grid shows 7 services", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("service-card")).toHaveCount(7);
});

test("before/after slider responds to keyboard", async ({ page }) => {
  await page.goto("/");
  const slider = page.getByRole("slider").first();
  await slider.scrollIntoViewIfNeeded();
  await expect(slider).toHaveAttribute("aria-valuenow", "50");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "60");
  await page.keyboard.press("Home");
  await expect(slider).toHaveAttribute("aria-valuenow", "0");
});

test("before/after slider responds to drag", async ({ page }) => {
  await page.goto("/");
  const slider = page.getByRole("slider").first();
  await slider.scrollIntoViewIfNeeded();
  const box = (await slider.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 4 });
  await page.mouse.up();
  await expect(slider).toHaveAttribute("aria-valuenow", "25");
});

test("featured projects and towing band", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("featured-project")).toHaveCount(4);
  await expect(page.getByRole("link", { name: /request recovery/i })).toBeVisible();
});
