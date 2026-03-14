# Site IA — In Parallel
> Full section-by-section map of every page. Companion to `IA-HOME.md` (homepage) and `IA-SITEMAP.md` (URL tree).
> Last updated: 2026-03-10

---

## Page Index

| # | Page | URL | Category |
|---|---|---|---|
| 1 | Pricing | `/pricing` | Product argument |
| 2 | Security | `/security` | Product argument |
| 3 | About Us | `/about-us` | Visual / Brand |
| 4 | Our Vision | `/our-vision` | Editorial |
| 5 | Waitlist | `/waitlist` | Product |
| 6 | Resources | `/resources` | Editorial |
| 7 | Careers | `/careers` | Visual / Brand |
| 8 | Press | `/press` | Visual / Brand |
| 9 | 404 | `/404` | — |
| 10 | Use Case Index | `/use-case` | Product argument |
| 11–17 | Use Case Detail × 7 | `/use-case/[role]` | Product argument |
| 18 | Compare Index | `/compare` | Product argument |
| 19–25 | Compare Detail × 7 | `/compare/[tool]` | Product argument |
| 26 | Insight Index | `/insight` | Editorial |
| 27 | White Papers | `/white-papers` | Editorial |

---

## 1. Pricing
`src/pages/pricing.astro` · Light theme (bg-white, text-ip-navy)

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  H1: "Pricing"                                      │
│  Subtitle: "Start free with the AI notetaker.      │
│  Add the Living Plan when you're ready to turn      │
│  meeting signals into execution."                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PRICING CARDS  (3-column grid, gap-6)              │
│                                                     │
│  Card 1 — AI NOTE-TAKER                             │
│  Price: €0 · free forever                           │
│  5 features: silent joins, transcription,           │
│  summaries, decisions/risks, zero friction          │
│  CTA: "Start for free" → /waitlist                  │
│                                                     │
│  Card 2 — LIVING PLAN  [Recommended badge]          │
│  Price: €29–59/scope/month                          │
│  8 features (everything in Free, plus):             │
│  auto-updates, priority recalc, drift detection,    │
│  tool integrations, DPA, EU residency, retention,   │
│  no model training                                  │
│  CTA: "Book a demo" → /demo                         │
│                                                     │
│  Card 3 — ENTERPRISE  [Coming soon badge]           │
│  Price: Custom                                      │
│  8 features: MCP platform, leadership skills,       │
│  decision velocity, risk intelligence, SSO/SCIM,    │
│  audit logs, custom retention, DPIA                 │
│  CTA: "Talk to us" → /demo                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  LIVING PLAN TIERS  (4-column grid)                 │
│  H2: "Living Plan tiers"                            │
│  Subtext: "Longer commitment, lower price."         │
│                                                     │
│  Tier 1 — Flexible (monthly)      €69/scope/mo      │
│  Tier 2 — Annual 12mo [Best value] €59/scope/mo     │
│  Tier 3 — Multi-Year 24mo          €49/scope/mo     │
│  Tier 4 — Strategic Enterprise 36mo €39/scope/mo    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  CALLOUT  (2-column grid)                           │
│  "500+ scopes? Volume discounts."                   │
│  "Typical payback: under 1 week — ~10× ROI"        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  THE SMALL PRINT                                    │
│  H2: "The small print"                              │
│  Pricing details, General Terms link, tax info,     │
│  payment 30 days, EUR currency                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BOTTOM CTA                                         │
│  H2: "Not sure which plan fits?"                    │
│  CTAs: "Start for free" → /waitlist                 │
│        "Book a demo" → /demo                        │
└─────────────────────────────────────────────────────┘
```
Section count: 5 + hero

---

## 2. Security
`src/pages/security.astro` · Dark theme

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  H1: "Security"                                     │
│  Subheading (lime): "EU data sovereignty.           │
│  Enterprise-grade security. No compromises."        │
│  Body: 2 paragraphs on EU hosting + standards       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  CERTIFICATION CARDS  (2-column grid)               │
│  EU Data Sovereignty · ISO 27001 · ISO 42001        │
│  SOC 2 Type II · GDPR Compliant                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  MORE INFORMATION                                   │
│  H2: "More information"                             │
│  Body: trust portal + white papers reference        │
│  CTAs: "Trust portal" (external) → trust.in-parallel.com │
│        "White papers" → /white-papers               │
└─────────────────────────────────────────────────────┘
```
Section count: 2 + hero

