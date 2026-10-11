# Isra's Digital Planet — 3D Portfolio

React + TypeScript + Vite + React Three Fiber (Three.js / Drei) + Framer Motion.
No backend. Contact uses a real `mailto:` link.

## Run it

```bash
npm install
npm run dev        # development
npm run build      # type-check + production build (outputs /dist)
npm run preview    # preview the production build
```

Requires Node 18+.

## ⚠️ Things you must fill in

1. **Email** → `src/config/site.ts` → `CONTACT_EMAIL`. It is empty on purpose: until you set it, the two
   contact buttons are disabled (nothing fake). Once set, they open the visitor's mail app with the subject
   "Let's Work Together — Isra Oun" and a short prefilled body.
2. **Repository links** → `src/config/site.ts` → each project's `source`. Leave `null` to hide "View source".
3. **Travel e-commerce** → add a `live` URL only if it is really deployed.
4. **Your anime character** → drop a PNG at `public/assets/character/hero-character.png`
   (transparent background, ~640×760, portrait). Until then the site shows a simple vector placeholder
   (`hero-character.svg`). **No AI image was generated for you** — that part is yours to supply.

## CV button

Put your CV at `public/cv/Isra-Oun-CV.pdf`. The "My CV" button checks that the file exists and is a PDF; until then it shows as disabled ("coming soon").
Email, WhatsApp and the CV path live in `src/config/site.ts`.

## Replace the placeholder artwork with your Readdy images

The design (layout, dark theme, typography, sections) is rebuilt in code. The *artwork* from Readdy cannot be
extracted from photos of a screen, so these slots use original 3D/SVG art until you drop in files
(first match wins, no code change needed):

- `public/assets/readdy/hero.jpg` — hero illustration (already included, from your upload); `hero-bg.jpg` — planet background (included)
- `public/assets/readdy/world.jpg` — "Welcome to my world" banner
- `public/assets/readdy/about.jpg` — About image (floating workshop)
- `public/assets/projects/portfolio.jpg`, `maison.jpg`, `foodly.jpg`, `travel.jpg` — project covers

The contact form builds a `mailto:` message; it stays disabled until `CONTACT_EMAIL` is set.
The hero stats show true figures (+30 projects, 6 live sites), not the invented numbers from the mockup.

## Honest status of this delivery

- The code was written **without being installed, built or run** (the build environment had no network access,
  so `npm install` was impossible). Run `npm install && npm run build` first; if the type-check or build reports
  an error, it should be small and local — send me the message and I'll fix it.
- 3D scenes are built from primitive shapes (no heavy models, no external textures/HDRIs), so they stay light.
- Project previews are original SVG illustrations, **not** screenshots of your sites. To use real screenshots,
  put images in `public/assets/projects/` and swap them into `src/components/Projects.tsx`.
- Fonts (Fraunces, Outfit) load from Google Fonts; the site falls back to system fonts offline.

## Structure

```
src/config/site.ts        links, email, projects (edit here)
src/components/           Hero, Skills, Projects, World (banner + robot), About, Contact, EasterEgg
src/components/*Scene.tsx  the 3D scenes: hero window + robot (lazy-loaded when scrolled near)
src/components/scene-parts.tsx  island, flower, gear, cloud building blocks
src/styles.css            design tokens and layout
```

## Accessibility & performance

Semantic landmarks, skip link, keyboard-operable flower buttons (the 3D flowers also have DOM buttons),
visible focus, `prefers-reduced-motion` (3D switches to on-demand rendering, CSS animation off),
lower pixel ratio and fewer particles on mobile, 3D mounted only when near the viewport.

## Easter egg

A tiny ✦ star in the hero (top right of the planet area). Click or press Enter; it cycles developer quotes.
