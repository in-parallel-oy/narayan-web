# Home Page — Information Architecture

Source: `src/pages/index.astro`

```
┌─────────────────────────────────────────────────────┐
│  NAV  (fixed, dark frosted glass)                   │
│  Logo · Links · "Book a demo" CTA                   │
│  Component: src/components/Nav.astro                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Eyebrow: "Execution Intelligence"                  │
│  H1: "Your [rotating word] plan          │
│       is lying to you."                                │
│  Rotating words: project / program / account /      │
│                  team / operations                  │
│  Subtitle + description                             │
│  CTAs: "See how it works" · "Book a demo"           │
│  Product screenshot / video (Vimeo)                 │
│  Component: src/components/HeroSection.astro        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  SOCIAL PROOF BAR                                   │
│  Customer logos / trust badges                      │
│  Component: src/components/SocialProofBar.astro     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PROBLEM SECTION                                    │
│  The pain points In Parallel solves                 │
│  Component: src/components/ProblemSection.astro     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  VALUE PROP SECTION  (scroll-pinned/shrink effect)  │
│  Core product value propositions                    │
│  Component: src/components/ValuePropSection.astro   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  HOW IT WORKS  (anchor: #how-it-works)              │
│  Step 1 — Before: briefing + integration icons      │
│  Step 2 — During: AI listens, captures decisions    │
│  Step 3 — After: plan updates, tools sync           │
│  Component: src/components/HowItWorksSection.astro  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  IMPACT SECTION                                     │
│  Metrics / outcomes / ROI statements                │
│  Component: src/components/ImpactSection.astro      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EXECUTION SCOPES  (anchor: #product)               │
│  Feature cards by scope / role                      │
│  Component: src/components/ExecutionScopesSection.astro │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  TRUST SECTION                                      │
│  Security / compliance / trust signals              │
│  Component: src/components/TrustSection.astro       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHITE PAPERS                                       │
│  Featured research / gated downloads                │
│  Component: src/components/WhitePapersSection.astro │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  INTEGRATIONS                                       │
│  Integration logos + description                    │
│  Component: src/components/IntegrationsSection.astro│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  TEAM SECTION                                       │
│  Founders / team → links to /about-us               │
│  Component: src/components/TeamSection.astro        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BOTTOM CTA                                         │
│  "Book a demo" · "See how it works"                 │
│  Component: src/components/BottomCtaSection.astro   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FOOTER                                             │
│  Component: src/components/Footer.astro             │
│  (rendered by BaseLayout)                           │
└─────────────────────────────────────────────────────┘
```

## Section count: 12 sections + nav + footer
