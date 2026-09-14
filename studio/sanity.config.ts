import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required. Copy .env.example to .env and add the project ID.');
}

export default defineConfig({
  name: 'tcog-nigeria',
  title: 'The Church of God Nigeria',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
