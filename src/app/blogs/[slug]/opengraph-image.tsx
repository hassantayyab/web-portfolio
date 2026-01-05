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

  // Use cover image if available, otherwise create a branded background
  const hasCoverImage = blog.coverImage && blog.coverImage.trim().length > 0;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background: Cover Image or Fallback */}
        {hasCoverImage && blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px 80px',
          }}
        >
          {/* Bottom section with CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              padding: '40px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Title & Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2
                style={{
                  fontSize: blog.title.length > 60 ? 38 : 48,
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {blog.title}
              </h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  fontSize: 18,
                  color: '#cccccc',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📖 {blog.readTime} min read
                </div>
                {blog.category && (
                  <div
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#c4af1c',
                      color: '#000000',
                      fontSize: 16,
                      fontWeight: 600,
                      borderRadius: '6px',
                    }}
                  >
                    {blog.category}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '2px solid rgba(196, 175, 28, 0.3)',
                paddingTop: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={`${baseUrl}/hassan-black.PNG`}
                  alt='Hassan Tayyab'
                  width='50'
                  height='50'
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #c4af1c',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>
                    Hassan Tayyab
                  </div>
                  <div style={{ fontSize: 14, color: '#aaaaaa' }}>hassantayyab.com</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#c4af1c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                Read the full article →
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
