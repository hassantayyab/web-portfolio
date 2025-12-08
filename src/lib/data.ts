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
  // { name: 'Nest.js', icon: 'nestjs', category: 'backend' },
  // { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },

  // Backend
  // { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  // { name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
  // { name: 'MongoDB', icon: 'mongodb', category: 'backend' },
  // { name: 'GraphQL', icon: 'graphql', category: 'backend' },
  // { name: 'Prisma', icon: 'prisma', category: 'backend' },

  // Tools
  //   { name: 'Git', icon: 'git', category: 'tools' },
  //   { name: 'Docker', icon: 'docker', category: 'tools' },
  { name: 'Figma', icon: 'figma', category: 'tools' },
  //   { name: 'VS Code', icon: 'vscode', category: 'tools' },
  //   { name: 'Vercel', icon: 'vercel', category: 'tools' },
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
      'Led frontend for NectFlight (B2B SaaS) across Sender and Enterprise portals; supported Traveller and Admin portals',
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

export const blogs: Blog[] = [
  {
    id: '1',
    title: 'Building Modern Web Apps with Next.js 14',
    description:
      "Exploring the new features and improvements in Next.js 14, including Server Actions and improved routing. In this comprehensive guide, we'll dive deep into the App Router architecture, understanding how it revolutionizes the way we build React applications. We'll explore Server Components and their benefits for performance, covering practical examples of how to leverage them in real-world projects. Additionally, we'll examine the new data fetching patterns, caching strategies, and how Server Actions simplify form handling and mutations. By the end of this article, you'll have a solid understanding of Next.js 14's capabilities and be ready to build faster, more efficient web applications.",
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript'],
    publishedAt: '2024-03-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'The Art of Component Design',
    description:
      "Best practices for creating reusable and maintainable React components that scale. Component design is both an art and a science, requiring careful consideration of props, state management, and composition patterns. In this article, we'll explore the principles of atomic design, learning how to break down complex UIs into smaller, composable pieces. We'll discuss when to use compound components, how to design flexible APIs that adapt to different use cases, and strategies for handling complex state logic. We'll also cover accessibility considerations, ensuring our components work for all users. Through practical examples and real-world scenarios, you'll learn to build components that are not just functional, but truly delightful to use.",
    category: 'Design Systems',
    tags: ['React', 'Component Design', 'Best Practices'],
    publishedAt: '2024-03-10',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: '3',
    title: 'Optimizing Performance in React Applications',
    description:
      "A deep dive into React performance optimization techniques and when to use them. Performance optimization in React requires a holistic understanding of the component lifecycle, rendering mechanisms, and the JavaScript runtime. We'll start by examining React's reconciliation algorithm and understanding how virtual DOM diffing works under the hood. Then we'll explore various optimization strategies including memoization with useMemo and useCallback, code splitting with React.lazy, and implementing proper key props. We'll discuss the profiler tool and how to identify performance bottlenecks in your applications. We'll also cover advanced techniques like virtualization for long lists, optimizing bundle sizes, and leveraging web workers for heavy computations. This guide will equip you with the knowledge to build lightning-fast React applications that provide exceptional user experiences.",
    category: 'Performance',
    tags: ['React', 'Performance', 'Optimization'],
    publishedAt: '2024-03-05',
    readTime: '10 min read',
    featured: true,
  },
  {
    id: '4',
    title: 'TypeScript Tips and Tricks',
    description:
      "Advanced TypeScript patterns that will make your code more type-safe and maintainable. TypeScript offers powerful features that go beyond basic type annotations, and mastering them can dramatically improve your code quality. In this article, we'll explore advanced patterns like conditional types, mapped types, and template literal types that enable incredible type-level programming. We'll dive into utility types and how to create your own custom utility types for common patterns. We'll also cover branded types for creating distinct types with the same underlying structure, and how to use assertion functions and type guards effectively. Additionally, we'll discuss generics at a deeper level, understanding variance and how to design flexible generic APIs. These techniques will help you catch bugs at compile time and create more robust applications.",
    category: 'TypeScript',
    tags: ['TypeScript', 'Best Practices'],
    publishedAt: '2024-02-28',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: '5',
    title: 'Tailwind CSS: Utility-First Styling',
    description:
      "Why utility-first CSS frameworks like Tailwind are changing how we build UIs. The utility-first approach represents a paradigm shift in how we think about styling web applications. Instead of writing custom CSS for every component, utility classes provide a comprehensive set of building blocks that can be composed together. This article explores the philosophy behind utility-first CSS, examining how it compares to traditional CSS methodologies like BEM or CSS Modules. We'll discuss the benefits including faster development, consistency across projects, and easier maintenance. We'll also cover advanced Tailwind features like custom plugins, arbitrary values, and how to integrate it with component libraries. Additionally, we'll address common concerns like bundle size and how Tailwind's JIT mode solves these issues. Whether you're new to utility-first CSS or looking to deepen your understanding, this guide will help you leverage Tailwind's full potential.",
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Styling'],
    publishedAt: '2024-02-20',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '6',
    title: 'State Management in 2024',
    description:
      "Comparing modern state management solutions and choosing the right one for your project. The landscape of state management has evolved significantly, with new libraries and patterns emerging to solve the complexities of modern React applications. In this comprehensive comparison, we'll examine popular solutions including Redux Toolkit, Zustand, Jotai, and Recoil, understanding their strengths and when to use each. We'll discuss server state management with libraries like React Query and SWR, which have become essential for handling API data. We'll also explore React's built-in state solutions and Context API, understanding their limitations and when they're sufficient. Through practical examples and performance comparisons, we'll help you make informed decisions about state management architecture. We'll cover patterns like state machines, optimistic updates, and offline-first strategies that are becoming increasingly important in modern web applications.",
    category: 'State Management',
    tags: ['React', 'State Management', 'Zustand'],
    publishedAt: '2024-02-15',
    readTime: '9 min read',
    featured: true,
  },
];
