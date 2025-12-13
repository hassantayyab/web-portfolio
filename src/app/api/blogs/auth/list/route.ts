import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { verifyAuthFromRequest } from '@/lib/auth';

/**
 * GET /api/blogs/auth/list
 * Get all blogs (authenticated - includes drafts)
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

    const supabase = createServerSupabaseClient();

    // Fetch all blogs (including drafts)
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('updatedAt', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    return NextResponse.json({ blogs: blogs || [] });
  } catch (error) {
    console.error('List blogs error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

