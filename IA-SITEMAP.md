# Site Map — In Parallel

```
in-parallel.com/
│
├── /                          Home
├── /demo                      Book a Demo
├── /pricing                   Pricing
├── /vision                    Vision
├── /waitlist                  Waitlist
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
│   ├── /compare/clickup       vs ClickUp
│   ├── /compare/atlassian     vs Atlassian
│   ├── /compare/fireflies     vs Fireflies
│   ├── /compare/fellow        vs Fellow
│   ├── /compare/read-ai       vs Read AI
│   ├── /compare/spinach       vs Spinach
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
- Nav links: `/#product`, `/#how-it-works`, `/white-papers`, `/about-us`
- All pages are statically pre-rendered (Astro `output: 'static'`, Cloudflare Pages adapter)
