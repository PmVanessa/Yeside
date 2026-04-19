# Yeside Kazeem — Portfolio

Personal portfolio for **Yeside Kazeem FIA, FNAS** — entrepreneurial actuary, board director, and institution-builder operating across London and Africa.

Live: [yesidekazeem.com](https://yesidekazeem.com)

---

## Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework, routing, SSR metadata |
| GSAP + ScrollTrigger | Scroll-driven animations, clip-path reveals, parallax |
| Lenis | Smooth scroll (disabled automatically for `prefers-reduced-motion`) |
| Tailwind CSS v4 | Utility classes |
| TypeScript | Full type safety |
| Vercel | Deployment |

**Fonts:** Cormorant Garamond (editorial), DM Sans (body), Space Mono (monospace accents / coordinates)

---

## Project structure

```
app/
  page.tsx              — Homepage (Hero → ProofSection → WhatSheDoes → AfricaSection → Contact)
  about/                — Achievements page
  journey/              — Career timeline (10 stops, London → Pan-Africa)
components/
  Hero.tsx              — Full-viewport white editorial hero
  ProofSection.tsx      — IBW flyer clip-path reveal + copy
  WhatSheDoes.tsx       — 3 editorial pillars (Board / Speaking / Africa)
  AfricaSection.tsx     — GAIN Q&A image + Africa mission copy
  Contact.tsx           — Dark footer with columns + coordinates
  Navigation.tsx        — Adaptive nav (white on home, dark on inner pages)
  SmoothScroll.tsx      — Lenis wrapper

data/
  journey.ts            — 10 career stops (year, org, role, impact, logo)
  about.ts              — 5 achievements + credentials + stats strip
  home.ts               — Pillars, contact columns, shared constants (LINKEDIN, EMAIL)
```

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3458
```

---

## Content updates

All copy lives in `data/` — no need to touch page components for content changes:

- **Career timeline:** `data/journey.ts`
- **Achievements:** `data/about.ts`
- **Homepage pillars / contact columns:** `data/home.ts`

---

## Accessibility

- `prefers-reduced-motion`: Lenis disabled, all CSS transitions suppressed, GSAP-hidden elements forced visible
- `focus-visible`: keyboard users get a `#1B3A6B` outline; mouse users see none
- All CTAs are 12–13px minimum, bordered for clear tap targets
