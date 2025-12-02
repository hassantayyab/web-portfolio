'use client';

import { ClientLayout } from '@/components/shared/client-layout';
import { PageLayout } from '@/components/shared/page-layout';
import { Timeline } from '@/components/shared/timeline';
import { Badge } from '@/components/ui/badge';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/lib/constants';
import { education, experiences, personalInfo, skills } from '@/lib/data';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useMemo } from 'react';

export default function AboutPageClient() {
  const skillsByCategory = useMemo(
    () => ({
      frontend: skills.filter((s) => s.category === 'frontend'),
      backend: skills.filter((s) => s.category === 'backend'),
      tools: skills.filter((s) => s.category === 'tools'),
    }),
    [],
  );

  return (
    <ClientLayout>
      <PageLayout
        title='About Me'
        description='Get to know more about my background, experience, and what drives me.'
        maxWidth='4xl'
      >
        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.INITIAL }}
          className='mb-12 sm:mb-14 md:mb-16'
        >
          <h2 className='text-h2 font-semibold mb-4 sm:mb-5 md:mb-6'>Who I Am</h2>

          <div className='prose prose-invert prose-lg max-w-none'>
            <p className='text-body-lg text-muted-foreground leading-relaxed'>{personalInfo.bio}</p>
          </div>

          <div className='mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <MapPin className='w-4 h-4 text-primary' />
              <span>{personalInfo.location}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4 text-primary' />
              <span>{personalInfo.timezone}</span>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.SHORT }}
          className='mb-12 sm:mb-14 md:mb-16'
        >
          <h2 className='text-h2 font-semibold mb-4 sm:mb-5 md:mb-6'>Skills & Technologies</h2>

          <div className='space-y-5 sm:space-y-6'>
            {/* Frontend */}
            <div>
              <h3 className='text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3'>
                Frontend
              </h3>
              <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                {skillsByCategory.frontend.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant='secondary'
                    className='px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-colors'
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className='text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3'>
                Backend
              </h3>
              <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                {skillsByCategory.backend.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant='secondary'
                    className='px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-colors'
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className='text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3'>
                Tools & Platforms
              </h3>
              <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                {skillsByCategory.tools.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant='secondary'
                    className='px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-colors'
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.MEDIUM }}
          className='mb-12 sm:mb-14 md:mb-16'
        >
          <h2 className='text-h2 font-semibold mb-6 sm:mb-7 md:mb-8'>Experience</h2>

          <Timeline experiences={experiences} />
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.SLOW, delay: ANIMATION_DELAYS.LONG }}
        >
          <h2 className='text-h2 font-semibold mb-4 sm:mb-5 md:mb-6'>Education</h2>

          <div className='space-y-4 sm:space-y-5 md:space-y-6'>
            {education.map((edu) => (
              <div key={edu.id} className='p-4 sm:p-5 md:p-6 rounded-2xl bg-card/50 border border-white/10'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2'>
                  <h3 className='text-base sm:text-lg font-semibold'>{edu.degree}</h3>
                  <span className='text-xs sm:text-sm text-muted-foreground'>
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className='text-sm sm:text-base text-primary mb-1'>{edu.school}</p>
                <p className='text-xs sm:text-sm text-muted-foreground mb-2'>{edu.location}</p>
                {edu.description && (
                  <p className='text-xs sm:text-sm text-muted-foreground'>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </PageLayout>
    </ClientLayout>
  );
}
