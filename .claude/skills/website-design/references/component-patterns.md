# Component Patterns Reference

Copy-paste-ready recipes for UI patterns used across the In Parallel website. Each pattern shows exact class names from production code.

All components are `.astro` files in `src/components/`.

## Section Shell

Every content section follows this wrapper:

```html
<section class="py-20 md:py-32">
  <div class="container-ip">
    <!-- content -->
  </div>
</section>
```

With alternate dark background (for visual rhythm):
```html
<section class="py-20 md:py-32 bg-ip-navy-light">
```

With white background (HowItWorksSection pattern — requires dark text):
```html
<section class="py-20 md:py-32 bg-white relative overflow-hidden">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(184,207,255,0.3),transparent_50%),radial-gradient(ellipse_at_100%_50%,rgba(184,207,255,0.3),transparent_50%)] pointer-events-none" aria-hidden="true"></div>
  <div class="container-ip relative">
    <!-- content with text-ip-navy headings, text-ip-navy/60 body -->
  </div>
</section>
```

With periwinkle background (WhitePapersSection pattern — requires dark text):
```html
<section class="py-20 md:py-32 bg-ip-light-blue">
  <div class="container-ip">
    <!-- content with text-ip-navy headings, text-ip-navy/70 body -->
  </div>
</section>
```

With anchor ID (for nav links):
```html
<section id="section-name" class="py-20 md:py-32">
```

## Section Headers

### Left-aligned with eyebrow
```html
<div class="max-w-3xl">
  <p class="text-ip-white-muted text-base mb-4 font-display">Eyebrow text</p>
  <h2 class="font-display text-4xl md:text-6xl tracking-tight mb-8">Section heading</h2>
  <p class="text-ip-white-muted text-lg leading-relaxed mb-4">Description paragraph.</p>
</div>
```

### Left-aligned with lime eyebrow
```html
<div class="max-w-3xl">
  <p class="text-ip-lime text-base mb-4 font-display">Highlighted eyebrow</p>
  <h2 class="font-display text-4xl md:text-6xl tracking-tight mb-8">Section heading</h2>
</div>
```

### Center-aligned with eyebrow
```html
<div class="text-center mb-16">
  <p class="text-ip-white-muted text-base mb-4 font-display">Eyebrow text</p>
  <h2 class="font-display text-4xl md:text-6xl tracking-tight">Section heading</h2>
</div>
```

### Center-aligned with subtitle
```html
<div class="text-center mb-16">
  <p class="text-ip-white-muted text-base mb-4 font-display">Eyebrow text</p>
  <h2 class="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">Section heading</h2>
  <p class="text-ip-white-muted text-lg">Additional context line.</p>
</div>
```

### Center-aligned on light background (white or periwinkle)
```html
<div class="text-center mb-16">
  <p class="text-ip-navy/60 text-base md:text-lg mb-6 font-display">Eyebrow text</p>
  <h2 class="font-display text-4xl md:text-6xl tracking-tight mb-8 text-ip-navy">Section heading</h2>
  <p class="text-ip-navy/60 text-lg leading-relaxed max-w-3xl mx-auto">Body paragraph.</p>
</div>
```

## Card Patterns

### Standard content card
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-6 shadow-ip-card hover:border-ip-white-muted/30 transition-colors">
  <h3 class="font-display text-lg mb-2">Card title</h3>
  <p class="text-ip-white-muted text-sm">Card description.</p>
</div>
```

### Card with icon
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-6 shadow-ip-card hover:border-ip-white-muted/30 transition-colors">
  <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-sm font-display mb-3">
    IC
  </div>
  <h3 class="font-display text-base mb-1">Card title</h3>
  <p class="text-ip-white-muted text-sm">Card description.</p>
</div>
```

### Clickable card (listing pages)
```html
<a href="/path" class="group bg-ip-navy-surface border border-ip-border rounded-xl p-6 hover:border-ip-white-muted/30 transition-colors no-underline">
  <span class="text-ip-lime text-xs font-display uppercase tracking-wider">Category</span>
  <h2 class="font-display text-lg mt-2 mb-2 group-hover:text-ip-lime transition-colors">Item title</h2>
  <p class="text-ip-white-muted text-sm">Description.</p>
</a>
```

