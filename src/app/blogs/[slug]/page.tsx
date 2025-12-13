import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import { BlogPostClient } from './blog-post-client';
import { Blog } from '@/lib/types';
import { env } from '@/lib/env';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return data as unknown as Blog;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const blogUrl = `${baseUrl}/blogs/${blog.slug}`;

  return {
    title: `${blog.title} | Hassan Tayyab`,
    description: blog.excerpt || `Read ${blog.title} by ${blog.author}`,
    authors: [{ name: blog.author }],
    keywords: blog.tags,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      type: 'article',
      publishedTime: blog.publishedAt || undefined,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      url: blogUrl,
      siteName: 'Hassan Tayyab',
      images: blog.coverImage ? [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ] : [],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hassantayyab',
      creator: '@hassantayyab',
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const blogUrl = `${baseUrl}/blogs/${blog.slug}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || undefined,
    datePublished: blog.publishedAt || undefined,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: blog.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Hassan Tayyab',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    keywords: blog.tags.join(', '),
    articleSection: blog.category || 'Technology',
    wordCount: JSON.stringify(blog.content).split(/\s+/).length,
    timeRequired: `PT${blog.readTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient blog={blog} />
    </>
  );
}
