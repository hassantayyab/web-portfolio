import { createServerSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for publishing blog post
const publishBlogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional().or(z.literal('')),
  author: z.string().min(1),
  coverImage: z.union([z.string().url(), z.null()]).optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']),
});

/**
 * POST /api/blogs/save
 * Publish or update a blog post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = publishBlogSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const data = validationResult.data;
    const supabase = createServerSupabaseClient();

    // Convert content to text for calculations (handle both JSON and string)
    const contentText =
      typeof data.content === 'string' ? data.content : JSON.stringify(data.content);

    // Calculate read time
    const wordCount = contentText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) || 1;

    // Generate excerpt if not provided
    const excerpt =
      data.excerpt?.trim() ||
      contentText
        .substring(0, 200)
        .replace(/[^\w\s]/g, ' ')
        .trim() + '...';

    const timestamp = new Date().toISOString();

    if (data.id) {
      // Update existing blog
      const updateData: {
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        author: string;
        coverImage: string | null;
        tags: string[];
        category: string | null;
        featured: boolean;
        readTime: number;
        status: 'draft' | 'published';
        updatedAt: string;
        publishedAt?: string;
      } = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: excerpt,
        author: data.author,
        coverImage: data.coverImage || null,
        tags: data.tags,
        category: data.category || null,
        featured: Boolean(data.featured),
        readTime,
        status: data.status,
        updatedAt: timestamp,
        // Set publishedAt only if publishing for the first time
        ...(data.status === 'published' && {
          publishedAt: timestamp,
        }),
      };

      const { data: updatedBlog, error } = await (supabase as any)
        .from('blogs')
        .update(updateData)
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog:', error);

        if (error.code === '23505') {
          return NextResponse.json(
            { error: 'A blog with this slug already exists' },
            { status: 409 },
          );
        }

        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Blog ${data.status === 'published' ? 'published' : 'saved'} successfully`,
        blog: updatedBlog,
      });
    } else {
      // Create new blog
      const insertData: {
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        author: string;
        coverImage: string | null;
        tags: string[];
        category: string | null;
        featured: boolean;
        readTime: number;
        status: 'draft' | 'published';
        views: number;
        publishedAt: string | null;
        updatedAt: string;
      } = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: excerpt,
        author: data.author,
        coverImage: data.coverImage || null,
        tags: data.tags,
        category: data.category || null,
        featured: Boolean(data.featured),
        readTime,
        status: data.status,
        views: 0,
        publishedAt: data.status === 'published' ? timestamp : null,
        updatedAt: timestamp,
      };

      const { data: newBlog, error } = await (supabase as any)
        .from('blogs')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          return NextResponse.json(
            { error: 'A blog with this slug already exists' },
            { status: 409 },
          );
        }

        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Blog ${data.status === 'published' ? 'published' : 'created'} successfully`,
        blog: newBlog,
      });
    }
  } catch (error) {
    console.error('Save blog error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
