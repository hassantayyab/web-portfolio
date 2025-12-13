import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

/**
 * Supabase client for database operations
 * Uses environment variables for configuration
 */

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

/**
 * Supabase client instance
 * This client can be used on both client and server side
 * For server-side operations with admin privileges, use createServerSupabaseClient
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist session for portfolio site
  },
});

/**
 * Create a Supabase client for server-side operations with service role key
 * Only use this in API routes or server components where you need admin access
 */
export function createServerSupabaseClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Helper function to handle Supabase errors
 * @param error - Error from Supabase operation
 * @param context - Context for better error messages
 */
export function handleSupabaseError(error: unknown, context: string): never {
  if (error instanceof Error) {
    console.error(`Supabase error in ${context}:`, error.message);
    throw new Error(`Database operation failed: ${error.message}`);
  }
  console.error(`Unknown error in ${context}:`, error);
  throw new Error('An unexpected database error occurred');
}

/**
 * Type-safe database query helpers
 */
export const db = {
  blogs: {
    /**
     * Get all published blogs
     */
    async getPublished() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('publishedAt', { ascending: false });

      if (error) handleSupabaseError(error, 'getPublished');
      return data || [];
    },

    /**
     * Get a blog by slug
     */
    async getBySlug(slug: string) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        handleSupabaseError(error, 'getBySlug');
      }
      return data;
    },

    /**
     * Get a blog by ID
     */
    async getById(id: string) {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        handleSupabaseError(error, 'getById');
      }
      return data;
    },

    /**
     * Increment view count for a blog
     */
    async incrementViews(id: string) {
      const { error } = await supabase.rpc('increment_blog_views', { blog_id: id });

      if (error) {
        console.error('Error incrementing views:', error);
        // Don't throw error for view tracking failures
      }
    },
  },
};
