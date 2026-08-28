export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  features: string[];
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  category: 'Frontend' | 'Backend' | 'Tools' | 'Learning';
  skills: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  description?: string;
}

export interface Certificate {
  title: string;
  organization: string;
  date: string;
  credentialUrl?: string;
  isPlaceholder?: boolean;
}

export interface ContactLinks {
  email: string;
  github: string;
  linkedin: string;
  cvUrl?: string;
}