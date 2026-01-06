import type { PageLoad } from './$types';
import type { Project } from '$lib/types';

export const load: PageLoad = async () => {
  // Tell Vite to expect the 'Project' shape (minus the slug)
  // We omit 'slug' here because it's not in the JSON file, we add it manually
  const allProjectFiles = import.meta.glob<Omit<Project, 'slug'>>(
    '$lib/data/projects/*.json',
    { eager: true }
  );

  const projects: Project[] = Object.entries(allProjectFiles).map(([path, resource]) => {
    const slug = path.split('/').pop()?.replace('.json', '') || '';

    return {
      ...resource, // Vite imports JSON as the default export automatically
      slug
    };
  });

  return { projects };
};
