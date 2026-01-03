'use client';

import { ContactMethods } from '@/components/contact/contact-methods';
import { PageLayout } from '@/components/shared/page-layout';
import { personalInfo, socialLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiGithub, SiGmail, SiLinkedin, SiX, SiYoutube } from 'react-icons/si';

const iconMap: Record<string, IconType> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  mail: SiGmail,
  youtube: SiYoutube,
};

export default function ContactPageClient() {
  return (
    <PageLayout
      title='Get in Touch'
      description='Send me a message or schedule a meeting - whatever works best for you.'
      maxWidth='7xl'
    >
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mb-8'
      >
        <div className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'>
          <div className='flex flex-col md:flex-row items-start gap-6'>
            <div className='flex-1'>
              <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2'>
                Email
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className='text-xl md:text-2xl text-primary hover:underline underline-offset-4'
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

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className='mb-12'
      >
        <div className='bg-card/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4'>
            Connect With Me
          </h3>
          <div className='flex flex-wrap gap-3'>
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon];

              return (
                <motion.a
                  key={link.url || index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-md min-h-[44px]',
                    'bg-white/5 border border-white/15 transition-all duration-300 cursor-pointer',
                    'hover:bg-white/10 hover:border-white/25 hover:shadow-lg group',
                  )}
                >
                  {Icon && (
                    <Icon className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors' />
                  )}
                  {link.name && (
                    <span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
                      {link.name}
                    </span>
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Contact Methods - Form & Calendly */}
      <ContactMethods />
    </PageLayout>
  );
}
