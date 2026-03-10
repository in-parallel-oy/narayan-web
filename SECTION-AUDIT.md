# Section & Page Style Audit

> Generated 2026-03-10. Use this as the reference for the design system section templates.

---

## Page Type Categories

| Category | Pages |
|---|---|
| **Product** | Homepage, How it works, Waitlist, Living Plan, Execution Intelligence |
| **Product argument** | Pricing, Use Cases, Compare pages, Security |
| **Editorial** | Blog listing (Insight), Blog articles, Vision, White Papers |
| **Visual / Brand** | About Us, Press, Careers |

---

## Design Principles (agreed)

1. **Section vertical padding**: `py-20 md:py-32` everywhere. Exceptions: hero page-headers keep `pt-32 pb-20 md:pt-44 md:pb-32`; full-height CTA/team sections keep `min-h-[95vh] flex items-center py-20 md:py-32`.
2. **Card gap**: `gap-6` for standard column grids. `gap-4` for tight card arrays (small cards).
3. **Background**: Always declare explicitly on `<section>`. Never rely on inheritance. Default dark section = `bg-ip-navy`.

---

## Section Type Inventory

### 1. Hero / Page Header

**Component**: `HeroSection.astro` (homepage) + inline `<section>` on other pages

| Attribute | Pattern |
|---|---|
| Padding | `pt-32 pb-12 md:pt-48 lg:pt-52` (HeroSection) / `pt-32 pb-20 md:pt-44 md:pb-24` (inline) |
| Background | None explicit (inherits dark) |
| Heading font | `font-serif` |
| Heading size | `text-5xl md:text-8xl lg:text-headline-xl` (homepage) / `text-5xl md:text-7xl` (inner pages) |
| Container | `container-ip` |
| Alignment | Centered |

**Variations**:
- Full hero with rotating word + video modal (homepage)
- Simplified centered hero with eyebrow + heading + description (use-case, compare index)
- Editorial hero with ghost word overlay (blog listing)
- Light-theme hero (blog articles — full white background)

---

### 2. Stat / Highlight

**Components**: `ProblemSection.astro`, `ImpactSection.astro`

| Attribute | ProblemSection | ImpactSection |
|---|---|---|
| Background | `bg-ip-navy` | `bg-white` |
| Padding | `py-20 md:py-32` | `py-20 md:py-32` |
| Number size | `text-[200px]…text-[420px]` (animated rotator) | `text-5xl md:text-6xl` (static) |
| Card gap | `gap-4` | `gap-4` |
| Card bg | `bg-ip-navy-surface` | `bg-ip-light-periwinkle/50` |

**Inconsistencies**: Number sizes are very different (animated ghost number vs readable stat). Dark vs light background.

---

### 3. Feature / Value Prop

**Components**: `ValuePropSection.astro`, `ExecutionScopesSection.astro`, `HowItWorksSection.astro`

| Attribute | ValueProp | ExecutionScopes | HowItWorks |
|---|---|---|---|
| Background | `bg-ip-navy-light` | `bg-ip-navy` (inherited) | `bg-white` |
| Padding | `py-20 md:py-32` | `py-20 md:py-32` | `py-20 md:py-32` |
| Heading font | `font-display` | `font-display` | `font-display` |
| Card gap | N/A | `gap-4` | N/A |
| Layout | Centered + image | 2×3 card grid | 3-step vertical |

---

### 4. Card Grid

**Used in**: ExecutionScopes, Integrations, MeetingMoments, Compare index, Pricing

| Attribute | Pattern |
|---|---|
| Grid | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Gap (standard) | `gap-6` |
| Gap (tight) | `gap-4` |
| Card | `bg-ip-navy-surface border border-ip-border rounded-xl p-6 card-elevated` |
| Hover (interactive) | `hover:border-ip-lime/30 transition-colors` |

**Inconsistency**: gap-4 vs gap-6 used inconsistently across pages that have identical card sizes.

---

### 5. CTA / Conversion

**Components**: `BottomCtaSection.astro`, `TeamSection.astro`, inline sections