### Clickable card with image (blog cards)
```html
<a href="/insight/slug" class="group bg-ip-navy-surface border border-ip-border rounded-xl overflow-hidden hover:border-ip-white-muted/30 transition-colors no-underline">
  <div class="aspect-video bg-ip-navy-light">
    <img src="image-url" alt="Alt text" class="w-full h-full object-cover" />
  </div>
  <div class="p-6">
    <span class="text-ip-lime text-xs font-display uppercase tracking-wider">Category</span>
    <h2 class="font-display text-lg mt-2 mb-2 group-hover:text-ip-lime transition-colors">Post title</h2>
    <p class="text-ip-white-muted text-sm line-clamp-2">Description excerpt.</p>
    <time class="text-ip-white-muted/60 text-xs mt-3 block">January 15, 2026</time>
  </div>
</a>
```

### Featured card (lime border + glow)
```html
<div class="bg-ip-navy-surface border border-ip-lime rounded-xl p-8 text-left relative shadow-ip-glow">
  <span class="absolute -top-3 left-8 bg-ip-lime text-ip-navy text-xs font-display px-3 py-1 rounded-full">Badge text</span>
  <h3 class="font-display text-xl mb-2">Card title</h3>
  <p class="text-ip-white-muted text-sm mb-6">Card description.</p>
  <a href="/demo" class="btn-lime w-full justify-center">CTA text</a>
</div>
```

### Pricing card (standard)
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-8 text-left shadow-ip-card">
  <h3 class="font-display text-xl mb-2">Plan name</h3>
  <p class="text-ip-white-muted text-sm mb-6">Plan description</p>
  <a href="/demo" class="btn-outline w-full justify-center">CTA text</a>
</div>
```

### Team member card
```html
<div class="text-center">
  <div class="w-full aspect-square bg-ip-navy-surface rounded-xl mb-3"></div>
  <p class="font-display text-sm">Person Name</p>
  <p class="text-ip-white-muted text-xs">Role Title</p>
</div>
```

## Card Grid Layouts

### 3-column (default)
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 3-column compact
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 2-column
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### 3-column pricing
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
```

### 5-column team
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
```

## HeroSection Component

Reusable component imported from `src/components/HeroSection.astro`. Uses `min-h-screen` to fill the viewport. The optional `image` prop renders below the section (outside the `<section>` tag) to keep it below the fold.

### Static heading (titleHighlight)
```astro
<HeroSection
  eyebrow="Short context label"
  title="Main heading text"
  titleHighlight="emphasized word"
  description="Description paragraph."
  primaryCta={{ label: "Primary action", href: "#anchor" }}
  secondaryCta={{ label: "Secondary action", href: "/page" }}
  image={{ src: "/images/hero/hero-main.png", alt: "Product screenshot" }}
/>
```

### Rotating word animation (rotatingWords)
```astro
<HeroSection
  eyebrow="Execution intelligence"
  title="Always up-to-date"
  titleLine2="plan for"
  rotatingWords={["programs", "projects", "teams", "accounts", "missions"]}
  description="Description paragraph."
  primaryCta={{ label: "Primary action", href: "#anchor" }}
  secondaryCta={{ label: "Secondary action", href: "/page" }}
  image={{ src: "/images/hero/hero-main.png", alt: "Product screenshot" }}
/>
```

When `rotatingWords` is provided, the words cycle with an upward-slide animation (pure CSS `@keyframes`, 2s per word, 10s total loop). The `titleLine2` text appears inline before the rotating word on the second line.

Props:
- `title` (required), `description` (required)
- `eyebrow`, `titleLine2`, `titleHighlight`, `rotatingWords`, `primaryCta`, `secondaryCta`, `image` (all optional)
- `rotatingWords` takes precedence over `titleHighlight` when both are provided

The heading uses `font-serif text-5xl md:text-7xl lg:text-[110px]` — the 110px matches the live Framer site at 1920px viewport width. Rotating words use `font-display` at `1.1em` (≈122px at lg) to match the Framer bold word sizing.

## Text Block with CTA

### Left-aligned
```html
<div class="max-w-3xl">
  <p class="text-ip-white-muted text-lg leading-relaxed mb-4">First paragraph.</p>
  <p class="text-ip-white-muted text-lg leading-relaxed mb-8">Second paragraph.</p>
  <a href="/target" class="btn-outline">Link text</a>
