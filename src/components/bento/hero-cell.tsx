'use client';

import { personalInfo, skills } from '@/lib/data';
import { getSkillIcon } from '@/lib/skill-icons';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

// Reduced animation delays for faster content visibility (total cascade ~0.5s instead of 1s+)
const FAST_DELAYS = {
  INITIAL: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.3,
  STAGGER: 0.05,
};

// Skills to display in hero section - defined outside component to avoid recreation
const VIEWABLE_SKILLS = ['angular', 'ngrx', 'tailwind', 'typescript', 'ux-design'] as const;

export function HeroCell() {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => personalInfo.title.split(' '), []);
  const displaySkills = useMemo(
    () => skills.filter((skill) => VIEWABLE_SKILLS.includes(skill.icon as typeof VIEWABLE_SKILLS[number])),
    [],
  );

  // Animation variants - disabled when user prefers reduced motion
  const fadeUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  const fadeIn = prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } };

  const scaleIn = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } };

  return (
    <div className='relative min-h-[400px] md:min-h-0 md:h-full overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-50' />

      {/* Animated grid pattern */}
      <div className='absolute inset-0 grid-pattern opacity-30' />

      {/* Decorative element */}
      <motion.div
        {...(prefersReducedMotion ? {} : { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.5 } })}
        transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.2 }}
        className='absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none'
        aria-hidden='true'
      />

      {/* Scrollable content wrapper */}
      <div className='relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto'>
        <div>
          {/* Greeting */}
          <motion.p
            {...fadeUp}
            transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: FAST_DELAYS.INITIAL }}
            className='text-sm md:text-base text-muted-foreground font-medium mb-2'
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            {...fadeUp}
            transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: FAST_DELAYS.SHORT }}
            className='text-display font-bold mb-3 tracking-tight wrap-break-word'
          >
            {personalInfo.name}
          </motion.h1>

          {/* Animated title */}
          <motion.div
            {...fadeUp}
            transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: FAST_DELAYS.MEDIUM }}
            className='flex flex-wrap gap-2 text-lg md:text-xl lg:text-2xl text-primary'
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } })}
                transition={
                  prefersReducedMotion ? undefined : { duration: 0.3, delay: FAST_DELAYS.LONG + index * FAST_DELAYS.STAGGER }
                }
                className='inline-block'
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeIn}
            transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: 0.35 }}
            className='my-4 text-base sm:text-lg text-muted-foreground/80 sm:max-w-xl text-pretty'
          >
            {personalInfo.bio}
          </motion.p>
        </div>

        {/* Skills Row */}
        <motion.div
          {...fadeUp}
          transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: 0.4 }}
          className='flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap mt-4 md:mt-0'
        >
          {displaySkills.map((skill, index) => {
            const IconComponent = getSkillIcon(skill.icon);

            return (
              <motion.div
                key={skill.name}
                {...scaleIn}
                transition={
                  prefersReducedMotion ? undefined : { duration: 0.3, delay: 0.45 + index * FAST_DELAYS.STAGGER }
                }
                className='flex items-center gap-1.5 border border-white/15 px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-lg bg-white/5 min-h-[36px]'
              >
                <IconComponent
                  className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground shrink-0'
                  aria-hidden='true'
                />
                <span className='text-sm md:text-sm text-muted-foreground/80 font-medium'>{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
