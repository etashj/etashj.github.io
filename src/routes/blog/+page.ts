import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async () => {
  // 1. Glob all markdown files in the posts directory
  // We use { eager: true } to get the data immediately without awaiting each file
  const allPostFiles = import.meta.glob<{ metadata: Post }>('$lib/data/blog/*.md', {
    eager: true
  });

  // 2. Map the object entries into a clean array
  const posts = Object.entries(allPostFiles).map(([path, resource]) => {
    // Extract slug from filename (e.g., /src/lib/posts/my-post.md -> my-post)
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
      ...resource.metadata,
      slug
    };
  });

  // 3. Optional: Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { posts };
};
