import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const searchData = posts.map((post: CollectionEntry<'blog'>) => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.slug,
    tags: post.data.tags || [],
    categories: post.data.categories || [],
    subject: post.data.subject || '',
    pubDate: post.data.pubDate.toISOString(),
    author: post.data.author || '',
  }));

  return new Response(
    JSON.stringify(searchData),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600, stale-while-revalidate=86400'
      }
    }
  );
} 