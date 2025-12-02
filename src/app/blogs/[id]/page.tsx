import { blogs } from '@/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleClient from './blog-article-client';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    notFound();
  }

  return <BlogArticleClient blog={blog} />;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}
