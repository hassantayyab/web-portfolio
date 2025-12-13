'use client';

import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageLayout } from '@/components/shared/page-layout';
import { ScrollToTop } from '@/components/shared/scroll-to-top';
import { ShareButtons } from '@/components/shared/share-buttons';
import { Button } from '@/components/ui/button';
import { Blog } from '@/lib/types';
import { ArrowLeft, Calendar, Clock, Eye, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPostClientProps {
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

export function BlogPostClient({ blog }: BlogPostClientProps) {
  const router = useRouter();
  const [views, setViews] = useState(blog.views || 0);
  const readingTime = calculateReadingTime(blog.content);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Increment view count
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch(`/api/blogs/${blog.id}/view`, {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error('Failed to increment views:', error);
      }
    };

    incrementViews();
  }, [blog.id]);

  return (
    <>
      {/* Scroll to Top Button */}
      <ScrollToTop />

      <PageLayout title='' description='' maxWidth='4xl' hideHeader={true}>
        {/* Breadcrumbs */}
        <div className='mb-6'>
          <Breadcrumbs items={[{ label: 'Blog', href: '/blogs' }, { label: blog.title }]} />
        </div>

        <article className='space-y-8'>
          {/* Cover Image */}
          {blog.coverImage && (
            <div className='rounded-2xl overflow-hidden aspect-video shadow-lg'>
              <img src={blog.coverImage} alt={blog.title} className='w-full h-full object-cover' />
            </div>
          )}

          {/* Article Header */}
          <header className='space-y-6'>
            {/* Category Badge */}
            {blog.category && (
              <div className='flex items-center gap-2'>
                <span className='px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full'>
                  {blog.category}
                </span>
                {blog.featured && (
                  <span className='px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-sm font-medium rounded-full'>
                    Featured
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <h1 className='text-h1 font-bold tracking-tight'>{blog.title}</h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className='text-xl text-muted-foreground leading-relaxed'>{blog.excerpt}</p>
            )}

            {/* Meta Info */}
            <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold'>
                  {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className='font-medium text-foreground'>{blog.author}</div>
                  <div className='text-xs'>Author</div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                <span>
                  {new Date(blog.publishedAt || blog.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                <span>{readingTime} min read</span>
              </div>

              <div className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                <span>{views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-accent text-accent-foreground text-sm rounded-md'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons title={blog.title} url={shareUrl} />
          </header>

          {/* Divider */}
          <div className='h-px bg-border' />

          {/* Blog Content */}
          <MarkdownRenderer content={blog.content} />

          {/* Footer */}
          <footer className='pt-8 border-t'>
            <div className='flex items-center justify-between'>
              <Button variant='outline' onClick={() => router.push('/blogs')} className='gap-2'>
                <ArrowLeft className='h-4 w-4' />
                Back to All Blogs
              </Button>

              <div className='flex items-center gap-2'>
                <Share2 className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Share this article</span>
              </div>
            </div>
          </footer>
        </article>
      </PageLayout>
    </>
  );
}
