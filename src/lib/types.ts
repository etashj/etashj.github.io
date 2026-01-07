export interface Project {
  title: string;
  date: string;
  thumbnail?: string;
  description: string;
  tags: string[];

  links: {
    github?: string;
    demo?: string;
    arxiv?: string;
  }

  slug: string; // Added during the mapping process
}

export interface Post {
  title: string;
  date: string;
  description?: string;
  // Add any other frontmatter fields here
  slig: string;
}
