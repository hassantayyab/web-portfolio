'use client';

import { Badge } from '@/components/ui/badge';
import { Experience } from '@/lib/types';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface TimelineProps {
  experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className='relative'>
      {/* Timeline line */}
      <div className='absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px' />

      {/* Timeline items */}
      <div className='space-y-12'>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative grid md:grid-cols-2 gap-4 md:gap-8 ${
              index % 2 === 0 ? '' : 'md:direction-rtl'
            }`}
          >
            {/* Timeline dot */}
            <div className='absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary -translate-x-1/2 md:-translate-x-1.5 ring-4 ring-background' />

            {/* Content */}
            <div
              className={`pl-6 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:col-start-2 md:pl-8 md:text-left'
              }`}
              style={{ direction: 'ltr' }}
            >
              {/* Date */}
              <div className='text-sm text-muted-foreground mb-2'>
                {experience.startDate} — {experience.endDate}
              </div>

              {/* Title and company */}
              <h3 className='text-xl font-semibold mb-1'>{experience.title}</h3>
              <div className='flex items-center gap-2 mb-3 flex-wrap justify-start md:justify-end'>
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline flex items-center gap-1'
                  >
                    {experience.company}
                    <ExternalLink className='w-3 h-3' />
                  </a>
                ) : (
                  <span className='text-muted-foreground'>{experience.company}</span>
                )}
                <span className='text-muted-foreground/50'>•</span>
                <span className='text-sm text-muted-foreground'>{experience.location}</span>
              </div>

              {/* Description */}
              <ul className='space-y-1 mb-4 text-sm text-muted-foreground text-left'>
                {experience.description.map((item, i) => (
                  <li key={i} className='flex items-start gap-2'>
                    <span className='text-primary mt-1.5'>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              {experience.technologies && (
                <div className='flex flex-wrap gap-1.5 justify-start'>
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant='outline'
                      className='text-sm bg-white/5 border-white/10'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
