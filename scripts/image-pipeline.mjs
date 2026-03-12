#!/usr/bin/env node
/**
 * image-pipeline.mjs
 * Editorial illustration pipeline: Pexels → Gemini → Imagen
 *
 * Usage:
 *   node scripts/image-pipeline.mjs --query "team meeting" --count 3 --slug "meetings"
 */

import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs'
import { pipeline } from 'stream/promises'
import { basename, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { parseArgs } from 'util'
import https from 'https'
import http from 'http'

// ─── Env ────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Load .env manually (no dotenv dep required in Node 20+)
try {
  const envPath = join(ROOT, '.env')
  if (existsSync(envPath)) {
    const raw = (await import('fs')).readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
      if (m) process.env[m[1]] ??= m[2].replace(/^['"]|['"]$/g, '')
    }
  }
} catch {}

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY
const PEXELS_API_KEY    = process.env.PEXELS_API_KEY
const UNSPLASH_API_KEY  = process.env.UNSPLASH_API_KEY

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
const IMAGEN_MODEL = process.env.IMAGEN_MODEL || 'imagen-4.0-generate-001'
const ASPECT_RATIO = process.env.IMAGE_ASPECT_RATIO || '16:9'

// ─── Args ────────────────────────────────────────────────────────────────────

const { values: args } = parseArgs({
  options: {
    query:   { type: 'string' },
    count:   { type: 'string', default: '3' },
    source:  { type: 'string', default: 'pexels' },
    slug:    { type: 'string' },
    start:   { type: 'string', default: '1' },
    delay:   { type: 'string', default: '12' },
    'dry-run': { type: 'boolean', default: false },
  },
  strict: false,
})

const QUERY    = args.query
const COUNT    = parseInt(args.count, 10)
const SOURCE   = args.source
const START    = parseInt(args.start, 10)
const DELAY_S  = parseInt(args.delay, 10)
const DRY_RUN  = args['dry-run']
const SLUG     = args.slug || slugify(QUERY || 'images')

if (!QUERY) {
  console.error('Error: --query is required')
  process.exit(1)
}

if (!DRY_RUN) {
  if (!GOOGLE_AI_API_KEY) { console.error('Error: GOOGLE_AI_API_KEY not set'); process.exit(1) }
  if (SOURCE === 'pexels' && !PEXELS_API_KEY) { console.error('Error: PEXELS_API_KEY not set'); process.exit(1) }
  if (SOURCE === 'unsplash' && !UNSPLASH_API_KEY) { console.error('Error: UNSPLASH_API_KEY not set'); process.exit(1) }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function pad(n) { return String(n).padStart(2, '0') }

function sleep(s) { return new Promise(r => setTimeout(r, s * 1000)) }

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, opts)
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`)
  return res.json()
}

async function downloadFile(url, dest) {
  const proto = url.startsWith('https') ? https : http
  await new Promise((resolve, reject) => {
    proto.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      const out = createWriteStream(dest)
      res.pipe(out)
      out.on('finish', resolve)
      out.on('error', reject)
    }).on('error', reject)
  })
}

// Retry with exponential back-off; parses Google's "retry in Xs" messages
async function withRetry(fn, label, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const msg = err.message || ''
      const match = msg.match(/retry[^\d]*(\d+)/i)
      const wait = match ? parseInt(match[1], 10) + 2 : attempt * 15
      if (attempt === maxAttempts) throw new Error(`${label} — exhausted retries: ${msg}`)
      console.warn(`  ⚠ ${label} failed (attempt ${attempt}/${maxAttempts}), retrying in ${wait}s…`)
      await sleep(wait)
    }
  }
}

// ─── Style prompts (from SKILL.md) ───────────────────────────────────────────

const STYLE_SHARED = `Refined editorial pen-and-watercolor illustration. NOT a comic book, graphic novel, or cartoon. Fine dark ink line art with careful cross-hatching defines the figures and objects. Human figures must have realistic, natural proportions — no exaggerated heads, simplified faces, or stylised cartoon features. Faces are rendered with subtle ink detail: real bone structure, natural expression, human anatomy. The scene includes its full environment: the room, furniture, windows, surfaces — all rendered loosely in expressive watercolor. The watercolor is the atmosphere of the scene. It fills the background environment with loose, granular washes — pooling in shadows, bleeding at edges, suggesting depth without photographic detail. All subjects are fully contained within the frame with natural breathing room. The illustration fades softly toward the edges. No readable text, words, numbers, labels, or legible writing anywhere in the image — whiteboards, screens, documents, and sticky notes must be rendered as abstract marks, smudges, or indistinct gesture only. No cut marks, stamps, or annotations anywhere in the image.`

const STYLE_LIGHT = `Palette: warm ochres, dusty blues, muted grey-greens, soft yellows, pale taupes. The watercolor washes filling the environment — walls, windows, surfaces, sky seen through windows — are warm and atmospheric, rendered in loose transparent layers. The overall image is airy and warm. Ink lines are dark charcoal. The image transitions to near-white at its edges, fading naturally with no hard border.`

// ─── Pexels ──────────────────────────────────────────────────────────────────

async function searchPexels(query, count) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`
  const data = await fetchJSON(url, { headers: { Authorization: PEXELS_API_KEY } })
  return data.photos.map(p => ({
    url: p.src.large2x || p.src.large,
    credit: { photographer: p.photographer, source: 'pexels', url: p.url },
  }))
}

// ─── Unsplash ─────────────────────────────────────────────────────────────────

async function searchUnsplash(query, count) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`
  const data = await fetchJSON(url, { headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` } })
  return data.results.map(p => ({
    url: p.urls.regular,
    credit: { photographer: p.user.name, source: 'unsplash', url: p.links.html },
  }))
}

