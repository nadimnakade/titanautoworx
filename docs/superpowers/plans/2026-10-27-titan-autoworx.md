# Titan Autoworx Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 8-page Titan Autoworx marketing site from the mockup with a 3D/GSAP hero.

**Architecture:** Next.js App Router, static pages fed by one typed content file. Motion split by job: GSAP for hero/scroll timelines, Framer Motion for UI state, R3F scene lazy-loaded client-only. Pure logic (filters, links, form validation, slider math) lives in `src/lib` with Vitest tests; pages verified by Playwright smoke + screenshots.

**Tech Stack:** next, react, typescript, tailwindcss v4, framer-motion, gsap, lenis, three, @react-three/fiber, @react-three/drei, lucide-react, vitest, @playwright/test.

**Spec:** `docs/superpowers/specs/2026-10-27-titan-autoworx-design.md`

## Global Constraints

- Colors: bg #0A0A0B, surface #141416, surface-2 #1C1C1F, border #2A2A2E, text #F5F5F4, muted #A1A1AA, accent #FF5A1F, accent-hover #FF7A45.
- Headings Barlow Condensed 800 italic uppercase; body Barlow 400/500 (via `next/font/google`, self-hosted at build).
- Icons: lucide-react only, no emoji.
- Contact placeholders: +356 7774 2828, info@titanautoworx.mt, Malta — marked `// VERIFY` in content.
- All motion respects `prefers-reduced-motion`.
- Responsive at 375 / 768 / 1024 / 1440. Contrast ≥ 4.5:1. Visible focus.
- `npm run build`, `npm test`, `npm run e2e` must pass.

## Review Focus

- No WebGL (old phones, blocked GPU) → hero must still render text, CTAs and a styled background. Test: Task 4 e2e with WebGL disabled.
- Reduced motion on → no Lenis, no GSAP split animation, content visible immediately. Test: Task 4 e2e with `reducedMotion: 'reduce'` asserts headline visible at t=0.
- Missing photo files → `ImageSlot` shows placeholder, never a broken image. Test: Task 2 unit test on `hasImage`.
- Quote form with blank/invalid phone → inline errors, no WhatsApp open. Test: Task 2 `validateQuote`.
- Filter with a category that has zero items → "No items yet" message, not empty grid. Test: Task 2 `filterByCategory` + Task 6 render.

---

### Task 1: Scaffold, tokens, fonts, test harness

**Files:**
- Create: Next app at repo root (`create-next-app --ts --tailwind --app --src-dir --eslint --no-turbopack --import-alias "@/*"`)
- Create: `src/app/globals.css` (Tailwind v4 `@theme` with tokens above, `--font-display`, `--font-body`)
- Create: `src/app/layout.tsx` (fonts, metadata base, `<body className="bg-bg text-text font-body">`)
- Create: `vitest.config.ts`, `playwright.config.ts` (webServer `npm run build && npm start`, port 3100)
- Test: `tests/unit/smoke.test.ts`

- [ ] Step 1: Scaffold + install deps listed in Tech Stack.
- [ ] Step 2: Write tokens and fonts; add scripts `test` (vitest run), `e2e` (playwright test).
- [ ] Step 3: Trivial unit test `expect(1+1).toBe(2)`; run `npm test` → PASS; `npm run build` → success.
- [ ] Step 4: Commit `chore: scaffold next app with tokens and test harness`.

### Task 2: Content + pure logic

**Files:**
- Create: `src/content/site.ts`
- Create: `src/lib/filter.ts`, `src/lib/links.ts`, `src/lib/quote.ts`, `src/lib/slider.ts`, `src/lib/images.ts`
- Create: `scripts/gen-image-manifest.mjs` (runs `predev`/`prebuild`, writes `src/generated/images.json` = list of files in `public/images`)
- Test: `tests/unit/lib.test.ts`

