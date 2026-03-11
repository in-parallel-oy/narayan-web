#!/usr/bin/env node
/**
 * editorial-image.mjs
 *
 * Automated editorial illustration pipeline:
 *   1. Search Pexels or Unsplash for reference images
 *   2. Describe each image in detail using Gemini (multimodal)
 *   3. Generate editorial watercolor illustrations via Imagen
 *      → Dark variant  (bg #001325)
 *      → Light variant (bg #F4F5F2)
 *   4. Save all outputs to public/images/generated/{slug}/
 *   5. Write manifest.json with descriptions + file paths
 *
 * Usage:
 *   node scripts/editorial-image.mjs --query "executive meeting" --count 2
 *   node scripts/editorial-image.mjs --query "city commute" --count 3 --source unsplash --slug "commute"
 *
 * Required env vars (.env):
 *   GOOGLE_AI_API_KEY       — Google AI Studio key (for Gemini + Imagen)
 *   PEXELS_API_KEY          — if using --source pexels (default)
 *   UNSPLASH_API_KEY        — if using --source unsplash
 *
 * Optional env vars:
 *   GEMINI_MODEL            — default: gemini-3-pro-image-preview
 *   IMAGEN_MODEL            — default: imagen-4.0-ultra-generate-001
 *   IMAGE_ASPECT_RATIO      — default: 16:9
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

// Load .env (dotenv is already a devDependency)
const require = createRequire(import.meta.url)
const dotenv = require('dotenv')
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ─── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = argv[i + 1]
      args[key] = next && !next.startsWith('--') ? next : true
      if (args[key] !== true) i++
    }
  }
  return args
}

const args = parseArgs(process.argv.slice(2))

const QUERY      = args.query  || args.q
const COUNT      = parseInt(args.count || args.n || '3', 10)
const SOURCE     = (args.source || 'pexels').toLowerCase()
const SLUG       = (args.slug || QUERY?.replace(/[^a-z0-9]+/gi, '-').toLowerCase())
const DRY_RUN    = args['dry-run'] === true
const START_AT   = parseInt(args.start || '1', 10)          // --start 2  → skip image 1
const DELAY_SECS = parseInt(args.delay || '12', 10)         // --delay 20 → longer pause between images

if (!QUERY) {
  console.error('\n❌  --query is required\n')
  console.error('  Usage: node scripts/image-pipeline.mjs --query "executive meeting" --count 3\n')
  process.exit(1)
}

// ─── Config ──────────────────────────────────────────────────────────────────

const GOOGLE_AI_KEY    = process.env.GOOGLE_AI_API_KEY
const PEXELS_KEY       = process.env.PEXELS_API_KEY
const UNSPLASH_KEY     = process.env.UNSPLASH_API_KEY
const GEMINI_MODEL     = process.env.GEMINI_MODEL     || 'gemini-3-pro-image-preview'
const IMAGEN_MODEL     = process.env.IMAGEN_MODEL     || 'imagen-4.0-ultra-generate-001'
const ASPECT_RATIO     = process.env.IMAGE_ASPECT_RATIO || '16:9'

const OUTPUT_BASE = path.join(ROOT, 'public', 'images', 'generated')
const OUT_DIR     = path.join(OUTPUT_BASE, SLUG)

// Validate required keys
const missing = []
if (!GOOGLE_AI_KEY) missing.push('GOOGLE_AI_API_KEY')
if (SOURCE === 'pexels'   && !PEXELS_KEY)   missing.push('PEXELS_API_KEY')
if (SOURCE === 'unsplash' && !UNSPLASH_KEY) missing.push('UNSPLASH_API_KEY')

if (missing.length) {
  console.error(`\n❌  Missing required env vars: ${missing.join(', ')}`)
  console.error('    Add them to your .env file.\n')
  process.exit(1)
}

// ─── Prompt Templates ────────────────────────────────────────────────────────

// Shared composition rules (background treatment is handled per-variant)
const SHARED_STYLE = `The style is refined editorial pen-and-watercolor illustration — exactly the kind published in the Financial Times Weekend or Monocle magazine. NOT a comic book, graphic novel, or cartoon. Fine dark ink line art with careful cross-hatching defines the figures and objects. The scene includes its full environment: the room, furniture, windows, surfaces — all rendered loosely in expressive watercolor. The watercolor is the atmosphere of the scene. It fills the background environment with loose, granular washes — pooling in shadows, bleeding at edges, suggesting depth without photographic detail. All subjects are fully contained within the frame with natural breathing room. The illustration fades softly toward the edges. No cut marks, stamps, text, labels, or annotations anywhere in the image.`

const DARK_PROMPT = (desc) =>
  `An editorial pen-and-watercolor illustration of ${desc}. ${SHARED_STYLE} Color palette: deep midnight navy, dark teal, stormy slate blue, muted charcoal, with restrained warm ochre and dusty gold accents. The watercolor washes filling the environment — walls, windows, surfaces, atmosphere — are very dark: deep navy and teal dominating, creating a moody nocturnal or late-evening atmosphere. The overall image reads as dark and dramatic. Ink lines are dark. The image transitions to deep navy at its edges, fading naturally with no hard border.`

const LIGHT_PROMPT = (desc) =>
  `An editorial pen-and-watercolor illustration of ${desc}. ${SHARED_STYLE} Color palette: warm ochres, dusty blues, muted grey-greens, soft yellows, pale taupes. The watercolor washes filling the environment — walls, windows, surfaces, sky seen through windows — are warm and atmospheric, rendered in loose transparent layers. The overall image is airy and warm. Ink lines are dark charcoal. The image transitions to near-white at its edges, fading naturally with no hard border.`

const GEMINI_DESCRIPTION_PROMPT =
  `Analyze this image and write a complete scene description for use as an art generation prompt. Include:
- The people: their appearance, clothing, actions, gestures, body language
- Key objects and props they interact with
- The setting and environment: type of room, furniture, windows, architectural features
- The spatial arrangement: where people are positioned relative to each other and the space
- The overall mood and activity of the scene

Write this as a single dense paragraph. Be specific and visual. Describe what you see, not what it means.`

// ─── Retry Helper ────────────────────────────────────────────────────────────

/**
 * Wraps an async fn with exponential backoff + retry-after header support.
 * Handles Google AI 429s that include "Please retry in Xs" in the error body.
 */
