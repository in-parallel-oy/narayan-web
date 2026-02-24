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

With alternate background (for visual rhythm):
```html
<section class="py-20 md:py-32 bg-ip-navy-light">
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

## Card Patterns

### Standard content card
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-6 hover:border-ip-white-muted/30 transition-colors">
  <h3 class="font-display text-lg mb-2">Card title</h3>
  <p class="text-ip-white-muted text-sm">Card description.</p>
</div>
```

### Card with icon
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-6 hover:border-ip-white-muted/30 transition-colors">
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

### Featured card (lime border)
```html
<div class="bg-ip-navy-surface border border-ip-lime rounded-xl p-8 text-left relative">
  <span class="absolute -top-3 left-8 bg-ip-lime text-ip-navy text-xs font-display px-3 py-1 rounded-full">Badge text</span>
  <h3 class="font-display text-xl mb-2">Card title</h3>
  <p class="text-ip-white-muted text-sm mb-6">Card description.</p>
  <a href="/demo" class="btn-lime w-full justify-center">CTA text</a>
</div>
```

### Pricing card (standard)
```html
<div class="bg-ip-navy-surface border border-ip-border rounded-xl p-8 text-left">
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

Reusable component imported from `src/components/HeroSection.astro`:

```astro
<HeroSection
  eyebrow="Short context label"
  title="Main heading text"
  titleHighlight="emphasized word"
  description="Description paragraph."
  primaryCta={{ label: "Primary action", href: "#anchor" }}
  secondaryCta={{ label: "Secondary action", href: "/page" }}
/>
```

All props except `title` and `description` are optional.

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

## Numbered Steps / Timeline

```astro
---
const steps = [
  { number: 1, title: 'Step Name', phase: 'Phase:', description: 'Description.' },
];
---

<div class="relative max-w-3xl mx-auto">
  <div class="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-ip-border hidden md:block"></div>
  <div class="space-y-16">
    {steps.map((step) => (
      <div class="text-center relative">
        <div class="inline-flex items-center justify-center w-10 h-10 bg-ip-navy-surface border border-ip-border rounded-full text-sm font-display mb-4">
          {step.number}
        </div>
        <h3 class="font-display text-3xl md:text-4xl mb-4">{step.title}</h3>
        <p class="text-ip-white-muted text-base max-w-lg mx-auto">
          <strong class="text-white">{step.phase}</strong> {step.description}
        </p>
      </div>
    ))}
  </div>
</div>
```

## Logo Row / Integration Badges

```html
<div class="flex flex-wrap items-center justify-center gap-6 opacity-70">
  <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xs">Icon</div>
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
