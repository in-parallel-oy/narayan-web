# narayan-web

In Parallel marketing website — [www.in-parallel.com](https://www.in-parallel.com)

## Setup

```bash
npm install
```

Create a `.env` file:

```
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

## Development

```bash
npm run dev
```

Runs the Astro dev server at http://localhost:4321.

## Build & Preview

```bash
npm run build
npx wrangler pages dev dist
```

Builds the site and serves it locally via Cloudflare Pages emulator at http://localhost:8788.

## Deployment

Push to `main` — Cloudflare Pages auto-builds and deploys. Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in Cloudflare Pages environment variables.