---

## 3. About Us
`src/pages/about-us.astro` · Dark theme with one light section

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  H1: "We empower organizations and people           │
│       to do the right things right."                │
│  Body: 3 paragraphs — vision, IMS offering,         │
│  result (fewer rituals, living picture)             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  VISION & MISSION  (light bg, 2-column grid)        │
│  Eyebrow: "We are building the future of work"      │
│  Column 1 — H2: "Our vision"                        │
│  "AI amplifies the human contribution when we       │
│  rethink the work around it..."                     │
│  Column 2 — H2: "Our mission"                       │
│  "Empower organizations and people to do the right  │
│  things right — every week, not just every quarter."│
│  Callout box: "What that means in practice: We      │
│  connect the dots across meetings, project tools,   │
│  Slack/Teams, and email..."                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  LEADERSHIP  (3-column grid, 6 people)              │
│  Eyebrow: "Our leadership"                          │
│  H2: "Built by people who've felt this problem      │
│       firsthand."                                   │
│  Cards: photo · name · role · bio · LinkedIn        │
│                                                     │
│  Markku Mäkeläinen — Co-founder & CEO               │
│  Kristian Luoma — Co-founder, Product               │
│  Michal Olczak — CTO                                │
│  Jari Heinonen — Head of Sales                      │
│  Sami Niemelä — Head of Design                      │
│  Topi Järvinen — Head of Customer Success           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  JOIN US  (light bg)                                │
│  H2: "Join us to do the right things right."        │
│  CTA: "See open positions" → /careers               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  OFFICES  (2 locations with embedded maps)          │
│  Helsinki (HQ) — Salomonkatu 17 B, 00100            │
│  Munich — Freddie-Mercury-Straße 5, 80797           │
└─────────────────────────────────────────────────────┘
```
Section count: 4 + hero

---

## 4. Our Vision
`src/pages/our-vision.astro` · Alternating dark / light / light-gray sections

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Eyebrow: "Coordination tax"                        │
│  H1: "The hidden cost that kills execution —        │
│       and how to eliminate it."                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PREFACE  (dark)                                    │
│  Long body: why organizations fail → the gap →      │
│  the coordination tax                               │
│  Pull quote: "That invisible work is the            │
│  coordination tax."                                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PRODUCT SCREENSHOT  (dark)                         │
│  Full-width dashboard image                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EVIDENCE  (light)                                  │
│  Eyebrow: "The evidence"                            │
│  H2: "This isn't a theory. It's measurable."        │
│  2×2 stat grid:                                     │
│  58% workday on "work about work" (Asana 2022)      │
│  103h lost/year to unnecessary meetings (HBR 2017)  │
│  37% time in meetings — half ineffective (McKinsey) │
│  1.9× cost overrun from poor alignment (PMI 2021)   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  THE SCALE PROBLEM  (dark)                          │
│  Eyebrow: "Why it compounds"                        │
│  H2: "The tax grows with every layer."              │
│  3 tiers with animated bar charts:                  │
│  One person → 8% tax                               │
│  One team → 35% tax                                │
│  Multiple teams → 92% tax                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  THE SHIFT  (white, dark text)                      │
│  Eyebrow: "The shift"                               │
│  H2: "From tax to layer."                           │
│  3 paragraphs: PM tools lie → coordination layer    │
│  is the fix                                         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  MEETINGS AS DATA LAYER  (light-gray, dark text)    │
│  Eyebrow: "The hidden data layer"                   │
│  H2: "Meetings are the most consequential data      │
│       system in your organization."                 │
│  4 paragraphs + pull quote                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHAT A COORDINATION LAYER IS  (white, dark text)   │
│  Eyebrow: "Architecture"                            │
│  H2: "What a coordination layer actually is."       │
│  2×3 numbered capability cards:                     │
│  1. Listens · 2. Extracts · 3. Maintains state      │
│  4. Propagates · 5. Detects drift · 6. Recalculates │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHY PM TOOLS CAN'T BE THE LAYER  (light-gray)      │
│  Eyebrow: "The structural gap"                      │
│  H2: "Why your PM tool can't be the coordination    │
│       layer."                                       │
│  3 paragraphs + 2×5 comparison table:               │
│  PM tools vs coordination layer                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  THE COMPOUND EFFECT  (white, dark text)            │
│  Eyebrow: "The compound effect"                     │
│  H2: "A layer that gets smarter the more you use it."│
│  5 numbered capability cards:                       │
│  Decision history · Behavioral patterns             │
│  Cross-scope visibility · Predictive signals        │
│  Organizational continuity                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  LAYER → MEMORY → INTELLIGENCE  (light-gray)        │
│  Eyebrow: "The trajectory"                          │
│  H2: "Layer → memory → intelligence."              │
│  3-column progression:                              │
│  Capture (Free) → Coordination (Living Plan)        │
│  → Intelligence (Coming soon)                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  HOW IN PARALLEL DELIVERS THIS  (dark)              │
│  Eyebrow: "The result"                              │
│  H2: "In Parallel is the coordination layer."       │
│  3 paragraphs + 3 benefit cards:                    │
│  6–8h saved/person/week · 100% alignment            │
│  2× faster cross-team decisions                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EMAIL CAPTURE                                      │
│  "Get the full picture" · Subscribe                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (light)                                 │
│  H2: "Stop paying the tax."                         │
│  CTAs: "Book a demo" · "See how it works"           │
└─────────────────────────────────────────────────────┘
```
Section count: 12 + hero · Longest page on the site

