import { Project, Skill, SocialLink, Experience, Education, PersonalInfo } from "./types";

export const personalInfo: PersonalInfo = {
  name: "John Doe",
  title: "Full Stack Developer",
  email: "hello@johndoe.dev",
  location: "San Francisco, CA",
  timezone: "PST (UTC-8)",
  bio: "I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Next.js, and Node.js, with a keen eye for design and user experience. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.",
  shortBio: "Building beautiful, performant web experiences with modern technologies.",
  availability: "available",
  availabilityText: "Open to new opportunities",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpg",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: "twitter",
  },
  {
    name: "Email",
    url: "mailto:hello@johndoe.dev",
    icon: "mail",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "react", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend" },
  { name: "Framer Motion", icon: "framer", category: "frontend" },
  
  // Backend
  { name: "Node.js", icon: "nodejs", category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "backend" },
  { name: "GraphQL", icon: "graphql", category: "backend" },
  { name: "Prisma", icon: "prisma", category: "backend" },
  
  // Tools
  { name: "Git", icon: "git", category: "tools" },
  { name: "Docker", icon: "docker", category: "tools" },
  { name: "Figma", icon: "figma", category: "tools" },
  { name: "VS Code", icon: "vscode", category: "tools" },
  { name: "Vercel", icon: "vercel", category: "tools" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
    longDescription: "Built a full-featured e-commerce platform from scratch, featuring real-time inventory management, Stripe payment integration, and a comprehensive admin dashboard. The platform handles thousands of daily transactions with 99.9% uptime.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: "2024",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered content generation tool using GPT-4 for creating marketing copy and blog posts.",
    longDescription: "Developed an AI-powered content generation platform that leverages GPT-4 to help marketers and content creators generate high-quality copy. Features include tone customization, SEO optimization, and template management.",
    image: "/projects/ai-content.jpg",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: "2024",
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    longDescription: "Created a real-time collaborative task management application with features like drag-and-drop boards, team collaboration, file attachments, and activity tracking. Built with performance and scalability in mind.",
    image: "/projects/task-app.jpg",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: "2023",
  },
  {
    id: "4",
    title: "Finance Dashboard",
    description: "A comprehensive finance dashboard with data visualization and expense tracking.",
    image: "/projects/finance.jpg",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    year: "2023",
  },
  {
    id: "5",
    title: "Social Media Analytics",
    description: "Analytics platform for tracking social media performance across multiple platforms.",
    image: "/projects/analytics.jpg",
    technologies: ["Next.js", "Python", "FastAPI", "Redis", "Chart.js"],
    liveUrl: "https://example.com",
    year: "2023",
  },
  {
    id: "6",
    title: "Real Estate Platform",
    description: "Property listing and search platform with virtual tours and mortgage calculator.",
    image: "/projects/realestate.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Mapbox", "Three.js"],
    githubUrl: "https://github.com",
    year: "2022",
  },
  {
    id: "7",
    title: "Health & Fitness App",
    description: "Mobile-first fitness tracking app with workout plans and progress visualization.",
    image: "/projects/fitness.jpg",
    technologies: ["React Native", "TypeScript", "Firebase", "HealthKit"],
    liveUrl: "https://example.com",
    year: "2022",
  },
  {
    id: "8",
    title: "Developer Portfolio",
    description: "This portfolio website you're currently viewing, built with modern technologies.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
    year: "2024",
  },
  {
    id: "9",
    title: "Learning Management System",
    description: "Full-featured LMS platform with course creation, video streaming, and progress tracking.",
    longDescription: "Built a comprehensive learning management system that enables instructors to create and sell courses, students to learn at their own pace, and administrators to manage the entire platform. Features include video streaming, quizzes, assignments, and certificates.",
    image: "/projects/lms.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: "2024",
  },
  {
    id: "10",
    title: "AI Image Editor",
    description: "Advanced image editing tool powered by AI for automatic enhancements and object removal.",
    longDescription: "Developed an AI-powered image editing platform that uses machine learning models to automatically enhance images, remove backgrounds, and perform intelligent object detection and removal. Built with performance and scalability in mind.",
    image: "/projects/image-editor.jpg",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: "2024",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    companyUrl: "https://example.com",
    location: "San Francisco, CA",
    startDate: "2022",
    endDate: "Present",
    description: [
      "Lead development of customer-facing applications serving 500K+ users",
      "Architected and implemented microservices infrastructure reducing latency by 40%",
      "Mentored junior developers and established coding standards",
      "Collaborated with design team to improve UX, increasing user engagement by 25%",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    companyUrl: "https://example.com",
    location: "Remote",
    startDate: "2020",
    endDate: "2022",
    description: [
      "Built and maintained multiple React applications from scratch",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Integrated third-party APIs including payment processing and analytics",
      "Contributed to product decisions and feature prioritization",
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "GCP"],
  },
  {
    id: "3",
    title: "Junior Web Developer",
    company: "Digital Agency",
    location: "Los Angeles, CA",
    startDate: "2019",
    endDate: "2020",
    description: [
      "Developed responsive websites for clients across various industries",
      "Collaborated with designers to implement pixel-perfect UIs",
      "Maintained and updated existing client websites",
      "Learned modern web development practices and frameworks",
    ],
    technologies: ["JavaScript", "HTML/CSS", "WordPress", "PHP"],
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    school: "University of California, Berkeley",
    location: "Berkeley, CA",
    startDate: "2015",
    endDate: "2019",
    description: "Focused on software engineering and web technologies. Graduated with honors.",
  },
];

export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
];

