# Site Map — In Parallel

```
in-parallel.com/
│
├── /                          Home
├── /how-it-works              How It Works (detailed workflow + integrations)
├── /demo                      Book a Demo
├── /pricing                   Pricing (3-tier: Free / Living Plan / Enterprise)
├── /vision                    Vision — Coordination Tax to Coordination Layer
├── /waitlist                  Waitlist
│
├── /living-plan               Living Plan product page (€69/scope/month)
├── /execution-intelligence    Execution Intelligence — vision + 5 modules (coming soon)
│
├── /insight                   Insights (blog listing)
│   └── /insight/[slug]        Insight article (CMS-driven)
│
├── /routines                  Routines (listing)
│   └── /routines/[slug]       Routine template (CMS-driven)
│
├── /white-papers              White Papers
├── /resources                 Resources
│
├── /use-case                  Use Cases (index)
│   ├── /use-case/strategy          Strategy
│   ├── /use-case/coo               COO
│   ├── /use-case/engineering-leader Engineering Leader
│   ├── /use-case/program-manager   Program Manager
│   ├── /use-case/project-manager   Project Manager
│   ├── /use-case/team-lead         Team Lead
│   └── /use-case/account-executive Account Executive
│
├── /compare                   Comparisons (index)
│   ├── /compare/fellow        vs Fellow
│   ├── /compare/fireflies     vs Fireflies
│   ├── /compare/otter         vs Otter.ai
│   ├── /compare/fathom        vs Fathom
│   ├── /compare/tldv          vs tl;dv
│   ├── /compare/granola       vs Granola
│   ├── /compare/avoma         vs Avoma
│   ├── /compare/read-ai       vs Read AI
│   ├── /compare/spinach       vs Spinach
│   ├── /compare/atlassian     vs Atlassian
│   ├── /compare/clickup       vs ClickUp
│   └── /compare/workboard     vs Workboard
│
├── /about-us                  About Us
├── /careers                   Careers
├── /press                     Press
├── /security                  Security
│
└── Legal
    ├── /privacy-policy
    ├── /cookie-policy
    ├── /terms-of-use
    ├── /general-terms-of-service
    └── /product-description
```

## Notes

- CMS-driven pages (`/insight/[slug]`, `/routines/[slug]`) are generated at build time from Sanity via `getStaticPaths()`
- Nav links: `/#product`, `/how-it-works`, `/white-papers`, `/about-us`
- All pages are statically pre-rendered (Astro `output: 'static'`, Cloudflare Pages adapter)
- Product sub-pages: `/living-plan` and `/execution-intelligence` are linked from ProductLadderSection on the homepage
