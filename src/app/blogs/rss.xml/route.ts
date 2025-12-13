import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Blog } from '@/lib/types';
import { env } from '@/lib/env';

export async function GET() {
  try {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL;
    const supabase = createServerSupabaseClient();

    // Fetch published blogs
    const { data: blogs } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('publishedAt', { ascending: false })
      .limit(50);

    const rss = generateRSS((blogs as unknown as Blog[]) || [], baseUrl);

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

function generateRSS(blogs: Blog[], baseUrl: string): string {
  const latestBlogDate = blogs.length > 0 && blogs[0].publishedAt
    ? new Date(blogs[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const rssItems = blogs
    .map((blog) => {
      const blogUrl = `${baseUrl}/blogs/${blog.slug}`;
      const pubDate = blog.publishedAt ? new Date(blog.publishedAt).toUTCString() : '';

      return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${blogUrl}</link>
      <guid isPermaLink="true">${blogUrl}</guid>
      <description><![CDATA[${blog.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>Hassan Tayyab</author>
      ${blog.category ? `<category>${blog.category}</category>` : ''}
      ${blog.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      ${blog.coverImage ? `<enclosure url="${blog.coverImage}" type="image/jpeg" />` : ''}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Hassan Tayyab - Blog</title>
    <link>${baseUrl}/blogs</link>
    <description>Articles about web development, design, and technology by Hassan Tayyab</description>
    <language>en-us</language>
    <lastBuildDate>${latestBlogDate}</lastBuildDate>
    <atom:link href="${baseUrl}/blogs/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;
}

