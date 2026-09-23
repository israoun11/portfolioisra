# Isra Oun — Portfolio

A React + Vite portfolio built around one original 3D symbol — the
**Blooming Code Sculpture**: a procedural flower-like form, invented for
this site, that starts as a closed bud in the hero and opens, separates
into a "skill garden," scatters into a project gallery, and returns to a
full bloom by the end of the page — all driven by scroll and a GSAP
ScrollTrigger camera that moves through the scene section by section.

Stack: React, Vite, JavaScript, Tailwind CSS, Three.js, React Three
Fiber, Drei, GSAP (ScrollTrigger), Framer Motion, Axios.

---

## 1. Install

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Production build

```bash
npm run build
npm run preview   # serve the built dist/ locally to sanity-check it
```

## 4. Replace the CV

The download/preview button reads from **`public/cv.pdf`**. To update it,
just replace that file with your new PDF, keeping the exact same name:

```bash
cp /path/to/new-cv.pdf public/cv.pdf
```

Nothing in the code needs to change — the CV section (`src/sections/CV.jsx`)
always points at `/cv.pdf`.

A placeholder `cv.pdf` is included so the download button and preview work
out of the box; **replace it with the real CV before publishing.**

## 5. How the GitHub integration works

`src/hooks/useGithubRepos.js` calls the public GitHub REST API directly
from the browser:

```
GET https://api.github.com/users/israoun11/repos?per_page=100&sort=updated
```

This endpoint is public and needs no token, so **there is no secret to
protect** — nothing is exposed because nothing is used. New public
repositories you push to GitHub show up in the "digital constellation"
(`src/sections/Constellation.jsx`, desktop) or the simple list (mobile)
automatically on the next visit; nothing needs to be edited by hand.

Results are cached in `localStorage` for 30 minutes so repeat visits
don't hit GitHub's unauthenticated rate limit (60 requests/hour per IP).
If a request fails, the site falls back to the last cached data, and
if there's no cache at all, it shows a friendly message linking
straight to your GitHub profile instead of breaking.

**Optional — higher rate limit:** if you later want more headroom, add a
Vercel serverless function (`/api/github.js`) holding a `GITHUB_TOKEN` in
a Vercel environment variable, proxying the request server-side, then
point `useGithubRepos.js` at `/api/github` instead. This keeps any token
out of the frontend bundle. Not required for the site to work today.

## 6. How to add or change featured projects

Featured projects (the large, hand-curated gallery in "Projects") are
defined in **`src/data/projects.js`**:

```js
export const featuredProjects = [
  {
    repo: 'Foodly',          // must match the GitHub repo name
    name: 'Foodly',
    tagline: 'A short line under the title',
    description: 'A few sentences about the project.',
    tech: ['React', 'Vite', '...'],
    live: 'https://your-live-url.vercel.app/',
    github: 'https://github.com/israoun11/Foodly',
    accent: 'burgundy', // burgundy | gold | rose | charcoal
  },
  // add more objects here
]
```

Add, remove, or reorder objects in this array to change what's featured
and in what order it appears. Everything else you push to GitHub still
appears automatically in the live constellation below it.

## 7. Deploy to Vercel

Static Vite build, no special configuration needed:

1. Push this project to a GitHub repository.
2. In Vercel, "Add New Project" → import that repository.
3. Framework preset: **Vite** (auto-detected). Build command
   `npm run build`, output directory `dist` (both auto-detected).
4. Deploy.

**To keep the same URL as the current portfolio** (`portfolioisra-rho.vercel.app`):
either (a) connect this repo to the *existing* Vercel project instead of
creating a new one (simplest — no domain settings to touch), or (b)
deploy as a new project and reassign the domain from the old project's
Settings → Domains once you're happy with it.

## 8. Environment variables

**None are required.** `npm install && npm run dev` works out of the box.
The only optional addition is the `GITHUB_TOKEN` described in section 5.

## 9. Customize colors and content

- **Colors:** `tailwind.config.js` → `theme.extend.colors` — `cream`,
  `pearl`, `plum`/`charcoal`, `blush`, `rose`, `lilac`, `lavender`,
  `peach`, `champagne`, `burgundy`, `wine`, `gold`. Change the hex values
  there and they update everywhere, including the 3D sculpture's petal
  palette (`src/three/bloomStages.js` → `PETAL_PALETTE`).
- **Fonts:** loaded in `index.html` (Fraunces for display/headings, Inter
  for body/UI).
- **Copy:** each section's text lives in its component under
  `src/sections/`. Skills, certifications, education and languages live
  in `src/data/` as plain arrays.
- **The sculpture's choreography:** the seven "stages" it moves through
  (bud → bloom → garden → gallery → archive → editorial → finale) are
  defined in `src/three/bloomStages.js`; petal shape/material lives in
  `src/three/petalGeometry.js` and `src/three/Petal.jsx`; the camera's
  cinematic path per section is in `src/three/CameraRig.jsx`.

## Project structure

```
src/
  components/   Nav, cursor, loader, scroll progress, shared UI bits
  sections/     Hero, About, Skills, Projects, Github, Constellation,
                Certifications, CV, Contact, Footer
  three/        The Blooming Code Sculpture: Core, Petal, Bubbles,
                Ribbons, CameraRig, choreography data
  hooks/        useGithubRepos, useIsMobile, useReducedMotion
  data/         Editable content: projects, skills, certifications
public/
  cv.pdf        Replace this file to update the CV (see section 4)
  favicon.svg, og-image.jpg
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: idle sculpture motion, pointer
  parallax, the camera's cinematic moves and the hero's GSAP parallax all
  switch off; scroll-linked petal choreography stays, since it only moves
  in direct response to the visitor's own scrolling.
- Petal count, bubble count, ribbons and canvas resolution all drop on
  narrower viewports; the GitHub constellation falls back to a simple
  list layout on mobile, where a ring layout would just be cramped.
- All petal instances share one procedural geometry (built once, reused
  many times) rather than each carrying its own — the sculpture stays
  cheap to render even with over a dozen petals plus bubbles and ribbons
  on screen.
- If WebGL fails to initialize for any reason, `SceneBoundary` removes
  the canvas quietly rather than breaking the rest of the page.
- Keyboard focus is visible on every interactive element; all images and
  icon-only controls carry accessible labels.

## A note on this build

This project was written by hand in an environment without package-registry
network access, so `npm install` / `npm run build` could not be executed
here to produce a live build log. Every file was syntax-checked individually
(via esbuild) and every relative import was verified to resolve — but please
run `npm install && npm run build` yourself as a final check before
deploying. Two things worth a look when you do:

1. The GSAP camera cinematics in `CameraRig.jsx` use one ScrollTrigger per
   section with fairly wide, slightly overlapping ranges; on some screens
   the camera move between two adjacent sections may feel a touch abrupt.
   If so, narrowing each `start`/`end` pair is the first thing to try.
2. `iridescence` on `meshPhysicalMaterial` requires three.js r157+ (this
   project pins `three@^0.169.0`, well past that), so it should render as
   intended, but it's a newer material feature worth eyeballing on first
   run.

