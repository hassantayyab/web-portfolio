'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { Blog } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogArticleClientProps {
  blog: Blog;
}

export default function BlogArticleClient({ blog }: BlogArticleClientProps) {
  return (
    <PageLayout title={blog.title} maxWidth='4xl'>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mb-8'
      >
        <Link
          href='/blogs'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group'
        >
          <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
          <span>Back to Blogs</span>
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Badge */}
        <div className='mb-6'>
          <span className='inline-block text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium'>
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className='text-h1 mb-6'>{blog.title}</h1>

        {/* Meta Info */}
        <div className='flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-white/10'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4' />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4' />
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-12'>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className='text-sm px-3 py-1 rounded-full bg-white/5 text-muted-foreground/80 border border-white/10'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className='prose prose-invert prose-lg max-w-none'>
          {blog.content ? (
            <div
              className='text-body-lg text-muted-foreground leading-relaxed whitespace-pre-line'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div className='text-body-lg text-muted-foreground leading-relaxed space-y-4'>
              <p>{blog.description}</p>
              <p className='text-muted-foreground/70 italic'>
                Full article content coming soon...
              </p>
            </div>
          )}
        </div>
      </motion.article>
    </PageLayout>
  );
}
