import { createServerSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/blogs/[id]/view
 * Increment view count for a blog post
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const supabase = createServerSupabaseClient();

    // Increment the view count
    const { data, error } = await supabase.rpc('increment_blog_views', {
      blog_id: id as any,
    });

    if (error) {
      console.error('Error incrementing views:', error);
      return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }

    // Fetch updated blog to get new view count
    const { data: blog, error: fetchError } = await supabase
      .from('blogs')
      .select('views')
      .eq('id', id as any)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch updated views' }, { status: 500 });
    }

    return NextResponse.json({ views: (blog as any)?.views || 0 });
  } catch (error) {
    console.error('View increment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