async function withRetry(fn, { maxAttempts = 4, label = '' } = {}) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const msg = err.message || ''

      // Never retry auth or permission errors — fail fast
      const isFatal = /API key not valid|invalid api key|permission denied|billing|not found/i.test(msg)
      if (isFatal) throw err

      const isLast = attempt === maxAttempts
      if (isLast) throw err

      // Parse "Please retry in 40.87s" from Google AI rate-limit messages
      const retryMatch = msg.match(/retry in ([\d.]+)s/i)
      const waitSecs = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) + 2 : attempt * 15

      log(`  ⏳ ${label} rate-limited — waiting ${waitSecs}s before retry ${attempt + 1}/${maxAttempts}...`, 1)
      await new Promise((r) => setTimeout(r, waitSecs * 1000))
    }
  }
}

// ─── Image Search ─────────────────────────────────────────────────────────────

async function searchPexels(query, count) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } })
  if (!res.ok) throw new Error(`Pexels API error: ${res.status} ${await res.text()}`)
  const data = await res.json()
  if (!data.photos?.length) throw new Error(`Pexels returned no results for "${query}"`)
  return data.photos.map((p) => ({
    id:           String(p.id),
    url:          p.src.large2x || p.src.large,
    photographer: p.photographer,
    alt:          p.alt || query,
    source:       'pexels',
    sourceUrl:    p.url,
  }))
}

async function searchUnsplash(query, count) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } })
  if (!res.ok) throw new Error(`Unsplash API error: ${res.status} ${await res.text()}`)
  const data = await res.json()
  if (!data.results?.length) throw new Error(`Unsplash returned no results for "${query}"`)
  return data.results.map((p) => ({
    id:           p.id,
    url:          p.urls.regular,
    photographer: p.user.name,
    alt:          p.alt_description || query,
    source:       'unsplash',
    sourceUrl:    p.links.html,
  }))
}

