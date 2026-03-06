import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schema';

export default defineConfig({
  name: 'narayan-web',
  title: 'In Parallel',
  projectId: import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? 'tmsmtg2i',
  dataset: import.meta.env?.PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
});
