'use client';

import { Button } from '@/components/ui/button';
import { Blog } from '@/lib/types';
import { ArrowRight, Calendar, Clock, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  blog: Blog;
}

function calculateReadingTime(content: string | unknown): number {
  // Only calculate for markdown strings, ignore old JSON format
  const contentStr = typeof content === 'string' ? content : '';
  if (!contentStr) return 1;

  const words = contentStr
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const readingTime = Math.ceil(words / 200) || 1; // Average reading speed: 200 words/minute
  return readingTime;
}

export function BlogCard({ blog }: BlogCardProps) {
  const router = useRouter();
  const readingTime = calculateReadingTime(blog.content);

  return (
    <article
      className='group relative bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
      onClick={() => router.push(`/blogs/${blog.slug}`)}
    >
      {/* Cover Image */}
      {blog.coverImage && (
        <div className='aspect-video overflow-hidden bg-muted'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.coverImage}
            alt={blog.title}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
      )}

      {/* Content */}
      <div className='p-6 space-y-4'>
        {/* Category & Featured Badge */}
        <div className='flex items-center gap-2 flex-wrap'>
          {blog.category && (
            <span className='px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md'>
              {blog.category}
            </span>
          )}
          {blog.featured && (
            <span className='px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-xs font-medium rounded-md'>
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className='text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2'>
          {blog.title}
        </h2>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className='text-sm text-muted-foreground line-clamp-3'>{blog.excerpt}</p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded'
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className='px-2 py-0.5 text-muted-foreground text-xs'>
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className='flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            <span>
              {new Date(blog.publishedAt || blog.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />
            <span>{readingTime} min</span>
          </div>

          {blog.views !== undefined && blog.views > 0 && (
            <div className='flex items-center gap-1'>
              <Eye className='h-3 w-3' />
              <span>{blog.views.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Read More */}
        <Button
          variant='ghost'
          size='sm'
          className='w-full group-hover:bg-accent transition-colors'
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/blogs/${blog.slug}`);
          }}
        >
          Read Article
          <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Button>
      </div>

      {/* Hover overlay effect */}
      <div className='absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl pointer-events-none transition-colors' />
    </article>
  );
}
