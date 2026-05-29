# Research Notes

A lightweight, git-as-CMS personal research blog built with **Astro**. Articles
are plain `.mdx` files committed to this repo — write one, push to GitHub, and
the deployed site rebuilds automatically. No database, no backend, no login.

LaTeX math is rendered at build time with **KaTeX**, so readers pay no
client-side cost for math.

## Writing a new article

1. Create a file in `src/content/articles/`, e.g. `my-paper.mdx`.
2. Add frontmatter and write in Markdown + LaTeX:

   ```mdx
   ---
   title: "On the Convergence of ..."
   date: 2026-05-29
   abstract: "A one-sentence summary shown on the home page."
   tags: ["analysis", "topology"]
   authors: ["Your Name"]
   draft: false
   ---

   ## Introduction

   Inline math like $e^{i\pi} + 1 = 0$, and display math:

   $$
   \int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
   $$
   ```

3. Commit and push. The article appears at `/articles/my-paper`.

### Frontmatter fields

| Field      | Required | Notes                                            |
|------------|----------|--------------------------------------------------|
| `title`    | yes      | Article title                                    |
| `date`     | yes      | `YYYY-MM-DD`                                      |
| `abstract` | no       | Summary shown in the list and as meta description|
| `tags`     | no       | Array of strings                                 |
| `authors`  | no       | Array of names                                   |
| `draft`    | no       | `true` hides it in production (visible in `dev`) |

The schema in `src/content.config.ts` validates this at build time — a typo in
frontmatter fails the build instead of shipping a broken page.

## Commands

| Command         | Action                                      |
|-----------------|---------------------------------------------|
| `pnpm dev`      | Local dev server at `localhost:4321`        |
| `pnpm build`    | Build the static site to `dist/`            |
| `pnpm preview`  | Preview the production build locally         |

## LaTeX tips

- Inline: `$ ... $`   ·   Display: `$$ ... $$`
- Multi-line aligned derivations use `\begin{aligned} ... \end{aligned}`.
- KaTeX supports most common LaTeX; see the
  [supported functions list](https://katex.org/docs/supported.html).

## Project layout

```
src/
├── content/articles/   ← your .mdx articles (the "database")
├── content.config.ts   ← frontmatter schema
├── layouts/            ← Base.astro, Article.astro
├── pages/              ← index (article list), about, articles/[...slug]
└── styles/global.css   ← Tailwind + typography + KaTeX
```

## Deploying

The build output in `dist/` is plain static files. Connect this GitHub repo to
Cloudflare Pages, Netlify, or Vercel and set:

- **Build command:** `pnpm build`
- **Output directory:** `dist`

Then set `site` in `astro.config.mjs` to your real domain.
