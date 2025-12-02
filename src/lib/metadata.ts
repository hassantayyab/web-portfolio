import { Metadata } from "next";
import { personalInfo } from "./data";
import { env } from "./env";

const baseUrl = env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  name: personalInfo.name,
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.shortBio,
  url: baseUrl,
  ogImage: `${baseUrl}/og.png`,
  links: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    personalInfo.name,
  ],
  authors: [{ name: personalInfo.name, url: siteConfig.url }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@johndoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD structured data for the person/portfolio
export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    url: siteConfig.url,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location,
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
  };
}

// JSON-LD for the website
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
  };
}

