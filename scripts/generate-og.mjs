#!/usr/bin/env node
/**
 * generate-og.mjs
 *
 * Screenshots Astro pages and saves them as OG images (1200×630).
 * Called from .githooks/pre-commit with a list of changed page files.
 *
 * Usage:
 *   node scripts/generate-og.mjs src/pages/better-with-ai.astro [...]
 *   node scripts/generate-og.mjs --all          # screenshot every static page
 */

import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT     = path.resolve(__dirname, '..');
const OG_DIR   = path.join(ROOT, 'public/images/og');
const PORT     = 4399;
const BASE_URL = `http://localhost:${PORT}`;

// ── Path helpers ──────────────────────────────────────────────────────────────

function pageFileToUrl(file) {
  const rel = file
    .replace(/^.*src\/pages\//, '')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '');
  return rel === '' || rel === 'index' ? '/' : `/${rel}`;
}

function pageFileToSlug(file) {
  const rel = file
    .replace(/^.*src\/pages\//, '')
    .replace(/\.astro$/, '');
  if (rel === 'index') return 'home';
  return rel.replace(/\//g, '-');
}

function isStaticPage(file) {
  // Skip dynamic routes ([...slug], [id], etc.) and layout/partial files
  return !file.includes('[') && file.match(/src\/pages\/.*\.astro$/);
}

// ── Server helpers ────────────────────────────────────────────────────────────

async function waitForServer(url, timeout = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {}
    await new Promise(r => setTimeout(r, 600));
  }
  throw new Error(`Dev server not ready after ${timeout / 1000}s`);
}

function startServer() {
  const astro = path.join(ROOT, 'node_modules/.bin/astro');
  const server = spawn(
    existsSync(astro) ? 'node' : 'npx',
    existsSync(astro) ? [astro, 'dev', '--port', String(PORT)] : ['astro', 'dev', '--port', String(PORT)],
    { cwd: ROOT, stdio: 'pipe', detached: false }
  );
  server.on('error', () => {});
  return server;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  let pageFiles;
  if (args.includes('--all')) {
    // Find all static pages
    const { globSync } = await import('glob');
    pageFiles = globSync('src/pages/**/*.astro', { cwd: ROOT }).filter(isStaticPage);
  } else {
    pageFiles = args.filter(isStaticPage);
  }

  if (pageFiles.length === 0) {
    console.log('[og] No eligible pages — skipping');
    return;
  }

  await mkdir(OG_DIR, { recursive: true });

  console.log(`[og] Generating OG images for: ${pageFiles.map(pageFileToSlug).join(', ')}`);

  const server = startServer();

  try {
    await waitForServer(BASE_URL);
    console.log('[og] Dev server ready');

    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
    const page = await ctx.newPage();

    // Suppress console noise from the pages
    page.on('console', () => {});
    page.on('pageerror', () => {});

    for (const file of pageFiles) {
      const url  = pageFileToUrl(file);
      const slug = pageFileToSlug(file);
      const out  = path.join(OG_DIR, `${slug}.png`);

      try {
        console.log(`[og]   ${url}`);
        await page.goto(`${BASE_URL}${url}`, { waitUntil: 'load', timeout: 20000 });
        // Let fonts and images settle
        await page.waitForTimeout(1000);
        await page.screenshot({ path: out });
        console.log(`[og]   ✓ saved as ${slug}.png`);
      } catch (e) {
        console.warn(`[og]   ✗ ${slug}: ${e.message}`);
      }
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch(e => {
  console.error('[og] Fatal:', e.message);
  // Exit 0 so commit is never blocked by OG failures
  process.exit(0);
});