</div>
```

### Centered
```html
<div class="max-w-3xl mx-auto text-center">
  <p class="text-ip-white-muted text-lg leading-relaxed mb-4">Paragraph text.</p>
  <p class="text-ip-white-muted text-lg leading-relaxed mb-8">Another paragraph.</p>
  <a href="/about-us" class="btn-lime">
    CTA text
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>
</div>
```

## Numbered Steps with Visuals (HowItWorksSection)

Used in HowItWorksSection on a white background with dark text. The steps sit inside a dashed-border container image with Learn/Replan labels flanking the sides.

```html
<div class="relative max-w-3xl mx-auto">
  <!-- Dashed border container decoration (background image) -->
  <img src="/images/sections/hiw-border.png" alt="" class="absolute inset-0 w-full h-full object-contain pointer-events-none" aria-hidden="true" />

  <!-- Learn label — left side with right-pointing arrow -->
  <div class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full items-center" aria-hidden="true">
    <span class="bg-ip-navy text-white text-sm font-display px-4 py-2">Learn</span>
    <svg width="8" height="34" viewBox="0 0 8 34" fill="none" class="shrink-0">
      <polygon points="0,0 8,17 0,34" class="fill-ip-navy" />
    </svg>
  </div>

  <!-- Replan label — right side with left-pointing arrow -->
  <div class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-full items-center" aria-hidden="true">
    <svg width="8" height="34" viewBox="0 0 8 34" fill="none" class="shrink-0">
      <polygon points="8,0 0,17 8,34" class="fill-ip-navy" />
    </svg>
    <span class="bg-ip-navy text-white text-sm font-display px-4 py-2">Replan</span>
  </div>

  <div class="relative py-12 space-y-12">
    <!-- Step 1: Prepare — with integration icons row -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-10 h-10 bg-ip-navy text-white border border-ip-navy rounded-full text-sm font-display mb-4">1</div>
      <h3 class="font-display text-3xl md:text-4xl mb-4 text-ip-navy">Prepare</h3>
      <p class="text-ip-navy/60 text-base max-w-lg mx-auto">
        <strong class="text-ip-navy">Before:</strong> Description text.
      </p>
      <div class="flex items-center justify-center gap-4 mt-6">
        <img src="/images/integrations/slack.png" alt="Slack" width="45" height="45" class="w-[45px] h-[45px] rounded-lg" />
        <!-- more icons... -->
      </div>
    </div>

    <!-- Step 2: Capture — with CSS-built dark card -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-10 h-10 bg-ip-navy text-white border border-ip-navy rounded-full text-sm font-display mb-4">2</div>
      <h3 class="font-display text-3xl md:text-4xl mb-4 text-ip-navy">Capture</h3>
      <p class="text-ip-navy/60 text-base max-w-lg mx-auto">
        <strong class="text-ip-navy">During:</strong> Description text.
      </p>
      <div class="bg-ip-navy rounded-xl p-8 mt-6 max-w-lg mx-auto text-center">
        <span class="inline-block bg-ip-lime text-ip-navy text-xs font-display px-3 py-1.5 rounded-full">Project weekly</span>
        <p class="text-ip-white-muted text-sm mt-4">thinking...</p>
        <p class="text-white font-display mt-2">AI question text</p>
      </div>
    </div>

    <!-- Step 3: Update — with metric card images -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-10 h-10 bg-ip-navy text-white border border-ip-navy rounded-full text-sm font-display mb-4">3</div>
      <h3 class="font-display text-3xl md:text-4xl mb-4 text-ip-navy">Update</h3>
      <p class="text-ip-navy/60 text-base max-w-lg mx-auto">
        <strong class="text-ip-navy">After:</strong> Description text.
      </p>
      <div class="flex items-center justify-center gap-4 mt-6">
        <img src="/images/sections/hiw-score.png" alt="Score" class="h-20 md:h-24 w-auto rounded-lg" />
        <img src="/images/sections/hiw-metric-1.png" alt="Metric 1" class="h-20 md:h-24 w-auto rounded-lg" />
        <img src="/images/sections/hiw-metric-2.png" alt="Metric 2" class="h-20 md:h-24 w-auto rounded-lg" />
      </div>
    </div>
  </div>
