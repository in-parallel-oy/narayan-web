# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

In Parallel (www.in-parallel.com) marketing website. Astro 5 + Tailwind CSS 4 + Sanity CMS, deployed to Cloudflare Pages.

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

No linter or test runner is configured.

## Architecture

**Static site generation**: Astro builds all pages at build time. Sanity content is fetched via GROQ queries during the build, not at runtime.

**Page types**:
- Static marketing pages (`src/pages/*.astro`) — content lives directly in the Astro files
- CMS-driven listing + detail pages (`src/pages/insight/`, `src/pages/routines/`) — use `getStaticPaths()` to generate routes from Sanity data

**Sanity CMS integration**:
- `src/lib/sanity.ts` — shared Sanity client, `urlFor()` image helper, `toPlainText()` utility
- GROQ queries are written inline in page frontmatter (between `---` fences)
- Portable Text body content is rendered via `toHTML()` from `@portabletext/to-html`
- Sanity Studio is embedded at `/studio` via `@sanity/astro` integration (client-side React app)
- Schema definitions in `sanity/schema/` — content types: `insight` (blog posts), `routine` (templates), `author`
- Environment: `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in `.env`

**Layout**: `BaseLayout.astro` wraps all pages with `<Nav />`, `<main>`, `<Footer />`. It accepts `title`, `description`, and `ogImage` props.

**Styling**:
- Tailwind CSS 4 via Vite plugin (configured in `astro.config.mjs`, not a PostCSS plugin)
- Design tokens defined as `@theme` in `src/styles/global.css` — colors use `ip-` prefix (e.g., `ip-navy`, `ip-lime`)
- Custom utility classes in global.css: `container-ip` (1200px max-width container), `btn-lime`, `btn-outline`
- Custom fonts loaded from `public/fonts/`: "In Parallel" (display/body), "Feature Deck" (serif headings)
- Font family tokens: `font-display`, `font-display-regular`, `font-display-bold`, `font-serif`, `font-body`, `font-sans`
- Dark theme throughout — navy background, white text, lime accent

## Deployment

Push to `main` → Cloudflare Pages auto-builds and deploys. Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in Cloudflare Pages environment variables.
