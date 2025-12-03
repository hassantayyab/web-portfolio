import { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Home',
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

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

