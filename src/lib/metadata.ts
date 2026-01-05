import { Metadata } from 'next';
import { personalInfo, socialLinks } from './data';
import { env } from './env';

const baseUrl = env.NEXT_PUBLIC_SITE_URL;

// Extract social links from data
const getSocialLink = (name: string) => {
  const link = socialLinks.find((s) => s.name?.toLowerCase() === name.toLowerCase());
  return link?.url || '';
};

export const siteConfig = {
  name: personalInfo.name,
  title: `${personalInfo.name} | ${personalInfo.title} | AI-assisted development`,
  description: personalInfo.shortBio,
  longDescription: personalInfo.bio,
  url: baseUrl,
  // Use static OG image if available, otherwise fall back to dynamic generation
  ogImage: `${baseUrl}/og.png`, // Place your static OG image at /public/og.png (1200x630px)
  // NOTE: We intentionally do NOT use a dynamic OG route. Shares should always use /public/og.png.
  links: {
    twitter: getSocialLink('Twitter'),
    github: getSocialLink('GitHub'),
    linkedin: getSocialLink('LinkedIn'),
    youtube: getSocialLink('YouTube'),
    email: personalInfo.email,
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
    'Frontend Developer',
    'React Developer',
    'Angular Developer',
    'NestJS Developer',
    'TypeScript',
    'Node.js',
    'Web Development',
    'Frontend Developer',
    'Software Engineer',
    'Portfolio',
    'Web Developer',
    'JavaScript',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'UX Designer',
    'AI-assisted Development',
    'User-centered Design',
    'Clean Architecture',
    'Scalable Applications',
    'End-to-end Delivery',
    personalInfo.name,
    personalInfo.title,
  ],
  authors: [{ name: personalInfo.name, url: siteConfig.url }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/blogs/rss.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter
      ? siteConfig.links.twitter.replace(/https?:\/\/(www\.)?(twitter|x)\.com\//, '@')
      : '@htdogar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'i2gLpOTvcIQcy1C9b2qr84wcvLXxejzKcyRsf3lyJPg',
    // Add Bing verification code here when available:
    // bing: "your-bing-verification-code",
  },
  category: 'Technology',
};

// JSON-LD structured data for the person/portfolio
export function generatePersonJsonLd() {
  const sameAs = [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    url: siteConfig.url,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    description: personalInfo.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location,
    },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    image: `${baseUrl}${personalInfo.avatarUrl}`,
  };
}

// JSON-LD for the website
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// JSON-LD for Portfolio/CreativeWork
export function generatePortfolioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${baseUrl}#portfolio`,
    name: `${personalInfo.name}'s Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    creator: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };
}

// JSON-LD for BlogPosting
export function generateBlogPostJsonLd(blog: {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    url: `${baseUrl}/blogs/${blog.id}`,
    datePublished: blog.publishedAt,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${blog.id}`,
    },
    articleSection: blog.category,
    keywords: blog.tags?.join(', '),
  };
}
