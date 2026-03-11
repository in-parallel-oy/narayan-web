# Page Templates Reference

Templates for creating new pages. Every page is an Astro file in `src/pages/`.

## Required Page Boilerplate

Every page MUST include:

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title - In Parallel" description="SEO description.">
  <!-- content -->
</BaseLayout>
```

Rules:
- `export const prerender = true;` is required for all pages
- `BaseLayout` provides Nav, main wrapper, and Footer
- `title` format: "Page Name - In Parallel"
- `description` is strongly recommended for SEO
- `ogImage` is optional (defaults to `/images/og-default.png`)

## Template A: Marketing Page (Hero + Sections)

Used by: Homepage (`index.astro`)

Best for: landing pages with a large hero and multiple content sections.

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
import HeroSection from '../components/HeroSection.astro';
---

<BaseLayout title="Page Title - In Parallel" description="Description.">
  <HeroSection
    eyebrow="Short context label"
    title="Main heading"
    titleHighlight="emphasized word"
    description="Description paragraph."
    primaryCta={{ label: "Primary action", href: "#section" }}
    secondaryCta={{ label: "Secondary action", href: "/page" }}
  />

  <!-- Sections use varying backgrounds for visual rhythm (dark, light, white, periwinkle) -->
  <SectionOne />
  <SectionTwo />
  <SectionThree />
</BaseLayout>
```

## Template B: Content Page (Left-Aligned)

Used by: about-us, careers, press, security

Best for: text-heavy pages with left-aligned content.

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title - In Parallel" description="Description.">
  <section class="pt-32 pb-20 md:pt-44 md:pb-32">
    <div class="container-ip">
      <p class="text-ip-white-muted text-base mb-4 font-display">Eyebrow text</p>
      <h1 class="font-serif text-5xl md:text-7xl lg:text-[90px] leading-[1.1] tracking-tight mb-8">
        Page heading.
      </h1>
      <div class="max-w-3xl">
        <p class="text-ip-white-muted text-lg leading-relaxed mb-4">First paragraph.</p>
        <p class="text-ip-white-muted text-lg leading-relaxed">Second paragraph.</p>
      </div>
    </div>
  </section>

  <section class="py-20 bg-ip-navy-light">
    <div class="container-ip">
      <!-- Additional content -->
    </div>
  </section>
</BaseLayout>
```

## Template C: Centered Page

Used by: pricing, demo, waitlist, 404

Best for: pages with a single focus area or centered form/widget.

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title - In Parallel" description="Description.">
  <section class="pt-32 pb-20 md:pt-44 md:pb-32">
    <div class="container-ip text-center">
      <h1 class="font-serif text-5xl md:text-7xl tracking-tight mb-8">Page title</h1>
      <p class="text-ip-white-muted text-lg max-w-2xl mx-auto mb-12">
        Description paragraph, centered.
      </p>

      <div class="max-w-lg mx-auto">
        <!-- Form, widget, or cards -->
      </div>
    </div>
  </section>
</BaseLayout>
```

## Template D: Legal/Document Page

Used by: privacy-policy, terms-of-use, cookie-policy

Best for: long-form text documents.

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Document Title - In Parallel" description="Description.">
  <section class="pt-32 pb-20 md:pt-44 md:pb-32">
    <div class="container-ip max-w-3xl">
      <h1 class="font-display text-4xl md:text-5xl tracking-tight mb-12">Document Title</h1>
      <div class="prose prose-invert prose-lg max-w-none prose-headings:font-display">
        <h2>Section heading</h2>
        <p>Paragraph text...</p>
      </div>
    </div>
  </section>
</BaseLayout>
```

Note: legal pages use `font-display` for H1, not `font-serif`.

## Template E: CMS Listing Page

Used by: insight/index, routines/index

Best for: index pages listing content from Sanity CMS.

```astro
---
export const prerender = true;

import BaseLayout from '../../layouts/BaseLayout.astro';
import { sanityClient, urlFor } from '../../lib/sanity';

const items = await sanityClient.fetch(`
  *[_type == "contentType"] | order(date desc) {
    _id, title, slug, description, category, image
  }
`);
---

