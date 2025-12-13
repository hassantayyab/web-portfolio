import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for draft blog post
const draftBlogSchema = z.object({
  id: z.string().uuid().optional(), // If updating existing draft
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  content: z.any(), // Tiptap JSON content - use z.any() instead of z.record()
  excerpt: z.string().max(500).optional().or(z.literal('')),
  author: z.string().min(1, 'Author is required'),
  coverImage: z.string().url().nullable().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  category: z.string().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

/**
 * POST /api/blogs/draft
 * Save or update a blog post draft
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = draftBlogSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const supabase = createServerSupabaseClient();

    // Calculate read time (words per minute: ~200)
    const contentText = JSON.stringify(data.content);
    const wordCount = contentText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) || 1;

    // Generate excerpt if not provided
    const excerpt =
      data.excerpt ||
      contentText.substring(0, 200).replace(/[^\w\s]/g, ' ').trim() + '...';

    // Check if updating existing draft or creating new one
    if (data.id) {
      // Update existing draft
      const { data: updatedBlog, error } = await (supabase as any)
        .from('blogs')
        .update({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt,
          author: data.author,
          coverImage: data.coverImage || null,
          tags: data.tags,
          category: data.category,
          featured: data.featured,
          readTime,
          updatedAt: new Date().toISOString(),
          status: 'draft',
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating draft:', error);
        return NextResponse.json(
          { error: 'Failed to update draft' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Draft updated successfully',
        blog: updatedBlog,
      });
    } else {
      // Create new draft
      const { data: newBlog, error } = await (supabase as any)
        .from('blogs')
        .insert({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt,
          author: data.author,
          coverImage: data.coverImage || null,
          tags: data.tags,
          category: data.category,
          featured: data.featured,
          readTime,
          status: 'draft',
          views: 0,
          publishedAt: null,
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        // Check if slug already exists
        if (error.code === '23505') {
          return NextResponse.json(
            { error: 'A blog with this slug already exists' },
            { status: 409 }
          );
        }

        console.error('Error creating draft:', error);
        return NextResponse.json(
          { error: 'Failed to create draft' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Draft created successfully',
        blog: newBlog,
      });
    }
  } catch (error) {
    console.error('Draft save error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/blogs/draft?id=xxx
 * Get a draft blog post by ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .eq('status', 'draft')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
      }
      console.error('Error fetching draft:', error);
      return NextResponse.json({ error: 'Failed to fetch draft' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error('Draft fetch error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

