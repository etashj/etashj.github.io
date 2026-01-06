export interface Project {
  title: string;
  date: string;
  featured: boolean;
  thumbnail: string;
  description: string;
  tags: string[];

  links: {
    github?: string;
    demo?: string;
    arxiv?: string;
  }

  slug: string; // Added during the mapping process
}
