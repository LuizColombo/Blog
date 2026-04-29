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
