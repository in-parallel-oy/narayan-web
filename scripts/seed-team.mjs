/**
 * Seed team members into Sanity CMS.
 *
 * Usage:
 *   SANITY_API_TOKEN=<your-write-token> node scripts/seed-team.mjs
 *
 * Get a write token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is required.');
  console.error('Get a token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens');
  process.exit(1);
}

const client = createClient({
  projectId: 'tmsmtg2i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const teamMembers = [
  {
    name: 'Markku Mäkeläinen',
    role: 'Co-founder & CEO',
    bio: "Founder of a data pricing startup, where he executed a fast GTM that led to a high-value exit. Built and led Facebook's International Partnerships organization, which made the Internet.org initiative a scaled success. Scaled a music-oriented Fintech from pre-product, pre-revenue to €550m GTV in 18 months.",
    linkedin: 'https://www.linkedin.com/in/markkumakelainen/',
    photoFile: 'markku-makelainen.jpg',
    order: 1,
  },
  {
    name: 'Kristian Luoma',
    role: 'Co-founder, Product',
    bio: 'Won 20 awards for new business initiatives at OP Financial Group, built more than 60 products, with up to 300 million active users. Acquired and integrated 15 companies.',
    linkedin: 'https://www.linkedin.com/in/kristianluoma/',
    photoFile: 'kristian-luoma.jpg',
    order: 2,
  },
  {
    name: 'Michal Olczak',
    role: 'Chief Technology Officer',
    bio: 'Deep background in leading teams across finance and enterprise sectors. Spearheaded technical innovation and agile delivery at OP Financial Group and Nokia, consistently developing transformative solutions that elevated industry benchmarks.',
    linkedin: 'https://www.linkedin.com/in/michalolczak/',
    photoFile: 'michal-olczak.jpg',
    order: 3,
  },
  {
    name: 'Jari Heinonen',
    role: 'Head of Sales',
    bio: 'Senior sales operations professional with over 25 years of experience in B2B SaaS companies, spanning global mid-market, enterprise, and telecommunications sectors. Proven track record of scaling growth start-ups in the US and Europe.',
    linkedin: 'https://www.linkedin.com/in/jariheinonen/',
    photoFile: 'jari-heinonen.jpg',
    order: 4,
  },
  {
    name: 'Sami Niemelä',
    role: 'Head of Design',
    bio: "Previously partner & co-founder at Nordkapp, Finland's leading strategic design consultancy. Winner of 40 awards. Contributor to several successful scale-up and startup projects, including Oura, Supermetrics, Beddit, and Umbra 3D.",
    linkedin: 'https://www.linkedin.com/in/saminiem/',
    photoFile: 'sami-niemela.jpg',
    order: 5,
  },
  {
    name: 'Topi Järvinen',
    role: 'Head of Customer Success',
    bio: 'Ex-PwC innovation leader who has launched 100+ products, guided 40+ startup investments and co-founded two companies.',
    linkedin: 'https://www.linkedin.com/in/topijar/',
    photoFile: null,
    order: 6,
  },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: 'image/jpeg',
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function seed() {
  // Check for existing team members
  const existing = await client.fetch(`*[_type == "teamMember"]{ name }`);
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing team members. Skipping seed.`);
    console.log('To re-seed, delete existing team members first.');
    return;
  }

  console.log('Seeding team members...\n');

  for (const member of teamMembers) {
    let photo = undefined;

    if (member.photoFile) {
      const photoPath = path.join(__dirname, '..', 'public', 'images', 'team', member.photoFile);
      if (fs.existsSync(photoPath)) {
        console.log(`  Uploading photo for ${member.name}...`);
        photo = await uploadImage(photoPath);
      } else {
        console.log(`  Photo not found for ${member.name}: ${photoPath}`);
      }
    }

    const doc = {
      _type: 'teamMember',
      name: member.name,
      slug: { _type: 'slug', current: member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      role: member.role,
      bio: member.bio,
      linkedin: member.linkedin,
      order: member.order,
      ...(photo && { photo }),
    };

    const result = await client.create(doc);
    console.log(`  ✓ Created: ${member.name} (${result._id})`);
  }

  console.log('\nDone! Team members seeded successfully.');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
