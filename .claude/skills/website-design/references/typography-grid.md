# Typography & Grid Reference

All values live in `src/styles/tokens.css` (`@theme` + `:root`), `src/styles/utilities.css`, and `src/styles/base.css`. Never invent sizes or spacing — every decision maps to a token or named utility.

---

## Type Scale

**1.414 augmented fourth scale, base 17px.**
Adjacent Tailwind class pairs are aliased to the same step. Use the canonical class when writing new code; the alias exists for compatibility and naming coherence.

| Step | px | Canonical class | Alias(es) | Usage |
|---|---|---|---|---|
| −1 | 12px | `text-xs` | — | Timestamps, compliance, fine print |
| sm | 14px | `text-sm` | — | Footer nav, UI labels |
| 0 | 17px | `text-base` | `text-lg`, `text-emphasis` | Body copy, nav links, labels |
| +1 | 24px | `text-xl` | `text-2xl` | Feature headings, card titles, subtitles |
| +2 | 34px | `text-3xl` | `text-4xl` | Section headings, subsection headings |
| +3 | 48px | `text-5xl` | — | Page H1 (inner pages) |
| +4 | 68px | `text-6xl` | `text-7xl` | Use-case H1, large section headings |
| +5 | 96px | `text-8xl` / `text-headline` | — | Hero headline |
| +5½ | 120px | `text-headline-xl` | — | Hero H1 large (`@utility` in utilities.css) |
| +6 | 136px | `text-9xl` | — | H1 XL display (also `text-[136px]`) |

**Rule:** When writing new markup, always use the canonical class. Aliases exist but should not be introduced in new code.

---

## Font Families

| Token | Tailwind class | Font | When to use |
|---|---|---|---|
| `--font-display` | `font-display` | In Parallel Medium | Headings (H2–H4), nav, buttons, labels, eyebrows, UI |
| `--font-display-regular` | `font-display-regular` | In Parallel Regular | Body paragraphs, descriptions, prose |
| `--font-display-bold` | `font-display-bold` | In Parallel Bold | Stat callouts, bold inline emphasis in display text |
| `--font-display-black` | `font-display-black` | In Parallel Black | Extra-bold large impact headings (rare) |
| `--font-serif` | `font-serif` | Feature Deck Regular | Large editorial H1s, pull quotes, big statements |
| `--font-serif-light` | `font-serif-light` | Feature Deck Light | Lighter serif for subtitles or large body text |
| `--font-mono` | `font-mono` | Fragment Mono | Code, dev labels, technical/data displays |
| `--font-body` | `font-body` | In Parallel Regular | Set on `<body>` — do not set manually |

**Rule:** `font-display` is the workhorse for UI. `font-serif` is editorial — only for large feature headings where the type is the visual.

---

## Line-Height

Line-heights are baked into the token as paired values (`--text-*--line-height`) and as global CSS rules in `utilities.css`. You rarely need to set `leading-*` manually.

### Built-in paired values (from tokens.css)

| Size | Line-height | px equivalent | Notes |
|---|---|---|---|
| `text-3xl` / `text-4xl` | 1.1 | ~37px | Section headings, 1–2 lines |
| `text-5xl` | 1.0 | 48px | Page H1, tight |
| `text-6xl` / `text-7xl` | 0.95 | ~65px | Large display, tight |
| `text-8xl` | 0.95 | ~91px | Hero headline, tight |
| `text-9xl` | 0.9 | ~122px | XL display, very tight |

### Additional global rules (from utilities.css)

| Class | Line-height | Notes |
|---|---|---|
| `.text-2xl` | 28px (`leading-7`) | 7 × grid-step |
| `.text-3xl`, `.text-4xl` | 40px (`leading-10`) | 10 × grid-step |
| `.text-5xl` | 56px (`leading-14`) | 14 × grid-step |
| `.text-6xl`, `.text-7xl` | `line-height: 1` | Display-only, no extra leading |

### Body
`line-height: 1.412` — set on `<body>`, unitless, scales with user font preferences. Targets 24px at 17px base. Never set a different line-height on body copy — let it inherit.

### Override rule
Add `leading-*` only when a specific element needs to deviate. All values must be on the **4px grid** (multiples of `--grid-step: 0.25rem`):
`leading-6` (24px) · `leading-7` (28px) · `leading-8` (32px) · `leading-9` (36px) · `leading-10` (40px)

---

## Serif Optical Correction

**Feature Deck runs visually larger than In Parallel Medium at the same px value.** All `font-serif` sizes are automatically reduced by ×0.92 via compound CSS selectors in `utilities.css`. **Never adjust serif font-size in HTML** — the CSS handles it.

| Class | Sans px | Serif optical px |
|---|---|---|
| `text-xl` / `text-2xl` | 24px | 22px |
| `text-3xl` / `text-4xl` | 34px | 31px |
| `text-5xl` | 48px | 44px |
| `text-6xl` / `text-7xl` | 68px | 63px |
| `text-8xl` / `text-headline` | 96px | 88px |
| `text-headline-xl` | 120px | 110px |

---

## Heading Patterns

### Hero H1 (serif, homepage)
```html
<h1 class="font-serif text-5xl md:text-8xl lg:text-headline-xl leading-[0.95] tracking-tight">
```

### Page H1 (serif, inner pages)
```html
<h1 class="font-serif text-5xl md:text-8xl lg:text-headline leading-[0.95] tracking-tight">
```

### Page H1 (sans, inner pages)
```html
<h1 class="font-display text-6xl md:text-8xl leading-[1.0] md:leading-[0.95] tracking-tight">
```
Use `leading-[1.0]` at mobile (heading wraps), tighten to `[0.95]` at md+ where it fits on one line.

