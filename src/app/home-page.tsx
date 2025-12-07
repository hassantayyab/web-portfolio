'use client';

import {
  BentoCell,
  BentoGrid,
  BlogsAccordionCell,
  ContactCell,
  HeroCell,
  PhotoCell,
  ProjectsCell,
  SocialCell,
} from '@/components/bento';

export default function HomePageClient() {
  return (
    <main className='min-h-screen md:h-screen w-full md:overflow-hidden' id='main-content'>
      {/* Background effects */}
      <div className='fixed inset-0 bg-linear-to-br from-background via-background to-primary/5 pointer-events-none' />
      <div className='fixed inset-0 dot-pattern opacity-30 pointer-events-none' />

      {/* Bento Grid */}
      <BentoGrid className='pt-[92px] pb-6 md:pt-[102px] md:pb-5 md:h-full px-4 md:px-5'>
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
          <BlogsAccordionCell />
        </BentoCell>

        {/* Row 3-4: Projects + Contact (both now 2 rows tall) */}
        {/* Projects - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
        <BentoCell colSpan={4} rowSpan={2}>
          <ProjectsCell />
        </BentoCell>

        {/* Contact CTA - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
        <BentoCell colSpan={4} rowSpan={2}>
          <ContactCell />
        </BentoCell>

        {/* Row 4: Social Links (under blogs) */}
        {/* Social Links - 4 cols (2 in 6-col = 4 in 12-col), 1 row */}
        <BentoCell colSpan={4} rowSpan={1}>
          <SocialCell />
        </BentoCell>
      </BentoGrid>
    </main>
  );
}
