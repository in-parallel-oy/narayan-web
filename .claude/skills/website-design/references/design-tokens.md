# Design Tokens Reference

All tokens are defined in `src/styles/global.css` inside the `@theme` block. Use these exact Tailwind class names. Do not invent new values.

## Colors

### Backgrounds
| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| ip-navy | #001325 | `bg-ip-navy` | Primary page background |
| ip-navy-light | #142536 | `bg-ip-navy-light` | Alternate section backgrounds, footer |
| ip-navy-surface | #172733 | `bg-ip-navy-surface` | Cards, containers, form inputs |

### Text
| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| ip-white | #ffffff | `text-white` | Headings, emphasis, bold inline text |
| ip-white-muted | #c0c3c6 | `text-ip-white-muted` | Body text, descriptions, labels |

### Accent Colors
| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| ip-lime | #85ff3b | `text-ip-lime` / `bg-ip-lime` / `border-ip-lime` | Primary CTA, active states, category tags, featured borders |
| ip-lime-light | #befb99 | `text-ip-lime-light` | Light accent variation (sparingly) |
| ip-yellow | #ffcc25 | `text-ip-yellow` | Secondary accent |
| ip-orange | #ff5f43 | `text-ip-orange` | Warning/attention accent |
| ip-cyan | #30ddff | `text-ip-cyan` / `bg-ip-cyan` | Glow gradients, hero accents |
| ip-blue | #3049ff | `text-ip-blue` / `bg-ip-blue` | Glow gradients, secondary accent |

### Borders
| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| ip-border | #2e3b46 | `border-ip-border` | Default borders on cards, containers, nav |

### Light Palette
| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| ip-light-bg | #f7f7f7 | `bg-ip-light-bg` | Badges, status labels |
| ip-light-blue | #b8cfff | `bg-ip-light-blue` | WhitePapersSection background, badges |
| ip-light-yellow | #ffe3a9 | `bg-ip-light-yellow` | Badges, status labels |
| ip-light-red | #fbc1c3 | `bg-ip-light-red` | Badges, status labels |
| ip-light-green | #c3ffad | `bg-ip-light-green` | Badges, status labels |

### Light Section Backgrounds
Some homepage sections use light backgrounds for visual contrast. These require dark text:

| Background | Tailwind Class | Text colors | Used by |
|---|---|---|---|
| White | `bg-white` | `text-ip-navy`, `text-ip-navy/60` | HowItWorksSection |
| Periwinkle | `bg-ip-light-blue` | `text-ip-navy`, `text-ip-navy/70` | WhitePapersSection |

> **Important:** When using any light background, all text must switch to dark variants. Headings: `text-ip-navy`. Body: `text-ip-navy/60` or `text-ip-navy/70`. Inline bold: `<strong class="text-ip-navy">`. Borders: `border-ip-navy/15`.

## Typography

### Font Families
| Token | Tailwind Class | Font | Usage |
|---|---|---|---|
| font-display | `font-display` | "In Parallel Medium" | Headings (H2-H4), nav, buttons, labels, eyebrows |
| font-display-regular | `font-display-regular` | "In Parallel Regular" | Body text via font-body |
| font-display-bold | `font-display-bold` | "In Parallel Bold" | Bold emphasis in display text |
| font-display-black | `font-display-black` | "In Parallel Black" | Extra-bold hero text, large impact headings |
| font-serif | `font-serif` | "Feature Deck Regular" | H1 page headings (the large serif titles) |
| font-serif-light | `font-serif-light` | "Feature Deck Light" | Lighter serif variant for subtitles or large body text |
| font-mono | `font-mono` | "Fragment Mono" | Code snippets, technical labels, data displays |
| font-body | `font-body` | "In Parallel Regular" | Default body font (set on `<body>`) |
| font-sans | `font-sans` | "Inter" | System fallback |

### Heading Scale

> **Leading rule:** Single-line display headings use `leading-[0.95]`. Multi-line headings need relief — use `leading-[1.0] md:leading-[0.95]` on mobile where the heading wraps, tightening back at the breakpoint where it fits on one or two lines.

**Hero H1 (homepage):**
`font-serif text-5xl md:text-8xl lg:text-headline-xl leading-[0.95] tracking-tight`

**Page H1 (inner pages, display/sans):**
`font-display text-6xl md:text-8xl lg:text-[136px] leading-[1.0] md:leading-[0.95] tracking-tight`
— Use `leading-[1.0]` on mobile where long headings wrap; tighten to `[0.95]` at md+.

**Page H1 (inner pages, serif):**
`font-serif text-5xl md:text-7xl lg:text-headline leading-[1.0] md:leading-[0.95] tracking-tight`

**Detail page H1 (blog/routine):**
`font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight`

**Legal page H1:**
`font-display text-4xl md:text-5xl leading-tight tracking-tight`