// ─── Gemini scene description ─────────────────────────────────────────────────

async function describeImage(imageUrl) {
  // Download to a temp buffer for inline base64
  const res = await fetch(imageUrl)
  const buf = Buffer.from(await res.arrayBuffer())
  const b64 = buf.toString('base64')
  const mime = res.headers.get('content-type') || 'image/jpeg'

  const body = {
    contents: [{
      parts: [
        {
          inline_data: { mime_type: mime, data: b64 }
        },
        {
          text: `You are a scene director briefing an editorial illustrator. Respond with ONE paragraph only — no preamble, no sign-off, no "here's the briefing" intro. Start directly with the scene description.

Describe this photograph in dense, concrete detail for use as an illustration brief. Include:
- Exact number of people, their gender presentation, approximate age, clothing (colours, fabrics, style)
- Posture, gesture, what each person is doing
- Facial expression and emotional tone
- The full environment: room type, architectural details, furniture, windows, light source, time of day suggested
- Colour palette and mood of the scene

Write as one flowing paragraph of 80–120 words. Be specific and visual. Do not mention the photo itself — write as if briefing an illustrator from memory. Do not begin with "Okay", "Sure", "Here is", "Here's", or any similar opener.

IMPORTANT: The environment is as important as the people. Include walls, windows, furniture, surfaces, and atmosphere. The illustrator will render all of this.`
        }
      ]
    }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 256 }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}`
  const data = await fetchJSON(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''
}

// ─── Imagen generation ────────────────────────────────────────────────────────

async function generateIllustration(description) {
  const prompt = `${STYLE_SHARED} ${STYLE_LIGHT}\n\nScene: ${description}`

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: ASPECT_RATIO,
    }
  }

  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/projects/locations/us-central1/publishers/google/models/${IMAGEN_MODEL}:predict`

  // Imagen uses a different auth approach via Google AI Studio key
  const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${GOOGLE_AI_API_KEY}`

  const data = await fetchJSON(imagenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const b64 = data.predictions?.[0]?.bytesBase64Encoded
  if (!b64) throw new Error('No image returned from Imagen')
  return Buffer.from(b64, 'base64')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const outDir = join(ROOT, 'public', 'images', 'generated', SLUG)
mkdirSync(outDir, { recursive: true })

console.log(`\n🎨 Image Pipeline`)
console.log(`   Query:  "${QUERY}"`)
console.log(`   Count:  ${COUNT}`)
console.log(`   Source: ${SOURCE}`)
console.log(`   Slug:   ${SLUG}`)
console.log(`   Out:    public/images/generated/${SLUG}/`)
if (DRY_RUN) console.log(`   Mode:   DRY RUN (no API calls)\n`)
else console.log()

// 1. Search for photos
let photos
if (DRY_RUN) {
  photos = Array.from({ length: COUNT }, (_, i) => ({
    url: `https://example.com/photo-${i + 1}.jpg`,
    credit: { photographer: 'Test User', source: SOURCE, url: 'https://example.com' },
  }))
  console.log(`✓ [dry-run] Would search ${SOURCE} for "${QUERY}" (${COUNT} photos)`)
} else {
  console.log(`Searching ${SOURCE} for "${QUERY}"…`)
  photos = await (SOURCE === 'unsplash' ? searchUnsplash : searchPexels)(QUERY, COUNT)
  console.log(`✓ Found ${photos.length} photos\n`)
}

