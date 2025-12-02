'use client';

import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ProjectsAccordionCell() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
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
          Projects
        </h3>
        <Link
          href='/projects'
          className='flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all group'
        >
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
                    'text-sm md:text-base font-medium transition-all',
                    isExpanded && 'text-foreground',
                  )}
                >
                  {project.title}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-300',
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
                      {/* Project Image */}
                      <div className='relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-white/10'>
                        {/* Placeholder image effect */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <span className='text-4xl font-bold text-primary/30'>
                            {project.title
                              .split(' ')
                              .map((w) => w[0])
                              .join('')}
                          </span>
                        </div>

                        {/* Overlay with project info on hover */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                          <div>
                            <p className='text-sm text-white/80 line-clamp-2'>
                              {project.description}
                            </p>
                            <div className='flex flex-wrap gap-1 mt-2'>
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className='text-sm px-2 py-0.5 rounded-full bg-white/10 text-white/70'
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className='flex items-center justify-between text-sm text-muted-foreground'>
                        <span>{project.technologies.slice(0, 2).join(' • ')}</span>
                        <span>{project.year}</span>
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
