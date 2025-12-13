import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { verifyAuthFromRequest } from '@/lib/auth';
import { z } from 'zod';

const updateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['draft', 'published']),
});

/**
 * PATCH /api/blogs/auth/update-status
 * Update blog status (authenticated)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuthFromRequest(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validationResult = updateStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { id, status } = validationResult.data;
    const supabase = createServerSupabaseClient();

    const timestamp = new Date().toISOString();

    // Update the blog status
    const updateData: {
      status: 'draft' | 'published';
      updatedAt: string;
      publishedAt?: string;
    } = {
      status,
      updatedAt: timestamp,
    };
    
    // Set publishedAt only when publishing for the first time
    if (status === 'published') {
      updateData.publishedAt = timestamp;
    }

    const { data: updatedBlog, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog status:', error);
      return NextResponse.json(
        { error: 'Failed to update blog status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blog ${status === 'published' ? 'published' : 'unpublished'} successfully`,
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Update status error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

