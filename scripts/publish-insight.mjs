/**
 * Publish an insight article to Sanity CMS.
 *
 * Usage:
 *   SANITY_API_TOKEN=<your-write-token> node scripts/publish-insight.mjs
 *
 * Get a write token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is required.');
  console.error(
    'Get a token from: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens',
  );
  process.exit(1);
}

const client = createClient({
  projectId: 'tmsmtg2i',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

// --- Portable Text helpers ---

function key() {
  return randomUUID().replace(/-/g, '').slice(0, 12);
}

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks };
}

function block(style, ...children) {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: children.length ? children : [span('')],
  };
}

function h2(text) {
  return block('h2', span(text));
}

function h3(text) {
  return block('h3', span(text));
}

function p(...children) {
  return block('normal', ...children);
}

function bold(text) {
  return span(text, ['strong']);
}

function italic(text) {
  return span(text, ['em']);
}

function text(t) {
  return span(t);
}

// --- Article content ---

const articleBody = [
  // Hook
  p(
    text(
      'Your team rolled out AI writing tools six months ago. The pitch was simple: faster drafts, fewer bottlenecks, more output. And the tools delivered — sort of. Your team is producing more content than ever. But somehow, everything still takes just as long to land.',
    ),
  ),

  p(
    text(
      "That's because your AI tools created a new problem while solving the old one. Researchers have a name for it: "),
    bold('workslop'),
    text('.'),
  ),

  // Section 2: Data Behind the Drag
  h2('The Data Behind the Drag'),

  p(
    text(
      'In September 2025, BetterUp Labs and the Stanford Social Media Lab surveyed 1,150 U.S. full-time desk workers. Their findings put hard numbers on something most managers already feel.',
    ),
  ),

  p(
    bold('41%'),
    text(
      ' of workers had encountered workslop in the preceding month — AI-generated content that looks polished but lacks substance. Not gibberish. Not obviously wrong. Just… hollow. Professional-sounding text that says nothing useful.',
    ),
  ),

  p(
    text('The cost of each piece: '),
    bold('1 hour and 56 minutes'),
    text(
      ' of the recipient\'s time. That includes reading it, figuring out it\'s off, verifying what\'s actually true, and either reworking it or starting over. Multiply that across an organization and the numbers get ugly fast: ',
    ),
    bold('$186 per employee per month'),
    text('. For a 10,000-person company, that\'s '),
    bold('$9 million a year'),
    text(' — not on the AI tools themselves, but on cleaning up what they produce.'),
  ),

  p(
    text(
      'Meanwhile, MIT Media Lab reports that 95% of organizations have seen no measurable ROI from their AI deployments. These two data points are not unrelated.',
    ),
  ),

  // Section 3: The Problem Isn't the AI
  h2("The Problem Isn't the AI"),

  p(
    text(
      "It's tempting to blame the models. But the AI is doing exactly what it was asked to do: generate content quickly. The problem is that it's generating content ",
    ),
    italic('without context'),
    text('.'),
  ),

  p(
    text(
      "When a team member asks an AI tool to draft a project update, the tool doesn't know what was decided in yesterday's meeting. It doesn't know the timeline shifted. It doesn't know the client changed the scope on Tuesday. So it produces a confident, well-formatted update that reflects ",
    ),
    italic("last week's reality"),
    text('.'),
  ),

  p(
    text('This is the '),
    bold('Coordination Tax'),
    text(
      " — the hidden cost of keeping everyone aligned when reality moves faster than your artifacts. AI tools didn't create the Coordination Tax, but they're ",
    ),
    italic('compounding'),
    text(
      " it. Before AI, a team member writing an outdated update would at least notice the gap and ask a colleague. Now the AI writes the update instantly, the gap goes unnoticed, and someone downstream spends two hours untangling it.",
    ),
  ),

  // Section 4: When Trust Erodes
  h2('When Trust Erodes, the Tax Compounds'),

  p(
    text(
      "The BetterUp study found something more damaging than wasted time. Workslop doesn't just cost hours — it costs trust.",
    ),
  ),

  p(
    bold('50%'),
    text(
      ' of recipients viewed the sender as less creative, less capable, and less reliable after receiving workslop. ',
    ),
    bold('42%'),
    text(
      ' reduced the sender\'s trustworthiness rating. Among those who encountered it, ',
    ),
    bold('53%'),
    text(' felt annoyed, '),
    bold('38%'),
    text(' felt confused, and '),
    bold('22%'),
    text(' felt offended.'),
  ),

  p(
    text(
      "This is where the Coordination Tax turns into a coordination ",
    ),
    italic('crisis'),
    text(
      ". When people stop trusting the information they receive, they build workarounds. They double-check everything. They schedule \"alignment meetings\" to verify what should have been clear from the document. Each piece of workslop doesn't just waste two hours — it degrades the system that's supposed to make collaboration efficient.",
    ),
  ),

  // Section 5: Amplifier or Noise Machine
  h2('Amplifier or Noise Machine?'),

  p(
    text(
      "The question isn't whether to use AI. It's whether your AI tools are amplifying your team's intelligence or just amplifying noise.",
    ),
  ),

  p(
    text(
      "The difference comes down to one thing: does the AI know what's actually happening? If your plans are static documents that were last updated three sprints ago, any AI generating content from them will produce workslop by definition. The input is stale, so the output is hollow.",
    ),
  ),

  p(
    text('What teams need are '),
    bold('Living Plans'),
    text(
      ' — plans that update themselves from meetings, decisions, and execution reality. When the AI drafts a project update from a living plan, it reflects what was decided this morning, not what was true last month. The output is grounded because the source is current.',
    ),
  ),

  p(
    text(
      "This is the difference between AI that maintains execution reality and AI that generates more stuff to sort through. The first type reduces your Coordination Tax. The second type is the Coordination Tax.",
    ),
  ),

  // Section 6: Close the Gap
  h2('Close the Gap Between Decisions and Documents'),

  p(
    text(
      "Workslop is a symptom. The disease is the gap between what your team decides and what your tools reflect. Every hour that gap exists, AI tools are faithfully generating content from yesterday's truth.",
    ),
  ),

  p(
    text('An '),
    bold('Intelligent Management System'),
    text(
      ' works as a ',
    ),
    bold('Coordination Layer'),
    text(
      " — sitting alongside your existing tools, listening to what happens in meetings and decisions, and keeping plans current. It doesn't replace your project management tool. It doesn't make decisions for your team. It maintains the ground truth so that when AI generates content, that content actually reflects reality.",
    ),
  ),

  p(
    text(
      'The two-hour tax on workslop is real, and it\'s growing. But the fix isn\'t "better prompts" or "AI training." It\'s closing the gap between what your team knows and what your tools know.',
    ),
  ),

  p(
    text(
      "When plans update themselves, AI stops producing workslop — because it's finally working from what's actually true.",
    ),
  ),
];

// --- Article metadata ---

const article = {
  title: "The 2-Hour Tax: What AI-Generated 'Workslop' Really Costs",
  slug: 'the-2-hour-tax-workslop',
  description:
    'BetterUp Labs research shows AI-generated workslop costs nearly 2 hours per instance to fix. The problem isn\u2019t AI quality \u2014 it\u2019s a coordination failure that Living Plans can solve.',
  category: 'AI in Business',
  tags: [
    'AI productivity',
    'Coordination Tax',
    'workslop',
    'Living Plans',
    'execution intelligence',
  ],
  featured: false,
  heroImagePath: path.join(
    __dirname,
    '..',
    'public',
    'images',
    'generated',
    'the-2-hour-tax-workslop',
    'the-2-hour-tax-workslop-2-light.png',
  ),
  heroImageAlt:
    'Pen-and-watercolor illustration of an overwhelmed executive surrounded by digital noise — representing the hidden cost of AI-generated workslop.',
  authorName: 'Kristian Luoma',
};

// --- Publish ---

async function uploadImage(filePath, altText) {
  console.log(`  Uploading image: ${path.basename(filePath)}...`);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: 'image/png',
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: altText,
  };
}

async function findAuthor(name) {
  const authors = await client.fetch(
    `*[_type == "author" && name == $name][0]{ _id, name }`,
    { name },
  );
  if (!authors) {
    console.error(`Error: Author "${name}" not found in Sanity.`);
    process.exit(1);
  }
  return { _type: 'reference', _ref: authors._id };
}

async function publish() {
  console.log('Publishing insight to Sanity CMS...\n');

  // 1. Check for existing article with same slug
  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title }`,
    { slug: article.slug },
  );
  if (existing) {
    console.log(
      `\n  Article with slug "${article.slug}" already exists (${existing._id}).`,
    );
    console.log('  Skipping creation to avoid duplicates.');
    console.log('  Delete the existing document first if you want to re-publish.');
    return;
  }

  // 2. Find author reference
  console.log(`  Looking up author: ${article.authorName}...`);
  const authorRef = await findAuthor(article.authorName);
  console.log(`  Found author: ${authorRef._ref}`);

  // 3. Upload hero image
  const heroImage = await uploadImage(
    article.heroImagePath,
    article.heroImageAlt,
  );
  console.log(`  Image uploaded: ${heroImage.asset._ref}`);

  // 4. Create the insight document
  console.log('  Creating insight document...');
  const doc = {
    _type: 'insight',
    title: article.title,
    slug: { _type: 'slug', current: article.slug },
    description: article.description,
    date: new Date().toISOString(),
    author: authorRef,
    category: article.category,
    tags: article.tags,
    featured: article.featured,
    image: heroImage,
    body: articleBody,
  };

  const result = await client.create(doc);

  console.log(`\n  \u2713 Published: ${article.title}`);
  console.log(`    ID: ${result._id}`);
  console.log(
    `    URL: https://www.in-parallel.com/insight/${article.slug}`,
  );
  console.log(`    Studio: https://www.in-parallel.com/studio/structure/insight;${result._id}`);
  console.log('\n  Note: The site uses static generation — a rebuild is needed for the article to appear on the live site.');
}

publish().catch((err) => {
  console.error('\nPublish failed:', err.message);
  if (err.statusCode === 403) {
    console.error(
      'Token may lack write permissions. Check: https://www.sanity.io/manage/project/tmsmtg2i/api#tokens',
    );
  }
  process.exit(1);
});
