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
- Custom utility classes in global.css: `container-ip` (1240px max-width container), `btn-lime`, `btn-outline`
- Custom fonts loaded from `public/fonts/`: "In Parallel" (display/body), "Feature Deck" (serif headings)
- Font family tokens: `font-display`, `font-display-regular`, `font-display-bold`, `font-serif`, `font-body`, `font-sans`
- Mostly dark theme — navy background, white text, lime accent
- Some homepage sections use light backgrounds (white, periwinkle) with dark text — see `.claude/skills/website-design/references/design-tokens.md`

## Playwright MCP (Visual Testing)

A **Playwright MCP server** provides browser automation for visual testing. The MCP server is configured globally in Claude Code's MCP settings (not in this repo). Working artifacts are written to `.playwright-mcp/` (gitignored).

**Setup** (one-time, if not already configured):
1. Install the MCP server: `npx @anthropic/claude-code mcp add playwright -- npx @anthropic/claude-playwright-mcp`
2. If you see "browser not installed" errors, use the `browser_install` tool.
3. Playwright tool permissions are pre-allowed in `.claude/settings.local.json`.

**Key tools**: `browser_navigate`, `browser_resize`, `browser_take_screenshot`, `browser_snapshot`, `browser_evaluate`, `browser_click`, `browser_tabs`.

**Typical workflow**:
1. Start the dev server (`npm run dev`)
2. Open localhost:4321 in tab 0 and www.in-parallel.com in tab 1
3. Set matching viewports with `browser_resize` (test at 1440x900 and 1920x1080)
4. Take screenshots or use `browser_evaluate` to extract computed styles (font sizes, colors)
5. Clean up any `.png` files from the project root when done

## LLMs.txt

`public/llms.txt` and `public/llms-full.txt` are served at the site root for AI agents to understand the product. After making content changes (new pages, updated copy, added features), run `/update-llms` to regenerate both files.

## Before Every Commit

Before creating any git commit, always:

1. **Update `IA-HOME.md`** — if any homepage sections, copy, or structure changed
2. **Update `IA-SITEMAP.md`** — if any pages were added, removed, or renamed
3. **Update the task list** — mark completed tasks as done, add any new tasks discovered during the work

## Deployment

Push to `main` → Cloudflare Pages auto-builds and deploys. Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in Cloudflare Pages environment variables.
