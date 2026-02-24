---
description: Maintain and extend the In Parallel marketing website with design consistency. Use when adding sections, updating copy, tweaking styles, creating new pages, or modifying components.
---

# In Parallel Website Design Skill

You are maintaining and extending the In Parallel marketing website (www.in-parallel.com). This is an existing Astro 5 + Tailwind CSS 4 + Sanity CMS site deployed to Cloudflare Pages. Your job is to make changes that feel native to the existing design system. Every addition should look like it was always part of the site.

## Before Making Any Change

1. **Read the design tokens reference** at `references/design-tokens.md` in this skill folder. Never invent colors, fonts, or spacing values. Every visual decision must use an existing token.
2. **Read the component patterns reference** at `references/component-patterns.md`. Before building anything new, check whether an existing pattern already covers it or can be adapted.
3. **Read the page templates reference** at `references/page-templates.md` when creating new pages or major page sections.
4. **Read the actual source files** you plan to change. Understand the context of surrounding sections and components before editing.

## Architecture Quick Reference

| Concept | Location | Notes |
|---|---|---|
| Pages | `src/pages/*.astro` | File-based routing. Each file = one URL. |
| Components | `src/components/*.astro` | Reusable section-level building blocks. |
| Layout | `src/layouts/BaseLayout.astro` | Wraps every page: Nav + main + Footer. |
| Design tokens | `src/styles/global.css` | `@theme` block with all colors, fonts. |
| Utility classes | `src/styles/global.css` | `container-ip`, `btn-lime`, `btn-outline`. |
| Sanity client | `src/lib/sanity.ts` | `sanityClient`, `urlFor()`, `toPlainText()`. |
| Sanity schemas | `sanity/schema/*.ts` | Content types: insight, routine, author. |
| Static assets | `public/` | Fonts in `public/fonts/`, images in `public/images/`. |

## The Design System Rules

