'use client';

import { Blog } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function BlogsAccordionCell() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Fetch featured blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Set first blog as expanded only on initial load
  useEffect(() => {
    if (blogs.length > 0 && !hasInitialized) {
      setExpandedId(blogs[0].id);
      setHasInitialized(true);
    }
  }, [blogs, hasInitialized]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?featured=true&limit=6&status=published');

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  const toggleBlog = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className='grid grid-rows-[auto_1fr] min-h-[400px] md:min-h-0 h-full'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5 md:px-6 md:pt-6 pb-2'
      >
        <h2 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Featured Blogs
        </h2>
        <Link
          href='/blogs'
          className='flex items-center gap-1 text-sm text-primary group cursor-pointer'
          aria-label='View all blogs'
        >
          <span className='hidden sm:inline'>View All</span>
          <ArrowUpRight
            className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
            aria-hidden='true'
          />
        </Link>
      </motion.div>

      {/* Blogs Accordion - scrollable area */}
      <div className='overflow-y-auto px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6'>
        {blogs?.map((blog, index) => {
          const isExpanded = expandedId === blog.id;

          return (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className='border-b border-white/10 last:border-b-0'
            >
              {/* Blog Header - Always Visible */}
              <button
                onClick={() => toggleBlog(blog.id)}
                className={cn(
                  'w-full flex items-center justify-between py-3 sm:py-3.5 text-left group transition-colors min-h-[48px] cursor-pointer',
                  isExpanded ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'text-sm sm:text-base md:text-base font-medium transition-all line-clamp-1 pr-2',
                    isExpanded && 'text-foreground',
                  )}
                >
                  {blog.title}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 shrink-0',
                    isExpanded && 'rotate-180',
                  )}
                />
              </button>

              {/* Expanded Content */}
              <AnimatePresence mode='wait'>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='pb-4 space-y-3'>
                      {/* Blog Card */}
                      <div className='relative rounded-xl overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-white/10 p-3 sm:p-4'>
                        {/* Category Badge */}
                        <div className='mb-2'>
                          <span className='inline-block text-sm px-2 py-0.5 sm:py-1 rounded-full bg-primary/20 text-primary font-medium'>
                            {blog.category}
                          </span>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-muted-foreground/90 line-clamp-3 sm:line-clamp-4 md:line-clamp-6 mb-3'>
                          {blog.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className='flex items-center gap-2 sm:gap-3 text-sm text-muted-foreground/70 flex-wrap'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                            <span>
                              {blog.publishedAt
                                ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : 'Not published'}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                            <span>{blog.readTime} min read</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className='flex flex-wrap gap-1 mt-3'>
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className='text-xs sm:text-sm px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground/70 border border-white/5'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
