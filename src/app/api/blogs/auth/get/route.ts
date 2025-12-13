import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { verifyAuthFromRequest } from '@/lib/auth';

/**
 * GET /api/blogs/auth/get?id=xxx
 * Get a single blog by ID (authenticated - includes drafts)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuthFromRequest(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Fetch the blog (including drafts)
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        );
      }

      console.error('Error fetching blog:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog' },
        { status: 500 }
      );
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

