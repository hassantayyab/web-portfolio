import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase';
import BlogsClient from './blogs-client';
import { Blog } from '@/lib/types';
import { env } from '@/lib/env';

const baseUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Blog | Hassan Tayyab',
  description: 'Read my latest articles about web development, design, and technology. Insights on React, Next.js, TypeScript, and modern web development practices.',
  keywords: ['blog', 'web development', 'react', 'nextjs', 'typescript', 'programming', 'software engineering'],
  alternates: {
    canonical: `${baseUrl}/blogs`,
  },
  openGraph: {
    title: 'Blog | Hassan Tayyab',
    description: 'Read my latest articles about web development, design, and technology.',
    url: `${baseUrl}/blogs`,
    siteName: 'Hassan Tayyab',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hassantayyab',
    creator: '@hassantayyab',
    title: 'Blog | Hassan Tayyab',
    description: 'Read my latest articles about web development, design, and technology.',
  },
};

async function getBlogs(): Promise<Blog[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return (data as unknown as Blog[]) || [];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogsClient blogs={blogs} />;
}
