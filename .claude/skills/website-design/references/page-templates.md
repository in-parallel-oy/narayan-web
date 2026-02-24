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