<BaseLayout title="Items - In Parallel" description="Listing description.">
  <section class="pt-32 pb-20 md:pt-44 md:pb-32">
    <div class="container-ip">
      <h1 class="font-serif text-5xl md:text-7xl tracking-tight mb-4">Page Title</h1>
      <p class="text-ip-white-muted text-lg max-w-2xl mb-12">Optional description.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <a href={`/type/${item.slug.current}`} class="group bg-ip-navy-surface border border-ip-border rounded-xl p-6 hover:border-ip-white-muted/30 transition-colors no-underline">
            {item.category && (
              <span class="text-ip-lime text-xs font-display uppercase tracking-wider">{item.category}</span>
            )}
            <h2 class="font-display text-lg mt-2 mb-2 group-hover:text-ip-lime transition-colors">{item.title}</h2>
            <p class="text-ip-white-muted text-sm">{item.description}</p>
          </a>
        ))}
      </div>

      {items.length === 0 && (
        <p class="text-ip-white-muted text-lg text-center py-20">No items published yet. Check back soon.</p>
      )}
    </div>
  </section>
</BaseLayout>
```

## Template G: Product Argument Page (Light Hero + Bento Sections)

Used by: `better-with-ai.astro`, use-case pages, compare pages

Best for: persuasive marketing pages that argue a position with a light
hero, bento-style data/problem cards, and a dark-section solution flow.

Structure:
1. Light hero (`bg-white text-ip-navy`, `navTheme="light"`) — eyebrow, h1,
   description, dual CTAs, editorial lead image with parallax
2. Dark bento problem section (`bg-ip-navy`, `data-parallax`) — 4-card layout:
   large stat + large supporting + 2 small (cols balance at 5+3 / 2+2 rows)
3. Dark-alt bento 2×2 solution (`bg-ip-navy-light`) — numbered feature props
4. Light comparison (`bg-white text-ip-navy`) — dark bento cards on white bg
5. Dark-alt feature grid (`bg-ip-navy-light`) — plain 3-col card grid (not bento)
6. Dark quotes marquee (`bg-ip-navy overflow-hidden`) — full-bleed, no container-ip
7. `<BottomCtaSection />`

```astro
---
export const prerender = true;

import BaseLayout from '../layouts/BaseLayout.astro';
import BottomCtaSection from '../components/BottomCtaSection.astro';

// ② Solution section data
const valueProps = [
  { number: '01', title: 'Feature one', description: 'Description of the first feature.' },
  { number: '02', title: 'Feature two', description: 'Description of the second feature.' },
  { number: '03', title: 'Feature three', description: 'Description of the third feature.' },
  { number: '04', title: 'Feature four', description: 'Description of the fourth feature.' },
];

// ④ Comparison section data
const withoutItems = ['Limitation one', 'Limitation two', 'Limitation three', 'Limitation four', 'Limitation five'];
const withItems    = ['Benefit one',    'Benefit two',    'Benefit three',    'Benefit four',    'Benefit five'];

// ⑤ Feature grid data — { title, description } (tool field optional)
const features = [
  { title: 'Feature heading one',   description: 'Description. Can include an example use-case in italics below.' },
  { title: 'Feature heading two',   description: 'Description.' },
  { title: 'Feature heading three', description: 'Description.' },
  { title: 'Feature heading four',  description: 'Description.' },
  { title: 'Feature heading five',  description: 'Description.' },
];

