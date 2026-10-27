# Titan Autoworx — Website

Next.js 16 · Tailwind 4 · Framer Motion · GSAP · Lenis · Three.js (React Three Fiber)

## Run it

Needs Node 20+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
```

Tests:

```bash
npm test                     # unit tests (Vitest)
npx playwright install chromium   # first time only
npm run build && npm run e2e # browser tests (Playwright)
```

## Edit content

All text, services, projects, before/after items, phone, email and hours live in
**`src/content/site.ts`**. Lines marked `// VERIFY` are placeholders copied from
the mockup — check them before going live (phone, email, address, domain, stats).

## Add your photos

Drop files into `public/images/` with these names (JPG, PNG, WebP or AVIF).
The site picks them up automatically on the next `npm run dev` / `npm run build`;
until then a branded placeholder shows. Use landscape photos, ~2000px wide.

| File | Where it shows |
|---|---|
| `images/hero.jpg` | Home hero (3D sparks render on top of it) |
| `images/services/mechanical.jpg` … `parts.jpg` | Service cards + Services page (`mechanical, bodywork, paint, classic, projects, towing, parts`) |
| `images/work/<name>-before.jpg` / `-after.jpg` | Before/after sliders (`porsche-911, mustang, bmw-3, audi-rs3, c63, range-rover`) |
| `images/projects/<name>.jpg` | Project cards (`vw-t6, defender-110, 911-gt3, mini-cooper, bmw-m3, land-cruiser`) |
| `images/towing.jpg` | Towing band + Towing page |
| `images/parts.jpg` | Parts page header |
| `images/about.jpg` | About page |

Different file name? Change the path in `src/content/site.ts`.

## Hero

`src/components/hero/` — a live 3D garage bay (reflective floor, neon bars,
rising embers, bloom) with an original neon wireframe coupe being scanned on a
turntable; camera follows the mouse. Text reveal and scroll parallax use GSAP.

- No hero photo → full 3D scene. With `hero.jpg` → photo + embers overlay.
- Reduced motion or no WebGL → lightweight CSS fallback, all content visible.
- 3D code loads lazily and pauses when off-screen.

## Quote form

Validates name, phone and service, then opens WhatsApp with a pre-filled
message (or email). No server needed. To use a backend later, replace the
submit handler in `src/components/sections/QuoteForm.tsx`.

## Deploy

Works on Vercel (import the folder, no settings needed) or any Node host
(`npm run build && npm start`). Set the real domain in `site.url` for SEO.
