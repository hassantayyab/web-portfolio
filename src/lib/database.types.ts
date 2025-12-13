/**
 * Database types for Supabase
 * These types can be auto-generated using the Supabase CLI:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
 */

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: Record<string, unknown>;
          excerpt: string;
          author: string;
          publishedAt: string | null;
          updatedAt: string;
          status: 'draft' | 'published';
          coverImage: string | null;
          tags: string[];
          readTime: number;
          views: number;
          category: string | null;
          featured: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: Record<string, unknown>;
          excerpt: string;
          author: string;
          publishedAt?: string | null;
          updatedAt?: string;
          status: 'draft' | 'published';
          coverImage?: string | null;
          tags: string[];
          readTime?: number;
          views?: number;
          category?: string | null;
          featured?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: Record<string, unknown>;
          excerpt?: string;
          author?: string;
          publishedAt?: string | null;
          updatedAt?: string;
          status?: 'draft' | 'published';
          coverImage?: string | null;
          tags?: string[];
          readTime?: number;
          views?: number;
          category?: string | null;
          featured?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_blog_views: {
        Args: {
          blog_id: string;
        };
        Returns: void;
      };
    };
    Enums: {
      blog_status: 'draft' | 'published';
    };
  };
}

