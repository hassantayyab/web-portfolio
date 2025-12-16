import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Blog } from '@/lib/types';
import { personalInfo } from '@/lib/data';
import { env } from '@/lib/env';

export const runtime = 'edge';

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return new Response('Blog not found', { status: 404 });
    }

    const baseUrl = env.NEXT_PUBLIC_SITE_URL;
    const avatarUrl = `${baseUrl}${personalInfo.avatarUrl}`;

    // Fetch avatar image for edge runtime compatibility
    let avatarData: string | null = null;
    try {
      const avatarResponse = await fetch(avatarUrl);
      if (avatarResponse.ok) {
        const arrayBuffer = await avatarResponse.arrayBuffer();
        // Convert ArrayBuffer to base64 in edge runtime
        const bytes = new Uint8Array(arrayBuffer);
        const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
        const base64 = btoa(binary);
        const contentType = avatarResponse.headers.get('content-type') || 'image/png';
        avatarData = `data:${contentType};base64,${base64}`;
      }
    } catch (error) {
      console.warn('Failed to fetch avatar for OG image:', error);
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              padding: '80px 60px',
            }}
          >
            {/* Category/Tag */}
            {blog.category && (
              <div
                style={{
                  fontSize: 20,
                  color: '#888888',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {blog.category}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: blog.title.length > 60 ? 56 : 72,
                fontWeight: 800,
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '32px',
                lineHeight: 1.1,
                maxWidth: '1000px',
              }}
            >
              {blog.title}
            </div>

            {/* Excerpt/Description */}
            {blog.excerpt && (
              <div
                style={{
                  fontSize: 28,
                  color: '#a0a0a0',
                  textAlign: 'center',
                  maxWidth: '900px',
                  lineHeight: 1.4,
                  marginBottom: '40px',
                }}
              >
                {blog.excerpt}
              </div>
            )}

            {/* Author Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '20px',
              }}
            >
              {avatarData && (
                <img
                  src={avatarData}
                  alt={blog.author}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                  }}
                />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  {blog.author}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: '#666666',
                  }}
                >
                  {personalInfo.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating blog OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}

