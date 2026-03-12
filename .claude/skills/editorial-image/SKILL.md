# Image Pipeline Skill

Automates the full editorial illustration workflow:

1. **Search** — Pexels or Unsplash for reference photos by keyword
2. **Describe** — Gemini analyzes each photo and writes a dense scene description (people, environment, mood)
3. **Generate** — Imagen creates two illustration variants per image:
   - **Dark** — pen & ink + watercolor, deep navy palette (for dark-bg sections)
   - **Light** — pen & ink + watercolor, warm ochre palette (for light-bg sections)
4. **Save** — outputs written to `public/images/generated/{slug}/` with a `manifest.json`

## How to invoke

Say something like:
- `/image-pipeline` — Claude will ask what you need
- `Run the image pipeline for "executive team meeting", 2 images`
- `Generate illustrations for "city commute at night", pexels, 3 images, slug "commute"`

## What Claude does

1. Collect inputs from the user (query, count, source, slug)
2. Run the script:
   ```
   node scripts/image-pipeline.mjs --query "..." --count N [--source pexels|unsplash] [--slug "..."]
   ```
3. Report generated files, descriptions, and `manifest.json` path
4. Optionally show the Gemini descriptions so the user can review

## CLI flags

| Flag | Default | Description |
|---|---|---|
| `--query` | required | Search term, e.g. `"remote team collaboration"` |
| `--count` | `3` | Number of source photos to process |
| `--source` | `pexels` | `pexels` or `unsplash` |
| `--slug` | auto from query | Folder name under `generated/` |
| `--start` | `1` | Resume from image N (skip already-processed images) |
| `--delay` | `12` | Seconds to wait between images (avoids rate limits) |
| `--dry-run` | off | Test pipeline flow without making any API calls |

**Examples:**
```bash
# Standard batch
node scripts/image-pipeline.mjs --query "business meeting" --count 3 --slug "meetings"

# Resume after a rate-limit failure on image 2
node scripts/image-pipeline.mjs --query "business meeting" --count 3 --slug "meetings" --start 2

# Dry run (no API calls)
node scripts/image-pipeline.mjs --query "test" --dry-run

# Slower pace for large batches
node scripts/image-pipeline.mjs --query "office work" --count 5 --slug "office" --delay 20
```

## Required env vars

Add to `.env` before first use:

```
GOOGLE_AI_API_KEY=...      # Google AI Studio — used for both Gemini and Imagen
PEXELS_API_KEY=...         # Get free key at pexels.com/api
UNSPLASH_API_KEY=...       # Get free key at unsplash.com/developers (only if using Unsplash)
```

Optional overrides:

```
GEMINI_MODEL=gemini-3-pro-image-preview       # Default: scene description model
IMAGEN_MODEL=imagen-4.0-ultra-generate-001   # Default: illustration generation model
IMAGE_ASPECT_RATIO=16:9                       # Output dimensions
```

Available Imagen models (as of 2025):
- `imagen-4.0-ultra-generate-001` — highest quality (default)
- `imagen-4.0-generate-001` — faster, still high quality
- `imagen-4.0-fast-generate-001` — quickest, lower fidelity

API key sources:
- **Google AI Studio**: https://aistudio.google.com/app/apikey
- **Pexels**: https://www.pexels.com/api/
- **Unsplash**: https://unsplash.com/developers

> **Note**: Imagen requires billing enabled on the Google Cloud project linked to your API key.

## Output structure

```
public/images/generated/
  {slug}/
    {slug}-01-source.jpg      ← reference photo (Pexels/Unsplash, for records)
    {slug}-01-dark.png        ← dark illustration (navy palette)
    {slug}-01-light.png       ← light illustration (warm/airy palette)
    {slug}-02-source.jpg
    {slug}-02-dark.png
    {slug}-02-light.png
    manifest.json             ← descriptions + file paths for all images
```

`manifest.json` shape:

```json
[
  {
    "index": 1,
    "slug": "meetings-01",
    "credit": { "photographer": "Jane Smith", "source": "pexels", "url": "..." },
    "description": "Three professionals seated around a glass table in a modern conference room...",
    "outputs": {
      "dark":   "/images/generated/meetings/meetings-01-dark.png",
      "light":  "/images/generated/meetings/meetings-01-light.png",
      "source": "/images/generated/meetings/meetings-01-source.jpg"
    }
  }
]
```

