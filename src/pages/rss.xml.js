import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Generates /rss.xml from published articles. `context.site` comes from
// the `site` option in astro.config.mjs, so set that to your real domain.
export async function GET(context) {
  const articles = (await getCollection('articles'))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Research Notes',
    description: 'Research articles and notes.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.abstract,
      link: `/articles/${a.id}/`,
    })),
  });
}
