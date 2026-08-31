'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.documentTypeListItem('stat').title('Stats'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('managedPage').title('Pages I Manage'),
            S.documentTypeListItem('capability').title('Capabilities'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
