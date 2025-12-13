import { Metadata } from 'next';
import { BlogEditorDashboard } from './blog-editor-dashboard';

export const metadata: Metadata = {
  title: 'Blog Editor Dashboard | Hassan Tayyab',
  description: 'Manage your blog posts',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function BlogEditorPage() {
  return <BlogEditorDashboard />;
}

