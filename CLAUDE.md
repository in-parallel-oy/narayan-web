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
- CSS is split into: `tokens.css` → `base.css` → `utilities.css` → `components.css` → `animations.css`, imported via `global.css`
- Design tokens in `src/styles/tokens.css` — all colors use `ip-` prefix (e.g., `ip-navy`, `ip-lime`)
- Custom utility classes in `utilities.css`: `container-ip` (1240px max-width), `text-headline`, `text-headline-xl`, `grid-manuscript`, `grid-sidebar`
- Custom component classes in `components.css`: `btn-primary` (lime filled), `btn-secondary` (lime outline), `section-eyebrow`
- Custom fonts loaded from `public/fonts/`: "In Parallel" (display/body), "Feature Deck" (serif headings)
- Font family tokens: `font-display`, `font-display-regular`, `font-display-bold`, `font-serif`, `font-body`, `font-sans`
- Mostly dark theme — navy background, white text, lime accent
- Some homepage sections use light backgrounds (white, periwinkle) with dark text — see `.claude/skills/website-design/references/design-tokens.md`

## Grid System

Named grid types (vocabulary from Müller-Brockmann / designlab.com/blog/grid-systems-history-ux-ui-layout). Use these names and patterns consistently.

### Gutter tokens (in `tokens.css`)
```
--grid-gutter-sm: 1rem    (16px = 4 × grid-step) — tight card arrays
--grid-gutter-md: 1.5rem  (24px = 6 × grid-step) — standard column gutter = 1 line-height
--grid-gutter-lg: 4rem    (64px = 16 × grid-step) — section gaps, sidebar spacing
```
**Preferred gap values**: `gap-4` (sm), `gap-6` (md), `gap-16` (lg). Avoid `gap-8`, `gap-10`, `gap-12` for column grids — these break gutter consistency. They're acceptable for one-off layout needs.

### Grid types

**Manuscript** — `.grid-manuscript`
Single centered reading column, ~65ch wide (Bringhurst's 45–75 char measure). Use on insight articles, legal pages, long-form prose. All direct children go into the center column.
```html
<div class="grid-manuscript">
  <article>...prose...</article>
</div>
```

**Column** — Tailwind `grid grid-cols-{n}` with `gap-6`
Vertical fields for content alignment. Standard counts: 2, 3, 4. Always use `gap-6` (--grid-gutter-md) unless the design specifically requires tighter or looser spacing. Goes inside `container-ip`.
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">...</div>
```

**Modular** — Tailwind `grid grid-cols-{n}` with uniform row height
Equal-cell card arrays where rows matter as much as columns. Use `gap-4` for tight arrays (small cards), `gap-6` for spacious ones. Same HTML pattern as Column; the distinction is semantic — every cell is equivalent.

**Sidebar** — `.grid-sidebar`
Asymmetric two-pane layout: narrow nav/TOC/form pane + wide main content. Stacks on mobile, side-by-side at `lg`. Replaces the repeated `flex flex-col lg:flex-row gap-12 lg:gap-16 items-start` pattern.
```html
<div class="grid-sidebar">
  <aside>...TOC / nav...</aside>
  <main>...content...</main>
</div>
```

**Hierarchical** — no utility class
Page-section level, irregular, content-driven. Each section defines its own layout. This is our default approach for marketing sections — not a constraint, just a name for what we're already doing.

### Rules
- Elements should start and end on column boundaries, not in gutters
- The container (`container-ip`) provides the outer margin; grid gutters provide inner spacing — don't confuse the two
- All gutters must be multiples of `--grid-step` (4px)

## Typography Principles

These rules are derived from Bringhurst's *Elements of Typographic Style* (via webtypography.net) and the Ginkuls baseline grid approach. Follow them when adding or changing any type styles.

### Type Scale
- **Ratio**: 1.414 augmented fourth, base 17px
- Steps: −1=12px · 0=17px · +1=24px · +2=34px · +3=48px · +4=68px · +5=96px · +6=120px
- Tokens are defined in `tokens.css` and override Tailwind's defaults (e.g. `--text-3xl: 2.125rem`)
- **Serif optical correction**: "Feature Deck" runs visually larger than "In Parallel" at the same px. All `font-serif` sizes get a ×0.92 multiplier via compound selectors in `utilities.css`.

### Baseline Grid
- **Grid step**: 4px (`--grid-step: 0.25rem` in `tokens.css`)
- **Rule**: every line-height must be a multiple of 4px. Check: `px value ÷ 4 = whole number`
- **Rule**: every spacing value (padding, margin, gap) should also be a multiple of 4px — Tailwind's default scale is base-4 so this is mostly automatic
- Font size can be any value; only line-height is constrained to the grid

### Line-Height Conventions
- **Body** (`base.css`): `line-height: 1.412` — unitless so it scales with user font-size preferences (Bringhurst §2.2.1). Targets 24px at our 17px base (6 × grid-step).
- **Components** (`components.css`): use absolute `rem` values so component heights are predictable:
  - `section-eyebrow` (24px font): `line-height: 2rem` (32px = 8 × grid-step)
  - `btn-primary` / `btn-secondary` (15px font): `line-height: 1rem` (16px = 4 × grid-step)
- **Display headings**: tight leading is intentional (e.g. `leading-[0.945]` on hero h1). These don't need to be on the grid — they're single-line display elements, not running text.
- **Never use `line-height: 1` or ratio-based values on components** where the height needs to be predictable (buttons, labels, eyebrows). Use absolute rem.

### Alignment & Spacing
- Always use `text-align: left` (ragged right) for body copy and sans-serif text. Never use `text-justify` (Bringhurst §2.1.3).
- For prose reading content, target ~65 characters per line — use `.grid-manuscript` or `max-w-[65ch]` on text columns (Bringhurst §2.1.2).
- Paragraph and heading margins ideally in multiples of the base line-height (24px): `mb-6` (24px) and `mb-12` (48px) are preferred over `mb-8` (32px) for prose rhythm.

### Abbreviations & Small Caps
- `<abbr>` elements receive `letter-spacing: 0.1em` and `font-variant-caps: all-small-caps` globally via `base.css` (Bringhurst §2.1.6, §3.2.2).
- Note: genuine small-cap glyphs depend on the font. If "In Parallel" doesn't include them, the browser will fake them (scaled-down caps). Check visually.

### Hyphenation
- `p { hyphens: auto }` is set globally in `base.css` (Bringhurst §2.4.1). This applies to all `<p>` elements — headings, nav, and buttons are unaffected since they don't use `<p>`.

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
