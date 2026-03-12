---
description: Audit and fix website copy for AI writing patterns, marketing tropes, and eyebrow/heading quality. Run on specific pages or all pages.
---

# Content Audit Skill

You are auditing the In Parallel marketing website copy for three classes of problems:
1. **AI writing tells** — patterns that make copy sound machine-generated
2. **Marketing tropes** — clichés and lazy phrases that dilute the message
3. **Eyebrow/heading issues** — structural or quality problems in section labels and titles

Unless the user specifies files, scan all pages in `src/pages/` and components in `src/components/`. Read each file before reporting issues. Never guess at content — always read first.

---

## 1. AI Writing Tells

These patterns indicate AI-generated prose. Flag and suggest replacements.

### Em dash overuse
The em dash (—) is heavily overused by AI as a connector. In this codebase, it's already present in many places. Flag when:
- An em dash connects two independent clauses that should be separate sentences
- An em dash replaces a colon unnecessarily
- Three or more em dashes appear in a single paragraph

**Not always wrong**: em dashes are fine for asides, appositives, or single use in a sentence. The problem is density and using them as sentence glue.

### Hollow connectors
These words/phrases add length without meaning:
- "Additionally", "Furthermore", "Moreover", "In conclusion", "In summary"
- "It's worth noting that", "It's important to remember that", "It goes without saying"
- "Not only... but also" (flag when used more than once per page)

### AI vocabulary
Flag these words unless they appear in a direct product description or customer quote:
- "Delve", "Navigate" (used metaphorically), "Leverage" (as a verb), "Harness"
- "Unlock", "Empower", "Enable" (flag; sometimes OK, but often lazy)
- "Seamlessly", "Effortlessly", "Intuitive"
- "Robust", "Comprehensive", "Holistic"
- "Cutting-edge", "State-of-the-art", "Best-in-class"
- "Groundbreaking", "Revolutionary", "Game-changing", "Transformative"

### Negative parallelism
AI often defines things by what they're not in triplets:
> "Not just a tool for X, but a system for Y, a platform for Z, and a foundation for..."

Flag when there are 3+ "not... but" constructions stacked.

### Patterned triplets
AI loves grouping things in threes with the same grammatical structure. One triplet is fine. Flag when:
- The same page has 3+ comma-triplets in body copy
- The pattern is "X, Y, and Z" repeated across multiple paragraphs

### Rhetorical questions as openers
- "What if your team could...?"
- "Imagine a world where..."
- "What would it mean if...?"

These are filler — cut or convert to a statement.

---

## 2. Marketing Tropes

These are B2B SaaS clichés that dilute the In Parallel message. The brand voice is specific, concrete, and benefit-focused — not vague or promotional.

### Vague superlatives
Flag phrases that claim superiority without evidence:
- "The most powerful / advanced / intelligent [thing]"
- "Unlike any other [tool]"
- "The only [platform] that..."
- "The #1 [solution] for..."

### Pain-agitate-solve clichés
- "Struggling with X?" / "Tired of X?" — acceptable once, not as a pattern
- "Say goodbye to X" / "No more X"
- "Finally, a [tool] that..." — the word "finally" is almost always a tell

### Abstract value props
Flag when a benefit statement is so generic it could apply to any B2B SaaS product:
- "Save time and money"
- "Increase productivity"
- "Work smarter, not harder"
- "Streamline your workflow"
- "Boost efficiency"
- "Drive results"
- "Move the needle"

These should be replaced with specific, measurable, or concrete claims.

### Vague promises
- "The future of [X]"
- "Redefine how you [X]"
- "Transform your [X]"
- "[X] at scale"
- "Take [X] to the next level"

### "More than just" framing
> "In Parallel is more than just a notetaker."

This is a lazy setup. It either undersells what came before or fails to say what it actually is. Flag and suggest rewriting as a direct claim.

### Passive feature listings
Features described as passive capabilities rather than active outcomes:
- "Allows you to..." / "Enables you to..." / "Lets you..."
- These weaken the copy. Prefer direct: "You get X", "X happens automatically."

---

## 3. Eyebrow / Heading Checks

Eyebrows (`section-eyebrow`) and their following headings must work as a unit.

### Eyebrow rules

