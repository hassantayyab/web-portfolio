import { siteConfig } from '@/lib/metadata';
import { Metadata } from 'next';
import HomePageClient from './home-page';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
