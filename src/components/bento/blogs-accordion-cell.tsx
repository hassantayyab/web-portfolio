'use client';

import { blogs } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function BlogsAccordionCell() {
  const featuredBlogs = blogs.filter((b) => b.featured).slice(0, 6);
  const [expandedId, setExpandedId] = useState<string | null>(featuredBlogs[0]?.id || null);

  const toggleBlog = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className='relative h-full flex flex-col overflow-hidden'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex items-center justify-between p-4 md:p-5 pb-0'
      >
        <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Recent Blogs
        </h3>
        <Link href='/blogs' className='flex items-center gap-1 text-xs text-primary group'>
          <span className='hidden md:inline'>View All</span>
          <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
        </Link>
      </motion.div>

      {/* Blogs Accordion */}
      <div className='flex-1 flex flex-col p-4 md:p-5 pt-3 overflow-hidden'>
        {featuredBlogs.map((blog, index) => {
          const isExpanded = expandedId === blog.id;

          return (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'border-b border-white/10 last:border-b-0',
                isExpanded ? 'flex-1 min-h-0' : 'flex-none',
              )}
            >
              {/* Blog Header - Always Visible */}
              <button
                onClick={() => toggleBlog(blog.id)}
                className={cn(
                  'w-full flex items-center justify-between py-3 text-left group transition-colors',
                  isExpanded ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'text-sm md:text-base font-medium transition-all line-clamp-1',
                    isExpanded && 'text-foreground',
                  )}
                >
                  {blog.title}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-300 flex-shrink-0',
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
                      <div className='relative rounded-xl overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-white/10 p-4'>
                        {/* Category Badge */}
                        <div className='mb-2'>
                          <span className='inline-block text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium'>
                            {blog.category}
                          </span>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-muted-foreground/90 line-clamp-6 mb-3'>
                          {blog.description}
                        </p>

                        {/* Meta Info */}
                        <div className='flex items-center gap-3 text-xs text-muted-foreground/70'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            <span>
                              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className='flex flex-wrap gap-1 mt-3'>
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className='text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground/70 border border-white/5'
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
