'use client';

import { ReactNode } from 'react';
import { PageTransition } from './page-transition';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export function PageLayout({
  children,
  title,
  description,
  maxWidth = '7xl',
  className,
}: PageLayoutProps) {
  return (
    <main className='min-h-screen' id='main-content'>
      {/* Background effects */}
      <div className='fixed inset-0 bg-linear-to-br from-background via-background to-primary/5 pointer-events-none' />
      <div className='fixed inset-0 dot-pattern opacity-30 pointer-events-none' />

      <PageTransition>
        <div
          className={`relative z-10 ${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-5 md:px-6 py-24 md:py-32 ${className || ''}`}
        >
          {/* Header */}
          <div className='mb-8 sm:mb-10 md:mb-12'>
            <h1 className='text-h1 mb-3 sm:mb-4'>{title}</h1>
            {description && (
              <p className='text-body-lg text-muted-foreground max-w-2xl'>{description}</p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </PageTransition>
    </main>
  );
}
