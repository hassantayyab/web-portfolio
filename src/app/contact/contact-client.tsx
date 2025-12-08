'use client';

import { ContactForm } from '@/components/shared/contact-form';
import { PageLayout } from '@/components/shared/page-layout';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';

export default function ContactPageClient() {
  return (
    <PageLayout
      title='Get in Touch'
      description="Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible."
      maxWidth='4xl'
    >
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mb-12'
      >
        <div className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'>
          <div className='flex flex-col md:flex-row items-start gap-6'>
            <div className='flex-1'>
              <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2'>
                Email
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className='text-xl md:text-2xl text-primary hover:underline'
              >
                {personalInfo.email}
              </a>
            </div>
            <div className='flex-1'>
              <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2'>
                Location
              </h3>
              <p className='text-xl md:text-2xl text-foreground'>{personalInfo.location}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'
      >
        <ContactForm />
      </motion.div>
    </PageLayout>
  );
}
