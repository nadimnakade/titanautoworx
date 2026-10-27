import { expect, test } from "@playwright/test";

const routes: [string, RegExp][] = [
  ["/services", /services/i],
  ["/our-work", /our work/i],
  ["/projects", /our projects/i],
  ["/towing", /recovery|towing/i],
  ["/parts", /parts/i],
  ["/about", /passion|about/i],
  ["/contact", /quote|touch|contact/i],
];

for (const [path, h1] of routes) {
  test(`${path} renders with its own h1`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
  });
}

test("services page has an anchor per service", async ({ page }) => {
  await page.goto("/services");
  for (const slug of ["mechanical", "bodywork", "paint", "classic", "projects", "towing", "parts"])
    await expect(page.locator(`#${slug}`)).toHaveCount(1);
});

test("our work filter: Paint shows only paint items", async ({ page }) => {
  await page.goto("/our-work");
  const items = page.getByTestId("work-item");
  await expect(items).toHaveCount(6);
  await page.getByRole("tab", { name: "Paint" }).click();
  await expect(page.getByRole("tab", { name: "Paint" })).toHaveAttribute("aria-selected", "true");
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText("Audi RS3");
});

test("projects filter: Camper Conversions shows VW T6", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("tab", { name: "Camper Conversions" }).click();
  const items = page.getByTestId("project-card");
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText("VW T6");
});

test("filter tabs support arrow keys", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("tab", { name: "All" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Performance Builds" })).toBeFocused();
  await expect(page.getByRole("tab", { name: "Performance Builds" })).toHaveAttribute("aria-selected", "true");
});

test.describe("contact form", () => {
  test("empty submit shows 3 errors and opens nothing", async ({ page }) => {
    await page.goto("/contact");
    let popup = false;
    page.on("popup", () => (popup = true));
    await page.getByRole("button", { name: /send via whatsapp/i }).click();
    await expect(page.locator("form").getByRole("alert")).toHaveCount(3);
    await expect(page.getByLabel(/name/i)).toBeFocused();
    expect(popup).toBe(false);
  });

  test("valid submit opens WhatsApp with message", async ({ page, context }) => {
    await context.route("https://wa.me/**", (r) => r.fulfill({ body: "ok" }));
    await page.goto("/contact");
    await page.getByLabel(/name/i).fill("Jo Borg");
    await page.getByLabel(/phone/i).fill("+356 7900 0000");
    await page.getByLabel(/service/i).selectOption({ label: "Towing Services & Vehicle Recovery" });
    await page.getByLabel(/vehicle/i).fill("VW Golf");
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("button", { name: /send via whatsapp/i }).click(),
    ]);
    await popup.waitForLoadState();
    const url = popup.url();
    expect(url).toMatch(/wa\.me\/35677742828/);
    expect(decodeURIComponent(url)).toContain("Jo Borg");
  });
});
