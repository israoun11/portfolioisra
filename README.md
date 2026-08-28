# Isra Oun — Developer Portfolio

An interactive, frontend-only developer portfolio built with React, TypeScript and Vite —
featuring a grounded AI assistant ("Ask Isra AI"), a live GitHub activity dashboard, and an
optional developer terminal.

*Live site:* https://portfolioisra-rho.vercel.app/
*GitHub:* https://github.com/israoun11

---

## Features

- *Hero, About, Skills, Projects (with tech filters), Learning Timeline, Certificates, Contact* — the core recruiter-facing sections.
- *Ask Isra AI* — a chat assistant that answers questions about Isra using only a structured knowledge base (src/data/portfolioData.ts). It never invents information. The AI provider call happens in a Vercel serverless function so the API key is never exposed to the browser.
- *Developer Activity dashboard* — live public data (repos, followers, following, recent activity) pulled from the real GitHub REST API client-side, with loading and error states and short-lived caching.
- *Interactive terminal* — an optional easter egg (help, about, projects, skills, github, contact, clear).
- *Dark / light / system theme*, persisted across visits.
- Fully responsive, keyboard-accessible, and built with prefers-reduced-motion support.

## Tech stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router · Vitest · React Testing
Library · ESLint · Prettier · GitHub Actions · Vercel (static hosting + one serverless function).

There is *no custom backend, Express server, or database* — this is a static site. The only
server-side code is a single Vercel Serverless Function (api/ask.ts) that proxies AI requests
so the API key stays private.

## Project structure


├── api/
│   └── ask.ts              # Serverless function powering Ask Isra AI (keeps the key private)
├── public/                 # Static assets, SEO files, project placeholder images
├── src/
│   ├── components/
│   │   ├── ai/              # Ask Isra AI chat UI
│   │   ├── github/           # GitHub live dashboard
│   │   ├── layout/            # Navbar, Footer, ThemeToggle
│   │   ├── sections/          # Hero, About, Projects, Skills, Timeline, Certificates, Contact
│   │   └── terminal/          # Optional developer terminal
│   ├── data/
│   │   └── portfolioData.ts   # Single source of truth: profile, skills, projects, AI knowledge base
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── services/
│   │   ├── ai.ts              # Client for /api/ask
│   │   └── github.ts          # GitHub REST API client with caching
│   ├── types/                 # Shared TypeScript types
│   ├── test/setup.ts           # Vitest + Testing Library setup
│   ├── App.tsx
│   └── main.tsx
├── .github/workflows/ci.yml   # Lint → test → build on every push/PR
├── .env.example
└── tailwind.config.js


## Installation

bash
git clone https://github.com/israoun11/<your-repo-name>.git
cd <your-repo-name>
npm install


## Environment variables

Only one variable is needed, and only for the AI assistant:

| Variable            | Where it's used | Where to set it |
|---------------------|------------------|------------------|
| ANTHROPIC_API_KEY | api/ask.ts (server-side only) | Vercel → Project Settings → Environment Variables |

Copy .env.example to .env.local for local development with vercel dev. *Never* commit a
real .env.local file or put the key in any client-side (src/) code — .env.local is already
git-ignored.

If the key isn't set, the rest of the site still works normally; only the AI assistant will show
a friendly "temporarily unavailable" message.

## Running locally

bash
npm run dev


Opens the site at http://localhost:5173. The AI assistant requires the serverless function, so
for full functionality use the Vercel CLI instead of plain Vite:

bash
npm install -g vercel
vercel dev


## Testing

bash
npm test          # run once
npm run test:watch


Tests cover: navigation, project filtering/rendering, AI assistant conversation states, GitHub
API loading/error states, theme switching, and contact links.

## Linting & formatting

bash
npm run lint
npm run format


## Build

bash
npm run build
npm run preview   # preview the production build locally


## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel (framework preset: *Vite*).
3. Add the ANTHROPIC_API_KEY environment variable in Vercel project settings.
4. Deploy — api/ask.ts is automatically picked up as a serverless function; no extra
   configuration is required.

## AI integration explained

src/data/portfolioData.ts exports buildAiKnowledgeBase(), a flattened text summary of Isra's
real profile, skills, projects, timeline and contact info. When a visitor sends a message:

1. The browser calls POST /api/ask with the conversation history (never the API key).
2. The serverless function builds a system prompt containing the knowledge base and an explicit
   instruction not to invent information, then calls the Anthropic API using the private
   ANTHROPIC_API_KEY.
3. The reply is returned to the browser and rendered in the chat UI.

This keeps the architecture frontend-first (no server you manage) while keeping the secret key
safe, and guarantees the assistant can't answer outside of what's actually true about Isra.

## GitHub API explained

src/services/github.ts calls the public, unauthenticated GitHub REST API
(api.github.com/users/israoun11 and .../repos) directly from the browser — no token needed
for public data. Responses are cached in sessionStorage for 10 minutes to avoid hitting GitHub's
anonymous rate limit, and the dashboard shows explicit loading and error states rather than stale
hardcoded numbers.

## What I learned building this

- Structuring a real-world app in *TypeScript* end-to-end, including typed API responses.
- Integrating an *AI API* safely from a frontend-only architecture, using a minimal serverless
  function instead of a full backend.
- Consuming a *REST API* (GitHub) with proper loading/error UX and client-side caching.
- Building deliberate, restrained motion design with *Framer Motion*.
- Writing meaningful component and hook tests with *Vitest* and *React Testing Library*.
- Setting up a *CI/CD* pipeline with *GitHub Actions* that fails the build on lint, test, or
  build errors.
- Practical *web accessibility*: semantic landmarks, visible focus states, ARIA live regions
  for the chat/terminal, and prefers-reduced-motion support.
- *Performance* habits: code-splitting vendor bundles, lazy-loaded images, and avoiding
  unnecessary re-renders.

## Notes / things to personalize before going live

- Replace the placeholder email in src/data/portfolioData.ts (links.email).
- Add a real CV file at public/isra-oun-cv.pdf (or update links.cvUrl).
- Replace the SVG project thumbnails in public/projects/ with real screenshots.
- public/og-image.svg is a lightweight placeholder — some social platforms prefer a real PNG/JPG
  for link previews; consider exporting one at 1200×630.
- Fill in real certificates in certificates (currently placeholders).
- Add your third project's real details in place of the placeholder entry in projects.