'use client';

import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function PhotoCell() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='relative min-h-[360px] md:min-h-0 h-full w-full overflow-hidden'
    >
      {/* Full-size photo container */}
      <div className='absolute inset-0 bg-linear-to-br from-muted/80 to-muted/40'>
        {/* Placeholder gradient background */}
        <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20' />

        {/* Image - uncomment when you have an actual avatar */}
        <Image
          src={personalInfo.avatarUrl}
          alt={personalInfo.name}
          fill
          className='object-cover object-center grayscale'
          priority
        />

        {/* Placeholder silhouette/initials when no image */}
        {/* <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative w-full h-full flex items-end justify-center pb-8'>
            <div className='relative'>
              <div className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground/15 tracking-tighter'>
                {personalInfo.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className='absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary/10 blur-xl' />
              <div className='absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-primary/10 blur-xl' />
            </div>
          </div>
        </div> */}

        {/* Subtle vignette effect */}
        <div className='absolute inset-0 bg-linear-to-t from-card/50 via-transparent to-transparent' />
      </div>
    </motion.div>
  );
}
