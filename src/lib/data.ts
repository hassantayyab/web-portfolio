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
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    longDescription:
      'Built a full-featured e-commerce platform from scratch, featuring real-time inventory management, Stripe payment integration, and a comprehensive admin dashboard. The platform handles thousands of daily transactions with 99.9% uptime.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2024',
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description:
      'An AI-powered content generation tool using GPT-4 for creating marketing copy and blog posts.',
    longDescription:
      'Developed an AI-powered content generation platform that leverages GPT-4 to help marketers and content creators generate high-quality copy. Features include tone customization, SEO optimization, and template management.',
    image: '/projects/ai-content.jpg',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2024',
  },
  {
    id: '3',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    longDescription:
      'Created a real-time collaborative task management application with features like drag-and-drop boards, team collaboration, file attachments, and activity tracking. Built with performance and scalability in mind.',
    image: '/projects/task-app.jpg',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2023',
  },
  {
    id: '4',
    title: 'Finance Dashboard',
    description: 'A comprehensive finance dashboard with data visualization and expense tracking.',
    image: '/projects/finance.jpg',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    year: '2023',
  },
  {
    id: '5',
    title: 'Social Media Analytics',
    description:
      'Analytics platform for tracking social media performance across multiple platforms.',
    image: '/projects/analytics.jpg',
    technologies: ['Next.js', 'Python', 'FastAPI', 'Redis', 'Chart.js'],
    liveUrl: 'https://example.com',
    year: '2023',
  },
  {
    id: '6',
    title: 'Real Estate Platform',
    description: 'Property listing and search platform with virtual tours and mortgage calculator.',
    image: '/projects/realestate.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'Three.js'],
    githubUrl: 'https://github.com',
    year: '2022',
  },
  {
    id: '7',
    title: 'Health & Fitness App',
    description: 'Mobile-first fitness tracking app with workout plans and progress visualization.',
    image: '/projects/fitness.jpg',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'HealthKit'],
    liveUrl: 'https://example.com',
    year: '2022',
  },
  {
    id: '8',
    title: 'Developer Portfolio',
    description: "This portfolio website you're currently viewing, built with modern technologies.",
    image: '/projects/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com',
    year: '2024',
  },
  {
    id: '9',
    title: 'Learning Management System',
    description:
      'Full-featured LMS platform with course creation, video streaming, and progress tracking.',
    longDescription:
      'Built a comprehensive learning management system that enables instructors to create and sell courses, students to learn at their own pace, and administrators to manage the entire platform. Features include video streaming, quizzes, assignments, and certificates.',
    image: '/projects/lms.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS S3', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2024',
  },
  {
    id: '10',
    title: 'AI Image Editor',
    description:
      'Advanced image editing tool powered by AI for automatic enhancements and object removal.',
    longDescription:
      'Developed an AI-powered image editing platform that uses machine learning models to automatically enhance images, remove backgrounds, and perform intelligent object detection and removal. Built with performance and scalability in mind.',
    image: '/projects/image-editor.jpg',
    technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'Redis', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: '2024',
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    companyUrl: 'https://example.com',
    location: 'San Francisco, CA',
    startDate: '2022',
    endDate: 'Present',
    description: [
      'Lead development of customer-facing applications serving 500K+ users',
      'Architected and implemented microservices infrastructure reducing latency by 40%',
      'Mentored junior developers and established coding standards',
      'Collaborated with design team to improve UX, increasing user engagement by 25%',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    companyUrl: 'https://example.com',
    location: 'Remote',
    startDate: '2020',
    endDate: '2022',
    description: [
      'Built and maintained multiple React applications from scratch',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Integrated third-party APIs including payment processing and analytics',
      'Contributed to product decisions and feature prioritization',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'GCP'],
  },
  {
    id: '3',
    title: 'Junior Web Developer',
    company: 'Digital Agency',
    location: 'Los Angeles, CA',
    startDate: '2019',
    endDate: '2020',
    description: [
      'Developed responsive websites for clients across various industries',
      'Collaborated with designers to implement pixel-perfect UIs',
      'Maintained and updated existing client websites',
      'Learned modern web development practices and frameworks',
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP'],
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    startDate: '2015',
    endDate: '2019',
    description: 'Focused on software engineering and web technologies. Graduated with honors.',
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
