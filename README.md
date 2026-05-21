# Yeside Kazeem — Portfolio

Personal portfolio for **Yeside Kazeem FIA, FNAS** — entrepreneurial actuary, board director, and institution-builder operating across London and Africa.

Live: [yesidekazeem.com](https://yesidekazeem.com)

---

## Stack

| Tool | Purpose |
|------|---------|
| Next.js 16.2.4 (App Router) | Framework, routing, SSR metadata |
| GSAP + ScrollTrigger | Scroll-driven animations, parallax, entry sequences |
| Lenis | Smooth scroll (disabled automatically for `prefers-reduced-motion`) |
| Tailwind CSS v4 | Utility classes |
| TypeScript | Full type safety |
| Vercel | Deployment |

**Fonts:** Cormorant Garamond (`--font-cormorant`), Instrument Sans (`--font-dm`), IBM Plex Mono (`--font-mono`)

---

## Design Rules

- **No decorative lines or borders** — removed from all components
- **No cards, no shadows, no rounded boxes** — editorial typographic layout only
- **High contrast** — minimum opacity 0.65 on light bg, 0.68 on dark bg
- Scroll animations replay on every scroll-down (`toggleActions: "play none none reset"`)

---

## Project structure

```
app/
  page.tsx              — Homepage (Hero → StatsMarquee → OnTheRecord → Contact)
  journey/page.tsx      — Career timeline (12 stops, geographic colour map)
  layout.tsx            — Fonts, metadata, Navigation + SmoothScroll wrappers
  globals.css           — Type scale, hero photo CSS, hover styles, focus rings
  icon.jpg              — Favicon (seated burgundy portrait)

components/
  Hero.tsx              — Fixed photo panel (desktop), GSAP entry + scroll-shear
  StatsMarquee.tsx      — 20+ / 12+ / 8 stats on navy background
  OnTheRecord.tsx       — Featured editorial items + engagement list with type badge colours
  Contact.tsx           — Dark footer, three pillars, LinkedIn CTA, coordinates
  Navigation.tsx        — Wordmark left, JOURNEY + CONTACT right, no borders
  SmoothScroll.tsx      — Lenis wrapper

lib/
  gsap.ts               — Shared GSAP singleton (starts loading at module parse time)

data/
  journey.ts            — 12 career stops (year, org, role, city, bg colour)
  home.ts               — Shared constants (LINKEDIN URL)
```

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3458
```

Node binary: `/Users/macbook/jec-node/bin/node`
TypeScript check: `PATH="/Users/macbook/jec-node/bin:$PATH" node ./node_modules/.bin/tsc --noEmit`

---

## GSAP pattern (critical)

Every component using GSAP must follow this cleanup pattern exactly:

```ts
useEffect(() => {
  let ctx: { revert: () => void } | null = null;
  async function init() {
    const { gsap } = await getGsap();
    ctx = gsap.context(() => { /* animations */ }, ref);
  }
  init();
  return () => { ctx?.revert(); }; // outside init(), not inside
}, []);
```

The `return` must be outside `init()` — placing it inside means React never sees it.

---

## Content updates

All copy lives in `data/` — no need to touch page components for content changes:

- **Career timeline:** `data/journey.ts`
- **Homepage constants:** `data/home.ts`

---

## Accessibility

- `prefers-reduced-motion`: all CSS transitions suppressed, GSAP-hidden elements forced visible via `globals.css`
- `focus-visible`: keyboard users get a `#1B3A6B` outline; mouse users see none
- Dark backgrounds get a lighter focus ring (`rgba(255,255,255,0.8)`)
