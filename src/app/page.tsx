'use client';

import {
  BentoCell,
  BentoGrid,
  ContactCell,
  HeroCell,
  PhotoCell,
  ProjectsAccordionCell,
  SkillsCell,
  SocialCell,
} from '@/components/bento';
import { ClientLayout } from '@/components/shared/client-layout';

export default function HomePage() {
  return (
    <ClientLayout>
      <main className='h-screen w-screen overflow-hidden no-scrollbar'>
        {/* Background effects */}
        <div className='fixed inset-0 bg-linear-to-br from-background via-background to-primary/5 pointer-events-none' />
        <div className='fixed inset-0 dot-pattern opacity-30 pointer-events-none' />

        {/* Bento Grid */}
        <BentoGrid className='h-full pt-24 md:pt-24'>
          {/* Row 1-2: Hero (left) + Photo (center-right) + Projects (right) */}
          {/* Hero - 5 cols (2.5 in 6-col = 5 in 12-col), 2 rows */}
          <BentoCell colSpan={5} rowSpan={2}>
            <HeroCell />
          </BentoCell>

          {/* Photo - 3 cols (1.5 in 6-col = 3 in 12-col), 2 rows */}
          <BentoCell colSpan={3} rowSpan={2}>
            <PhotoCell />
          </BentoCell>

          {/* Projects Accordion - 4 cols (2 in 6-col = 4 in 12-col), 3 rows */}
          <BentoCell colSpan={4} rowSpan={3}>
            <ProjectsAccordionCell />
          </BentoCell>

          {/* Row 3-4: Skills + Contact (both now 2 rows tall) */}
          {/* Skills - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
          <BentoCell colSpan={4} rowSpan={2}>
            <SkillsCell />
          </BentoCell>

          {/* Contact CTA - 4 cols (2 in 6-col = 4 in 12-col), 2 rows */}
          <BentoCell colSpan={4} rowSpan={2}>
            <ContactCell />
          </BentoCell>

          {/* Row 4: Social Links (under projects) */}
          {/* Social Links - 4 cols (2 in 6-col = 4 in 12-col), 1 row */}
          <BentoCell colSpan={4} rowSpan={1}>
            <SocialCell />
          </BentoCell>
        </BentoGrid>
      </main>
    </ClientLayout>
  );
}
