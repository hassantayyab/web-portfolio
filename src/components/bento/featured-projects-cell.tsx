'use client';

import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProjectsCell() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className='relative h-full flex flex-col p-4 md:p-6 overflow-hidden'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex items-center justify-between mb-4'
      >
        <h3 className='text-sm md:text-sm font-medium text-muted-foreground uppercase tracking-wider'>
          Featured Projects
        </h3>
        <Link
          href='/projects'
          className='flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all'
        >
          View all
          <ArrowRight className='w-3 h-3' />
        </Link>
      </motion.div>

      {/* Projects list */}
      <div className='flex-1 flex flex-col gap-2'>
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            className={cn(
              'flex-1 flex items-center gap-3 px-3 py-2 rounded-xl',
              'bg-white/5 border border-white/15 transition-all duration-300',
              'hover:bg-white/10 hover:border-white/20 group cursor-pointer',
            )}
          >
            {/* Project image/placeholder */}
            <div className='w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden'>
              <span className='text-lg font-bold text-primary/70'>{project.title[0]}</span>
            </div>

            {/* Project info */}
            <div className='flex-1 min-w-0'>
              <h4 className='text-sm font-medium truncate group-hover:text-foreground transition-colors'>
                {project.title}
              </h4>
              <p className='text-sm text-muted-foreground truncate'>
                {project.technologies.slice(0, 3).join(' • ')}
              </p>
            </div>

            {/* Link indicator */}
            <ExternalLink className='w-4 h-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0' />
          </motion.div>
        ))}
      </div>

      {/* Decorative gradient */}
      <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
    </div>
  );
}
