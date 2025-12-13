import { Blog, Education, Experience, PersonalInfo, Project, Skill, SocialLink } from './types';

export const personalInfo: PersonalInfo = {
  name: 'Hassan Tayyab',
  title: 'Frontend Engineer',
  email: 'hassandogar9@gmail.com',
  location: 'Munich, Germany',
  timezone: 'CET (UTC+1)',
  bio: 'Frontend engineer skilled in Angular, React, and Next.js, with a strong background in UX design. I build clean, scalable web applications fast using AI-assisted development and a user-centered mindset. Passionate about crafting intuitive interfaces, smooth interactions, and delivering high-quality frontend experiences end-to-end.',
  shortBio:
    'Frontend engineer with a strong UX design background, building fast, intuitive web apps using AI-assisted development. Experienced in Angular, React, and Next.js.',
  availability: 'available',
  availabilityText: 'Open to new opportunities',
  resumeUrl:
    'https://docs.google.com/document/d/1ZkWMsLCwD5_SHPuQquWmxDJcrKGafqUVjUq25bus5zI/edit?usp=sharing',
  avatarUrl: '/hassan-black.PNG',
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/hassantayyab',
    icon: 'github',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@HassanTDogar',
    icon: 'youtube',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hassan-t-dogar/',
    icon: 'linkedin',
  },
  {
    url: 'https://x.com/htdogar',
    icon: 'x',
  },
  {
    name: 'Email',
    url: 'mailto:hassandogar9@gmail.com',
    icon: 'mail',
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'Angular', icon: 'angular', category: 'frontend' },
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },

  // Backend
  { name: 'NestJS', icon: 'nestjs', category: 'backend' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  // { name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
  { name: 'MongoDB', icon: 'mongodb', category: 'backend' },
  // { name: 'GraphQL', icon: 'graphql', category: 'backend' },
  { name: 'Prisma', icon: 'prisma', category: 'backend' },

  // Tools
  { name: 'Git', icon: 'git', category: 'tools' },
  //   { name: 'Docker', icon: 'docker', category: 'tools' },
  { name: 'Figma', icon: 'figma', category: 'tools' },
  { name: 'Cursor', icon: 'cursor', category: 'tools' },
  //   { name: 'VS Code', icon: 'vscode', category: 'tools' },
  { name: 'Vercel', icon: 'vercel', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: 'rosen-justice',
    title: 'Rosen Justice',
    description: 'AI-powered legal case management with automated billing and insights.',
    longDescription:
      'Built a full-stack legal platform with AI case insights, automated time tracking, budget forecasting, and client comms to cut prep time by 40% and lift satisfaction by 85%.',
    image: '/work/rosen-justice.png',
    technologies: ['React', 'Node.js', 'JavaScript', 'PostgreSQL', 'OpenAI API', 'Stripe'],
    liveUrl: 'https://rosenjustice.com/',
    year: '2024',
    featured: true,
  },
  {
    id: 'launchister',
    title: 'Launchister',
    description: 'Viral waitlist builder with built-in referrals and analytics.',
    longDescription:
      'Shipped a waitlist SaaS where users spin up branded pages in minutes, track referrals, and manage growth analytics. Powers 10k+ waitlists and 500k subscribers with a 3.2x average referral multiplier.',
    image: '/work/launchister.png',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://www.launchister.online/',
    year: '2025',
    featured: true,
  },
  {
    id: 'launchkit',
    title: 'LaunchKit',
    description: 'AI business assistant suite with 46+ specialized tools.',
    longDescription:
      'Built an AI platform of specialized assistants for marketing, strategy, and growth tasks with real-time streaming responses and prompt-engineered workflows. Rated 4.9/5 by thousands of entrepreneurs.',
    image: '/work/launchkit.png',
    technologies: [
      'Angular 20',
      'NestJS 11',
      'TypeScript',
      'NgRx',
      'Tailwind CSS',
      'Supabase',
      'OpenAI API',
    ],
    liveUrl: 'https://launchkit.help/',
    year: '2025',
    featured: true,
  },
  {
    id: 'orderflow',
    title: 'OrderFlow',
    description: 'Restaurant order management redesign that cut lookup time by 60%.',
    longDescription:
      'Redesigned the SaaS web app with a two-column layout, clearer hierarchy, and consolidated workflows so kitchen teams spot and fulfill orders faster while reducing mistakes by half.',
    image: '/work/restaurant-order-management-system.png',
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'Principle', 'InVision'],
    year: '2024',
  },
  {
    id: 'shopconnect',
    title: 'ShopConnect',
    description: 'Bilingual shopping community app redesign with gamified engagement.',
    longDescription:
      'Overhauled a Hong Kong shopping community app with gamification, bilingual support, and streamlined navigation, boosting engagement by 65% and retention by 55%.',
    image: '/work/brandon.png',
    technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision', 'Sketch', 'Zeplin'],
    year: '2024',
  },
  {
    id: 'lequizo',
    title: 'Lequizo',
    description: 'Gamified UX design learning platform with adaptive quizzes.',
    longDescription:
      'Created a Duolingo-style UX learning experience with bite-sized lessons, adaptive quizzes, and community features achieving a 90% course completion rate across 25k users.',
    image: '/work/lequizo.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'TypeScript', 'Supabase', 'Stripe'],
    liveUrl: 'https://lequizo.com/',
    year: '2025',
    featured: true,
  },
  {
    id: 'salah-pal',
    title: 'Salah Pal',
    description: 'Smart prayer companion with offline times, Qibla AR, and reminders.',
    longDescription:
      'Built a culturally sensitive prayer app with GPS-accurate times, 3D Qibla compass, offline support, and educational content, reaching 1M+ downloads and a 4.8/5 rating.',
    image: '/work/salah-pal.png',
    liveUrl: 'https://www.salahpal.online/',
    technologies: ['React Native', 'Python', 'PostgreSQL', 'AWS', 'MapBox API'],
    year: '2024',
  },
  {
    id: 'appointments',
    title: 'Appointments System',
    description: 'Flexible scheduling for linking diverse objects on a visual board.',
    longDescription:
      'Designed multi-object appointment flows with customizable types, timezone awareness, and clear labeling, raising scheduling flexibility by 75% and satisfaction by 80%.',
    image: '/work/appointments.png',
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'UserTesting', 'Principle', 'InVision'],
    year: '2024',
  },
  {
    id: 'open-process-ventures',
    title: 'Open Process Ventures',
    description: 'Web3 incubator platform for startup onboarding and investor matching.',
    longDescription:
      'Built a full-stack platform with startup screening, mentor/investor matching, tokenomics modeling, and blockchain-powered governance, facilitating $25M+ in funding for 50+ startups.',
    image: '/work/open-process-ventures.png',
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Shadcn UI',
      'TypeScript',
      'GSAP',
      'Web3.js',
      'Solidity',
    ],
    liveUrl: 'https://www.openprocessventures.com/',
    year: '2023',
    featured: true,
  },
  {
    id: 'workforce-management',
    title: 'Workforce Management',
    description: 'Visual scheduling board for dispatchers with timeline planning.',
    longDescription:
      'Designed a customizable timeline board with grouping, planning mode, and drag-and-drop adjustments that boosted planning efficiency by 60% and adoption to 95% in the first month.',
    image: '/work/workforce-scheduling.png',
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'UserTesting', 'Principle', 'InVision'],
    year: '2024',
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Secfix GmbH',
    location: 'Germany',
    startDate: 'February 2024',
    endDate: 'Present',
    description: [
      'Led architecture and delivery of two greenfield web platforms',
      'Owned frontend direction: design system, reusable components, shared libs, NgRx state',
      'Drove UX-centred development with product, design, and stakeholders',
      'Led hiring through technical interviews to grow and strengthen the frontend team',
    ],
    technologies: ['Angular', 'Tailwind CSS', 'Material Components', 'NgRx'],
  },
  {
    id: '2',
    title: 'Software Engineer',
    company: 'remberg GmbH',
    location: 'Munich, Germany',
    startDate: 'April 2022',
    endDate: 'January 2024',
    description: [
      'Built core features for a large-scale Angular app across web and mobile',
      'Created a reusable UI component library adopted across the product',
      'Improved UX quality with clean design and interactions; strengthened testing with unit and e2e coverage',
      'Delivered mobile app features with Ionic and ensured robust code quality',
    ],
    technologies: [
      'Angular',
      'Material UI',
      'NestJS',
      'MongoDB',
      'Ionic',
      'Cypress',
      'Jest',
      'Jasmine',
    ],
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'EXTEDO GmbH',
    location: 'Ottobrunn, Germany',
    startDate: 'June 2020',
    endDate: 'March 2022',
    description: [
      'Improved and scaled an enterprise Angular application with reusable components',
      'Applied clean architecture patterns to keep the codebase maintainable',
      'Delivered high-quality features supported by extensive unit testing and functional docs',
    ],
    technologies: ['Angular', 'TypeScript', 'Jasmine'],
  },
  {
    id: '4',
    title: 'Frontend Engineer',
    company: 'DevStudio',
    location: 'Lahore, Pakistan',
    startDate: 'July 2018',
    endDate: 'May 2020',
    description: [
      'Led frontend for NextFlight (B2B SaaS) across Sender and Enterprise portals; supported Traveller and Admin portals',
      'Built Stripe, PayPal, Zendesk, Firebase, and Maps integrations with robust UI flows',
      'Owned SSS school management app frontend for iOS/Android using Angular + Ionic',
      'Implemented analytics and dashboards with HighCharts to improve visibility',
    ],
    technologies: [
      'Angular',
      'Bootstrap',
      'SCSS',
      'Material',
      'Firebase',
      'Google Maps',
      'Stripe',
      'Zendesk',
      'PayPal',
      'HighCharts',
      'Ionic',
    ],
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelors in Computer Science',
    school: 'Lahore University of Management Sciences (LUMS)',
    location: 'Lahore, Pakistan',
    startDate: '2014',
    endDate: '2018',
    description: 'Studied computer science fundamentals and software engineering at LUMS.',
  },
];

export const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Legacy blog data - blogs are now stored in the database
// This export is kept for backward compatibility but should not be used
export const blogs: Blog[] = [];
