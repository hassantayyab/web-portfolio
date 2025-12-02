'use client';

import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ProjectsCell() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
  const [expandedId, setExpandedId] = useState<string | null>(featuredProjects[0]?.id || null);

  const toggleProject = (id: string) => {
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
          Featured Projects
        </h3>
        <Link href='/projects' className='flex items-center gap-1 text-sm text-primary group'>
          <span className='hidden md:inline'>View All</span>
          <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
        </Link>
      </motion.div>

      {/* Projects Accordion */}
      <div className='flex-1 flex flex-col p-4 md:p-5 pt-3 overflow-hidden'>
        {featuredProjects.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'border-b border-white/10 last:border-b-0',
                isExpanded ? 'flex-1 min-h-0' : 'flex-none',
              )}
            >
              {/* Project Header - Always Visible */}
              <button
                onClick={() => toggleProject(project.id)}
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
                  {project.title}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-300 shrink-0',
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
                      {/* Project Card */}
                      <div className='relative rounded-xl overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-white/10 p-4'>
                        {/* Year Badge */}
                        <div className='mb-2'>
                          <div className='flex items-center gap-1.5'>
                            <Calendar className='w-3 h-3 text-primary' />
                            <span className='text-sm text-primary font-medium'>{project.year}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-muted-foreground/90 line-clamp-2 mb-3'>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className='flex flex-wrap gap-1 mt-3'>
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className='text-sm px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground/70 border border-white/5'
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className='text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20'>
                              +{project.technologies.length - 4}
                            </span>
                          )}
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
