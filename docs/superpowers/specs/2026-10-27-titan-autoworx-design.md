# Titan Autoworx Website — Design Spec

Date: 2026-10-27
Source of truth: user mockup (desktop home, Our Work, Our Projects, mobile home).

## Goal

Premium marketing site for Titan Autoworx, an automotive workshop in Malta
(repairs, bodywork, paint, classic restorations, modifications, towing, parts).
Success = looks and feels like a high-end agency build, matches the mockup,
drives quote requests and WhatsApp chats, fast on mobile.

## Stack

- Next.js (App Router) + TypeScript, static export friendly
- Tailwind CSS v4
- Framer Motion: hover, reveal, page transitions, mobile menu
- GSAP + ScrollTrigger: hero text reveal, scroll-pinned sections, counters
- Lenis: smooth scroll (disabled on reduced motion)
- three + @react-three/fiber + @react-three/drei: hero 3D scene, lazy-loaded
- lucide-react: icons (no emoji icons)

## Visual system (from mockup)

| Token | Value |
|---|---|
| bg | #0A0A0B |
| surface | #141416 |
| surface-2 | #1C1C1F |
| border | #2A2A2E |
| text | #F5F5F4 |
| muted | #A1A1AA |
| accent (orange) | #FF5A1F |
| accent-hover | #FF7A45 |

- Headings: Barlow Condensed 800 italic, uppercase, tight tracking.
  Second line of hero heading in accent.
- Body: Barlow 400/500.
- Eyebrow labels: small caps, accent, letterspaced.
- Buttons: solid accent (primary), outline accent (secondary), arrow icon.
- Cards: dark surface, 1px border, image top, icon + label + chevron row.
- Orange glow / light-sweep accents; garage-at-night mood.

## Hero (signature piece)

Layered, full viewport:

1. Three.js scene (R3F): dark garage — wet reflective floor
   (MeshReflectorMaterial), orange neon light bars, drifting ember/spark
   particles, light fog. Camera eases toward mouse (parallax).
2. Hero photo slot (`/images/hero.jpg`) blended over scene when present;
   scene alone looks finished when absent.
3. Orange light sweep passes across the frame on load and every ~8s.
4. Copy: eyebrow "Specialists in automotive care", headline
   "Expert automotive / care for every road." — GSAP split per word, masked rise.
5. CTAs: "Request a Quote" (primary), "Chat on WhatsApp" (outline);
   magnetic hover.
6. Trust row: 6 icons (Expert technicians, Quality workmanship, Genuine parts,
   Cars of all makes, Passion driven, Local business in Malta), staggered.
7. Scroll: hero content parallaxes up and fades; scene dims.

Fallbacks: no WebGL or reduced motion → static gradient + embers in CSS,
no camera motion. 3D chunk dynamically imported (ssr: false), paused when
off-screen.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, Services grid (7), Before/After carousel, Featured Projects, Towing band, CTA, Footer |
| `/services` | All services, each with detail block + CTA |
| `/our-work` | Filter tabs (All, Bodywork, Accident Repairs, Paint, Restorations) + before/after grid |
| `/projects` | Filter tabs (All, Performance Builds, Classic Restorations, Camper Conversions, Off-Road Builds) + project cards |
| `/towing` | Vehicle Recovery & Towing: 24/7, cars/vans/4x4, island coverage, insured; Request Recovery CTA |
| `/parts` | Automotive parts & components, enquiry CTA |
| `/about` | Story, values, stats counters |
| `/contact` | Quote form, WhatsApp, phone, email, address, map embed placeholder |

Shared: sticky header (transparent → solid on scroll), mobile slide-in menu,
footer (logo, blurb, quick links, services, get in touch, socials),
mobile sticky bottom bar (Call / WhatsApp / Quote).

## Components

- `BeforeAfter`: draggable split slider, keyboard (arrow keys) + touch.
- `FilterTabs` + animated grid (Framer `layout`, AnimatePresence).
- `ServiceCard`, `ProjectCard`, `SectionHeading`, `Button`, `MagneticButton`.
- `Reveal` wrapper for scroll-in animation.
- `ImageSlot`: renders photo if file exists in manifest, else branded
  placeholder (dark gradient, subtle grid, icon, label).

## Content

All copy, services, projects, before/after items, contact info in
`src/content/site.ts`. Images in `public/images/` with fixed names listed in
README. Phone/email/address use placeholders from mockup
(+356 7774 2828, info@titanautoworx.mt, Malta) clearly marked to verify.

## Images & logo

No real photos available in environment and stock sites unreachable.
Ship with `ImageSlot` placeholders; README lists every filename to drop in.
Logo: original SVG wordmark "TITAN / AUTOWORX" with simple helmet glyph.

## Forms

Quote form validates client-side, then opens WhatsApp with prefilled message
(primary) or mailto (fallback). No backend in v1.

## Quality bar

- Lighthouse mobile ≥ 90 perf on non-hero pages; hero 3D lazy.
- Contrast ≥ 4.5:1, visible focus, keyboard nav, alt text, reduced motion.
- Responsive at 375 / 768 / 1024 / 1440.
- SEO: per-page metadata, Open Graph, LocalBusiness JSON-LD.
- `npm run build` passes with no type errors; Playwright smoke screenshots.

## Out of scope (v1)

CMS, booking backend, real 3D car model (needs licensed asset), blog, i18n.
