import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

/**
 * GET /api/blogs/validate-slug?slug=xxx&id=xxx
 * Check if a slug is available for use
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const currentBlogId = searchParams.get('id');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Check if slug exists
    let query = supabase.from('blogs').select('id').eq('slug', slug);

    // If we're editing an existing blog, exclude it from the check
    if (currentBlogId) {
      query = query.neq('id', currentBlogId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error validating slug:', error);
      return NextResponse.json(
        { error: 'Failed to validate slug' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      available: !data || data.length === 0,
      slug,
    });
  } catch (error) {
    console.error('Slug validation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