---

## 5. Waitlist
`src/pages/waitlist.astro` · Dark theme

```
┌─────────────────────────────────────────────────────┐
│  HERO  (2-column layout)                            │
│  Eyebrow: "Free for teams"                          │
│  H1: "Check if your team qualifies."                │
│  Left: feature checklist (4 items)                  │
│  Right: eligibility form card                       │
│    Fields: work email · full name · company ·       │
│    job title · team size (dropdown)                 │
│    Submit: "Check eligibility" → webhook            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHAT HAPPENS NEXT  (3-column steps)                │
│  H2: "What happens next?"                           │
│  1. We review your application (24h)                │
│  2. We schedule a walkthrough (30-min)              │
│  3. You get free access + onboarding                │
└─────────────────────────────────────────────────────┘
```
Section count: 1 + hero

---

## 6. Resources
`src/pages/resources.astro` · Dark theme

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Eyebrow: "Resources"                               │
│  H1: "Learn & build"                                │
│  Body: "Research, frameworks, and playbooks..."     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHITE PAPERS  (2-column grid)                      │
│  Label: "Research" · "View all →" → /white-papers   │
│  Paper 1: "The Coordination Tax" → /white-papers    │
│  Paper 2: "From Coordination Tax to Coordination    │
│           Layer" → /our-vision                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  LATEST INSIGHTS  (3-column grid, CMS)              │
│  Label: "Blog" · "View all →" → /insight            │
│  Cards: image · category · title · author · date    │
│  [Conditional — hidden if no posts]                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ROUTINES / TEMPLATES  (3-column grid, CMS)         │
│  Label: "Templates" · "View all →" → /routines      │
│  Cards: icon · ROUTINE label · title · description  │
│  [Conditional — hidden if no routines]              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  USE CASES BY ROLE  (2×4 grid)                      │
│  Label: "By role" · "View all →" → /use-case        │
│  8 role links: Team Lead · PM · Program Manager     │
│  Engineering Leader · COO · Strategy · AE           │
│  + Product Overview                                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EMAIL CAPTURE                                      │
│  "Stay ahead of the curve" · Subscribe              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BOTTOM CTA  (light bg)                             │
│  H2: "Ready to see it in action?"                   │
│  CTA: "Book a demo" → /demo                         │
└─────────────────────────────────────────────────────┘
```
Section count: 6 + hero

---

## 7. Careers
`src/pages/careers.astro` · Dark theme · Thin page

```
┌─────────────────────────────────────────────────────┐
│  PAGE HEADER                                        │
│  H1: "Careers"                                      │
│  Body: "We're building the next generation of       │
│        enterprise software from Helsinki..."        │
│  Placeholder: "No open positions at the moment.     │
│  Send your application to info@in-parallel.com"     │
└─────────────────────────────────────────────────────┘
```
Section count: hero only · Needs expansion

---

## 8. Press
`src/pages/press.astro` · Dark theme · Thin page

```
┌─────────────────────────────────────────────────────┐
│  PAGE HEADER                                        │
│  H1: "Press"                                        │
│  Body: "For press inquiries, contact                │
│        info@in-parallel.com"                        │
└─────────────────────────────────────────────────────┘
```
Section count: hero only · Needs expansion

---

## 9. 404
`src/pages/404.astro` · Dark theme · Full-viewport

```
┌─────────────────────────────────────────────────────┐
│  ERROR PAGE  (full viewport, animated)              │
│  Background: broken grid SVG lines + pulsing nodes  │
│  Ghost text: "404" (very faint)                     │
│  Eyebrow: "Signal lost"                             │
│  H1: "This page drifted"                            │
│      "off the plan."  (second line lighter)         │
│  Body: "The link you followed no longer exists..."  │
│  CTAs: "Back to home" → /                           │
│        "Read our insights" → /insight               │
└─────────────────────────────────────────────────────┘
```

---

## 10. Use Case Index
`src/pages/use-case/index.astro` · Dark theme

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Eyebrow: "Use cases"                               │
│  H1: "One platform.                                 │
│       Every seat at the table."                     │
│  Body: "In Parallel works differently for each      │
│        role — because coordination looks different  │
│        from every angle."                           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ROLE GRID  (2–3 column, 7 cards)                   │
│  Each card: icon · role name · benefit · "Learn more"│
│                                                     │
│  COO / Operations Leader → /use-case/coo            │
│  Program Manager → /use-case/program-manager        │
│  Project Manager → /use-case/project-manager        │
│  Engineering Leader → /use-case/engineering-leader  │
│  Team Lead → /use-case/team-lead                    │
│  Account Executive → /use-case/account-executive    │
│  Strategy / PMO → /use-case/strategy                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  VALUE PROP  (light bg, text-center)                │
│  H2: "The coordination layer for every role"        │
│  Body: 2 paragraphs                                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (full height)                           │
│  H2: "See it for your role."                        │
│  CTAs: "Book a demo" → /demo                        │
│        "See how it works" → /#how-it-works          │
└─────────────────────────────────────────────────────┘
```
Section count: 3 + hero

