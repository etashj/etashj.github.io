import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  // 1. Use the root-relative path (starts with /src)
  const posts = import.meta.glob('$lib/blog/*.md');

  // 2. Build the key to match the glob keys exactly
  const path = `/src/lib/blog/${params.slug}.md`;

  // 3. Check if the slug exists in your lib folder
  if (!posts[path]) {
    throw error(404, `Post '${params.slug}' not found at ${path}`);
  }

  // 4. Resolve the file
  const post = await posts[path]() as any;

  return {
    content: post.default,
    meta: post.metadata,
    slug: params.slug
  };
};
