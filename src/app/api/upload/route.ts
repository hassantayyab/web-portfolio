import { createServerSupabaseClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const STORAGE_BUCKET = 'blog-images';
const MAX_WIDTH = 1920; // Max width for images
const QUALITY = 85; // JPEG/WebP quality

/**
 * POST /api/upload
 * Upload an image to Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Validate file exists
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`,
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        },
        { status: 400 },
      );
    }

    // Create Supabase client with service role
    const supabase = createServerSupabaseClient();

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    // Optimize image using sharp (skip GIFs to preserve animation)
    if (file.type !== 'image/gif') {
      try {
        const image = sharp(buffer);
        const metadata = await image.metadata();

        // Resize if image is too large
        if (metadata.width && metadata.width > MAX_WIDTH) {
          image.resize(MAX_WIDTH, null, {
            fit: 'inside',
            withoutEnlargement: true,
          });
        }

        // Convert and optimize based on format
        if (file.type === 'image/png') {
          buffer = await image.png({ quality: QUALITY }).toBuffer();
        } else if (file.type === 'image/webp') {
          buffer = await image.webp({ quality: QUALITY }).toBuffer();
        } else {
          // Convert to JPEG for other formats
          buffer = await image.jpeg({ quality: QUALITY }).toBuffer();
        }
      } catch (optimizeError) {
        console.error('Image optimization error:', optimizeError);
        // If optimization fails, use original buffer
      }
    }

    // Upload to Supabase Storage
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json({ error: 'Failed to upload image to storage' }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during upload' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/upload
 * Delete an image from Supabase Storage
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    // Create Supabase client with service role
    const supabase = createServerSupabaseClient();

    // Delete from storage
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);

    if (error) {
      console.error('Supabase storage delete error:', error);
      return NextResponse.json({ error: 'Failed to delete image from storage' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during deletion' },
      { status: 500 },
    );
  }
}
