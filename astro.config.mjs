// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

const env = loadEnv('', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.in-parallel.com',
  output: 'static',
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [
    sitemap(),
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
