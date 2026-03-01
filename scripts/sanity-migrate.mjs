#!/usr/bin/env node
/**
 * Sanity migration script:
 * 1. Change category "Intelligent Operating Model" → "Intelligent Management System" on all insights
 * 2. Change author from Ben Saren → Kristian Luoma on all insights
 *
 * Usage: SANITY_TOKEN=<your-write-token> node scripts/sanity-migrate.mjs
 *
 * Get a write token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required.');
  console.error('Get a write token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens');
  process.exit(1);
}

const client = createClient({
  projectId: 'tmsmtg2i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function migrateCategories() {
  const posts = await client.fetch(
    `*[_type == "insight" && category == "Intelligent Operating Model"] { _id, title }`
  );
  console.log(`\n--- Category migration ---`);
  console.log(`Found ${posts.length} posts with "Intelligent Operating Model" category.\n`);

  for (const post of posts) {
    await client
      .patch(post._id)
      .set({ category: 'Intelligent Management System' })
      .commit();
    console.log(`  ✓ ${post.title}`);
  }
  console.log(`\nDone: ${posts.length} posts updated to "Intelligent Management System".`);
}

async function migrateAuthors() {
  const posts = await client.fetch(
    `*[_type == "insight" && author._ref == "author-ben-saren"] { _id, title }`
  );
  console.log(`\n--- Author migration ---`);
  console.log(`Found ${posts.length} posts authored by Ben Saren.\n`);

  for (const post of posts) {
    await client
      .patch(post._id)
      .set({ author: { _type: 'reference', _ref: 'author-kristian-luoma' } })
      .commit();
    console.log(`  ✓ ${post.title}`);
  }
  console.log(`\nDone: ${posts.length} posts reassigned to Kristian Luoma.`);
}

async function main() {
  try {
    await migrateCategories();
    await migrateAuthors();
    console.log('\n✅ All migrations complete.');
  } catch (err) {
    console.error('\nMigration failed:', err.message);
    process.exit(1);
  }
}

main();
