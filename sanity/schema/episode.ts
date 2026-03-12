import { defineField, defineType } from 'sanity';

export const episode = defineType({
  name: 'episode',
  title: 'Podcast Episode',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'guest', title: 'Guest' },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    // ── Content ──
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'number',
      group: 'content',
      initialValue: 1,
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Short summary for meta tags and episode cards (max 300 chars).',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'themes',
      title: 'Themes',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Coordination Breakdowns', value: 'Coordination Breakdowns' },
          { title: 'AI & Work', value: 'AI & Work' },
          { title: 'Organizational Design', value: 'Organizational Design' },
          { title: 'Execution at Scale', value: 'Execution at Scale' },
          { title: 'The Human Layer', value: 'The Human Layer' },
          { title: 'Tools & Systems', value: 'Tools & Systems' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'hookQuestion',
      title: 'Hook Question',
      description: 'The provocative opening question for this episode.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'keyTopics',
      title: 'Key Topics',
      description: 'Bullet points for show notes.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Show Notes',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Embed',
          fields: [
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),

    // ── Guest ──
    defineField({
      name: 'guest',
      title: 'Guest',
      type: 'object',
      group: 'guest',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'role',
          title: 'Role / Title',
          type: 'string',
        }),
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'website',
          title: 'Website URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'host',
      title: 'Host',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'guest',
    }),

    // ── Media ──
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      description: 'Primary video embed (watch, short, or embed URL).',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'applePodcastsUrl',
      title: 'Apple Podcasts URL',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Editorial illustration for the episode.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      description: 'YouTube thumbnail / social card (16:9).',
      type: 'image',
      group: 'media',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),

    // ── Meta ──
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'meta',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      description: 'Full episode transcript (rendered in a collapsible section).',
      type: 'array',
      group: 'meta',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      season: 'season',
      episodeNumber: 'episodeNumber',
      guestName: 'guest.name',
      media: 'coverImage',
    },
    prepare({ title, season, episodeNumber, guestName, media }) {
      const ep = season && episodeNumber ? `S${season}E${episodeNumber}: ` : '';
      return {
        title: `${ep}${title || 'Untitled'}`,
        subtitle: guestName ? `with ${guestName}` : '',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Episode number (newest)',
      name: 'episodeDesc',
      by: [
        { field: 'season', direction: 'desc' },
        { field: 'episodeNumber', direction: 'desc' },
      ],
    },
    {
      title: 'Publish date (newest)',
      name: 'dateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
});