| Attribute | BottomCTA | TeamSection |
|---|---|---|
| Background | `bg-ip-navy-light` | `bg-ip-navy` (implicit) |
| Min-height | `min-h-[95vh]` | `min-h-[95vh]` |
| Padding | `py-20 md:py-32` | `py-20 md:py-32` |
| Heading font | `font-serif` | `font-display` |
| Heading size | `text-3xl md:text-6xl lg:text-7xl` | `text-3xl md:text-6xl` |
| Alignment | Centered | Centered |
| Image | Product screenshot (75% translateY) | None |

---

### 6. Trust / Social Proof

**Components**: `TrustSection.astro`, `SocialProofBar.astro`

| Attribute | TrustSection | SocialProofBar |
|---|---|---|
| Background | `bg-ip-navy` | `#001325` (inline style) |
| Padding | `py-20 md:py-32` | `min-h-[50vh] flex items-center` |
| Layout | Centered, text + badges | Flex row, logos + divider |
| Logo opacity | `opacity-60` / `opacity-70` | `opacity-75` / `opacity-70` |
| Gap | `gap-4` | `gap-x-12 gap-y-4` |

**Note**: SocialProofBar uses inline style bg — should be converted to `bg-ip-navy` token.

---

### 7. Editorial / Prose

**Used in**: Vision, About Us, Blog articles

| Attribute | Pattern |
|---|---|
| Container | `container-ip` + `content-narrow` or `max-w-[65ch]` |
| Body text | `text-ip-white-muted text-lg leading-relaxed text-left max-w-[65ch]` |
| Heading | `font-serif` for h1/h2, `font-display` for sub-headings |
| Background | Varies: `bg-ip-navy`, `bg-white`, `bg-[#f5f6fa]` |

---

### 8. Comparison / Table

**Used in**: Compare detail pages

| Attribute | Pattern |
|---|---|
| Background | `#F3F5F2` (inline style, light) |
| Layout | `flex flex-col lg:flex-row gap-12 lg:gap-16 items-start` |
| Sidebar | `lg:w-[380px] flex-shrink-0` |
| Table | `grid grid-cols-3 border-b` |
| Padding | `p-4 md:p-6` per cell |

---

### 9. Team / People

**Used in**: About Us page

| Attribute | Pattern |
|---|---|
| Background | `bg-ip-navy` (implicit) |
| Grid | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Gap | `gap-x-14 gap-y-16` (asymmetric — intentional) |
| Photo | `aspect-[4/3] rounded-lg overflow-hidden` |
| Name | `font-display text-lg` |

---

### 10. Pricing

**Components**: `ProductLadderSection.astro` (homepage), inline (pricing page)

| Attribute | ProductLadder (dark) | Pricing page (light) |
|---|---|---|
| Background | `bg-ip-navy` | `bg-white text-ip-navy` |
| Grid | `grid grid-cols-1 md:grid-cols-3 gap-6` | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Price font | `font-serif text-5xl` | `font-serif text-5xl` |
| Card border | `border-2 border-ip-lime` (featured) | `border-2 border-ip-blue` (featured) |

---

## Inconsistency Summary

| Issue | Current state | Target |
|---|---|---|
| Section padding | Mix of `py-20`, `py-32`, `pt-32 pb-20`, `min-h-[95vh]` | `py-20 md:py-32` on all non-hero sections |
| Card gap | `gap-4` and `gap-6` used inconsistently | `gap-6` standard, `gap-4` only for tight small-card arrays |
| Background declaration | Often inherited / inline styles | Always explicit `bg-` class on every `<section>` |
| Logo opacity | `opacity-60`, `opacity-70`, `opacity-75` mixed | Standardize to `opacity-70` |
| Inline bg styles | `style="background-color: #001325;"` | Replace with `bg-ip-navy` |

---

## Background Token Reference

| Token | Hex | Use |
|---|---|---|
| `bg-ip-navy` | `#001325` | Default dark background |
| `bg-ip-navy-light` | `#142536` | Alternate dark section |
| `bg-ip-navy-surface` | darker | Card surfaces |
| `bg-white` | `#ffffff` | Light sections (pricing, how-it-works, compare) |
| `bg-[#f5f6fa]` | periwinkle tint | Vision page light sections |