// ⑥ Quotes marquee data
const quotes = [
  { text: 'Quote text here.', author: 'Job Title', company: 'Company type' },
  { text: 'Quote text here.', author: 'Job Title', company: 'Company type' },
  { text: 'Quote text here.', author: 'Job Title', company: 'Company type' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Page Title — In Parallel',
  description: 'One-sentence description.',
  url: 'https://www.in-parallel.com/page-slug',
};
---

<BaseLayout
  navTheme="light"
  title="Page Title — In Parallel"
  description="SEO description (shown in search results and social shares)."
  jsonLd={jsonLd}
>

  <!-- ① Hero — light bg -->
  <section class="pt-32 pb-4 md:pt-44 md:pb-6 bg-white text-ip-navy">
    <div class="container-ip max-w-5xl">
      <div class="text-center relative z-10">
        <p class="section-eyebrow section-eyebrow--navy mb-4 scroll-reveal">Eyebrow label</p>
        <h1 class="font-serif text-6xl md:text-8xl tracking-tight mb-6 text-ip-navy scroll-reveal">
          Hero heading line one.<br class="hidden md:block" />
          Hero heading line two.
        </h1>
        <p class="text-ip-navy/60 text-lg leading-relaxed max-w-[52ch] mx-auto mb-10 scroll-reveal">
          Supporting description paragraph, up to ~50 characters per line.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 scroll-reveal">
          <a href="/waitlist" class="btn-primary btn-primary--navy">
            Start for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/demo" class="btn-secondary btn-secondary--navy">
            Book a demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <!-- Lead image: generate with /editorial-image, use -light variant on white bg -->
      <div class="relative mt-4 scroll-reveal-hero" data-parallax="0.1" style="will-change: transform;">
        <img
          src="/images/generated/{slug}/{slug}-N-light.png"
          alt="Descriptive alt text"
          width="1200"
          height="675"
          class="w-full rounded-xl"
        />
      </div>
    </div>
  </section>

  <!-- ② Problem / paradox — dark bento (4 cards, 2-column layout) -->
  <!--   Col layout at lg (12 cols): stat=6 rows 1-5 | supporting=6 rows 1-3 | sm2=3 rows 4-5 | sm3=3 rows 4-5 -->
  <section class="py-20 md:py-32 bg-ip-navy" data-parallax="0.05" style="will-change: transform;">
    <div class="container-ip max-w-5xl">
      <div class="text-center mb-16">
        <p class="section-eyebrow mb-4 scroll-reveal">Why it breaks</p>
        <h2 class="font-display text-3xl md:text-6xl tracking-tight mb-8 scroll-reveal">
          Problem heading.
        </h2>
        <p class="text-ip-white-muted text-lg leading-relaxed max-w-[52ch] mx-auto scroll-reveal">
          One sentence framing the core tension.
        </p>
      </div>

      <div class="grid-bento scroll-reveal">

        <!-- Stat card — large, glowing, content at bottom -->
        <div class="bento-cell bento-cell--glow bento-cell--pad bento-cell--bottom col-span-4 md:col-span-8 lg:col-span-6 row-span-4 lg:row-span-5">
          <p class="font-display text-8xl leading-none text-ip-lime mb-3">XX%</p>
          <p class="font-display text-2xl md:text-3xl text-white mb-2">Stat headline — what the number means.</p>
          <p class="text-ip-white-muted text-sm leading-tight">Explanation of the stat and its implication.</p>
          <p class="font-mono text-[10px] text-ip-white-muted/40 tracking-wide uppercase mt-4">Source Name Year</p>
        </div>

        <!-- Supporting card — full right column width, heading top / body bottom -->
        <div class="bento-cell bento-cell--surface bento-cell--pad bento-cell--top col-span-4 md:col-span-8 lg:col-span-6 row-span-3">
          <h3 class="font-display text-3xl mb-3">Paradox one</h3>
          <p class="text-ip-white-muted text-sm leading-tight mt-auto max-w-sm">Description of the first paradox or problem.</p>
        </div>

        <!-- Small card — left half of right column -->
        <div class="bento-cell bento-cell--pad bento-cell--top col-span-4 md:col-span-4 lg:col-span-3 row-span-2">
          <h3 class="font-display text-lg leading-tight mb-3">Paradox two</h3>
          <p class="text-ip-white-muted text-sm leading-tight mt-auto">Description of the second paradox.</p>
        </div>

        <!-- Small card — right half of right column, alternate surface -->
        <div class="bento-cell bento-cell--surface bento-cell--pad bento-cell--top col-span-4 md:col-span-4 lg:col-span-3 row-span-2">
          <h3 class="font-display text-lg mb-3">Paradox three</h3>
          <p class="text-ip-white-muted text-sm leading-tight mt-auto">Description of the third paradox.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- ③ Solution — dark-alt bento (2×2 numbered props) -->
  <section class="py-20 md:py-32 bg-ip-navy-light">
    <div class="container-ip max-w-5xl">
      <div class="text-center mb-16">
        <p class="section-eyebrow mb-4 scroll-reveal">The fix</p>
        <h2 class="font-display text-3xl md:text-6xl tracking-tight mb-8 scroll-reveal">
          Solution heading.
        </h2>
      </div>

      <div class="grid-bento scroll-reveal">
        {valueProps.map((prop) => (
          <div class="bento-cell bento-cell--surface bento-cell--pad bento-cell--top col-span-4 md:col-span-4 lg:col-span-6 row-span-3">
            <p class="font-mono text-xs text-ip-white-muted/40 tracking-wide uppercase mb-3 select-none">{prop.number}</p>
            <h3 class="font-display text-lg md:text-xl">{prop.title}</h3>
            <p class="text-ip-white-muted text-sm leading-tight mt-auto">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ④ Side-by-side comparison — light bg, dark bento cards -->
  <section class="py-20 md:py-32 bg-white text-ip-navy">
    <div class="container-ip max-w-5xl">
      <div class="text-center mb-16">
        <p class="section-eyebrow section-eyebrow--navy mb-4 scroll-reveal">Side by side</p>
        <h2 class="font-display text-3xl md:text-6xl tracking-tight mb-8 text-ip-navy scroll-reveal">
          Comparison heading.
        </h2>
      </div>

      <div class="grid-bento scroll-reveal">
        <!-- Without (no surface = darker base, dash icon) -->
        <div class="bento-cell bento-cell--pad bento-cell--top col-span-4 md:col-span-4 lg:col-span-6 row-span-4">
          <p class="font-display text-sm uppercase tracking-widest text-ip-white-muted/40 mb-6">Without In Parallel</p>
          <ul class="space-y-4 mt-auto">
            {withoutItems.map((item) => (
              <li class="flex items-start gap-3 text-ip-white-muted text-sm leading-tight">
                <svg class="w-4 h-4 text-ip-white-muted/30 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 12H4"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <!-- With (surface = lighter, lime checkmark, lime label) -->
        <div class="bento-cell bento-cell--surface bento-cell--pad bento-cell--top col-span-4 md:col-span-4 lg:col-span-6 row-span-4">
          <p class="font-display text-sm uppercase tracking-widest text-ip-lime mb-6">With In Parallel</p>
          <ul class="space-y-4 mt-auto">
            {withItems.map((item) => (
              <li class="flex items-start gap-3 text-ip-white-muted text-sm leading-tight">
                <svg class="w-4 h-4 text-ip-lime mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ⑤ Feature grid — dark-alt, plain 3-col cards (NOT bento) -->
  <section class="py-20 md:py-32 bg-ip-navy-light">
    <div class="container-ip max-w-5xl">
      <div class="text-center mb-16">
        <p class="section-eyebrow mb-4 scroll-reveal">Section eyebrow</p>
        <h2 class="font-display text-3xl md:text-6xl tracking-tight mb-8 scroll-reveal">
          Feature section heading.
        </h2>
        <p class="text-ip-white-muted text-lg leading-relaxed max-w-[52ch] mx-auto scroll-reveal">
          Supporting description.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal">
        {features.map((item) => (
          <div class="bg-ip-navy-surface border border-ip-border rounded-xl p-6">
            <h3 class="font-display text-lg mb-3">{item.title}</h3>
            <p class="text-ip-white-muted text-sm leading-tight italic">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ⑥ Quotes marquee — dark, full-bleed (no container-ip) -->
  <section class="py-20 md:py-32 bg-ip-navy overflow-hidden">
    <div class="quote-marquee" aria-label="Customer quotes">
      <div class="quote-marquee-track">
        {[...quotes, ...quotes].map((q) => (
          <blockquote class="quote-marquee-card">
            <p class="font-serif text-xl md:text-2xl leading-snug tracking-tight mb-4">
              &ldquo;{q.text}&rdquo;
            </p>
            <footer class="text-ip-white-muted text-sm">
              &mdash; {q.author}, {q.company}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>

  <!-- ⑦ Bottom CTA -->
  <BottomCtaSection />

</BaseLayout>
```

Key notes:
- `navTheme="light"` — nav auto-adapts to white hero bg
- `btn-primary--navy` / `btn-secondary--navy` — navy-on-lime variants for light bg CTAs
- Hero padding is `pb-4 md:pb-6` (not the standard `pb-20 md:pb-32`) to tighten the lead image gap
- Lead image: use `-light` editorial variant; `data-parallax="0.1"` + `will-change: transform` — BaseLayout handles the scroll handler
- Problem section: `data-parallax="0.05"` for subtle counter-parallax
- Bento row math at lg: stat `row-span-5` = supporting `row-span-3` + small2/3 `row-span-2` (both halves of the right column must sum to the stat height)
- `bento-cell--bottom` = content pushed to bottom of cell; `bento-cell--top` = heading at top + `mt-auto` on body paragraph
- Feature grid (⑤) uses plain `bg-ip-navy-surface border border-ip-border rounded-xl p-6` cards — NOT bento classes
- Quote marquee (⑥) has no `container-ip` — `div.quote-marquee` sits directly inside the section

## Template F: CMS Detail Page

Used by: insight/[...slug], routines/[...slug]

Best for: individual content items from Sanity CMS.

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { sanityClient, urlFor } from '../../lib/sanity';
import { toHTML } from '@portabletext/to-html';

export const prerender = true;

export async function getStaticPaths() {
  const items = await sanityClient.fetch(`*[_type == "contentType"] { slug }`);
  return items.map((item: any) => ({
    params: { slug: item.slug.current },
  }));
}

const { slug } = Astro.params;
const item = await sanityClient.fetch(
  `*[_type == "contentType" && slug.current == $slug][0] {
    _id, title, slug, description, category, body, image
  }`,
  { slug }
);

if (!item) {
  return Astro.redirect('/404');
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const src = urlFor(value).width(800).url();
      const alt = value.alt || '';
      const caption = value.caption || '';
      const figcaption = caption ? '<figcaption>' + caption + '</figcaption>' : '';
      return '<figure><img src="' + src + '" alt="' + alt + '" />' + figcaption + '</figure>';
    },
  },
};

const bodyHtml = item.body ? toHTML(item.body, { components: portableTextComponents }) : '';
---

<BaseLayout title={`${item.title} - In Parallel`} description={item.description}>
  <article class="pt-32 pb-20 md:pt-44 md:pb-32">
    <div class="container-ip max-w-3xl">
      <a href="/type" class="text-ip-white-muted text-sm hover:text-white mb-6 inline-block no-underline">&larr; Back to Items</a>

      {item.category && (
        <span class="text-ip-lime text-xs font-display uppercase tracking-wider">{item.category}</span>
      )}
      <h1 class="font-serif text-4xl md:text-6xl tracking-tight mt-2 mb-8">{item.title}</h1>

      {item.image && (
        <img src={urlFor(item.image).width(800).url()} alt={item.image.alt || item.title} class="w-full rounded-xl mb-12" />
      )}

      <div class="prose prose-invert prose-lg max-w-none
        prose-headings:font-display prose-headings:tracking-tight
        prose-a:text-ip-lime prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white
      " set:html={bodyHtml} />
    </div>
  </article>
</BaseLayout>
```

Key conventions for CMS pages:
- Listing: `src/pages/{type}/index.astro`
- Detail: `src/pages/{type}/[...slug].astro`
- Always include a "Back to ..." link at top of detail pages
- Always handle 404 with `Astro.redirect('/404')`

## Adding a Page to Navigation

### Main nav (`src/components/Nav.astro`)
```typescript
const navItems = [
  // ... existing items
  { label: 'New Page', href: '/new-page' },
];
```

### Footer nav (`src/components/Footer.astro`)
Add to the appropriate link array (`navLinks` or `legalLinks`).

## Creating a New Section Component

1. Create `src/components/NewSectionName.astro`
2. Use the Section Shell pattern from component-patterns.md
3. Import in the target page
4. Respect background alternation with adjacent sections

Naming convention: `PascalCaseSection.astro`

## Sitemap of Existing Pages

| Route | File | Template |
|---|---|---|
| `/` | `src/pages/index.astro` | A (Hero + sections) |
| `/better-with-ai` | `src/pages/better-with-ai.astro` | G (Product argument) |
| `/about-us` | `src/pages/about-us.astro` | B (Left-aligned) |
| `/pricing` | `src/pages/pricing.astro` | C (Centered) |
| `/demo` | `src/pages/demo.astro` | C (Centered) |
| `/waitlist` | `src/pages/waitlist.astro` | C (Centered) |
| `/security` | `src/pages/security.astro` | B (Left-aligned) |
| `/careers` | `src/pages/careers.astro` | B (Left-aligned) |
| `/press` | `src/pages/press.astro` | B (Left-aligned) |
| `/white-papers` | `src/pages/white-papers.astro` | B (Left-aligned) |
| `/insight` | `src/pages/insight/index.astro` | E (CMS listing) |
| `/insight/[slug]` | `src/pages/insight/[...slug].astro` | F (CMS detail) |
| `/routines` | `src/pages/routines/index.astro` | E (CMS listing) |
| `/routines/[slug]` | `src/pages/routines/[...slug].astro` | F (CMS detail) |
| `/privacy-policy` | `src/pages/privacy-policy.astro` | D (Document) |
| `/terms-of-use` | `src/pages/terms-of-use.astro` | D (Document) |
| `/cookie-policy` | `src/pages/cookie-policy.astro` | D (Document) |
| `/404` | `src/pages/404.astro` | C (Centered) |
| `/studio` | (auto-generated) | Sanity CMS Studio |