## Using the images in Astro

Reference directly in any `.astro` file:

```astro
<!-- Dark background section -->
<img src="/images/generated/meetings/meetings-01-dark.png" alt="Team discussing strategy" />

<!-- Light background section -->
<img src="/images/generated/meetings/meetings-01-light.png" alt="Team discussing strategy" />
```

Load the manifest for programmatic use:

```astro
---
import manifest from '../../public/images/generated/meetings/manifest.json'
---
{manifest.map(item => (
  <img src={item.outputs.dark} alt={item.description.slice(0, 80)} />
))}
```

## Style guide

The illustration style is editorial pen-and-watercolor — Financial Times Weekend / Monocle magazine register. Fine dark ink line art defines figures and environment. Watercolor fills the full scene: walls, windows, furniture, surfaces. The environment is not a backdrop — it is part of the composition.

### Shared style rules (both variants)
> Refined editorial pen-and-watercolor illustration. NOT a comic book, graphic novel, or cartoon. Fine dark ink line art with careful cross-hatching defines the figures and objects. Human figures must have realistic, natural proportions — no exaggerated heads, simplified faces, or stylised cartoon features. Faces are rendered with subtle ink detail: real bone structure, natural expression, human anatomy. The scene includes its full environment: the room, furniture, windows, surfaces — all rendered loosely in expressive watercolor. The watercolor is the atmosphere of the scene. It fills the background environment with loose, granular washes — pooling in shadows, bleeding at edges, suggesting depth without photographic detail. All subjects are fully contained within the frame with natural breathing room. The illustration fades softly toward the edges. No cut marks, stamps, text, labels, or annotations anywhere in the image.

### Dark variant
> Palette: deep midnight navy, dark teal, stormy slate blue, muted charcoal, with restrained warm ochre and dusty gold accents. The watercolor washes filling the environment — walls, windows, surfaces, atmosphere — are very dark: deep navy and teal dominating, creating a moody nocturnal or late-evening atmosphere. The overall image reads as dark and dramatic. Ink lines are dark. The image transitions to deep navy at its edges, fading naturally with no hard border.

### Light variant
> Palette: warm ochres, dusty blues, muted grey-greens, soft yellows, pale taupes. The watercolor washes filling the environment — walls, windows, surfaces, sky seen through windows — are warm and atmospheric, rendered in loose transparent layers. The overall image is airy and warm. Ink lines are dark charcoal. The image transitions to near-white at its edges, fading naturally with no hard border.

### Human figure rules
These apply to every prompt — both variants:

- **Realistic proportions** — correct human anatomy throughout; no exaggerated heads, oversized eyes, or simplified limbs
- **Real faces** — rendered with subtle ink detail showing bone structure, natural expression, and human anatomy; never a flat or cartoon mask
- **No cartoon features** — clothing folds, hands, and posture follow life-drawing conventions, not illustration shorthand

### Key prompt rule
Always describe the **full scene including environment** in the Gemini output. Do not strip the room, windows, or architectural context. The watercolor fills the environment — if you omit it, subjects look composited onto a plain background.

## Handling rate limits

The script has built-in resilience:
- **Retry with backoff**: up to 4 attempts per API call, parses Google's "retry in Xs" messages
- **Inter-image delay**: 12s pause between images by default (`--delay` to change)
- **Per-image recovery**: if one image fails, the batch continues; errors reported at the end
- **Resume flag**: `--start N` skips already-completed images so you don't re-process them

If the run ends with failures, the script prints exact retry commands:
```
Failed images (retry with --start N):
  Image 2: Imagen rate-limited — exhausted retries
    → node scripts/image-pipeline.mjs --query "..." --count 3 --slug "..." --start 2 --count 1
```

## Notes

- Source images are saved for reference only — they are not served on the site
- Check `credit` in `manifest.json` if you need to attribute the reference photographer
- The `generated/` folder should be gitignored (large binary files); commit only the images you intentionally use
- For Sanity integration: upload generated PNGs via Sanity's asset API and store manifest references as document fields
