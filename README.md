# Isra Oun | Portfolio

React + TypeScript + Vite.

## Run it

```bash
npm install
npm run dev
```

The site opens in your browser (usually http://localhost:5173).

## Good to know

- Needs Node.js 18 or newer.
- The fonts load from Google Fonts, so use an internet connection the first time.
- Photos are in `src/assets/` (`hero.webp` for the hero, `card.jpg` for the ID card, `creative.jpg` for the creative section). Replace the files, keep the names.
- Your CV is `public/Isra_Oun_CV_EN.pdf`. Replace it to update the download.
- Projects, skills, palettes and links live in `src/data.ts`.
- The "Pick your mood" section changes the accent colors of the whole page (see `src/components/Mood.tsx` and the `data-mood` rules at the end of `src/styles.css`).
- Colors and spacing live in `src/styles.css`.

## Build for deployment

```bash
npm run build
```

The `dist/` folder can be deployed on Vercel or Netlify.
