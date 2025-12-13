export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  name?: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  timezone: string;
  bio: string;
  shortBio: string;
  availability: 'available' | 'busy' | 'not-available';
  availabilityText: string;
  resumeUrl?: string;
  avatarUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: Record<string, unknown>; // Rich text JSON from editor (Tiptap/Lexical format)
  excerpt: string;
  author: string;
  publishedAt: string | null;
  updatedAt: string;
  status: 'draft' | 'published';
  coverImage: string | null;
  tags: string[];
  readTime: number; // in minutes
  views: number;
  category?: string;
  featured?: boolean;
}

// Type for creating a new blog post
export interface CreateBlogInput {
  title: string;
  slug: string;
  content: Record<string, unknown>;
  excerpt: string;
  author: string;
  status: 'draft' | 'published';
  coverImage?: string | null;
  tags: string[];
  category?: string;
  featured?: boolean;
}

// Type for updating an existing blog post
export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  content?: Record<string, unknown>;
  excerpt?: string;
  author?: string;
  status?: 'draft' | 'published';
  coverImage?: string | null;
  tags?: string[];
  readTime?: number;
  category?: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  projectType: 'development' | 'design' | 'full-stack';
  timeline: string;
  industry: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: {
    users: string;
    growth: string;
    funding: string;
  };
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  keyFeatures?: string[];
  gallery: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  figmaUrl?: string;
  launchDate: string;
  teamSize: string;
  keyAchievements: string[];
  designProcess?: string[];
  userResearch?: {
    participants: string;
    methods: string[];
    insights: string[];
  };
}