**Section H2:**
`font-display text-4xl md:text-6xl leading-[0.95] tracking-tight`

**Large H2 (with eyebrow):**
`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight`

**Subsection H3:**
`font-display text-3xl md:text-4xl leading-snug`

**Card/item titles:**
`font-display text-lg` (standard), `font-display text-xl` (pricing), `font-display text-base` (integration)

**Footer headings:**
`font-display text-sm`

### Body Text Scale (dark backgrounds)
| Classes | Usage |
|---|---|
| `text-ip-white-muted text-lg leading-relaxed` | Primary body paragraphs |
| `text-ip-white-muted text-lg md:text-xl leading-relaxed` | Hero description |
| `text-ip-white-muted text-base` | Secondary descriptions, eyebrow text |
| `text-ip-white-muted text-sm` | Card descriptions, footer links, meta |
| `text-ip-white-muted text-xs` | Timestamps, compliance badges, fine print |

### Body Text Scale (light backgrounds)
| Classes | Usage |
|---|---|
| `text-ip-navy/60 text-lg leading-relaxed` | Primary body paragraphs on white bg |
| `text-ip-navy/70 text-lg leading-relaxed` | Primary body paragraphs on periwinkle bg |
| `text-ip-navy/60 text-base` | Secondary descriptions, eyebrow text |
| `text-ip-navy/60 text-sm` | Card descriptions, meta |

### Special Text Patterns
| Pattern | Classes |
|---|---|
| Eyebrow (muted, dark bg) | `text-ip-white-muted text-base md:text-lg mb-6 font-display` |
| Eyebrow (muted, light bg) | `text-ip-navy/60 text-base md:text-lg mb-6 font-display` |
| Eyebrow (lime) | `text-ip-lime text-base mb-4 font-display` |
| Category tag | `text-ip-lime text-xs font-display uppercase tracking-wider` |
| Inline emphasis (dark bg) | `<strong class="text-white">Text</strong>` within muted body |
| Inline emphasis (light bg) | `<strong class="text-ip-navy">Text</strong>` within muted body |

## Spacing

### Section Padding
| Context | Classes |
|---|---|
| Standard section | `py-20 md:py-32` |
| Homepage hero | `min-h-screen` on `<section>`, `pt-40 pb-20 md:pt-56 lg:pt-64` on inner container |
| Inner page top | `pt-32 pb-20 md:pt-44 md:pb-32` |
| Footer | `py-16` |

### Content Spacing
| Context | Classes |
|---|---|
| After heading, before body | `mb-8` |
| After eyebrow, before heading | `mb-4` or `mb-6` |
| Between body paragraphs | `mb-4` |
| After body, before CTA | `mb-8` to `mb-12` |
| Section title block bottom | `mb-12` or `mb-16` |
| Grid gap | `gap-6` (standard), `gap-4` (compact), `gap-10` (footer) |

### Container Widths
| Context | Classes |
|---|---|
| Page container | `container-ip` (max 1240px) |
| Narrow reading column | `content-narrow` (75% at md+, full width on mobile, mx-auto) |
| Card grids | `max-w-5xl` |
| Forms | `max-w-md mx-auto` or `max-w-lg mx-auto` |

## Borders & Rounding

| Context | Classes |
|---|---|
| Card | `border border-ip-border rounded-xl` |
| Featured card | `border border-ip-lime rounded-xl` |
| Nav pill | `bg-white/5 border border-white/10 rounded-full` |
| Buttons | `rounded-full` (pill shape) |
| Icon boxes | `rounded-lg` |
| Form inputs | `rounded-lg border border-ip-border focus:border-ip-lime focus:outline-none` |
| Images | `rounded-xl` |

## Buttons

### Primary CTA (`.btn-lime`)
Filled lime background, navy text, pill shape. Hover: opacity 0.9. Use for the main action (e.g. "Join the waitlist").
```html
<a href="/waitlist" class="btn-lime">
  Button text
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</a>
```

### Secondary CTA (`.btn-outline`)
Lime border, lime text, transparent background. Hover: fills with lime, text turns navy. Use for secondary actions (e.g. "Book a demo").
```html
<a href="/demo" class="btn-outline">
  Button text
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
</a>
```

### Full-width variant
Add `w-full justify-center` to either button class.

## Effects & Shadows

| Class | Usage |
|---|---|
| `bg-ip-glow` | Radial gradient glow (cyan→blue), `110% 56%` ellipse centered in element. Used in hero (starts at `top-[30%]`, extends `-bottom-96` into ValueProp) and integrations section (with `opacity-30`) |
| `shadow-ip-card` | Subtle multi-layer card shadow for elevated cards |
| `shadow-ip-glow` | Large lime-tinted glow halo for featured/highlighted sections |

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|---|---|---|
| (default) | < 640px | Mobile-first base styles |
| `sm:` | 640px | Minor layout tweaks (side-by-side CTAs) |
| `md:` | 768px | Primary breakpoint: desktop nav, grids, larger text |
| `lg:` | 1024px | Extended typography sizes, 3-column grids |

