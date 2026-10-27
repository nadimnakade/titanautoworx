import { describe, expect, test } from "vitest";
import { filterByCategory } from "@/lib/filter";
import { whatsappUrl, telUrl, mailUrl } from "@/lib/links";
import { validateQuote, quoteMessage } from "@/lib/quote";
import { clampPercent, percentFromPointer } from "@/lib/slider";
import { hasImage } from "@/lib/images";
import { site } from "@/content/site";

const items = [
  { title: "a", category: "Paint" },
  { title: "b", category: "Bodywork" },
  { title: "c", category: "Paint" },
];

describe("filterByCategory", () => {
  test("All returns everything", () => expect(filterByCategory(items, "All")).toHaveLength(3));
  test("filters by category", () =>
    expect(filterByCategory(items, "Paint").map((i) => i.title)).toEqual(["a", "c"]));
  test("unknown category is empty", () => expect(filterByCategory(items, "Nope")).toEqual([]));
});

describe("links", () => {
  test("whatsappUrl strips non-digits and encodes text", () => {
    expect(whatsappUrl("+356 7774 2828", "Hi")).toBe("https://wa.me/35677742828?text=Hi");
    expect(whatsappUrl("+356 7774 2828")).toBe("https://wa.me/35677742828");
    expect(whatsappUrl("356", "a b&c")).toBe("https://wa.me/356?text=a%20b%26c");
  });
  test("telUrl", () => expect(telUrl("+356 7774 2828")).toBe("tel:+35677742828"));
  test("mailUrl", () =>
    expect(mailUrl("x@y.mt", "Quote", "Hi there")).toBe("mailto:x@y.mt?subject=Quote&body=Hi%20there"));
});

describe("quote", () => {
  test("reports all missing fields", () => {
    const r = validateQuote({ name: "", phone: "12", service: "", message: "" });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(["name", "phone", "service"]);
  });
  test("accepts valid input", () => {
    const r = validateQuote({ name: "Jo", phone: "+356 7774 2828", service: "Towing", message: "" });
    expect(r).toEqual({ ok: true, errors: {} });
  });
  test("whitespace-only name is invalid", () =>
    expect(validateQuote({ name: "   ", phone: "77742828", service: "x", message: "" }).errors.name).toBeTruthy());
  test("message includes fields", () => {
    const m = quoteMessage({ name: "Jo", phone: "77742828", service: "Towing", message: "Flat tyre", vehicle: "Golf" });
    expect(m).toContain("Jo");
    expect(m).toContain("Towing");
    expect(m).toContain("Golf");
    expect(m).toContain("Flat tyre");
  });
});

describe("slider", () => {
  test("clamps", () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(42)).toBe(42);
  });
  test("pointer to percent", () => expect(percentFromPointer(150, 100, 200)).toBe(25));
  test("zero width is safe", () => expect(percentFromPointer(150, 100, 0)).toBe(50));
});

describe("images", () => {
  test("missing file", () => expect(hasImage("/images/nope.jpg")).toBe(false));
});

describe("content", () => {
  test("seven services from mockup", () => expect(site.services).toHaveLength(7));
  test("every work category used exists in tabs", () => {
    for (const w of site.work) expect(site.workCategories).toContain(w.category);
    for (const p of site.projects) expect(site.projectCategories).toContain(p.category);
  });
  test("six trust items", () => expect(site.trust).toHaveLength(6));
});
