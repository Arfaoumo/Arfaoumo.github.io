# Mohamed Arfaoui — Portfolio

Spatial portfolio built with React, TypeScript, Vite and GSAP. Six destinations, four projects, French/English/Italian and Day/Night themes.

## Development

Requires Node.js 22 or newer supported LTS.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173.

## Production

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run preview
```

The production preview runs at http://127.0.0.1:4173.

## Updating content

- Replace `public/assets/CV_Mohamed_Arfaoui.pdf` to update the CV. Keep the filename unchanged.
- Edit `src/data/content.ts` for projects, translations, skills, education and contact details.
- Store images and video in `public/assets`.
- Zone layouts are in `src/zones/Zones.tsx`; styles are in `src/styles/global.css`.
- Camera coordinates and framing are in `src/hooks/spatial.ts`.

## Deployment

The GitHub Actions workflow deploys `dist` when changes are pushed to `main`. Select **GitHub Actions** in repository **Settings → Pages**. The Vite base `/` targets `arfaoumo.github.io`. Destination and project URLs use hash routes.
