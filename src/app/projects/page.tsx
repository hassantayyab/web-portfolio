import { siteConfig } from '@/lib/metadata';
import { Metadata } from 'next';
import ProjectsPageClient from './projects-client';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web development projects, from frontend applications to open source contributions. Built with modern technologies like React, Next.js, TypeScript, and Node.js.',
  keywords: [
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'Angular Projects',
    'NestJS Projects',
    'Frontend Projects',
    'Portfolio Projects',
    'Open Source',
    'Web Applications',
  ],
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      'Explore my portfolio of web development projects, from full-stack applications to open source contributions.',
    url: `${siteConfig.url}/projects`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Projects | ${siteConfig.name}`,
    description: 'Explore my portfolio of web development projects.',
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
