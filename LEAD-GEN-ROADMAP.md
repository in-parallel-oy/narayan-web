# Lead Generation Roadmap & Recommendations

_Based on a full audit of in-parallel.com — March 2026_

---

## Current State

**Conversion model:** Demo-first, with a waitlist fallback + newsletter email capture.

**What exists:**
- "Book a demo" CTA on nav, hero, and bottom of every page → external Calendly embed at `/demo`
- Waitlist form at `/waitlist` → Supabase Edge Function webhook (captures email, name, company, title, phone, UTMs)
- Gated white papers at `/white-papers` → external iframe on collaborate.in-parallel.com
- PostHog analytics (EU, pageviews + pageleaves + custom events for CTA clicks, scroll depth)
- LinkedIn Insight Tag (partner ID 516302043) on all pages for retargeting
- 43+ pages: homepage, 7 use-case pages, 7 comparison pages, blog (Sanity CMS), legal, product, pricing, vision, resources hub
- Inline email capture on blog posts, insight listing, vision page, and resources hub
- Exit-intent popup with email capture (all pages, once per session)
- Content gating component ready for gated articles and lead magnets
- Demo page with social proof (stats, "what you'll see" checklist)
- Pricing page with "Book a demo" CTA per tier + ROI callout

**Components built:**
- `EmailCapture.astro` — reusable inline email capture (dark/light themes, compact mode)
- `ExitIntentPopup.astro` — exit-intent modal with email capture (desktop mouseout + mobile 45s fallback)
- `ContentGate.astro` — content gating with blur/preview, supports downloadable lead magnets via `downloadUrl` prop

---

## Recommendations by Priority

### P0 — High impact, low effort ✅ DONE

#### ~~1. Add inline email capture to blog posts and content pages~~ ✅
Added `EmailCapture` component to:
- `/insight/[...slug].astro` — after article body (light theme)
- `/insight/index.astro` — before bottom CTA (dark theme)
- `/vision` — before bottom CTA (dark theme)
All submissions go to Supabase webhook with `source` attribution.

#### ~~2. Add PostHog custom events on conversion actions~~ ✅
Added to `BaseLayout.astro`:
- `cta_clicked` — tracks demo CTAs, pricing links, secondary CTAs with text, page, href
- `outbound_click` — tracks external link clicks
- `scroll_depth` — fires at 25%, 50%, 75%, 100% milestones
- `email_captured` — fires on successful email capture (in EmailCapture + ExitIntentPopup)
- `exit_intent_shown` — fires when exit popup appears
- `content_unlocked` — fires when gated content is unlocked

#### ~~3. Fix the pricing page conversion path~~ ✅
- Added "Book a demo" button on every pricing tier
- Added "Most popular" badge on Plus tier
- Added ROI callout section ("Typical payback: less than 1 week")
- Added dark bottom CTA section with demo + email options
- Changed check icons from `ip-lime` to `ip-blue` for better contrast on white

#### ~~4. Add exit-intent popup on high-value pages~~ ✅
Built `ExitIntentPopup.astro`:
- Desktop: triggers on mouse leaving viewport from top
- Mobile: triggers after 45 seconds of page time
- Once per session (sessionStorage), suppressed if email already captured (localStorage)
- Same Supabase webhook with `source: "exit-intent"`

---

### P1 — High impact, medium effort (PARTIALLY DONE)

#### ~~5. Create downloadable lead magnets~~ ✅ Infrastructure built
`ContentGate.astro` component is ready. To use:
```astro
import ContentGate from '../components/ContentGate.astro';

<!-- For gated article -->
<ContentGate gateId="my-article" heading="Unlock the full article">
  <div>...premium content...</div>
</ContentGate>

<!-- For downloadable PDF -->
<ContentGate
  gateId="whitepaper-xyz"
  heading="Download the white paper"
  downloadUrl="/downloads/my-paper.pdf"
  buttonText="Get the PDF"
/>
```

**Still needed:** Create actual PDF lead magnets and host them in `/public/downloads/`.

**Suggested lead magnets to create:**
- "The Coordination Tax Report" — the 40% stat with full research backing
- "Execution Intelligence Checklist" — self-assessment for ops leaders
- "Meeting Decision Audit Template" — practical template
- "PMI First 100 Days Playbook" — from existing blog content

#### ~~6. Add LinkedIn Insight Tag and Google Ads pixel~~ ⚠️ LinkedIn done, Google pending
- ✅ LinkedIn Insight Tag (partner ID 516302043) added to `BaseLayout.astro`
- ⬜ Google Ads remarketing tag — need Conversion ID from Google Ads account

