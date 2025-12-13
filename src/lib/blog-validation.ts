import { z } from 'zod';

/**
 * Validation schemas for blog creation and editing
 */

export const blogMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be 200 characters or less')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z
    .string()
    .max(500, 'Excerpt must be 500 characters or less')
    .optional()
    .or(z.literal('')),
  author: z.string().min(1, 'Author is required'),
  coverImage: z.string().url('Must be a valid URL').nullable().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export type BlogMetadata = z.infer<typeof blogMetadataSchema>;

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validate if a slug is available (doesn't exist in database)
 */
export async function validateSlugAvailability(
  slug: string,
  currentBlogId?: string,
): Promise<boolean> {
  try {
    const response = await fetch(`/api/blogs/validate-slug?slug=${slug}&id=${currentBlogId || ''}`);
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error('Error validating slug:', error);
    return false;
  }
}

/**
 * Common blog categories
 */
export const BLOG_CATEGORIES = [
  'Technology',
  'Web Development',
  'Mobile Development',
  'Design',
  'Tutorial',
  'Career',
  'Opinion',
  'News',
  'Case Study',
  'Other',
] as const;

/**
 * Validation for publish action (requires more fields than draft)
 */
export const publishBlogSchema = blogMetadataSchema.extend({
  excerpt: z
    .string()
    .max(500, 'Excerpt must be 500 characters or less')
    .optional()
    .or(z.literal('')),
  coverImage: z.string().url('Cover image must be a valid URL').nullable().optional(),
});
