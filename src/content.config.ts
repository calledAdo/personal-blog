import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each article is one .mdx file in src/content/articles/.
// The frontmatter below is validated at build time — a missing title or
// malformed date fails the build instead of shipping a broken page.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    abstract: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Optional: list co-authors for a paper.
    authors: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
