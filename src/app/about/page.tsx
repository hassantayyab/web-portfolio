import { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, skills, experience, and what drives me as a full-stack developer. Discover my journey in web development, technical expertise, and professional experience.",
  keywords: [
    "About Developer",
    "Full Stack Developer Bio",
    "Web Developer Experience",
    "Software Engineer Background",
    "Developer Skills",
    "Professional Experience",
  ],
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "Learn more about my background, skills, experience, and what drives me as a full-stack developer.",
    url: `${siteConfig.url}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description: "Learn more about my background, skills, and experience.",
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
