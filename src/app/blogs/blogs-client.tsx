'use client';

import { ClientLayout } from '@/components/shared/client-layout';
import { PageTransition } from '@/components/shared/page-transition';
import { blogs } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default function BlogsClient() {
  return (
    <ClientLayout>
      <PageTransition>
        <main className='min-h-screen pt-24 md:pt-28 pb-20'>
          {/* Background effects */}
          <div className='fixed inset-0 bg-linear-to-br from-background via-background to-primary/5 pointer-events-none' />
          <div className='fixed inset-0 dot-pattern opacity-30 pointer-events-none' />

          <div className='relative z-10 container mx-auto px-4 md:px-6 max-w-6xl'>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='mb-12 md:mb-16'
            >
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70'>
                Blog
              </h1>
              <p className='text-lg md:text-xl text-muted-foreground max-w-2xl'>
                Thoughts on web development, design, and technology. Join me as I share insights and
                learnings from my journey.
              </p>
            </motion.div>

            {/* Blogs Grid */}
            <div className='grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className='group relative'
                >
                  <div className='h-full flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300'>
                    {/* Hover glow effect */}
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                    {/* Content */}
                    <div className='relative z-10 flex flex-col flex-1'>
                      {/* Category Badge */}
                      <div className='mb-3'>
                        <span className='inline-block text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium'>
                          {blog.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className='text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                        {blog.title}
                      </h2>

                      {/* Description */}
                      <p className='text-sm md:text-base text-muted-foreground mb-4 flex-1 line-clamp-3'>
                        {blog.description}
                      </p>

                      {/* Meta Info */}
                      <div className='flex items-center gap-4 text-sm text-muted-foreground/70 mb-4'>
                        <div className='flex items-center gap-1.5'>
                          <Calendar className='w-3.5 h-3.5' />
                          <span>
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Clock className='w-3.5 h-3.5' />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className='flex flex-wrap gap-1.5 mb-4'>
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className='text-sm px-2 py-1 rounded-md bg-white/5 text-muted-foreground/70 border border-white/5'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <div className='flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all'>
                        <span className='font-medium'>Read More</span>
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                      </div>
                    </div>
                  </div>
                </motion.article>
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
          </div>
        </main>
      </PageTransition>
    </ClientLayout>
  );
}
