import { siteConfig } from '@/lib/metadata';
import { Metadata } from 'next';
import AboutPageClient from './about-client';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about my background, skills, experience, and what drives me as a frontend developer. Discover my journey in web development, technical expertise, and professional experience.',
  keywords: [
    'About Developer',
    'Frontend Developer',
    'Web Developer Experience',
    'UX Designer',
    'UI Designer',
    'Software Engineer Background',
    'Developer Skills',
    'Professional Experience',
  ],
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      'Learn more about my background, skills, experience, and what drives me as a frontend engineer.',
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `About | ${siteConfig.name}`,
    description: 'Learn more about my background, skills, and experience.',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
