export type ProjectCategory = 'systems' | 'fullstack' | 'functional' | 'data' | 'backend' | 'frontend' | 'mobile' | 'devops';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  category: ProjectCategory;
  featured: boolean;
}