---

## 11–17. Use Case Detail Pages (× 7)
`src/pages/use-case/[role].astro` · Light hero + alternating dark/light sections

**Shared template — all 7 roles follow this structure:**

```
┌─────────────────────────────────────────────────────┐
│  HERO  (2-column, light bg)                         │
│  Left: eyebrow · H1 (role-specific pain headline)   │
│  Right: role image (4:3)                            │
│  Component: UseCaseNav (compact) for role navigation│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  THE PROBLEM  (dark)                                │
│  Eyebrow: "The problem"                             │
│  H2: [Role-specific problem headline]               │
│  Body: 2–3 paragraphs of role-specific copy         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  HOW IN PARALLEL HELPS  (light)                     │
│  Eyebrow: "How In Parallel helps"                   │
│  H2: [Role-specific benefit headline]               │
│  Layout: 2×2 grid of 4 capability cards             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PULL QUOTE  (dark, full height)                    │
│  Large serif blockquote — role-specific             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  SEE IT IN ACTION  (light)                          │
│  Eyebrow: "See it in action"                        │
│  H2: "A typical week with In Parallel"              │
│  Body: 3-paragraph role-specific scenario narrative │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (light, full height)                    │
│  H2: [Role-specific CTA headline]                   │
│  CTAs: "Book a demo" → /demo                        │
│        "All use cases" → /use-case                  │
│  Component: UseCaseNav (footer variant)             │
└─────────────────────────────────────────────────────┘
```

