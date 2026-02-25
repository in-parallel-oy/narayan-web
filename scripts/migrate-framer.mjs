#!/usr/bin/env node

/**
 * Migrate Framer CMS blog posts → Sanity
 *
 * Usage:
 *   node scripts/migrate-framer.mjs              # run migration
 *   node scripts/migrate-framer.mjs --dry-run    # preview without writing
 *
 * Requires SANITY_WRITE_TOKEN, PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET in .env
 */

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';

// ── Config ──────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(import.meta.dirname, '..');
const CSV_DIR = path.join(ROOT, 'Framer CMS');

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID or PUBLIC_SANITY_DATASET in .env');
  process.exit(1);
}
if (!token && !DRY_RUN) {
  console.error('Missing SANITY_WRITE_TOKEN in .env (or use --dry-run)');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

// ── Helpers ─────────────────────────────────────────────────────────────────

function readCsv(filename) {
  const content = fs.readFileSync(path.join(CSV_DIR, filename), 'utf-8');
  return parse(content, { columns: true, skip_empty_lines: true });
}

function stripHtmlTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[äå]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

async function downloadAndUploadImage(imageUrl, filename) {
  if (DRY_RUN) {
    console.log(`  [dry-run] Would upload image: ${imageUrl}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: 'image-placeholder' } };
  }

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${imageUrl}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') || 'image/jpeg';

    const asset = await client.assets.upload('image', buffer, {
      filename: filename || path.basename(new URL(imageUrl).pathname),
      contentType,
    });

    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    };
  } catch (err) {
    console.warn(`  Warning: Failed to upload image ${imageUrl}: ${err.message}`);
    return null;
  }
}

// ── Custom HTML → Portable Text ─────────────────────────────────────────────

/**
 * Convert an HTML string to Sanity Portable Text blocks.
 * Handles: p, h2, h3, ul/ol/li, blockquote, strong, em, a, img, iframe (YouTube).
 */
async function htmlToPortableText(html) {
  const cleaned = cleanHtml(html);
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${cleaned}</body></html>`);
  const body = dom.window.document.body;

  const blocks = [];

  for (const node of body.childNodes) {
    const result = await processTopLevelNode(node);
    if (result) {
      if (Array.isArray(result)) {
        blocks.push(...result);
      } else {
        blocks.push(result);
      }
    }
  }

  return blocks;
}

async function processTopLevelNode(node) {
  if (node.nodeType === 3) {
    // Text node at top level
    const text = node.textContent.trim();
    if (!text) return null;
    return makeBlock('normal', [{ _type: 'span', _key: randomKey(), text, marks: [] }]);
  }

  if (node.nodeType !== 1) return null; // Not an element

  const tag = node.tagName.toLowerCase();

  // YouTube iframe
  if (tag === 'iframe') {
    const src = node.getAttribute('src') || '';
    if (src.includes('youtube.com/embed')) {
      return { _type: 'youtube', _key: randomKey(), url: src };
    }
    return null;
  }

  // Inline image
  if (tag === 'img') {
    return await processInlineImage(node);
  }

  // Headings
  if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
    const { spans, markDefs } = extractInlineContent(node);
    if (spans.length === 0) return null;
    return makeBlock(tag, spans, markDefs);
  }

  // Paragraph
  if (tag === 'p') {
    // Check if paragraph contains only an image
    if (node.children.length === 1 && node.children[0].tagName?.toLowerCase() === 'img') {
      return await processInlineImage(node.children[0]);
    }
    // Check if paragraph contains only an iframe
    if (node.children.length === 1 && node.children[0].tagName?.toLowerCase() === 'iframe') {
      const src = node.children[0].getAttribute('src') || '';
      if (src.includes('youtube.com/embed')) {
        return { _type: 'youtube', _key: randomKey(), url: src };
      }
    }
    const { spans, markDefs } = extractInlineContent(node);
    if (spans.length === 0) return null;
    return makeBlock('normal', spans, markDefs);
  }

  // Blockquote
  if (tag === 'blockquote') {
    // Get content from child <p> or directly
    const p = node.querySelector('p');
    const target = p || node;
    const { spans, markDefs } = extractInlineContent(target);
    if (spans.length === 0) return null;
    return makeBlock('blockquote', spans, markDefs);
  }

  // Lists
  if (tag === 'ul' || tag === 'ol') {
    const listType = tag === 'ul' ? 'bullet' : 'number';
    const items = [];
    for (const li of node.querySelectorAll(':scope > li')) {
      // List item may contain a <p> inside
      const p = li.querySelector('p');
      const target = p || li;
      const { spans, markDefs } = extractInlineContent(target);
      if (spans.length === 0) continue;
      items.push({
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        listItem: listType,
        level: 1,
        markDefs: markDefs || [],
        children: spans,
      });
    }
    return items.length > 0 ? items : null;
  }

  // Figure (may contain img)
  if (tag === 'figure') {
    const img = node.querySelector('img');
    if (img) return await processInlineImage(img);
    return null;
  }

  // Div or other wrapper — recurse into children
  if (tag === 'div' || tag === 'section' || tag === 'article') {
    const results = [];
    for (const child of node.childNodes) {
      const r = await processTopLevelNode(child);
      if (r) {
        if (Array.isArray(r)) results.push(...r);
        else results.push(r);
      }
    }
    return results.length > 0 ? results : null;
  }

  // Fallback: treat as paragraph
  const { spans, markDefs } = extractInlineContent(node);
  if (spans.length === 0) return null;
  return makeBlock('normal', spans, markDefs);
}

async function processInlineImage(imgNode) {
  const src = imgNode.getAttribute('src') || '';
  const alt = imgNode.getAttribute('alt') || '';
  if (!src) return null;

  const uploaded = await downloadAndUploadImage(src, `inline-${randomKey()}.jpg`);
  if (!uploaded) return null;

  return {
    ...uploaded,
    _key: randomKey(),
    alt: alt || undefined,
  };
}

function makeBlock(style, children, markDefs = []) {
  return {
    _type: 'block',
    _key: randomKey(),
    style,
    markDefs,
    children,
  };
}

/**
 * Extract inline content (text, strong, em, links) from an element.
 * Returns { spans, markDefs }.
 */
function extractInlineContent(element) {
  const spans = [];
  const markDefs = [];

  function walk(node, currentMarks) {
    if (node.nodeType === 3) {
      // Text node
      const text = node.textContent;
      if (text) {
        spans.push({
          _type: 'span',
          _key: randomKey(),
          text,
          marks: [...currentMarks],
        });
      }
      return;
    }

    if (node.nodeType !== 1) return;

    const tag = node.tagName.toLowerCase();
    let marks = [...currentMarks];

    if (tag === 'strong' || tag === 'b') {
      marks.push('strong');
    } else if (tag === 'em' || tag === 'i') {
      marks.push('em');
    } else if (tag === 'a') {
      const href = node.getAttribute('href');
      if (href) {
        const markKey = randomKey();
        markDefs.push({ _type: 'link', _key: markKey, href });
        marks.push(markKey);
      }
    } else if (tag === 'br') {
      spans.push({ _type: 'span', _key: randomKey(), text: '\n', marks: [...currentMarks] });
      return;
    }

    for (const child of node.childNodes) {
      walk(child, marks);
    }
  }

  walk(element, []);

  // Filter out spans that are purely whitespace (but keep spaces between words)
  const filtered = spans.filter((s) => s.text !== '');
  return { spans: filtered, markDefs };
}

// ── HTML Assembly & Cleaning ────────────────────────────────────────────────

function assembleBodyHtml(row) {
  const parts = [];

  if (row.Introduction) {
    parts.push(row.Introduction);
  }

  for (let i = 1; i <= 15; i++) {
    const title = row[`${ordinal(i)} title`];
    const block = row[`${ordinal(i)} block`];
    if (!block) continue;

    // Only add the title as an h2 if it's not already the first element in the block
    if (title && !blockStartsWithHeading(block, title)) {
      parts.push(`<h2>${title}</h2>`);
    }

    parts.push(block);
  }

  if (row.References) {
    parts.push('<h2>References</h2>');
    parts.push(row.References);
  }

  return parts.join('\n');
}

function ordinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function blockStartsWithHeading(html, title) {
  if (!html || !title) return false;
  const plainTitle = stripHtmlTags(title).toLowerCase().trim();
  const match = html.match(/^<h[23][^>]*>(.*?)<\/h[23]>/is);
  if (!match) return false;
  const headingText = stripHtmlTags(match[1]).toLowerCase().trim();
  return headingText === plainTitle;
}

function cleanHtml(html) {
  return html
    .replace(/\s*dir="auto"/g, '')
    .replace(/\s*dir=""auto""/g, '')
    .replace(/\s*data-preset-tag=""?p""?/g, '')
    .replace(/\s*data-preset-tag="p"/g, '')
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '');
}

