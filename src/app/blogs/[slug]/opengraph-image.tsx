import { ImageResponse } from 'next/og';
import { env } from '@/lib/env';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Blog } from '@/lib/types';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Fetch blog data
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

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    // Return a default error image
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          Blog Not Found
        </div>
      ),
      {
        ...size,
      }
    );
  }

  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header with author info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <img
            src={`${baseUrl}/hassan-black.PNG`}
            alt='Hassan Tayyab'
            width='60'
            height='60'
            style={{
              borderRadius: '50%',
              border: '3px solid #c4af1c',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Hassan Tayyab
            </div>
            <div
              style={{
                fontSize: 18,
                color: '#888888',
              }}
            >
              {blog.author}
            </div>
          </div>
        </div>

        {/* Blog title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '100%',
          }}
        >
          <h1
            style={{
              fontSize: blog.title.length > 60 ? 52 : 64,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '1040px',
            }}
          >
            {blog.title}
          </h1>

          {/* Category badge */}
          {blog.category && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#c4af1c',
                color: '#000000',
                fontSize: 18,
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              {blog.category}
            </div>
          )}
        </div>

        {/* Footer with CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              fontSize: 20,
              color: '#888888',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📖 {blog.readTime} min read
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                🏷️ {blog.tags.slice(0, 3).join(', ')}
              </div>
            )}
          </div>

          {/* Call-to-action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 28,
              fontWeight: 600,
              color: '#c4af1c',
            }}
          >
            Read the full article →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
