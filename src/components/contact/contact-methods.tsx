'use client';

import { ContactForm } from '@/components/shared/contact-form';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CalendlyWidgetSkeleton } from './calendly-widget';

const CalendlyWidget = dynamic(
  () => import('./calendly-widget').then((mod) => mod.CalendlyWidget),
  {
    ssr: false,
    loading: () => <CalendlyWidgetSkeleton />,
  },
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ContactMethods = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid lg:grid-cols-2 gap-6 lg:gap-8'
    >
      {/* Contact Form */}
      <motion.div
        variants={cardVariants}
        className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'
      >
        <div className='mb-6'>
          <h3 className='text-xl md:text-2xl font-semibold'>Send a Message</h3>
          <p className='text-muted-foreground text-sm'>I'll get back to you as soon as possible</p>
        </div>
        <ContactForm />
      </motion.div>

      {/* Schedule a Meeting */}
      <motion.div
        variants={cardVariants}
        className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'
      >
        <div className='mb-4'>
          <h3 className='text-xl md:text-2xl font-semibold'>Schedule a Meeting</h3>
          <p className='text-muted-foreground text-sm'>Pick a time that works for you</p>
        </div>
        <CalendlyWidget />
      </motion.div>
    </motion.div>
  );
};