async function searchImages(query, count) {
  log(`Searching ${SOURCE} for "${query}" (top ${count})...`)
  const results = SOURCE === 'unsplash'
    ? await searchUnsplash(query, count)
    : await searchPexels(query, count)
  log(`  Found ${results.length} image${results.length !== 1 ? 's' : ''}`)
  return results
}

// ─── Image Fetch ─────────────────────────────────────────────────────────────

async function fetchAsBase64(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`)
  const buffer = await res.arrayBuffer()
  return {
    base64:   Buffer.from(buffer).toString('base64'),
    mimeType: res.headers.get('content-type')?.split(';')[0] || 'image/jpeg',
  }
}

// ─── Gemini: Describe Image ───────────────────────────────────────────────────

async function describeImage(base64, mimeType) {
  return withRetry(async () => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GOOGLE_AI_KEY}`
    const body = {
      contents: [{
        parts: [
          { text: GEMINI_DESCRIPTION_PROMPT },
          { inline_data: { mime_type: mimeType, data: base64 } },
        ],
      }],
      generationConfig: {
        temperature:     0.2,
        maxOutputTokens: 600,
      },
    }

    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json()
    if (data.error) throw new Error(`Gemini error: ${data.error.message}`)

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) throw new Error('Gemini returned no description')
    return text.trim()
  }, { label: 'Gemini', maxAttempts: 4 })
}

// ─── Imagen: Generate Illustration ───────────────────────────────────────────