**To add Google Ads pixel:** Get your Conversion ID from Google Ads, then add to `BaseLayout.astro`:
```html
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

#### ~~7. Build a `/resources` hub page~~ ✅
Created `/resources` page that aggregates:
- White papers + vision page cards
- Latest 3 blog posts (from Sanity)
- Routines / templates (from Sanity)
- Use case role cards (all 7 roles + product overview)
- Email capture + bottom CTA

#### ~~8. Add social proof to the demo page~~ ✅
Demo page now has two-column layout:
- Left: "What you'll see" checklist (4 items) + stats grid (6-8h saved, 40% tax, <1 wk payback, 10x ROI)
- Right: booking iframe

**Still could add:** Customer logos (once available), testimonial quotes, trust badges.

---

### P2 — Medium impact, higher effort

#### 9. Implement content-gated blog strategy ⬜
`ContentGate` component is built and ready. Select 3-5 long research articles to gate:

**Candidates:**
- Executive Guide to Strategic Alignment
- Strategy Implementation: A C-level guide
- The Role of Digital Twins in Modern Strategy Execution
- Strategic Portfolio Management

**Implementation:** Wrap the second half of these articles in `<ContentGate>` with `gateId` matching the article slug.

#### 10. Build an automated nurture sequence ⬜
After someone joins via email capture, trigger a sequence:

1. **Immediately:** Thank you + link to relevant resource
2. **Day 2:** "Here's what the coordination tax costs your team" (link to vision page)
3. **Day 5:** Case study or use-case story relevant to their role
4. **Day 8:** "Book a 15-minute call" — lower commitment than full demo
5. **Day 14:** Social proof email — who else is using In Parallel

**Tool:** Supabase → webhook to email service (Resend, Loops, or Customer.io).

#### 11. Add a chatbot or conversational CTA ⬜
Lightweight chat widget on high-intent pages (`/pricing`, `/demo`, `/compare/*`).

**Options:** Intercom, Crisp, or custom AI-powered widget.

#### 12. SEO & LLM optimization ⬜
- Add structured data (FAQ schema) to comparison and use-case pages
- Optimize meta descriptions for click-through
- Add internal linking between blog posts, use cases, and comparison pages
- Update `llms.txt` and `llms-full.txt` with current site content
- Consider programmatic SEO pages: "/for/[industry]" or "/solution/[problem]"

---

### P3 — Future / Strategic

#### 13. Build an ROI calculator ⬜
Interactive tool: "How much is the coordination tax costing your team?"
- Inputs: team size, meetings/week, avg manager salary
- Output: hours wasted, dollar cost, potential savings
- Email-gated results

#### 14. Webinar / event program ⬜
Monthly/quarterly webinars on execution intelligence topics.

#### 15. Customer story pages ⬜
Dedicated `/customers` or `/stories` section with case studies.

#### 16. Partner/integration landing pages ⬜
Dedicated pages for each integration: "/integrations/jira", "/integrations/linear", etc.

---

## Measurement Framework

Track these metrics weekly in PostHog:

| Metric | Current | Target |
|--------|---------|--------|
| Demo bookings / week | ? | Establish baseline, then +20% |
| Waitlist signups / week | ? | Establish baseline, then +30% |
| Email captures / week | Now instrumented | 10+ within first month |
| Blog → CTA click rate | Now tracked via `cta_clicked` | 2-5% |
| Pricing page → demo rate | Now tracked | 15-25% |
| Comparison page → demo rate | Now tracked | 10-20% |
| Scroll depth 75%+ | Now tracked via `scroll_depth` | 30%+ on key pages |
| Exit popup conversion | Now tracked via `email_captured` | 3-5% |

---

## Architecture Notes

**Current lead capture stack:**
- Frontend: Astro (static) → form submit
- Backend: Supabase Edge Function (`public-lead-webhook`)
- Analytics: PostHog (EU) with custom events
- Retargeting: LinkedIn Insight Tag (516302043)
- Scheduling: External Calendly on collaborate.in-parallel.com

**Recommended additions:**
- Google Ads pixel (need Conversion ID)
- Email service: Resend or Loops (for nurture sequences)
- Chat: Crisp or Intercom (lightweight embed)

**Email capture sources** (all flow through Supabase webhook):
- `blog-article` — inline capture on individual blog posts
- `insight-listing` — capture on blog listing page
- `vision-page` — capture on vision page
- `resources-hub` — capture on resources page
- `exit-intent` — exit popup
- `content-gate-{gateId}` — gated content unlock
- `waitlist` — existing waitlist form
