export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  company: string;
  period: string;
  tags: string[];
  screenshots: string[];
  highlights: string[];
  featured: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
}

export interface ProjectGroup {
  id: "personal" | "enterprise";
  title: string;
  description: string;
  projects: Project[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}