### Color
- Dark theme is the default. Most sections use `ip-navy` (#001325) or `ip-navy-light` (#142536) backgrounds.
- **Light-background sections exist.** Some homepage sections use white (`bg-white`) or periwinkle (`bg-ip-light-blue` / #b8cfff) backgrounds with dark text. When using a light background, text must switch to dark: headings use `text-ip-navy`, body uses `text-ip-navy/60` or `text-ip-navy/70`.
- Primary accent is `ip-lime` (#85ff3b) — used for CTAs, active states, category tags, and highlights.
- Body text on dark backgrounds is `ip-white-muted` (#c0c3c6), not pure white. Pure white is for headings and emphasis only.
- Borders are `ip-border` (#2e3b46). Featured/highlighted items use `ip-lime` borders.
- Card/container backgrounds use `ip-navy-surface` (#172733).
- Glow accents: `ip-cyan` (#30ddff) and `ip-blue` (#3049ff) are used in radial gradients (via `bg-ip-glow`).

### Effects
- `bg-ip-glow` — Radial cyan→blue gradient radiating upward, used behind hero and feature sections.
- `shadow-ip-card` — Subtle multi-layer card shadow for depth.
- `shadow-ip-glow` — Large lime-tinted glow halo for featured/highlighted elements.

### Typography
- Page H1 (hero): `font-serif text-5xl md:text-7xl lg:text-[110px]` — Feature Deck serif font (110px matches the live Framer site at 1920px)
- Section H2: `font-display text-4xl md:text-6xl tracking-tight` — In Parallel Medium
- Subsection H3: `font-display text-3xl md:text-4xl`
- Card titles: `font-display text-lg` or `font-display text-xl`
- Body text (dark bg): `text-ip-white-muted text-lg leading-relaxed`
- Body text (light bg): `text-ip-navy/60 text-lg leading-relaxed`
- Small/labels: `text-ip-white-muted text-sm` (dark bg) or `text-ip-navy/60 text-sm` (light bg)
- Eyebrow text (dark bg): `text-ip-white-muted text-base font-display`
- Eyebrow text (light bg): `text-ip-navy/60 text-base font-display`
- Eyebrow text (lime accent): `text-ip-lime text-base font-display`
- Category tags: `text-ip-lime text-xs font-display uppercase tracking-wider`

### Layout
- Container: always use `container-ip` (1240px max, centered, 1.5rem horizontal padding).
- Section padding: `py-20 md:py-32` (standard sections).
- Hero section: uses `min-h-screen` to fill the viewport, with `pt-40 pb-20 md:pt-56 lg:pt-64` for internal spacing.
- Text block max-width: `max-w-3xl` for readability.
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` (standard).
- Primary responsive breakpoint is `md:` (768px).

### Buttons
- **Primary** (`btn-lime`): Filled lime background, navy text. Hover: slight opacity. Use for main actions ("Join the waitlist").
- **Secondary** (`btn-outline`): Lime border, lime text, transparent bg. Hover: fills lime, text turns navy. Use for secondary actions ("Book a demo").

### Nav
- Header: transparent background, fixed, 80px height (`h-20`), full-width `px-8` padding (not `container-ip` — logo and CTA extend to viewport edges).
- Nav pill: centered via absolute positioning, `bg-white/5 border border-white/10 rounded-full`, links with `gap-[60px]`.
- CTA button: right-aligned, uses `btn-outline`.

### Interactive States
- Cards: `hover:border-ip-white-muted/30 transition-colors`
- Links: `text-ip-lime hover:underline` or `hover:text-white` for nav-style
- Buttons: `btn-lime` uses `hover:opacity-0.9`, `btn-outline` fills on hover
- All transitions: `transition-colors` with default 150ms

## Homepage Section Order

The homepage (`src/pages/index.astro`) sections are ordered to match the live Framer site (www.in-parallel.com). Background colors create visual rhythm through contrast changes:

| # | Component | Background | Text color | ID |
|---|---|---|---|---|
| 1 | HeroSection | navy + `bg-ip-glow`, `min-h-screen` | white/muted | — |
| 2 | ValuePropSection | `bg-ip-navy-light` | white/muted | `#product` |
| 3 | HowItWorksSection | `bg-white` + subtle blue radial gradient | `text-ip-navy` | `#how-it-works` |
| 4 | TrustSection | navy (default) | white/muted | — |
| 5 | WhitePapersSection | `bg-ip-light-blue` (#b8cfff) | `text-ip-navy` | — |
| 6 | IntegrationsSection | `bg-ip-navy-light` + `bg-ip-glow` | white/muted | `#integrations` |
| 7 | TeamSection | navy (default) | white/muted | — |

The hero product screenshot image sits outside the `<section>` tag (below it with `mt-4`) so `min-h-screen` fills the viewport without the image affecting section height.

## Visual Verification with Playwright

The project uses the **Playwright MCP server** for visual testing and comparison against the live Framer site. This is the recommended workflow for any visual changes:

### Setup
The Playwright MCP is configured in `.claude/settings.local.json`. It provides browser automation tools (`browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_evaluate`, etc.).

### Comparison Workflow
1. **Open both sites** — Navigate tab 0 to `http://localhost:4321` (dev server) and tab 1 to `https://www.in-parallel.com` (Framer).
2. **Set matching viewports** — Use `browser_resize` to test at key sizes: `1440x900` (standard laptop) and `1920x1080` (desktop).
3. **Take screenshots** — Use `browser_take_screenshot` on both tabs.
4. **Extract computed styles** — Use `browser_evaluate` to get exact font sizes, colors, and spacing from the Framer DOM when precision is needed.
5. **Clean up** — Delete any `.png` files created in the project root after comparison.

### When to Use Playwright
- After changing backgrounds, spacing, or typography
- When aligning with the live Framer site
- To verify responsive behavior at different viewport sizes
- To extract exact computed CSS values from the Framer site (font sizes, colors, etc.)

## How to Handle Common Requests

### "Add a new section to a page"
1. Create a new `.astro` component in `src/components/` with a name like `TestimonialsSection.astro`.
2. Follow the section pattern from `references/component-patterns.md`.
3. Import and place it in the page file at the correct position.
4. Choose background to maintain visual rhythm with adjacent sections. Use Playwright to verify.

### "Create a new page"
1. Create a new `.astro` file in `src/pages/`.
2. Follow a page template from `references/page-templates.md`.
3. Always include `export const prerender = true;` in frontmatter.
4. Always wrap in `<BaseLayout>` with appropriate `title` and `description` props.
5. If it should appear in navigation, update `src/components/Nav.astro` and/or `src/components/Footer.astro`.

### "Update text/copy on a page"
1. Read the current file to understand context.
2. Change only the text content, preserving all class names and HTML structure.
3. Keep the same tone: professional but approachable, concise, benefit-focused.

### "Change a style or visual treatment"
1. Check `references/design-tokens.md` for available values.
2. Never add inline styles. Use Tailwind utility classes with existing design tokens.
3. If a truly new token is needed (rare), add it to the `@theme` block in `src/styles/global.css` following the `ip-` naming convention.
4. Use Playwright to compare your changes against the live site.

### "Add a CMS-driven page"
1. Create a Sanity schema in `sanity/schema/` following existing patterns (`insight.ts` or `routine.ts`).
2. Register it in `sanity/schema/index.ts`.
3. Create listing page at `src/pages/{type}/index.astro` with GROQ query.
4. Create detail page at `src/pages/{type}/[...slug].astro` with `getStaticPaths()`.
5. Use `urlFor()` for images and `toHTML()` from `@portabletext/to-html` for body content.

## Post-Change Checklist

- [ ] Page builds without errors (`npm run build`)
- [ ] Responsive: check mobile (below 768px) and desktop views
- [ ] Visual comparison with live Framer site using Playwright (especially after layout/spacing/background changes)
- [ ] Section background colors follow the homepage section order table
- [ ] Light-background sections use dark text (`text-ip-navy`, `text-ip-navy/60`)
- [ ] New components follow naming: `PascalCaseSection.astro`
- [ ] Links and CTAs point to valid destinations
- [ ] If pages were added or removed, run `/update-llms`
- [ ] Images have alt text; links have descriptive text
- [ ] No temporary `.png` screenshot files left in project root

## Files to Edit with Caution

- `astro.config.mjs` — build configuration; changes can break deploys
- `sanity.config.ts` — Sanity Studio config; changes affect CMS
- `src/lib/sanity.ts` — shared client; changes affect all CMS pages
- `src/styles/global.css` — design tokens; changes cascade everywhere

## Brand Voice

- Professional but warm. Not corporate jargon, not casual.
- Benefit-focused: lead with what the user gains, not what the product does.
- Concise: short sentences, clear language. Avoid filler words.
- Confident but not boastful. Use specifics over superlatives.
- The product is an "intelligent management system" or "execution intelligence platform".
- The company is "In Parallel" (always capitalize both words, always two words).
