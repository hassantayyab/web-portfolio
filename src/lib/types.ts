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
  category: "frontend" | "backend" | "tools" | "other";
}

export interface SocialLink {
  name: string;
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
  endDate: string | "Present";
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
  availability: "available" | "busy" | "not-available";
  availabilityText: string;
  resumeUrl?: string;
  avatarUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