**Role-specific headlines:**

| Role | H1 (hero) | H2 (problem) |
|---|---|---|
| COO | "You're accountable for everything. But you only see what people choose to share." | "Your dashboard is already out of date." |
| Program Manager | Role-specific | "You're accountable for things you don't control." |
| Project Manager | Role-specific | "Your plan is always behind reality." |
| Engineering Leader | Role-specific | "You're managing context, not code." |
| Team Lead | Role-specific | "You're the last to know what changed." |
| Account Executive | Role-specific | "Complex deals die from internal misalignment." |
| Strategy / PMO | Role-specific | "Strategy and execution live in separate worlds." |

Section count: 5 + hero (each page)

---

## 18. Compare Index
`src/pages/compare/index.astro` · Dark theme

```
┌─────────────────────────────────────────────────────┐
│  HERO                                               │
│  Eyebrow: "Compare"                                 │
│  H1: "The right tool depends on what you're         │
│       solving for."                                 │
│  Body: Meeting assistants vs PM tools vs            │
│  coordination layer (In Parallel)                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  CATEGORY CONTEXT  (3-column grid)                  │
│  "Meeting assistants" — capture only                │
│  "PM & OKR tools" — manual upkeep                   │
│  "Coordination layer" (lime border) — In Parallel   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  COMPETITOR GRID  (3-column, 12 cards)              │
│  H2: "Side-by-side comparisons"                     │
│  Cards: avatar · name · category · distinction      │
│  · "Compare →" link                                 │
│                                                     │
│  Fellow · Fireflies · Otter.ai · Fathom · tl;dv    │
│  Granola · Avoma · Read.ai · Spinach                │
│  Atlassian · ClickUp · WorkBoard                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (light bg)                              │
│  H2: "See the difference for yourself."             │
│  CTAs: "Book a demo" → /demo                        │
│        "See how it works" → /#how-it-works          │
└─────────────────────────────────────────────────────┘
```
Section count: 3 + hero

---

## 19–25. Compare Detail Pages (× 7)
`src/pages/compare/[tool].astro` · Light hero + alternating sections

**Shared template:**

```
┌─────────────────────────────────────────────────────┐
│  HERO  (2-column, light bg)                         │
│  Left: eyebrow "Compare to" · H1 [Competitor name]  │
│  Subheading: "[Competitor] gives you X.             │
│              In Parallel gives you Y."              │
│  Right: 3-column comparison table                   │
│  Rows: capability · In Parallel · [Competitor]      │
│  Component: CompareNav (compact) for navigation     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  KEY DIFFERENCES  (light bg)                        │
│  Eyebrow: "Key differences"                         │
│  H2: "Beyond the meeting room"                      │
│  4 vertically-stacked difference cards              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  WHEN TO CHOOSE  (dark, 2-column grid)              │
│  Col 1: "When to choose [Competitor]" — bullet list │
│  Col 2: "When to choose In Parallel" (lime border)  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FAQ  (light bg)                                    │
│  H2: "Frequently asked questions"                   │
│  4–5 Q&A items (stacked, non-expanding)             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (dark)                                  │
│  H2: "Go beyond [meeting notes / transcripts / etc]"│
│  CTAs: "Book a demo" → /demo                        │
│        "See all comparisons" → /compare             │
│  Component: CompareNav (footer variant)             │
└─────────────────────────────────────────────────────┘
```

