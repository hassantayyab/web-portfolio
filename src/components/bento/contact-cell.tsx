'use client';

import { personalInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ContactCell() {
  return (
    <Link
      href='/contact'
      aria-label="Contact me - Let's work together"
      className={cn(
        'relative min-h-[250px] md:min-h-0 h-full w-full flex flex-col justify-center items-center p-6 md:p-8 overflow-y-auto cursor-pointer text-left',
        'group transition-all duration-300',
        'shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl',
      )}
    >
      {/* Enhanced animated gradient background */}
      <div
        className='absolute inset-0 bg-linear-to-br from-primary/30 via-primary/20 to-primary/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500 rounded-2xl'
        aria-hidden='true'
      />

      {/* Shine effect */}
      <div
        className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl'
        aria-hidden='true'
      />

      {/* Glow effect */}
      <div
        className='absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 rounded-2xl'
        aria-hidden='true'
      />

      {/* Arrow at top right */}
      <motion.div className='absolute top-4 right-4 md:top-5 md:right-5 z-20' aria-hidden='true'>
        <ArrowUpRight className='w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
      </motion.div>

      <div className='relative z-10 text-center'>
        {/* Text - using span with heading styles instead of h2 inside link */}
        <motion.span className='block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3'>
          Let&apos;s work together
        </motion.span>

        <motion.span className='block text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground break-words'>
          {personalInfo.email}
        </motion.span>
      </div>

      {/* Enhanced corner decoration */}
      <div
        className='absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity'
        aria-hidden='true'
      />
    </Link>
  );
}
