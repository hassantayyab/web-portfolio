'use client';

import { InlineWidget } from 'react-calendly';
import { Loader2 } from 'lucide-react';

export const CalendlyWidgetSkeleton = () => (
  <div className='relative overflow-hidden rounded-xl bg-white/5 border border-white/10'>
    <div className='flex items-center justify-center h-[630px]'>
      <div className='flex flex-col items-center gap-3'>
        <Loader2 className='w-8 h-8 text-primary animate-spin' />
        <p className='text-sm text-muted-foreground'>Loading calendar...</p>
      </div>
    </div>
  </div>
);

interface CalendlyWidgetProps {
  url?: string;
}

export const CalendlyWidget = ({ url }: CalendlyWidgetProps) => {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl) {
    return (
      <div className='text-sm text-muted-foreground'>
        Calendar unavailable
      </div>
    );
  }

  return (
    <div className='calendly-container rounded-xl overflow-hidden'>
      <InlineWidget
        url={calendlyUrl}
        styles={{ height: '630px' }}
        pageSettings={{
          hideEventTypeDetails: true,
          hideLandingPageDetails: true,
        }}
      />
    </div>
  );
};