**Competitor pages built:** Fellow · Fireflies · ClickUp · Atlassian · WorkBoard · Read.ai · Spinach

Section count: 4 + hero (each page)

---

## 26. Insight (Blog) Index
`src/pages/insight/index.astro` · Dark theme · CMS-driven

```
┌─────────────────────────────────────────────────────┐
│  HERO  (editorial, ghost word overlay)              │
│  Ghost bg text: "Gap" (very faint)                  │
│  Eyebrow: "Between the lines"                       │
│  H1 (2-tone): "The gap between"                     │
│               "plan & reality."  (line 2 lighter)   │
│  Body: "Why execution breaks down..."               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FEATURED POST  (hero card, CMS)                    │
│  Image (21:9 aspect) + overlay                      │
│  Category (lime) · date · H2 title · description    │
│  "Read article →" → /insight/[slug]                 │
│  Source: first post by date desc                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  POST GRID  (3-column, CMS)                         │
│  Cards: image · category · title · excerpt          │
│  author avatar + name · date                        │
│  Fallback: "No insights published yet."             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EMAIL CAPTURE                                      │
│  "Stay in the loop" · Subscribe                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  FINAL CTA  (light bg)                              │
│  "Want to see the coordination layer in action?"    │
│  CTA: "Book a demo" → /demo                         │
└─────────────────────────────────────────────────────┘
```
Section count: 4 + hero

---

## 27. White Papers
`src/pages/white-papers.astro` · Dark theme · Sidebar layout

```
┌─────────────────────────────────────────────────────┐
│  PAGE HEADER  (2-column sidebar layout)             │
│                                                     │
│  LEFT COLUMN  (lg:w-[380px], fixed):                │
│  Eyebrow: "Want proof?"                             │
│  H1: "Read the research."                           │
│  Body: "40% of manager time is spent on             │
│        coordination overhead..."                    │
│                                                     │
│  RIGHT COLUMN  (flex-1):                            │
│  Paper cards grid (2-column)                        │
│  Each card: thumbnail (3:4) · title · size · "Download" │
│  Source: Supabase `gated_documents` table           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EMAIL GATE DIALOG  (modal, on download click)      │
│  H2: "Get your copy"                                │
│  Dynamic: shows paper name                          │
│  Field: email (required)                            │
│  Submit: "Download PDF" → webhook → opens PDF       │
│  Cancel: closes dialog                              │
│  Source: Supabase `public-lead-webhook` edge fn     │
└─────────────────────────────────────────────────────┘
```
Section count: 1 (sidebar layout) + gated modal

---

## Notes

### CMS-driven pages
- `/insight/[slug]` — blog articles from Sanity, rendered via `getStaticPaths()`
- `/routines/[slug]` — routine templates from Sanity
- Resources and Insight index fetch from Sanity at build time

### White Papers data
- Papers fetched from Supabase `gated_documents` + `documents` tables at build time
- Lead capture via `public-lead-webhook` Supabase edge function
- Source field: `'whitepaper'`

### Shared components used across pages
- `Nav.astro` — all pages (via BaseLayout)
- `Footer.astro` — all pages (via BaseLayout)
- `EmailCapture.astro` — Resources, Insight index, Our Vision
- `UseCaseNav.astro` — use-case detail pages (compact + footer variants)
- `CompareNav.astro` — compare detail pages (compact + footer variants)

### Pages flagged for expansion
- `/careers` — currently just a header + placeholder text
- `/press` — currently just a header + email address
