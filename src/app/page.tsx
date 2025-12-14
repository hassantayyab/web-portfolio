import { siteConfig } from '@/lib/metadata';
import { Metadata } from 'next';
import HomePageClient from './home-page';

export const metadata: Metadata = {
  title: 'Hassan Tayyab | Frontend Engineer',
  description: siteConfig.longDescription,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.longDescription,
    url: siteConfig.url,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
