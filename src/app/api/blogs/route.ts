import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

/**
 * GET /api/blogs
 * Get published blogs with optional filtering
 * Query params:
 *  - featured: 'true' to get only featured blogs
 *  - limit: number of blogs to return
 *  - status: 'published' or 'draft' (defaults to 'published')
 *  - search: search query for title/excerpt/tags
 *  - tag: filter by tag
 *  - sort: 'latest' | 'oldest' | 'popular'
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '100');
    const status = searchParams.get('status') || 'published';
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort') || 'latest';

    const supabase = createServerSupabaseClient();

    // Build query
    let query = supabase.from('blogs').select('*');

    // Filter by status
    query = query.eq('status', status as 'draft' | 'published');

    // Filter by featured
    if (featured) {
      query = query.eq('featured', true);
    }

    // Filter by tag
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      // Note: This is a simple implementation. For production, consider using full-text search
      query = query.or(`title.ilike.%${searchLower}%,excerpt.ilike.%${searchLower}%`);
    }

    // Apply sorting
    switch (sort) {
      case 'latest':
        query = query.order('publishedAt', { ascending: false, nullsFirst: false });
        break;
      case 'oldest':
        query = query.order('publishedAt', { ascending: true, nullsFirst: false });
        break;
      case 'popular':
        query = query.order('views', { ascending: false });
        break;
      default:
        query = query.order('publishedAt', { ascending: false, nullsFirst: false });
    }

    // Apply limit
    query = query.limit(limit);

    const { data: blogs, error } = await query;

    if (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    return NextResponse.json({ blogs: blogs || [] });
  } catch (error) {
    console.error('Blogs fetch error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

