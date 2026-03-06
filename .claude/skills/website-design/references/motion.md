# Motion Tokens Reference

All motion values live in the `:root` block of `src/styles/tokens.css`. Never write bare `cubic-bezier(...)` or millisecond values in CSS — always reference a token.

---

## Duration Tokens

Semantic names reflect the *perceived weight* of the motion, not arbitrary milliseconds.

| Token | Value | Used for |
|---|---|---|
| `--motion-duration-quick` | 200ms | Button hover, opacity toggles |
| `--motion-duration-fast` | 250ms | Nav link colour, pill background, text-shadow |
| `--motion-duration-smooth` | 550ms | Word-track width, panels, drawers |
| `--motion-duration-reveal` | 700ms | Scroll reveals — content entering viewport |
| `--motion-duration-enter` | 900ms | Hero-level entrances (large product image) |
| `--motion-duration-dramatic` | 1200ms | Stat grow, high-impact emphasis reveals |
| `--motion-duration-loop-word` | 10s | Word rotator cycle (5 words × 2s each) |
| `--motion-duration-loop-label` | 15s | How It Works label rotator cycle |

---

## Easing Tokens

Two distinct characters cover every motion use case in the system.

| Token | Value | Character | Used for |
|---|---|---|---|
| `--motion-ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Spring deceleration — fast start, long tail | All scroll reveals, entrances, word-track transitions |
| `--motion-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material standard — symmetric, measured | Continuous looping animations (word rotator, label rotator) |
| `--motion-ease-out` | `ease-out` | Simple deceleration | Micro-interactions: buttons, nav, popup overlays |

---

## Usage Patterns

### Scroll reveal (standard content)
```css
transition:
  opacity  var(--motion-duration-reveal) var(--motion-ease-out-expo),
  transform var(--motion-duration-reveal) var(--motion-ease-out-expo);
```

### Scroll reveal (hero image)
```css
transition:
  opacity  var(--motion-duration-enter) var(--motion-ease-out-expo),
  transform var(--motion-duration-enter) var(--motion-ease-out-expo);
```

### Stat / emphasis grow
```css
transition: transform var(--motion-duration-dramatic) var(--motion-ease-out-expo);
```

### Button hover
```css
transition: opacity var(--motion-duration-quick) var(--motion-ease-out);
```

### Nav / UI element hover
```css
transition: color var(--motion-duration-fast) var(--motion-ease-out);
```

### Looping animation
```css
animation: rotate-words var(--motion-duration-loop-word) var(--motion-ease-standard) infinite;
```

---

## Reduced Motion

`animations.css` includes a `@media (prefers-reduced-motion: reduce)` block that:
- Collapses all reveal transitions to instant opacity-only (`0.01ms`)
- Removes `transform` from initial states so content is visible immediately
- Pauses all looping animations (`word-track`, `ai-thinking-track`, `ai-question-track`)

Scroll-linked JS effects (shrink/grow sections) check this media query in `BaseLayout.astro` before applying transforms.

**Rule**: Never add a new motion effect without considering its reduced-motion fallback.

---

## When to Add a New Token

Add a new duration token only when a genuinely new semantic tier is needed — not just to use a slightly different number. Ask: *does this motion play a meaningfully different role to existing tokens?*

Never add a new easing curve without strong justification. The two-curve system (`out-expo` for entrances, `standard` for loops) covers all current use cases. A third curve creates inconsistency.

---

## Anti-patterns

| Wrong | Correct | Why |
|---|---|---|
| `transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)` | `transition: opacity var(--motion-duration-reveal) var(--motion-ease-out-expo)` | Bare values aren't traceable to the system |
| `transition: all 0.3s ease` | Target specific properties | `all` animates layout props, causes jank |
| `animation: spin 1s linear infinite` | N/A — avoid decorative looping animations | Distracting, no reduced-motion fallback possible |
| `transition-duration: 400ms` | Snap to nearest token | Off-scale values fragment the system |