</div>
```

> **Note:** This pattern sits inside a white-background section. The number circles use `bg-ip-navy text-white`, headings use `text-ip-navy`, body uses `text-ip-navy/60`. Learn/Replan labels are squared (no border-radius) with SVG triangle arrows pointing inward. The dashed border is an image overlay, not CSS.

## Logo Row / Integration Badges

Integration icons are real images stored in `public/images/integrations/`. Available icons: `microsoft-365.png`, `microsoft-teams.png`, `microsoft-sharepoint.png`, `microsoft-powerbi.png`, `microsoft-outlook.png`, `slack.png`, `google-workspace.png`, `google-calendar.png`, `google-meet.png`, `linear.png`, `jira.png`, `hubspot.png`, `salesforce.png`, `asana.png`.

```html
<div class="flex flex-wrap items-center justify-center gap-6 opacity-70">
  <img src="/images/integrations/microsoft-365.png" alt="Microsoft 365" width="45" height="45" class="w-[45px] h-[45px] rounded-lg" />
  <img src="/images/integrations/slack.png" alt="Slack" width="45" height="45" class="w-[45px] h-[45px] rounded-lg" />
</div>
```

## Back Link (detail pages)

```html
<a href="/insight" class="text-ip-white-muted text-sm hover:text-white mb-6 inline-block no-underline">&larr; Back to Insights</a>
```

## Prose Block (CMS rich text)

```html
<div class="prose prose-invert prose-lg max-w-none
  prose-headings:font-display prose-headings:tracking-tight
  prose-a:text-ip-lime prose-a:no-underline hover:prose-a:underline
  prose-strong:text-white
" set:html={htmlContent} />
```

## Form Input

```html
<input
  type="email"
  placeholder="your@email.com"
  class="w-full px-4 py-3 bg-ip-navy-surface border border-ip-border rounded-lg text-white placeholder:text-ip-white-muted/50 focus:border-ip-lime focus:outline-none"
/>
```

## Centered Text Section with CTA (dark bg, e.g. TrustSection)

```html
<section class="py-20 md:py-32">
  <div class="container-ip">
    <div class="max-w-3xl mx-auto text-center">
      <p class="text-ip-lime text-base mb-4 font-display">Eyebrow text</p>
      <h2 class="font-display text-4xl md:text-6xl tracking-tight mb-8">Section heading</h2>
      <p class="text-ip-white-muted text-lg leading-relaxed mb-8">Body paragraph.</p>
      <a href="/target" class="btn-outline">
        CTA text
      </a>
    </div>
  </div>
</section>
```

## Two-Column Section with Image (light bg, e.g. WhitePapersSection)

```html
<section class="py-20 md:py-32 bg-ip-light-blue">
  <div class="container-ip">
    <div class="text-center mb-12 scroll-reveal-fade">
      <p class="text-ip-navy/60 text-base mb-4 font-display">Eyebrow text</p>
      <h2 class="font-display text-4xl md:text-6xl tracking-tight text-ip-navy">Section heading</h2>
    </div>
    <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-4xl mx-auto">
      <div class="w-full md:w-1/2 flex-shrink-0">
        <img src="/images/sections/whitepapers-preview.png" alt="Description" width="512" height="640" class="w-full h-auto" />
      </div>
      <div class="w-full md:w-1/2">
        <p class="text-ip-navy/70 text-lg leading-relaxed mb-4">
          Body paragraph with <strong class="text-ip-navy">bold emphasis</strong>.
        </p>
        <p class="text-ip-navy/70 text-lg leading-relaxed mb-8">Second paragraph.</p>
        <a href="/target" class="btn-lime">
          CTA text
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

