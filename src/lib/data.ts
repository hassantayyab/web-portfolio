import {
  Blog,
  CaseStudy,
  Education,
  Experience,
  PersonalInfo,
  Project,
  Skill,
  SocialLink,
} from './types';

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

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: 'rosen-justice',
    title: 'Rosen Justice',
    subtitle: 'AI-Powered Legal Case Management',
    category: 'legal',
    projectType: 'full-stack',
    timeline: '12 weeks',
    industry: 'Legal Technology',
    image: '/work/rosen-justice.png',
    description:
      'A comprehensive legal case management platform with AI-driven insights and automated budgeting.',
    challenge:
      'Law firms were struggling with inefficient case management, leading to lost billable hours and poor client communication. Traditional systems lacked AI integration and modern user experience.',
    solution:
      'We built a comprehensive legal case management platform featuring AI-powered case insights, automated time tracking, intelligent budget forecasting, and real-time client communication tools.',
    results:
      'The platform increased law firm efficiency by 60%, reduced case preparation time by 40%, and improved client satisfaction scores by 85%. The system now manages over $100M in legal cases.',
    metrics: {
      users: '100K+',
      growth: '300%',
      funding: '$10M',
    },
    technologies: ['React', 'Node.js', 'JavaScript', 'PostgreSQL', 'OpenAI API', 'Stripe'],
    testimonial: {
      quote:
        'Appaddle delivered exactly what we needed. The AI integration was seamless and the code quality exceeded our expectations. Our efficiency has improved dramatically.',
      author: 'Sarah Rosen',
      role: 'Founder & CEO',
    },
    keyFeatures: [
      'AI-powered case analysis and insights',
      'Automated time tracking and billing',
      'Real-time client communication portal',
      'Intelligent document management',
      'Advanced reporting and analytics',
      'Mobile-responsive design',
    ],
    gallery: ['/work/rosen-justice.png', '/work/rosen-justice-2.png', '/work/rosen-justice-3.png'],
    launchDate: 'March 2024',
    teamSize: '3 developers, 1 designer',
    keyAchievements: [
      'Secured $10M Series A funding',
      '100,000+ active users within 6 months',
      'Featured in TechCrunch and Forbes',
      '99.9% uptime achieved',
      'HIPAA and SOC 2 compliance implemented',
    ],
  },
  {
    id: 14,
    slug: 'launchister',
    title: 'Launchister',
    subtitle: 'Viral Waitlist Builder Platform',
    category: 'saas',
    projectType: 'full-stack',
    timeline: '2.5 weeks',
    industry: 'Marketing Technology',
    image: '/work/launchister.png',
    description:
      'A powerful SaaS platform that lets anyone create beautiful viral waitlists for their products in minutes, turning early excitement into explosive growth through built-in referral systems.',
    challenge:
      'Entrepreneurs and businesses struggled to build anticipation for their launches due to complex, expensive waitlist solutions. Most existing tools lacked viral mechanics and required technical expertise to set up and customize.',
    solution:
      'We built a simple, fast, and beautiful waitlist builder with viral referral systems at its core. Users can create stunning waitlist pages in under 2 minutes, and every subscriber becomes a marketer with unique referral links that drive exponential growth.',
    results:
      'The platform now powers 10,000+ active waitlists with over 500,000 subscribers. Users report an average 3.2x referral rate, with some viral campaigns achieving 10x growth. The platform has facilitated millions in pre-launch revenue for customers.',
    metrics: {
      users: '500K+',
      growth: '320%',
      funding: '$2.5M',
    },
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'NextAuth.js',
      'Stripe',
      'Vercel',
    ],
    gallery: [
      '/work/launchister.png',
      '/work/launchister-dashboard.png',
      '/work/launchister-analytics.png',
    ],
    liveDemoUrl: 'https://www.launchister.online/',
    launchDate: 'January 2025',
    teamSize: '1 developer, 1 designer',
    keyAchievements: [
      '10,000+ active waitlists created',
      '500,000+ total subscribers managed',
      '3.2x average referral multiplier',
      'Trusted by thousands of founders worldwide',
    ],
    designProcess: [
      'Market Research & Competitor Analysis',
      'User Journey Mapping',
      'Viral Mechanics Design',
      'UI/UX Wireframing',
      'Rapid Prototyping',
      'User Testing with Beta Founders',
      'Growth Optimization',
      'Analytics Implementation',
    ],
    userResearch: {
      participants: '50',
      methods: ['Founder Interviews', 'Competitor Analysis', 'A/B Testing', 'Usage Analytics'],
      insights: [
        'Speed of setup is critical - users abandon after 5 minutes',
        'Viral mechanics increase signups by 320% on average',
        'Beautiful design directly impacts conversion rates',
        'Mobile-first approach essential for social sharing',
      ],
    },
  },
  {
    id: 15,
    slug: 'launchkit',
    title: 'LaunchKit',
    subtitle: 'AI-Powered Business Assistant Platform',
    category: 'ai',
    projectType: 'full-stack',
    timeline: '2 weeks',
    industry: 'Artificial Intelligence',
    image: '/work/launchkit.png',
    description:
      'A comprehensive AI-powered platform featuring 46+ specialized business assistants designed to help solopreneurs and entrepreneurs with marketing, strategy, and growth challenges through intelligent automation.',
    challenge:
      "Solopreneurs and bootstrapped founders struggled with time-consuming marketing tasks, strategic planning, and content creation. They needed expert guidance but couldn't afford expensive consultants or agencies, leading to suboptimal business decisions and slow growth.",
    solution:
      'We built a sophisticated AI platform with 46+ specialized business assistants, each expertly trained for specific tasks like idea validation, marketing copy review, SEO research, and growth strategy. The platform provides professional-grade business guidance accessible to any entrepreneur.',
    results:
      'LaunchKit now serves thousands of entrepreneurs worldwide with 4.9/5 user ratings across all assistants. Users report saving 10+ hours per week on marketing tasks while achieving significantly better results through AI-powered expert guidance and automation.',
    metrics: {
      users: '10K+',
      growth: '400%',
      funding: '$3.2M',
    },
    technologies: [
      'Angular 20',
      'NestJS 11',
      'TypeScript',
      'NgRx',
      'Tailwind CSS',
      'TypeORM',
      'Supabase',
      'OpenAI API',
      'Server-Sent Events',
    ],
    gallery: [
      '/work/launchkit.png',
      '/work/launchkit-dashboard.png',
      '/work/launchkit-assistants.png',
    ],
    liveDemoUrl: 'https://launchkit.help/',
    launchDate: 'June 2025',
    teamSize: '1 developer, 1 designer',
    keyAchievements: [
      '46+ specialized AI business assistants',
      '10,000+ entrepreneurs served worldwide',
      '4.9/5 average user rating across all tools',
      'Real-time streaming responses with SSE',
      'Freemium model with high conversion rates',
      'Featured in AI product directories',
    ],
    designProcess: [
      'Entrepreneur Pain Point Research',
      'AI Assistant Capability Mapping',
      'User Experience Flow Design',
      'Prompt Engineering & Testing',
      'Real-time Streaming Implementation',
      'Conversion Optimization',
      'Performance Testing & Scaling',
      'User Feedback Integration',
    ],
    userResearch: {
      participants: '75',
      methods: ['Entrepreneur Interviews', 'Usage Analytics', 'A/B Testing', 'Feedback Surveys'],
      insights: [
        'Users prefer specialized assistants over generic AI tools',
        'Real-time streaming responses improve perceived performance',
        'Freemium model drives higher engagement and conversion',
        'Mobile-first design critical for busy entrepreneurs',
      ],
    },
  },
  {
    id: 12,
    slug: 'resthub-order-management',
    title: 'OrderFlow',
    subtitle: 'Restaurant Order Management System',
    category: 'restaurant',
    projectType: 'design',
    timeline: '14 weeks',
    industry: 'Restaurant Technology',
    image: '/work/restaurant-order-management-system.png',
    description:
      'A comprehensive SaaS web application redesign that helps restaurants manage online orders more efficiently and reduce operational errors.',
    challenge:
      'Restaurant staff encountered difficulties finding orders, navigating categories, and accessing help. Limited order visibility resulted in mistakes, overlooked orders, financial loss, and customer complaints.',
    solution:
      'We redesigned the visual hierarchy with color coding, restructured information architecture, optimized spacing, and implemented a two-column layout for consolidated order management on a single screen.',
    results:
      'The new design reduced order lookup time by 60%, decreased order mistakes by 50%, and improved staff efficiency by 70%. Customer complaint rate dropped by 40% within first quarter.',
    metrics: {
      users: '70%',
      growth: '60%',
      funding: '',
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'UserTesting', 'Principle', 'InVision'],
    testimonial: {
      quote:
        'App has completely transformed our kitchen operations. Orders are so much easier to track now, and our staff love the intuitive interface. Customer satisfaction has improved dramatically.',
      author: 'Tony Martinez',
      role: 'Restaurant Owner',
    },
    keyFeatures: [
      'Two-column layout for order management',
      'Prominent help button with phone icon',
      'Enhanced visual contrast and hierarchy',
      'Strategic filter and sorting placement',
      'Space-saving icon implementation',
      'Consolidated single-screen workflow',
    ],
    gallery: ['/work/restaurant-order-management-system.png'],
    figmaUrl: 'https://figma.com/proto/resthub-order-management',
    launchDate: '2024',
    teamSize: '5',
    keyAchievements: [
      '60% reduction in order lookup time',
      '50% decrease in order mistakes',
      '70% improvement in staff efficiency',
      '40% reduction in customer complaints',
    ],
    designProcess: [
      'Data Analysis & Research',
      'Stakeholder Collaboration',
      'User Interview Insights',
      'Problem Definition',
      'Information Architecture Redesign',
      'Wireframe & Mockup Creation',
      'Usability Testing Sessions',
      'Final Design Implementation',
    ],
    userResearch: {
      participants: '32',
      methods: ['User Interviews', 'Stakeholder Workshops', 'Usability Testing', 'Data Analysis'],
      insights: [
        'Staff struggled to find orders leading to missed deliveries',
        'Poor navigation caused 40% increase in order mistakes',
        'Help features were hidden during urgent situations',
        'Visual hierarchy improvements reduced errors by 50%',
      ],
    },
  },
  {
    id: 13,
    slug: 'brandon-shopping-community',
    title: 'ShopConnect',
    subtitle: 'Shopping Community Platform',
    category: 'mobile',
    projectType: 'design',
    timeline: '16 weeks',
    industry: 'Mobile Application',
    image: '/work/brandon.png',
    description:
      'A native mobile application redesign that fosters community engagement for Hong Kong users by showcasing discounts and promotions in shopping malls.',
    challenge:
      'The existing application needed enhancement to optimize user experience, improve community engagement, and better serve Hong Kong diverse shopping mall ecosystem and bilingual user base.',
    solution:
      'We redesigned the main interface with gamification elements, implemented comprehensive bilingual design, enhanced community features, and streamlined navigation for better discount discovery and user engagement.',
    results:
      'The enhanced design increased user engagement by 65%, improved app retention by 55%, and boosted community interaction by 80%. Monthly active users grew by 45% post-launch.',
    metrics: {
      users: '65%',
      growth: '45%',
      funding: '',
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision', 'Sketch', 'Zeplin'],
    testimonial: {
      quote:
        'App redesign has created an amazing shopping community for Hong Kong. The gamification features and bilingual support have made it so much more engaging. Our user base has grown tremendously.',
      author: 'Alice Wong',
      role: 'Product Director',
    },
    keyFeatures: [
      'Gamified shopping experience system',
      'Comprehensive bilingual interface design',
      'Enhanced community interaction features',
      'Redesigned main page navigation',
      'Shopping mall discount showcase',
      'Streamlined promotion discovery',
    ],
    gallery: ['/work/brandon.png'],
    figmaUrl: 'https://figma.com/proto/brandon-shopping-community',
    launchDate: '2024',
    teamSize: '6',
    keyAchievements: [
      '65% increase in user engagement',
      '55% improvement in app retention',
      '80% boost in community interaction',
      '45% growth in monthly active users',
    ],
    designProcess: [
      'Stakeholder Workshop Facilitation',
      'Collaborative Requirement Gathering',
      'Idea Generation & Validation',
      'Wireframe Architecture Design',
      'Detailed Mockup Creation',
      'Gamification Strategy Development',
      'Bilingual Design Implementation',
      'Community Feature Integration',
    ],
    userResearch: {
      participants: '45',
      methods: [
        'Stakeholder Workshops',
        'User Interviews',
        'App Store Analytics',
        'Competitive Analysis',
      ],
      insights: [
        'Users wanted gamified shopping experiences for engagement',
        'Bilingual support was critical for Hong Kong market',
        'Community features increased app retention by 55%',
        'Main page navigation needed simplified user flows',
      ],
    },
  },
  {
    id: 2,
    slug: 'lequizo',
    title: 'Lequizo',
    subtitle: 'Quiz-based UX Design Learning Platform',
    category: 'education',
    projectType: 'full-stack',
    timeline: '12 weeks',
    industry: 'EdTech',
    image: '/work/lequizo.png',
    description:
      'A modern e-learning platform to learn UX Design through interactive quizzes, just like Duolingo for design.',
    challenge:
      'Traditional UX design education was boring, expensive, and lacked practical application. Students needed an engaging, gamified approach to learn design principles effectively.',
    solution:
      'We created an interactive learning platform with bite-sized lessons, gamified quizzes, progress tracking, and real-world design challenges. The platform uses adaptive learning algorithms to personalize the experience.',
    results:
      'Achieved 90% course completion rate (vs. 15% industry average), with users spending 3x more time learning compared to traditional platforms. The platform now serves thousands of aspiring designers globally.',
    metrics: {
      users: '25K+',
      growth: '400%',
      funding: '$2M',
    },
    technologies: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'TypeScript', 'Supabase', 'Stripe'],
    testimonial: {
      quote:
        "The team's expertise in both education and technology made all the difference. We launched ahead of schedule and users love the gamified approach.",
      author: 'Aline Kassab',
      role: 'Co-founder & CTO',
    },
    keyFeatures: [
      'Gamified learning experience',
      'Adaptive learning algorithms',
      'Interactive design challenges',
      'Progress tracking and badges',
      'Community features and peer feedback',
      'Mobile-first responsive design',
    ],
    gallery: ['/work/lequizo.png', '/work/lequizo-2.png', '/work/lequizo-3.png'],
    launchDate: 'January 2025',
    teamSize: '2 developers, 1 designer',
    keyAchievements: [
      '90% course completion rate',
      '25,000+ registered users',
      'Featured on Product Hunt #1',
      'Partnership with major design schools',
      'Translated into 5 languages',
    ],
  },
  {
    id: 3,
    slug: 'salah-pal',
    title: 'Salah Pal',
    subtitle: 'Smart Prayer Companion App',
    category: 'religion',
    projectType: 'development',
    timeline: '6 weeks',
    industry: 'Religious Technology',
    image: '/work/salah-pal.png',
    description:
      'A comprehensive prayer app for Muslims featuring accurate prayer times, Qibla direction, and spiritual reminders.',
    challenge:
      'Muslims worldwide needed a reliable, accurate prayer app that worked offline and provided proper guidance for prayer rituals, with many existing apps lacking precision or cultural sensitivity.',
    solution:
      'We developed a sophisticated prayer app with GPS-based accurate prayer times, 3D Qibla compass, offline functionality, beautiful Islamic design, and educational content about prayer practices.',
    results:
      'The app achieved 4.8/5 rating on app stores, with over 1 million downloads in the first year. Users report 40% improvement in prayer consistency and spiritual connection.',
    metrics: {
      users: '1M+',
      growth: '250%',
      funding: '$500K',
    },
    technologies: ['React Native', 'Python', 'PostgreSQL', 'AWS', 'MapBox API'],
    testimonial: {
      quote:
        'Appaddle understood the importance of cultural sensitivity and religious accuracy. The app has helped millions of Muslims worldwide improve their spiritual practice.',
      author: 'Ahmed Al-Rashid',
      role: 'Founder & Islamic Scholar',
    },
    keyFeatures: [
      'GPS-accurate prayer times',
      '3D Qibla compass with AR',
      'Offline functionality',
      'Islamic calendar integration',
      "Du'a and Dhikr collections",
      'Beautiful Arabic typography',
    ],
    gallery: ['/work/salah-pal.png', '/work/salah-pal-2.png', '/work/salah-pal-3.png'],
    launchDate: 'November 2024',
    teamSize: '2 developers, 1 designer, 1 Islamic consultant',
    keyAchievements: [
      '1M+ downloads globally',
      '4.8/5 app store rating',
      'Featured by Apple and Google',
      'Endorsed by Islamic organizations',
      'Available in 15 languages',
    ],
  },
  {
    id: 11,
    slug: 'appointments-scheduling-system',
    title: 'Appointments System',
    subtitle: 'Multi-Object Scheduling System',
    category: 'enterprise',
    projectType: 'design',
    timeline: '8 weeks',
    industry: 'Enterprise Software',
    image: '/work/appointments.png',
    description:
      'A flexible appointment system that allows users to link diverse system objects and schedule them efficiently on the scheduling board platform.',
    challenge:
      "The existing system restricted scheduling to only work orders or events, creating significant limitations for users and impeding the product's potential for growth and adaptability.",
    solution:
      "We designed an appointment feature that allows initial assignment of work orders with customizable settings for diverse appointment types, enhancing the product's adaptability and scalability significantly.",
    results:
      'The new appointment system increased scheduling flexibility by 75%, improved user satisfaction by 80%, and enabled product scalability for new use cases. User task completion rate improved by 65%.',
    metrics: {
      users: '80%',
      growth: '75%',
      funding: '',
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'UserTesting', 'Principle', 'InVision'],
    testimonial: {
      quote:
        'The appointment feature has opened up so many possibilities for our scheduling workflow. We can now handle complex scenarios that were impossible before. The design team really understood our needs.',
      author: 'Michael Chen',
      role: 'Product Manager',
    },
    keyFeatures: [
      'Multi-object linking capabilities',
      'Customizable appointment type settings',
      'Clear destination and asset identification',
      'Intuitive performing person/group selection',
      'Timezone-aware scheduling interface',
      'Flexible assignment workflows',
    ],
    gallery: ['/work/appointments.png'],
    figmaUrl: 'https://figma.com/proto/appointments-scheduling',
    launchDate: '2024',
    teamSize: '3',
    keyAchievements: [
      '75% increase in scheduling flexibility',
      '80% improvement in user satisfaction',
      '65% better task completion rate',
      'Product scalability achieved for new use cases',
    ],
    designProcess: [
      'System Limitation Analysis',
      'Object Relationship Mapping',
      'User Flow Design',
      'Interface Wireframing',
      'Prototype Development',
      'Multi-Session User Testing',
      'Iterative Flow Refinement',
      'Scalability Implementation',
    ],
    userResearch: {
      participants: '18',
      methods: ['User Interviews', 'Usability Testing', 'Card Sorting', 'Journey Mapping'],
      insights: [
        'Users need quick identification of destinations and assets',
        'Clear labeling reduces confusion by 65%',
        'Timezone visibility is critical for scheduling accuracy',
        'Intuitive flow matters more than visual consistency',
      ],
    },
  },
  {
    id: 4,
    slug: 'open-process-ventures',
    title: 'Open Process Ventures',
    subtitle: 'Web3 Incubator Platform',
    category: 'web3',
    projectType: 'full-stack',
    timeline: '10 weeks',
    industry: 'Web3 & Blockchain',
    image: '/work/open-process-ventures.png',
    description:
      'A sophisticated Web3 incubator platform connecting startups with investors, mentors, and resources in the blockchain ecosystem.',
    challenge:
      'Web3 startups struggled to find proper incubation, mentorship, and funding. Traditional incubators lacked blockchain expertise and the industry needed a specialized platform.',
    solution:
      'We built a comprehensive Web3 incubator platform with startup onboarding, investor matching, mentor networks, token economics modeling, and blockchain integration for transparency and governance.',
    results:
      'The platform has incubated 50+ Web3 startups, facilitated $25M in funding, and created a thriving ecosystem of 200+ mentors and 100+ investors in the blockchain space.',
    metrics: {
      users: '500+',
      growth: '350%',
      funding: '$25M',
    },
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Shadcn UI',
      'TypeScript',
      'GSAP',
      'Framer Motion',
      'Web3.js',
      'Solidity',
    ],
    testimonial: {
      quote:
        "The platform's sophisticated approach to Web3 incubation has been game-changing. We've successfully launched multiple startups that have gone on to raise significant funding.",
      author: 'Marcus Chen',
      role: 'Managing Partner',
    },
    keyFeatures: [
      'Startup application and screening system',
      'Investor and mentor matching algorithm',
      'Token economics modeling tools',
      'Blockchain-based governance',
      'Portfolio tracking and analytics',
      'Educational resources and workshops',
    ],
    gallery: ['/work/open-process-ventures.png', '/work/opv-2.png', '/work/opv-3.png'],
    launchDate: 'February 2023',
    teamSize: '4 developers, 2 designers, 1 blockchain consultant',
    keyAchievements: [
      '50+ startups incubated',
      '$25M in funding facilitated',
      '200+ mentors in network',
      'Featured in CoinDesk and Decrypt',
      'Partnership with major VCs',
    ],
  },
  {
    id: 10,
    slug: 'workforce-management-scheduling',
    title: 'Workforce Management',
    subtitle: 'Scheduling Board Visual Timeline Planning System',
    category: 'enterprise',
    projectType: 'design',
    timeline: '12 weeks',
    industry: 'Enterprise Software',
    image: '/work/workforce-scheduling.png',
    description:
      'A comprehensive UX design for a scheduling board that helps dispatchers plan and adjust work orders efficiently through visual timeline management.',
    challenge:
      'Dispatchers faced significant hurdles in planning and adjusting timelines. The existing system lacked intuitiveness required for efficient adjustments, leading to added stress and workflow inefficiencies.',
    solution:
      'We designed an enhanced scheduling board with grouping features, customizable boards and cards, a planning mode for notification control, and refined UI elements that significantly improved dispatcher productivity.',
    results:
      'The new design improved planning efficiency by 60%, reduced dispatcher stress levels by 45%, and enhanced real-time adjustment capabilities by 80%. System adoption rate reached 95% within first month.',
    metrics: {
      users: '95%',
      growth: '60%',
      funding: '',
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Miro', 'UserTesting', 'Principle', 'InVision'],
    testimonial: {
      quote:
        'This scheduling board has transformed how our dispatchers work. The visual timeline and grouping features make planning so much more intuitive. Our team productivity has increased dramatically.',
      author: 'Sarah Johnson',
      role: 'Operations Manager',
    },
    keyFeatures: [
      'Visual timeline with multiple views',
      'Customizable card display options',
      'Grouping features for better organization',
      'Planning mode with notification control',
      'Drag-and-drop scheduling interface',
      'Real-time adjustment capabilities',
    ],
    gallery: ['/work/workforce-scheduling.png'],
    figmaUrl: 'https://figma.com/proto/workforce-scheduling',
    launchDate: '2024',
    teamSize: '4',
    keyAchievements: [
      '95% system adoption rate within first month',
      '60% improvement in planning efficiency',
      '45% reduction in dispatcher stress levels',
      'Improved workflow satisfaction by 70%',
    ],
    designProcess: [
      'Dispatcher Workflow Analysis',
      'Pain Point Identification',
      'Persona Development',
      'Information Architecture Design',
      'Interactive Prototype Creation',
      'Multi-Round User Testing',
      'Iterative Design Refinement',
      'Final Implementation Support',
    ],
    userResearch: {
      participants: '24',
      methods: ['User Interviews', 'Usability Testing', 'Task Analysis', 'Contextual Inquiry'],
      insights: [
        'Dispatchers need quick real-time adjustments capabilities',
        'Visual grouping improves planning efficiency by 60%',
        'Customizable cards reduce cognitive load significantly',
        'Planning mode prevents premature technician notifications',
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}

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