**Interfaces (Produces):**
- `site: { name; phone; whatsapp; email; address; hours; socials; nav: {label;href}[]; trust: {icon;label}[]; services: Service[]; work: WorkItem[]; projects: Project[]; workCategories: string[]; projectCategories: string[]; towing: {...}; about: {...} }`
- `type Service = { slug; title; short; body; icon: string; image: string }`
- `type WorkItem = { title; subtitle; category; before: string; after: string }`
- `type Project = { title; subtitle; category; image: string }`
- `filterByCategory<T extends {category:string}>(items: T[], cat: string): T[]` — "All" returns all.
- `whatsappUrl(phone: string, text?: string): string` → `https://wa.me/<digits>?text=<encoded>`
- `telUrl(phone)`, `mailUrl(email, subject?, body?)`
- `validateQuote(input: QuoteInput): { ok: boolean; errors: Partial<Record<keyof QuoteInput,string>> }` — name required, phone ≥ 8 digits, service required.
- `quoteMessage(input: QuoteInput): string`
- `clampPercent(x: number): number` (0–100); `percentFromPointer(clientX, rectLeft, rectWidth): number`
- `hasImage(path: string): boolean` against manifest.

Content values copied from mockup: 7 services (Mechanical Repairs & Servicing, Bodywork & Accident Repairs, Spray Painting & Refinishing, Classic Car Restorations, Automotive Projects & Modifications, Towing Services & Vehicle Recovery, Automotive Parts & Components); work items (BMW 3 Series, Audi RS3, Mercedes C63, Ford Mustang, Porsche 911, Range Rover, plus Porsche 911 Bodywork & Paint, Ford Mustang Full Restoration); projects (VW T6 Camper Conversion, Land Rover Defender 110, Porsche 911 GT3, Classic Mini Cooper, BMW M3, Toyota Land Cruiser).

- [ ] Step 1: Write tests: `filterByCategory(items,'All').length === items.length`; filter returns only matches; unknown cat → `[]`; `whatsappUrl('+356 7774 2828','Hi')` === `'https://wa.me/35677742828?text=Hi'`; `validateQuote({name:'',phone:'12',service:''}).errors` has name, phone, service; valid input → `ok:true`; `clampPercent(-5)===0`, `clampPercent(140)===100`; `percentFromPointer(150,100,200)===25`; `hasImage('/images/nope.jpg')===false`.
- [ ] Step 2: `npm test` → FAIL (modules missing).
- [ ] Step 3: Implement lib files, content, manifest script.
- [ ] Step 4: `npm test` → PASS.
- [ ] Step 5: Commit `feat: content model and pure helpers`.

### Task 3: Layout shell + UI primitives

**Files:**
- Create: `src/components/ui/{Button,MagneticButton,SectionHeading,Reveal,ImageSlot,Logo}.tsx`
- Create: `src/components/layout/{Header,MobileMenu,Footer,MobileActionBar,SmoothScroll}.tsx`
- Modify: `src/app/layout.tsx` to mount Header, Footer, MobileActionBar, SmoothScroll
- Test: `tests/e2e/shell.spec.ts`

**Interfaces:**
- `Button({variant:'primary'|'outline', href?, onClick?, icon?, children})`
- `SectionHeading({eyebrow?, title, subtitle?, action?: {label;href}})`
- `Reveal({children, delay?, y?})` — Framer `whileInView`, once.
- `ImageSlot({src, alt, label, className, priority?})` — uses `hasImage`.
- `Logo({className})` — original SVG helmet glyph + "TITAN" / "AUTOWORX" (accent).
- Header: transparent until scrollY > 24 then `bg-bg/85 backdrop-blur`; active link accent; "Request a Quote" button. MobileMenu < lg.
- MobileActionBar: fixed bottom < md: Call / WhatsApp / Quote.
- SmoothScroll: Lenis, disabled on reduced motion, drives `ScrollTrigger.update`.

- [ ] Step 1: e2e: home has header nav with 7 links; at 375px menu button opens dialog with links; footer contains `info@titanautoworx.mt`; MobileActionBar visible at 375 and hidden at 1440.
- [ ] Step 2: Run → FAIL. Step 3: Implement. Step 4: Run → PASS.
- [ ] Step 5: Commit `feat: layout shell and UI primitives`.

### Task 4: Hero (3D + GSAP)

