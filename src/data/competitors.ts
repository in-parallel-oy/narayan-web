export interface Competitor {
  slug: string;
  name: string;
  domain: string;
  logoBg: string;
  category: string;
  description: string;
  logoSvg?: string;
  logoImg?: string; // path to a local image in /public
}

export const competitors: Competitor[] = [
  {
    name: 'Fellow',
    slug: 'fellow',
    domain: 'fellow.ai',
    logoBg: '#293FCC',
    category: 'AI Meeting Assistant',
    description: 'Meeting notes and agendas vs a living execution plan.',
  },
  {
    name: 'Fireflies.ai',
    slug: 'fireflies',
    domain: 'fireflies.ai',
    logoBg: '#4700A6',
    category: 'AI Meeting Transcription',
    description: 'Transcripts and action items vs coordination intelligence.',
  },
  {
    name: 'Otter.ai',
    slug: 'otter',
    domain: 'otter.ai',
    logoBg: '#134FFF',
    category: 'AI Transcription',
    description: 'Meeting transcripts vs a living execution plan.',
  },
  {
    name: 'Fathom',
    slug: 'fathom',
    domain: 'fathom.video',
    logoBg: '#00BEFF',
    category: 'Free AI Note-Taker',
    description: 'Meeting summaries vs execution intelligence.',
  },
  {
    name: 'tl;dv',
    slug: 'tldv',
    domain: 'tldv.io',
    logoBg: '#1D1DFF',
    category: 'Meeting Recording',
    description: 'Video clips and recordings vs a living execution plan.',
  },
  {
    name: 'Granola',
    slug: 'granola',
    domain: 'granola.ai',
    logoBg: '#004126',
    category: 'Personal Meeting Notes',
    description: 'Beautiful personal notes vs organisational coordination.',
  },
  {
    name: 'Avoma',
    slug: 'avoma',
    domain: 'avoma.com',
    logoBg: '#10b981',
    category: 'Revenue Intelligence',
    description: 'Revenue intelligence vs execution intelligence.',
  },
  {
    name: 'Read.ai',
    slug: 'read-ai',
    domain: 'read.ai',
    logoBg: '#4361EE',
    category: 'Meeting Copilot',
    description: 'Knowledge search vs coordination that drives execution.',
  },
  {
    name: 'Spinach',
    slug: 'spinach',
    domain: 'spinach.ai',
    logoBg: '#00c844',
    category: 'AI Scrum Master',
    description: 'Sprint ceremonies vs organisation-wide coordination.',
  },
  {
    name: 'Atlassian',
    slug: 'atlassian',
    domain: 'atlassian.com',
    logoBg: '#0052CC',
    logoSvg: `<svg class="w-full h-full" viewBox="-6 -4 36 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.12 11.084a.683.683 0 00-1.16.126L.075 22.974a.703.703 0 00.63 1.018h8.19a.678.678 0 00.63-.39c1.767-3.65.696-9.203-2.406-12.52zM11.434.386a15.515 15.515 0 00-.906 15.317l3.95 7.9a.703.703 0 00.628.388h8.19a.703.703 0 00.63-1.017L12.63.38a.664.664 0 00-1.196.006z" fill="white"/></svg>`,
    category: 'Loom + Jira + Confluence',
    description: 'An ecosystem of building blocks vs an intelligence layer.',
  },
  {
    name: 'ClickUp',
    slug: 'clickup',
    domain: 'clickup.com',
    logoBg: '#7B68EE',
    logoSvg: `<svg class="w-full h-full" viewBox="-4 -4 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 18.439l3.69-2.828c1.961 2.56 4.044 3.739 6.363 3.739 2.307 0 4.33-1.166 6.203-3.704L22 18.405C19.298 22.065 15.941 24 12.053 24 8.178 24 4.788 22.078 2 18.439zM12.04 6.15l-6.568 5.66-3.036-3.52L12.055 0l9.543 8.296-3.05 3.509z" fill="white"/></svg>`,
    category: 'All-in-One Project Management',
    description: 'Project management with AI vs execution intelligence.',
  },
  {
    name: 'WorkBoard',
    slug: 'workboard',
    domain: 'workboard.com',
    logoBg: '#ffffff',
    logoImg: '/images/competitors/workboard.svg',
    category: 'Enterprise OKR Platform',
    description: 'Top-down OKR alignment vs bottom-up execution intelligence.',
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find(c => c.slug === slug);
}
