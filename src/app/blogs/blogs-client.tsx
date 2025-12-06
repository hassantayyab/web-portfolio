'use client';

import { ClientLayout } from '@/components/shared/client-layout';
import { PageLayout } from '@/components/shared/page-layout';
import { blogs } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BlogsClient() {
  return (
    <ClientLayout>
      <PageLayout
        title='Blog'
        description='Thoughts on web development, design, and technology. Join me as I share insights and learnings from my journey.'
        maxWidth='6xl'
      >
        {/* Blogs Grid */}
        <div className='grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {blogs.map((blog, index) => (
            <motion.div key={blog.id} className='group relative'>
              <Link href={`/blogs/${blog.id}`} className='block h-full cursor-pointer'>
                <div className='h-full flex flex-col p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-sm hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden'>
                  {/* Hover glow effect */}
                  <div className='absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Content */}
                  <div className='relative z-10 flex flex-col flex-1 min-h-0 overflow-hidden'>
                    {/* Category Badge */}
                    <div className='mb-3 shrink-0'>
                      <span className='inline-block text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium'>
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors shrink-0'>
                      {blog.title}
                    </h2>

                    {/* Description */}
                    <div className='flex-1 min-h-0 overflow-hidden mb-3 sm:mb-4'>
                      <p className='text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-3'>
                        {blog.description}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className='flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground/70 mb-3 sm:mb-4 flex-wrap'>
                      <div className='flex items-center gap-1 sm:gap-1.5'>
                        <Calendar className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className='flex items-center gap-1 sm:gap-1.5'>
                        <Clock className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4'>
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/5 text-muted-foreground/70 border border-white/5'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <div className='flex items-center gap-2 text-xs sm:text-sm text-primary group-hover:gap-3 transition-all'>
                      <span className='font-medium'>Read More</span>
                      <ArrowRight className='w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform' />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No blogs fallback (if needed) */}
        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <p className='text-muted-foreground text-lg'>No blog posts yet. Check back soon!</p>
          </motion.div>
        )}
      </PageLayout>
    </ClientLayout>
  );
}