**Format:**
- Lowercase (not Title Case, not ALL CAPS)
- No period at the end (exception: full sentence eyebrows like "Your meetings are where the work lives." — these intentionally end with a period)
- 2–6 words ideally; up to 8 acceptable; 9+ is too long unless it's an intentional full sentence

**Content:**
- Eyebrows orient and categorize — they answer "what kind of section is this?" not "what does the heading say?"
- They should NOT summarize or repeat the heading below them
- Avoid generic labels: "Features", "Benefits", "Overview", "About us", "Our product", "How it works" (unless the section is genuinely a how-it-works explainer)
- The best eyebrows add a frame or angle the reader can't get from the heading alone

**Anti-patterns to flag:**
- Eyebrow and heading say the same thing in different words
- Eyebrow is a mini-heading rather than a label (e.g., "Why our product is different" → heading already does this)
- Overuse of "Our [X]" — more than one or two per page

### Heading rules

**Format:**
- Sentence case (only capitalize proper nouns and first word) — NOT Title Case

**Content quality:**
- Headings should be specific and declarative, not vague
- Avoid ending h2s with a question mark unless the question is immediately answered below
- Avoid "smart" puns or wordplay that obscures meaning
- The heading should be the main claim; the body copy supports it
- Don't stuff the heading with everything — let the sub-copy breathe

**Eyebrow + Heading relationship:**
Good pattern: eyebrow provides context → heading makes a specific claim
```
Eyebrow: "Why it breaks"
H2: "Your AI tools don't share memory."
```

Bad pattern: both say the same thing at different sizes
```
Eyebrow: "What makes us different"
H2: "How In Parallel stands out"
```

---

## Audit Output Format

Report issues grouped by file. For each issue:

```
FILE: src/pages/foo.astro

[TROPE] Line 47 — "seamlessly integrates with your existing tools"
→ Vague capability claim. Be specific: what tools? what does the integration do?
→ Suggested: "Connects to Jira, Linear, and Notion — no re-entry needed."

[AI TELL] Line 83 — "Additionally, the platform enables users to..."
→ "Additionally" is a hollow connector. Cut it or restructure.
→ Suggested: Start a new sentence with the actual claim.

[EYEBROW] Line 22 — eyebrow: "Our platform" / h2: "Everything you need in one place"
→ Eyebrow is generic. Heading is also vague. Neither orients the reader.
→ Suggested eyebrow: "All in one place" or more specific to the section content.
→ Suggested heading: replace "Everything you need" with the specific thing.
```

At the end, provide a **Summary table**:

| File | AI tells | Tropes | Eyebrow/heading | Total |
|---|---|---|---|---|
| src/pages/foo.astro | 3 | 2 | 1 | 6 |

Sort by total descending. Flag files with 5+ issues as priorities.

---

## Fix Mode

If the user asks you to fix issues (not just report them), apply the changes directly to the files using Edit. When fixing:
- Preserve all HTML structure, class names, and attributes
- Only change text content
- For tropes and AI tells: rewrite the specific phrase, keeping surrounding copy intact
- For eyebrow/heading issues: rewrite the label/heading to match the pattern above
- After fixing, re-read the surrounding paragraph to confirm the edit flows naturally
- Report what you changed: "Fixed 4 issues in src/pages/foo.astro: [list]"

---

## In Parallel Brand Voice (reference)

Apply this when suggesting rewrites:
- **Specific over generic**: "45 minutes back for 12 people" beats "saves time"
- **Active over passive**: "The plan writes itself" beats "the plan is automatically updated"
- **Concrete over abstract**: "Decisions, risks, and ownership" beats "key information"
- **Direct over hedged**: "It stops re-litigation" beats "It can help reduce the risk of decisions being revisited"
- **British English spelling**: recognise (not recognize), organisation (not organization)
- Avoid adjectives that don't add information — if you can remove the adjective and the claim still holds, cut it
- Sentence fragments are OK for punch: "Start free. No credit card required."
- Short paragraphs win. If a paragraph exceeds 3 sentences, look for a split.
- **Firm but friendly**: confident and direct without being cold. The tone doesn't hedge, but it also doesn't bark. Flag copy that tips too far either way — overly corporate and stiff, or overly casual and breathless.
