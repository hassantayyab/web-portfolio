'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  BentoCell,
  BentoGrid,
  HeroCell,
  PhotoCell,
} from '@/components/bento';
import { ClientLayout } from '@/components/shared/client-layout';
import { Skeleton } from '@/components/shared/skeleton';

// Lazy load below-the-fold components
const LazyBlogsAccordionCell = dynamic(() => 
  import('@/components/bento').then(mod => ({ default: mod.BlogsAccordionCell })),
  { 
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: true,
  }
);

const LazyProjectsCell = dynamic(() => 
  import('@/components/bento').then(mod => ({ default: mod.ProjectsCell })),
  { 
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: true,
  }
);

const LazyContactCell = dynamic(() => 
  import('@/components/bento').then(mod => ({ default: mod.ContactCell })),
  { 
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: true,
  }
);

const LazySocialCell = dynamic(() => 
  import('@/components/bento').then(mod => ({ default: mod.SocialCell })),
  { 
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: true,
  }
);

export default function HomePage() {
  return (
    <ClientLayout>
      <main className='min-h-screen md:h-screen w-full md:overflow-hidden' id="main-content">
        {/* Background effects */}
        <div className='fixed inset-0 bg-linear-to-br from-background via-background to-primary/5 pointer-events-none' />
        <div className='fixed inset-0 dot-pattern opacity-30 pointer-events-none' />

        {/* Bento Grid */}
        <BentoGrid className='pt-20 pb-8 md:pt-24 md:pb-0 md:h-full'>
          {/* Row 1-2: Hero (left) + Photo (center-right) + Blogs (right) */}
          {/* Hero - 5 cols (2.5 in 6-col = 5 in 12-col), 2 rows */}
          <BentoCell colSpan={5} rowSpan={2}>
            <HeroCell />
          </BentoCell>

          {/* Photo - 3 cols (1.5 in 6-col = 3 in 12-col), 2 rows */}
          <BentoCell colSpan={3} rowSpan={2}>
            <PhotoCell />
          </BentoCell>

          {/* Blogs Accordion - 4 cols (2 in 6-col = 4 in 12-col), 3 rows */}
          <BentoCell colSpan={4} rowSpan={3}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazyBlogsAccordionCell />
            </Suspense>
          </BentoCell>

          {/* Row 3-4: Projects + Contact (both now 2 rows tall) */}
          {/* Projects - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
          <BentoCell colSpan={4} rowSpan={2}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazyProjectsCell />
            </Suspense>
          </BentoCell>

          {/* Contact CTA - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
          <BentoCell colSpan={4} rowSpan={2}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazyContactCell />
            </Suspense>
          </BentoCell>

          {/* Row 4: Social Links (under blogs) */}
          {/* Social Links - 4 cols (2 in 6-col = 4 in 12-col), 1 row */}
          <BentoCell colSpan={4} rowSpan={1}>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazySocialCell />
            </Suspense>
          </BentoCell>
        </BentoGrid>
      </main>
    </ClientLayout>
  );
}