## Compliance Badges Row (with images)

Used in TrustSection and Footer. Badge images are in `public/images/trust/`.

```html
<div class="flex flex-wrap items-center justify-center gap-4 mb-8 opacity-60">
  <img src="/images/trust/badge-1.png" alt="ISO 27001" width="62" height="62" class="w-[62px] h-auto" />
  <img src="/images/trust/badge-2.png" alt="ISO 42001" width="62" height="62" class="w-[62px] h-auto" />
  <img src="/images/trust/badge-3.png" alt="SOC 2 Type II" width="62" height="62" class="w-[62px] h-auto" />
  <img src="/images/trust/badge-4.png" alt="GDPR" width="128" height="39" class="h-[39px] w-auto" />
  <img src="/images/trust/badge-5.png" alt="DPIA" width="62" height="62" class="w-[62px] h-auto" />
</div>
```

## Empty State

```html
<p class="text-ip-white-muted text-lg text-center py-20">No items published yet. Check back soon.</p>
```

## Common SVG Icons

### Arrow right (btn-lime)
```html
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
```

### Play triangle (btn-outline)
```html
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
```

### Shield check (security CTA)
```html
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
```

## Scroll Reveal Animations

Elements can be animated into view on scroll using CSS classes + a shared IntersectionObserver in `BaseLayout.astro`. Add one of these classes to any element and it will animate once when 15% visible:

### Standard reveal (fade + slide up + scale)
Best for content blocks, integration logos, feature cards. Starts invisible, 40px below, at 95% scale.
```html
<div class="mt-12 text-center scroll-reveal">
  <!-- content appears with fade + slide up + subtle scale -->
</div>
```

### Hero reveal (larger displacement, slower)
Best for the hero product screenshot. Starts invisible, 100px below, at 98% scale. Slower 1s transition.
```html
<div class="container-ip relative mt-4 scroll-reveal-hero">
  <img src="/images/hero/hero-main.png" alt="Product screenshot" ... />
</div>
```

### Scale-only reveal (no opacity change)
Best for section containers that should appear "compressed" until scrolled into view. Starts at 95% scale.
```html
<section class="py-20 md:py-32 scroll-reveal-scale">
  <!-- section grows to full size when scrolled into view -->
</section>
```

### Fade-only reveal (pure opacity)
Best for light-background sections where movement would feel heavy. Starts invisible.
```html
<div class="max-w-3xl mx-auto text-center scroll-reveal-fade">
  <!-- content fades in without movement -->
</div>
```

All four classes transition to `opacity: 1; transform: none` via the `.is-visible` class added by the IntersectionObserver. Animations fire once — scrolling back up does not re-hide elements.

## Scroll-Linked Section Wrappers

Used on the homepage to create shrink/grow effects as sections transition. These are continuous scroll-linked transforms (not one-shot reveals).

### Shrink wrapper (ValuePropSection)
Section shrinks and rounds its corners as the user scrolls past, revealing the white background of the next section (HowItWorks).
```html
<div class="shrink-scroll-wrapper">
  <ValuePropSection />  <!-- has class="shrink-section" on its <section> -->
</div>
<HowItWorksSection />  <!-- white bg section revealed underneath -->
```

### Grow wrapper (TrustSection)
Section starts slightly scaled down with rounded corners and grows to full width as the user scrolls it into view. Creates a reverse effect from the shrink.
```html
<HowItWorksSection />  <!-- white bg section above -->
<div class="grow-scroll-wrapper">
  <TrustSection />  <!-- has class="bg-ip-navy grow-section" on its <section> -->
</div>
```

> **Important:** The grow section must have an explicit background color (e.g. `bg-ip-navy`) so the white wrapper background shows through the gap during the animation. The shrink section uses `position: sticky; top: 0` to pin while shrinking.