// ── Migration: Authors ──────────────────────────────────────────────────────

async function migrateAuthors() {
  console.log('\nMigrating authors...');
  const authors = readCsv('Authors.csv');
  const authorMap = {};

  for (const row of authors) {
    const slug = row.Slug;
    const docId = `author-${slugify(slug)}`;
    authorMap[slug] = docId;

    console.log(`  -> ${row.Name} (${docId})`);

    let photo = null;
    if (row.Picture) {
      photo = await downloadAndUploadImage(row.Picture, `author-${slug}.jpg`);
    }

    // Clean email: remove "mailto:" prefix if present
    let email = row.Email || '';
    email = email.replace(/^mailto:/, '');

    const doc = {
      _id: docId,
      _type: 'author',
      name: row.Name,
      slug: { _type: 'slug', current: slug },
      role: row.Title || undefined,
      email: email || undefined,
      linkedin: row.LinkedIn || undefined,
      ...(photo && { photo }),
    };

    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

    if (!DRY_RUN) {
      await client.createOrReplace(doc);
      console.log(`    Done`);
    } else {
      console.log(`    [dry-run] Would create: ${doc.name} (${doc.role})`);
    }
  }

  return authorMap;
}

// ── Migration: Insights ─────────────────────────────────────────────────────

async function migrateInsights(authorMap) {
  console.log('\nMigrating insights...');
  const posts = readCsv('Blog.csv');
  const tags = readCsv('Tags.csv');

  const tagMap = {};
  for (const t of tags) {
    tagMap[t.Slug] = t.Tag;
  }

  let count = 0;
  for (const row of posts) {
    count++;
    const slug = row.Slug;
    const docId = `insight-${slugify(slug)}`;
    console.log(`  [${count}/${posts.length}] ${row.Title}`);

    // Upload cover image
    let image = null;
    if (row.Image) {
      image = await downloadAndUploadImage(row.Image, `cover-${slug}.jpg`);
      if (image && row['Image:alt']) {
        image.alt = row['Image:alt'];
      }
    }

    // Resolve author reference
    let author = undefined;
    if (row.Author && authorMap[row.Author]) {
      author = { _type: 'reference', _ref: authorMap[row.Author] };
    }

    // Resolve tags
    let resolvedTags = undefined;
    if (row.Tags) {
      resolvedTags = row.Tags.split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((slug) => tagMap[slug] || slug);
    }

    // Convert body HTML → Portable Text
    const bodyHtml = assembleBodyHtml(row);
    let body = [];
    if (bodyHtml.trim()) {
      body = await htmlToPortableText(bodyHtml);
    }

    const doc = {
      _id: docId,
      _type: 'insight',
      title: row.Title,
      subtitle: row.Subtitle || undefined,
      slug: { _type: 'slug', current: slug },
      description: stripHtmlTags(row['Short summary']),
      date: row['Last updated'] || undefined,
      author,
      category: row['Main category'] || undefined,
      tags: resolvedTags,
      featured: row.Featured === 'true',
      ...(image && { image }),
      body,
    };

    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

    if (!DRY_RUN) {
      await client.createOrReplace(doc);
      console.log(`    Done`);
    } else {
      console.log(
        `    [dry-run] Body blocks: ${body.length}, image: ${!!image}, author: ${row.Author}`
      );
    }
  }

  console.log(`\nMigrated ${count} insights`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Framer -> Sanity migration${DRY_RUN ? ' (DRY RUN)' : ''}`);
  console.log(`Project: ${projectId}, Dataset: ${dataset}`);

  const authorMap = await migrateAuthors();
  await migrateInsights(authorMap);

  console.log('\nMigration complete!');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
