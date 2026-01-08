import { env } from '@/lib/env';
import { createServerSupabaseClient } from '@/lib/supabase';
import { MetadataRoute } from 'next';

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  // Fetch published blogs from database
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = createServerSupabaseClient();
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, updatedAt, publishedAt')
      .eq('status', 'published')
      .order('publishedAt', { ascending: false });

    if (error) {
      console.error('Error fetching blogs for sitemap:', error);
      // Return static pages only if blog fetch fails
      return staticPages;
    }

    // Add blog article pages
    blogPages = (blogs || []).map(
      (blog: { slug: string; updatedAt: string; publishedAt: string | null }) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }),
    );
  } catch (error) {
    console.error('Unexpected error generating sitemap:', error);
    // Return static pages only if there's an error
    return staticPages;
  }

  return [...staticPages, ...blogPages];
}