const manifest = []
const failures = []

for (let i = 0; i < photos.length; i++) {
  const idx = i + 1
  if (idx < START) { console.log(`Skipping image ${idx} (--start ${START})`); continue }

  const photo = photos[i]
  const prefix = `${SLUG}-${pad(idx)}`
  console.log(`── Image ${idx}/${COUNT}: ${prefix} ──`)

  // 2. Download source photo
  const sourcePath = join(outDir, `${prefix}-source.jpg`)
  if (DRY_RUN) {
    console.log(`  [dry-run] Would download: ${photo.url}`)
  } else {
    process.stdout.write(`  Downloading source photo… `)
    await downloadFile(photo.url, sourcePath)
    console.log('✓')
  }

  // 3. Gemini scene description
  let description
  if (DRY_RUN) {
    description = `[dry-run] A professional meeting scene with two people in a modern office discussing documents on a glass table. Natural light streams through large windows behind them, casting warm shadows across the space.`
    console.log(`  [dry-run] Would describe image with Gemini`)
  } else {
    process.stdout.write(`  Gemini scene description… `)
    try {
      description = await withRetry(() => describeImage(photo.url), `Gemini image ${idx}`)
      console.log('✓')
      console.log(`  "${description.slice(0, 100)}…"`)
    } catch (err) {
      console.error(`  ✗ ${err.message}`)
      failures.push({ idx, step: 'Gemini', err: err.message })
      continue
    }
  }

  // 4. Generate illustration
  const outPath = join(outDir, `${prefix}.png`)
  if (DRY_RUN) {
    console.log(`  [dry-run] Would generate illustration with Imagen`)
    writeFileSync(outPath, `[dry-run placeholder: ${prefix}]`)
  } else {
    process.stdout.write(`  Imagen illustration… `)
    try {
      const imgBuf = await withRetry(() => generateIllustration(description), `Imagen image ${idx}`)
      writeFileSync(outPath, imgBuf)
      console.log('✓')
    } catch (err) {
      console.error(`  ✗ ${err.message}`)
      failures.push({ idx, step: 'Imagen', err: err.message })
    }
  }

  // 5. Add to manifest
  manifest.push({
    index: idx,
    slug: prefix,
    credit: photo.credit,
    description,
    outputs: {
      image:  `/images/generated/${SLUG}/${prefix}.png`,
      source: `/images/generated/${SLUG}/${prefix}-source.jpg`,
    },
  })

  // Inter-image delay
  if (!DRY_RUN && idx < photos.length) {
    process.stdout.write(`  Waiting ${DELAY_S}s before next image… `)
    await sleep(DELAY_S)
    console.log('✓')
  }
  console.log()
}

// 6. Write manifest
const manifestPath = join(outDir, 'manifest.json')
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
console.log(`✓ manifest.json written → public/images/generated/${SLUG}/manifest.json`)

// 7. Summary
console.log(`\n── Summary ──────────────────────────────────────────`)
console.log(`   Generated: ${manifest.length} images`)
console.log(`   Output:    public/images/generated/${SLUG}/`)
if (failures.length) {
  console.log(`\n   Failed images (retry with --start N):`)
  for (const f of failures) {
    console.log(`     Image ${f.idx}: ${f.step} — ${f.err}`)
    console.log(`       → node scripts/image-pipeline.mjs --query "${QUERY}" --count ${COUNT} --slug "${SLUG}" --start ${f.idx} --count 1`)
  }
}
console.log()