Convention: write mobile-first, add `md:` overrides. `lg:` is used sparingly for typography only.

## Animations

### Rotating Word (Hero)
The hero heading uses a pure CSS `@keyframes` animation for cycling through words. No JS required.

| Property | Value | Notes |
|---|---|---|
| Duration | 10s total | 2s per word (5 words) |
| Hold time | 1.6s per word | 80% of each word's slot |
| Slide time | 0.4s | 20% of each word's slot |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth deceleration |
| Direction | upward (`translateY`) | GPU-accelerated |
| Loop | seamless | First word duplicated at end |

### Scroll Reveal Animations
Elements animate into view on scroll via IntersectionObserver (in `BaseLayout.astro`) + CSS transitions (in `global.css`).

| Class | Initial State | Duration | Use for |
|---|---|---|---|
| `.scroll-reveal` | `opacity:0; translateY(40px) scale(0.95)` | 0.8s | Content blocks, integration logos |
| `.scroll-reveal-hero` | `opacity:0; translateY(100px) scale(0.98)` | 1.0s | Hero product image |
| `.scroll-reveal-scale` | `scale(0.95)` (no opacity) | 0.8s | Section containers |
| `.scroll-reveal-fade` | `opacity:0` (no transform) | 0.8s | Light-bg sections |

All use `cubic-bezier(0.4, 0, 0.2, 1)` easing. The `.is-visible` class is added once when 15% of the element enters the viewport.

### Scroll-Linked Section Shrink
The ValuePropSection uses a scroll-linked effect that shrinks the section slightly and adds rounded corners as the user scrolls past it, revealing a white background underneath.

| Class | Purpose | Properties |
|---|---|---|
| `.shrink-scroll-wrapper` | Outer wrapper (white bg, extra bottom padding for scroll travel) | `padding-bottom: 200px; background-color: white` |
| `.shrink-section` | Inner section that shrinks | `position: sticky; top: 0; overflow: hidden; transform-origin: center top` |

JS in `BaseLayout.astro` tracks scroll progress of the wrapper leaving the viewport:
- `progress` goes from 0 (wrapper bottom far below viewport) to 1 (wrapper bottom at viewport bottom)
- `scale` goes from 1.0 → 0.95
- `borderRadius` goes from 0px → 24px

Usage: Wrap a section in `.shrink-scroll-wrapper`, add `.shrink-section` to the inner `<section>`.

### Scroll-Linked Section Grow (Reverse of Shrink)
The TrustSection uses the reverse effect — it starts slightly scaled down with rounded corners and grows to full size as the user scrolls it into view, filling from white padding to full solid color.

| Class | Purpose | Properties |
|---|---|---|
| `.grow-scroll-wrapper` | Outer wrapper (white bg) | `background-color: white` |
| `.grow-section` | Inner section that grows | `overflow: hidden; transform-origin: center top` |

JS in `BaseLayout.astro` triggers on reveal (as soon as the section top enters the viewport bottom):
- `progress` = `(window.innerHeight - rect.top) / 300`, clamped 0–1
- `scale` goes from 0.95 → 1.0
- `borderRadius` goes from 24px → 0px

Usage: Wrap a section in `.grow-scroll-wrapper`, add `.grow-section` to the inner `<section>`. The section must have an explicit background color (e.g. `bg-ip-navy`).

### Animation Conventions
- Use pure CSS `@keyframes` for looping animations (e.g., rotating words)
- Use CSS transitions + IntersectionObserver for scroll-triggered reveals
- Use JS scroll listeners with `{ passive: true }` for scroll-linked transforms (shrink/grow)
- Place looping animations in scoped `<style>` blocks within components
- Scroll reveal classes are defined globally in `src/styles/global.css`
- Scroll-linked JS is in `BaseLayout.astro` `<script>` block
- Use `translateY`/`translateX` (GPU-accelerated), avoid `top`/`left`
- All animations should feel smooth and subtle, not distracting
- Use `cubic-bezier(0.4, 0, 0.2, 1)` as default easing (material ease-out)

## Opacity Patterns

| Pattern | Usage |
|---|---|
| `opacity-60` | Muted elements (compliance badges) |
| `opacity-70` | Secondary icon groups |
| `bg-white/5` | Nav pill background |
| `border-white/10` | Nav pill border |
| `bg-white/10` | Icon container backgrounds |
| `text-white/90` | Nav link text |
| `hover:border-ip-white-muted/30` | Card hover state |
| `placeholder:text-ip-white-muted/50` | Form placeholder text |
| `text-ip-white-muted/60` | Timestamps, fine print |
