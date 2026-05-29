// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';

// Shared BibTeX file for [@key] citations. rehype-citation joins this with
// the project root (process.cwd), so keep it relative — not absolute.
const bibPath = 'src/content/references.bib';

// https://astro.build/config
export default defineConfig({
  // Set this to your real domain when you deploy (used for RSS / canonical URLs).
  site: 'https://example.com',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    // Order matters: resolve citations first, then render any math.
    rehypePlugins: [
      [
        rehypeCitation,
        {
          bibliography: bibPath,
          // Citation style. Built-ins include 'apa', 'vancouver', 'harvard1',
          // 'chicago', 'mla'. Swap to your field's preferred style.
          csl: 'apa',
          linkCitations: true,
        },
      ],
      rehypeKatex,
    ],
    shikiConfig: {
      // Syntax highlighting theme for ```code``` blocks.
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
