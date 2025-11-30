# Portfolio Website Development Plan

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + CSS Variables for theming
- **UI Components**: Shadcn UI (dark mode only)
- **Animations**: Framer Motion
- **Special Effects**: Custom cursor glow, bento grid
- **Email**: React Email + Resend for contact form
- **Fonts**: Geist Sans & Geist Mono

## Site Structure

```
/                 → Home (100vh Bento Grid)
/projects         → Projects Gallery
/about            → About Me (detailed)
```

---

## Phase 1: Project Setup

- [x] Initialize Next.js 15 with TypeScript and App Router
- [x] Configure Tailwind CSS v4 with dark theme
- [x] Install and configure Shadcn UI (dark mode)
- [x] Set up project folder structure
- [x] Configure base fonts and CSS variables
- [x] Create responsive utility classes

## Phase 2: Layout and Navigation

- [x] Create root layout with metadata
- [x] Build floating navigation bar
- [x] Add command palette (Cmd+K) for quick navigation
- [x] Set up page transition animations with Framer Motion
- [x] Create reusable container components

## Phase 3: Home Page - Bento Grid

Build 100vh/100vw bento grid with these cells:

- [x] **Hero cell**: Name, title, animated intro text
- [x] **Photo cell**: Profile image with spotlight/glow effect
- [x] **Skills cell**: Tech stack icons with hover animations
- [x] **Featured Projects cell**: 2-3 project previews with hover effects
- [x] **Social Links cell**: GitHub, LinkedIn, Twitter with animated icons
- [x] **Contact CTA cell**: "Let's work together" with email link
- [x] **Location cell**: City/timezone with subtle animation
- [x] **Availability cell**: Status badge (Open to work)
- [x] **Resume cell**: Download CV button

## Phase 4: Projects Page

- [x] Create project data structure/types
- [x] Build project card component with hover effects
- [x] Implement project grid layout
- [x] Add project detail modal (expand on click)
- [x] Include project filters by technology
- [x] Add project links (live demo, GitHub)

## Phase 5: About Page

- [x] Detailed bio section
- [x] Experience timeline
- [x] Skills breakdown with visual indicators
- [x] Education/certifications section

## Phase 6: Contact Form

- [x] Build contact form UI with Shadcn components
- [x] Set up Resend for email delivery
- [x] Create email template with React Email
- [x] Add form validation with Zod
- [x] Implement loading/success/error states
- [x] Add rate limiting for spam protection

## Phase 7: Polish and UX

- [x] Add skeleton loading states
- [x] Add micro-interactions and hover effects
- [x] Create custom 404 page
- [x] Add cursor following effect
- [x] Test responsive design (mobile/tablet/desktop)

## Phase 8: SEO and Performance

- [x] Configure metadata and Open Graph tags
- [x] Generate sitemap.xml and robots.txt
- [x] Add structured data (JSON-LD)
- [x] Set up Vercel Analytics ready structure

---

## Key Files Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home - Bento Grid
│   ├── loading.tsx         # Loading skeleton
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Sitemap generation
│   ├── robots.ts           # Robots.txt
│   ├── projects/
│   │   ├── page.tsx        # Projects page (with metadata)
│   │   └── projects-client.tsx
│   ├── about/
│   │   ├── page.tsx        # About page (with metadata)
│   │   └── about-client.tsx
│   └── api/contact/route.ts # Contact form API
├── components/
│   ├── ui/                 # Shadcn components
│   ├── bento/              # Bento grid cells
│   ├── navigation/         # Nav, command palette
│   ├── projects/           # Project cards, modal
│   └── shared/             # Reusable components
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── types.ts            # TypeScript types
│   ├── data.ts             # Static data (projects, skills)
│   └── metadata.ts         # SEO metadata helpers
└── emails/
    └── contact.tsx         # React Email template
```

---

## Status: COMPLETE ✓

All phases have been implemented. The portfolio is ready for:

1. Customization (update `src/lib/data.ts` with your info)
2. Adding images (avatar, project screenshots)
3. Deployment to Vercel