### Section H2
```html
<h2 class="font-display text-5xl md:text-6xl tracking-tight">
```

### Large H2 (with eyebrow above)
```html
<h2 class="font-display text-5xl md:text-6xl lg:text-8xl tracking-tight">
```

### Subsection H3
```html
<h3 class="font-display text-3xl md:text-5xl tracking-tight">
```

### Card / item title
```html
<h4 class="font-display text-xl">
```

---

## Text Details

### `<abbr>` elements
Render automatically with tracked small caps via `base.css`. No extra classes needed.
```html
<!-- Automatic: letter-spacing 0.1em + font-variant-caps: all-small-caps -->
<abbr title="Key Performance Indicators">KPI</abbr>
```

### Paragraph hyphenation
`hyphens: auto` is set on all `<p>` elements in `base.css`. Do not add `hyphens` manually.

---

## Grid System

### Baseline grid
`--grid-step: 0.25rem` (4px). All spacings and line-heights must be multiples of this value. Use Tailwind's spacing scale directly — every value is a multiple of 4px.

### Gutter tokens
Use these for `gap`, margins, and padding rather than arbitrary Tailwind values:

| Token | Value | Tailwind equiv | Use |
|---|---|---|---|
| `--grid-gutter-sm` | 16px | `gap-4` | Tight card arrays, micro-spacing |
| `--grid-gutter-md` | 24px | `gap-6` | Standard column gutter |
| `--grid-gutter-lg` | 64px | `gap-16` | Section-level spacing, sidebar gaps |

### Named grid types

**Manuscript** — centered 65ch reading column for long-form prose:
```html
<div class="grid-manuscript">
  <!-- All direct children are constrained to 65ch centered -->
  <p>Body text...</p>
</div>
```
Use for: insight articles, legal pages, vision documents.

**Sidebar** — narrow pane + wide main, stacks on mobile:
```html
<div class="grid-sidebar">
  <aside class="shrink-0 w-64"><!-- TOC / nav / form --></aside>
  <div class="flex-1"><!-- Main content --></div>
</div>
```
Use for: any two-pane layout. Replaces `flex flex-col lg:flex-row gap-12 lg:gap-16 items-start`.

**Column** — use Tailwind grid utilities directly:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
Gap must be `gap-4` (sm) or `gap-6` (md). Never `gap-8` or `gap-10` for standard column grids.

**Modular** — same as column grid but with equal-height cells via auto-fill rows:
```html
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
```

**Hierarchical** — page-section level, irregular, content-driven. No utility class. Defined per section.

---

## Bento Grid

Apple-style asymmetric modular grid. Cells snap to a shared fluid row unit.

### Container
```html
<div class="container-ip">
  <div class="grid-bento">
    <!-- cells here -->
  </div>
</div>
```
- 12 columns at lg (1024px+), 8 at md, 4 at sm
- Gap: `--grid-gutter-sm` (16px)
- Row unit: `--bento-row-height: clamp(64px, 8vw, 96px)`

### Cell sizing — use Tailwind span utilities directly
```html
<div class="bento-cell bento-cell--pad bento-cell--bottom col-span-6 row-span-4">
  <!-- hero stat -->
</div>
<div class="bento-cell bento-cell--pad col-span-3 row-span-2">
  <!-- feature -->
</div>
```

### Cell surface variants
| Modifier | Surface | Text | Use |
|---|---|---|---|
| (default) | `ip-navy-light` | white | Standard card |
| `bento-cell--surface` | `ip-navy-surface` | white | Alternate, darker |
| `bento-cell--lime` | `ip-lime` | navy | CTA, key stat highlight |
| `bento-cell--cyan` | cyan tint | white | Subtle accent |
| `bento-cell--glow` | navy-light + radial cyan glow | white | Feature with depth |
| `bento-cell--media` | no padding, overflow hidden | — | Full-bleed image/video |

### Cell helpers
| Modifier | Effect |
|---|---|
| `bento-cell--pad` | Adds 1.5rem inner padding (use on content cells; omit for media) |
| `bento-cell--center` | Flex, centers content horizontally and vertically |
| `bento-cell--bottom` | Flex, anchors content to bottom |
| `bento-cell--top` | Flex, anchors content to top |

### Typography inside bento cells
Cells use the standard type scale — no new sizes:
- Dominant stat: `font-display-bold text-5xl tracking-tight` or `font-display text-6xl`
- Feature headline: `font-display text-3xl tracking-tight`
- Serif pull quote: `font-serif text-3xl`
- Label/eyebrow: `font-display text-xs text-ip-white-muted uppercase tracking-widest`
- Caption: `text-sm` or `text-emphasis`

### Responsive spans
Add responsive prefixes to control collapse:
```html
<div class="bento-cell bento-cell--pad col-span-4 md:col-span-6 lg:col-span-4 row-span-2">
```

---

## Common Anti-patterns

| Wrong | Correct | Why |
|---|---|---|
| `font-serif text-4xl` (old) | `font-serif text-3xl` | text-4xl is now an alias — use canonical |
| `gap-8` in column grid | `gap-6` or `gap-4` | Gutter tokens only |
| `leading-[1.35]` arbitrary | `leading-7` (28px) or nearest grid value | Must be on 4px grid |
| `font-size: 21px` inline | `text-xl` (24px, step +1) | Snap to scale |
| Adjusting `font-serif` size in HTML | Never — optical correction is in CSS | CSS compound selectors handle it |
| `<p class="hyphens-auto">` | Nothing — set globally on `p` in base.css | Already applied |
| `bento-cell bento-cell--pad bento-cell--media` | `bento-cell bento-cell--media` | Media cells never have padding |
