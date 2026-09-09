import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';

export default defineConfig({
  integrations: [
    {
      name: 'preview-indexing',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await writeFile(
            new URL('_headers', dir),
            process.env.CONTEXT === 'production'
              ? '# Production: indexing controlled per page.\n'
              : '/*\n  X-Robots-Tag: noindex, nofollow\n',
          );
        },
      },
    },
  ],
  site: 'https://garten-streich.de',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { build: { assetsInlineLimit: 0 } },
});
