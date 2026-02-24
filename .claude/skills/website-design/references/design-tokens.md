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

### Light Palette (badges and small accents only)
| Token | Hex | Tailwind Class |
|---|---|---|
| ip-light-bg | #f7f7f7 | `bg-ip-light-bg` |
| ip-light-blue | #b8cfff | `bg-ip-light-blue` |
| ip-light-yellow | #ffe3a9 | `bg-ip-light-yellow` |
| ip-light-red | #fbc1c3 | `bg-ip-light-red` |
| ip-light-green | #c3ffad | `bg-ip-light-green` |

> **Important:** Light palette colors are only for small UI elements like badges or status labels. Never use as section or page backgrounds.

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

**Hero H1 (homepage):**
`font-serif text-5xl md:text-7xl lg:text-[110px] leading-[1.1] tracking-tight`

**Page H1 (inner pages):**
`font-serif text-5xl md:text-7xl tracking-tight`

**Detail page H1 (blog/routine):**
`font-serif text-4xl md:text-6xl tracking-tight`

**Legal page H1:**
`font-display text-4xl md:text-5xl tracking-tight`

**Section H2:**
`font-display text-4xl md:text-6xl tracking-tight`

**Large H2 (with eyebrow):**
`font-display text-4xl md:text-6xl lg:text-7xl tracking-tight`

**Subsection H3:**
`font-display text-3xl md:text-4xl`

**Card/item titles:**
`font-display text-lg` (standard), `font-display text-xl` (pricing), `font-display text-base` (integration)

**Footer headings:**
`font-display text-sm`

### Body Text Scale
| Classes | Usage |
|---|---|
| `text-ip-white-muted text-lg leading-relaxed` | Primary body paragraphs |
| `text-ip-white-muted text-lg md:text-xl leading-relaxed` | Hero description |
| `text-ip-white-muted text-base` | Secondary descriptions, eyebrow text |
| `text-ip-white-muted text-sm` | Card descriptions, footer links, meta |
| `text-ip-white-muted text-xs` | Timestamps, compliance badges, fine print |

### Special Text Patterns
| Pattern | Classes |
|---|---|
| Eyebrow (muted) | `text-ip-white-muted text-base md:text-lg mb-6 font-display` |
| Eyebrow (lime) | `text-ip-lime text-base mb-4 font-display` |
| Category tag | `text-ip-lime text-xs font-display uppercase tracking-wider` |
| Inline emphasis | `<strong class="text-white">Text</strong>` within muted body |

## Spacing

### Section Padding
| Context | Classes |
|---|---|
| Standard section | `py-20 md:py-32` |
| Hero / page top | `pt-32 pb-20 md:pt-44 md:pb-32` |
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
| Text readability | `max-w-3xl` |
| Card grids | `max-w-5xl` |
| Centered narrow content | `max-w-2xl mx-auto` |
| Forms | `max-w-md mx-auto` or `max-w-lg mx-auto` |

## Borders & Rounding

| Context | Classes |
|---|---|
| Card | `border border-ip-border rounded-xl` |
| Featured card | `border border-ip-lime rounded-xl` |
| Nav pill | `border border-ip-border rounded-full` |
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
| `bg-ip-glow` | Radial gradient glow (cyan→blue), used behind hero or feature sections |
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

## Opacity Patterns

| Pattern | Usage |
|---|---|
| `opacity-60` | Muted elements (compliance badges) |
| `opacity-70` | Secondary icon groups |
| `bg-white/10` | Icon container backgrounds |
| `text-white/90` | Nav link text |
| `hover:border-ip-white-muted/30` | Card hover state |
| `placeholder:text-ip-white-muted/50` | Form placeholder text |
| `text-ip-white-muted/60` | Timestamps, fine print |
