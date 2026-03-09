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
│  Eyebrow: "AI Note-Taker"                           │
│  H1: "The note-taker that [rotating word]           │
│       your plan."                                   │
│  Rotating words: writes / updates / maintains /     │
│                  rebuilds                           │
│  Description: free note-taker → living plan         │
│  CTAs: "See how it works" · "Start for free"        │
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
│  71% stat (HBR 2017) — meetings are unproductive    │
│  and outcomes rarely reach the plan                 │
│  Cards: Meetings vanish / Notes don't become plans  │
│         / Manual updates burn time                  │
│  Component: src/components/ProblemSection.astro     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  VALUE PROP SECTION  (scroll-pinned/shrink effect)  │
│  "Every meeting writes the plan."                   │
│  Integration icons row                              │
│  Component: src/components/ValuePropSection.astro   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  MEETING MOMENTS  (replaces How It Works on home)   │
│  5 cards: Weekly / Before / During / After /        │
│           Continuous                                │
│  Layout: 3-col top row + 2-col centered bottom row  │
│  "Free" badge on During, "Add-on" on Continuous     │
│  CTA: "See the full workflow" → /how-it-works       │
│  Component: src/components/MeetingMomentsSection.astro│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PRODUCT LADDER                                     │
│  3 tiers: Free AI Note-Taker / Living Plan (€69+)  │
│           / Execution Intelligence (coming soon)    │
│  Layer 1: lime border, "Start for free" → /waitlist │
│  Layer 2: "Book a demo" + "Learn more" → /living-plan│
│  Layer 3: "Learn more" → /execution-intelligence    │
│  Link: "See full pricing details →" → /pricing      │
│  Component: src/components/ProductLadderSection.astro│
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
│  TEAM SECTION                                       │
│  Founders / team → links to /about-us               │
│  Component: src/components/TeamSection.astro        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BOTTOM CTA                                         │
│  "Start capturing for free." + "Book a demo"        │
│  Component: src/components/BottomCtaSection.astro   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FOOTER                                             │
│  Component: src/components/Footer.astro             │
│  (rendered by BaseLayout)                           │
└─────────────────────────────────────────────────────┘
```

## Section count: 12 sections + nav + footer

## Notes

- IntegrationsSection moved to /how-it-works page (not on homepage)
- MeetingMomentsSection has 5 moments in a 3+2 grid layout
- ProductLadderSection links to /living-plan and /execution-intelligence sub-pages
