import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getSiteConfig } from '../../utils/config';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const siteConfig = getSiteConfig();

  // Sort posts by date in descending order
  const sortedPosts = posts.sort(
    (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.url,
    items: sortedPosts.map((post: CollectionEntry<'blog'>) => ({
      link: `/blog/${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
    })),
    customData: `<language>en-us</language>`,
  });
} 