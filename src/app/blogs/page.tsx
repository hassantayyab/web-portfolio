import { siteConfig } from '@/lib/metadata';
import { Metadata } from 'next';
import BlogsClient from './blogs-client';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Read my latest articles about web development, technology, React, Next.js, TypeScript, and software engineering best practices.',
  keywords: [
    'Web Development Blog',
    'React Blog',
    'Next.js Tutorials',
    'TypeScript Articles',
    'Software Engineering Blog',
    'Frontend Development',
    'Full Stack Development',
  ],
  openGraph: {
    title: `Blogs | ${siteConfig.name}`,
    description: 'Read my latest articles about web development, technology, and more.',
    url: `${siteConfig.url}/blogs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blogs | ${siteConfig.name}`,
    description: 'Read my latest articles about web development, technology, and more.',
  },
  alternates: {
    canonical: `${siteConfig.url}/blogs`,
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
