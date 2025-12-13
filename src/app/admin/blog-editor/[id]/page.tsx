import { Metadata } from 'next';
import { BlogEditorEdit } from './blog-editor-edit';

export const metadata: Metadata = {
  title: 'Edit Blog | Hassan Tayyab',
  description: 'Edit your blog post',
  robots: 'noindex, nofollow',
};

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogEditorEdit blogId={id} />;
}

