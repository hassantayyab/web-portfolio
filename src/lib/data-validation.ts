import { z } from 'zod';

/**
 * Zod schemas for runtime data validation
 * Validates data structure to catch errors early
 */

export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  icon: z.string().min(1).max(50),
  category: z.enum(['frontend', 'backend', 'tools', 'other']),
});

export const projectSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  longDescription: z.string().max(5000).optional(),
  image: z.string().min(1).max(500),
  technologies: z.array(z.string().max(50)).min(1).max(20),
  liveUrl: z.string().url().max(500).optional(),
  githubUrl: z.string().url().max(500).optional(),
  featured: z.boolean().optional(),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
});

export const socialLinkSchema = z.object({
  name: z.string().min(1).max(50),
  url: z.string().url().max(500),
  icon: z.string().min(1).max(50),
});

export const experienceSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  companyUrl: z.string().url().max(500).optional(),
  location: z.string().min(1).max(200),
  startDate: z.string().min(1).max(50),
  endDate: z.union([z.string().min(1).max(50), z.literal('Present')]),
  description: z.array(z.string().max(1000)).min(1).max(20),
  technologies: z.array(z.string().max(50)).max(30).optional(),
});

export const educationSchema = z.object({
  id: z.string().min(1).max(100),
  degree: z.string().min(1).max(200),
  school: z.string().min(1).max(200),
  location: z.string().min(1).max(200),
  startDate: z.string().min(1).max(50),
  endDate: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  email: z.string().email().max(255),
  location: z.string().min(1).max(200),
  timezone: z.string().min(1).max(100),
  bio: z.string().min(1).max(2000),
  shortBio: z.string().min(1).max(500),
  availability: z.enum(['available', 'busy', 'not-available']),
  availabilityText: z.string().min(1).max(200),
  resumeUrl: z.string().url().max(500).optional(),
  avatarUrl: z.string().min(1).max(500),
});

// Complete blog post schema (from database)
export const blogSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  content: z.record(z.unknown()), // Rich text JSON from editor
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be less than 500 characters'),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
  publishedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
  status: z.enum(['draft', 'published']),
  coverImage: z.string().url('Cover image must be a valid URL').max(500).nullable(),
  tags: z.array(z.string().min(1).max(50)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed'),
  readTime: z.number().int().positive('Read time must be a positive number'),
  views: z.number().int().nonnegative('Views must be a non-negative number').default(0),
  category: z.string().min(1).max(100).optional(),
  featured: z.boolean().optional().default(false),
});

// Schema for creating a new blog post
export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  content: z.record(z.unknown()), // Rich text JSON from editor
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be less than 500 characters'),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
  status: z.enum(['draft', 'published']),
  coverImage: z.string().url('Cover image must be a valid URL').max(500).nullable().optional(),
  tags: z.array(z.string().min(1).max(50)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed'),
  category: z.string().min(1).max(100).optional(),
  featured: z.boolean().optional().default(false),
});

// Schema for updating an existing blog post
export const updateBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
    .optional(),
  content: z.record(z.unknown()).optional(),
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be less than 500 characters')
    .optional(),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters').optional(),
  status: z.enum(['draft', 'published']).optional(),
  coverImage: z.string().url('Cover image must be a valid URL').max(500).nullable().optional(),
  tags: z.array(z.string().min(1).max(50)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed').optional(),
  readTime: z.number().int().positive('Read time must be a positive number').optional(),
  category: z.string().min(1).max(100).optional(),
  featured: z.boolean().optional(),
});

/**
 * Validate data arrays at runtime (useful for development)
 * Call this in development mode to catch data errors early
 */
export function validateData() {
  if (process.env.NODE_ENV === 'development') {
    // Import data dynamically to avoid circular dependencies
    import('./data').then(
      ({ personalInfo, skills, projects, socialLinks, experiences, education }) => {
        try {
          personalInfoSchema.parse(personalInfo);
          z.array(skillSchema).parse(skills);
          z.array(projectSchema).parse(projects);
          z.array(socialLinkSchema).parse(socialLinks);
          z.array(experienceSchema).parse(experiences);
          z.array(educationSchema).parse(education);
          // Note: blogs validation removed as blogs are now stored in database
          // Data validation successful - no logging needed in production
        } catch (error) {
          if (error instanceof z.ZodError) {
            // Only log validation errors in development
            if (process.env.NODE_ENV === 'development') {
              console.error('❌ Data validation failed:', error.issues);
            }
          } else {
            // Log unexpected errors
            if (process.env.NODE_ENV === 'development') {
              console.error('❌ Unexpected error during validation:', error);
            }
          }
        }
      },
    );
  }
}