**Files:**
- Create: `src/components/hero/Hero.tsx` (client; copy, CTAs, trust row, GSAP timelines)
- Create: `src/components/hero/HeroScene.tsx` (R3F: reflective floor via `MeshReflectorMaterial`, 3 orange emissive light bars + rect lights, `Sparks` instanced points ~600 with upward drift, fog #0A0A0B, camera lerp to pointer, `frameloop` paused when not intersecting)
- Create: `src/components/hero/LightSweep.tsx` (CSS gradient bar, GSAP repeat every 8s)
- Create: `src/lib/webgl.ts` → `canUseWebGL(): boolean`
- Test: `tests/e2e/hero.spec.ts`

Behaviour: `HeroScene` loaded with `dynamic(..., {ssr:false})` only when `canUseWebGL()` and not reduced motion; else CSS fallback (radial orange glow + CSS embers). Optional `/images/hero.jpg` layered with `mix-blend-mode: lighten` + gradient mask. Headline words wrapped in spans; GSAP `from({yPercent:110, rotate:4, stagger:0.06})`. Scroll: content `y:-120, opacity:0` scrubbed over hero height.

- [ ] Step 1: e2e: h1 text contains "EXPERT AUTOMOTIVE" and "CARE FOR EVERY ROAD."; "Request a Quote" links to `/contact`; WhatsApp link starts `https://wa.me/`; 6 trust items; with `reducedMotion:'reduce'` h1 visible immediately (opacity 1); with `--disable-webgl` launch arg no `canvas` and h1 visible.
- [ ] Step 2: FAIL. Step 3: Implement. Step 4: PASS + screenshot `hero-1440.png`, `hero-375.png`, inspect visually.
- [ ] Step 5: Commit `feat: 3D hero with GSAP reveal and fallbacks`.

### Task 5: Home sections

**Files:**
- Create: `src/components/sections/{ServicesGrid,BeforeAfter,BeforeAfterCarousel,FeaturedProjects,TowingBand,CtaBand}.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/e2e/home.spec.ts`

**Interfaces:** `BeforeAfter({before, after, alt, labelBefore='BEFORE', labelAfter='AFTER'})` — role `slider`, `aria-valuenow`, arrow keys ±5, pointer drag uses `percentFromPointer`.

- [ ] Step 1: e2e: 7 service cards; BeforeAfter slider focus + ArrowRight ×2 → `aria-valuenow` 60 from 50; 4 featured projects; towing band has "Request Recovery".
- [ ] Step 2: FAIL. Step 3: Implement (services grid 4+3 desktop like mockup, list on mobile; GSAP stagger on scroll). Step 4: PASS + screenshots.
- [ ] Step 5: Commit `feat: home page sections`.

### Task 6: Inner pages

**Files:**
- Create: `src/app/{services,our-work,projects,towing,parts,about,contact}/page.tsx`
- Create: `src/components/sections/{PageHero,FilterTabs,WorkGrid,ProjectGrid,QuoteForm,StatCounters}.tsx`
- Test: `tests/e2e/pages.spec.ts`

**Interfaces:** `FilterTabs({options, value, onChange})` (role tablist); grids use `filterByCategory` + Framer `layout`/`AnimatePresence`; empty → "No items yet". `QuoteForm` uses `validateQuote`, on success `window.open(whatsappUrl(site.whatsapp, quoteMessage(v)))`.

- [ ] Step 1: e2e: each route returns 200 with own h1; `/our-work` click "Paint" filters to Paint items only; `/projects` "Camper Conversions" shows VW T6; `/contact` submit empty shows 3 errors and no popup; valid submit opens popup URL starting `https://wa.me/`.
- [ ] Step 2: FAIL. Step 3: Implement. Step 4: PASS + screenshots.
- [ ] Step 5: Commit `feat: inner pages`.

### Task 7: SEO, polish, verify, deliver

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, JSON-LD in layout
- Create: `README.md` (run steps, image filename list, `// VERIFY` contacts)

- [ ] Step 1: Per-page `metadata`; LocalBusiness JSON-LD.
- [ ] Step 2: Run `npm run build && npm test && npm run e2e` → all pass. Screenshots at 375/768/1440 for every page reviewed.
- [ ] Step 3: Commit `feat: seo and docs`; copy source (no node_modules/.next) to `D:\Jason\titan-autoworx`.