async function generateIllustration(prompt) {
  return withRetry(async () => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${GOOGLE_AI_KEY}`
    const body = {
      instances:  [{ prompt }],
      parameters: {
        sampleCount:       1,
        aspectRatio:       ASPECT_RATIO,
        safetyFilterLevel: 'block_few',
        personGeneration:  'allow_adult',
      },
    }

    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json()
    if (data.error) throw new Error(`Imagen error: ${data.error.message}`)

    const b64 = data.predictions?.[0]?.bytesBase64Encoded
    if (!b64) throw new Error(`Imagen returned no image. Full response: ${JSON.stringify(data)}`)
    return b64
  }, { label: 'Imagen', maxAttempts: 4 })
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function log(msg, indent = 0) {
  const prefix = indent ? '  '.repeat(indent) : ''
  console.log(`${prefix}${msg}`)
}

function pad(n, total) {
  return String(n).padStart(String(total).length, '0')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n╔════════════════════════════════════╗')
  console.log('║     In Parallel Image Pipeline     ║')
  console.log('╚════════════════════════════════════╝\n')

  if (DRY_RUN) log('⚠️  DRY RUN — no API calls will be made\n')

  log(`Query:   "${QUERY}"`)
  log(`Count:   ${COUNT}`)
  log(`Source:  ${SOURCE}`)
  log(`Slug:    ${SLUG}`)
  log(`Models:  ${GEMINI_MODEL} (describe) → ${IMAGEN_MODEL} (generate)`)
  log(`Output:  public/images/generated/${SLUG}/`)
  if (START_AT > 1) log(`Resuming from image ${START_AT}`)
  log('')

  // Create output directory
  await fs.mkdir(OUT_DIR, { recursive: true })

  // 1. Search
  const images = DRY_RUN
    ? [{ id: 'dry-run', url: 'https://example.com/img.jpg', photographer: 'Test', alt: 'test', source: SOURCE, sourceUrl: '' }]
    : await searchImages(QUERY, COUNT)

  const manifest = []
  const errors   = []

  for (let i = 0; i < images.length; i++) {
    const imageNum = i + 1

    // --start N: skip already-processed images
    if (imageNum < START_AT) {
      log(`Skipping image ${imageNum} (--start ${START_AT})`)
      continue
    }

    // Inter-image delay (skip before first processed image)
    if (imageNum > START_AT && !DRY_RUN) {
      log(`⏸  Waiting ${DELAY_SECS}s before next image...`)
      await new Promise((r) => setTimeout(r, DELAY_SECS * 1000))
    }

    const img    = images[i]
    const num    = pad(imageNum, images.length)
    const prefix = `${SLUG}-${num}`

    console.log(`\n── Image ${imageNum} / ${images.length} ──────────────────────────`)
    log(`Source:  ${img.sourceUrl || img.url}`)
    log(`Credit:  ${img.photographer} (${img.source})`)

    try {
      // 2. Download reference
      log('→ Downloading reference image...')
      let base64, mimeType
      if (DRY_RUN) {
        base64   = 'dummybase64'
        mimeType = 'image/jpeg'
      } else {
        ;({ base64, mimeType } = await fetchAsBase64(img.url))
      }

      // Save source reference
      const sourceFile = path.join(OUT_DIR, `${prefix}-source.jpg`)
      if (!DRY_RUN) await fs.writeFile(sourceFile, Buffer.from(base64, 'base64'))
      log(`→ Reference saved: ${prefix}-source.jpg`)

      // 3. Describe
      log(`→ Describing with Gemini (${GEMINI_MODEL})...`)
      const description = DRY_RUN
        ? 'A dry-run placeholder description of the test image.'
        : await describeImage(base64, mimeType)
      log(`→ Description (${description.length} chars):`)
      log(`  "${description.slice(0, 120)}${description.length > 120 ? '…' : ''}"`)

      // 4. Generate dark variant
      log(`→ Generating dark variant (#001325) via ${IMAGEN_MODEL}...`)
      const darkFile = `${prefix}-dark.png`
      if (!DRY_RUN) {
        const darkB64 = await generateIllustration(DARK_PROMPT(description))
        await fs.writeFile(path.join(OUT_DIR, darkFile), Buffer.from(darkB64, 'base64'))
      }
      log(`→ Dark saved: ${darkFile}`)

      // 5. Generate light variant
      log(`→ Generating light variant (#F4F5F2) via ${IMAGEN_MODEL}...`)
      const lightFile = `${prefix}-light.png`
      if (!DRY_RUN) {
        const lightB64 = await generateIllustration(LIGHT_PROMPT(description))
        await fs.writeFile(path.join(OUT_DIR, lightFile), Buffer.from(lightB64, 'base64'))
      }
      log(`→ Light saved: ${lightFile}`)

      manifest.push({
        index:        imageNum,
        slug:         `${prefix}`,
        credit:       { photographer: img.photographer, source: img.source, url: img.sourceUrl },
        description,
        outputs: {
          dark:   `/images/generated/${SLUG}/${darkFile}`,
          light:  `/images/generated/${SLUG}/${lightFile}`,
          source: `/images/generated/${SLUG}/${prefix}-source.jpg`,
        },
      })

      log('✓  Done')

    } catch (err) {
      const msg = `Image ${imageNum} failed: ${err.message}`
      errors.push({ imageNum, url: img.sourceUrl || img.url, error: err.message })
      log(`⚠️  ${msg} — skipping`)
      if (process.env.DEBUG) console.error(err.stack)
    }
  }

  // 6. Write manifest (successful images only)
  const manifestPath = path.join(OUT_DIR, 'manifest.json')
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))

  const allDone = errors.length === 0
  console.log('\n╔════════════════════════════════════╗')
  console.log(allDone ? '║            ✅  Complete             ║' : '║         ⚠️   Done with errors        ║')
  console.log('╚════════════════════════════════════╝\n')

  log(`${manifest.length} succeeded, ${errors.length} failed`)
  log(`Output: public/images/generated/${SLUG}/`)
  log(`Manifest: public/images/generated/${SLUG}/manifest.json\n`)

  if (manifest.length) {
    console.log('Files generated:')
    for (const entry of manifest) {
      console.log(`  ${entry.slug}-dark.png   (dark, #001325)`)
      console.log(`  ${entry.slug}-light.png  (light, #F4F5F2)`)
    }
    console.log()
  }

  if (errors.length) {
    console.log('Failed images (retry with --start N):')
    for (const e of errors) {
      console.log(`  Image ${e.imageNum}: ${e.error}`)
      console.log(`    → node scripts/image-pipeline.mjs --query "${QUERY}" --count ${COUNT} --slug "${SLUG}" --start ${e.imageNum} --count 1`)
    }
    console.log()
  }
}

run().catch((err) => {
  console.error(`\n❌  Pipeline failed: ${err.message}\n`)
  if (process.env.DEBUG) console.error(err.stack)
  process.exit(1)
})
