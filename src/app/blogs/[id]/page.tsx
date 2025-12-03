import { blogs } from '@/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig, generateBlogPostJsonLd } from '@/lib/metadata';
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

  const blogUrl = `${siteConfig.url}/blogs/${id}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: `${blog.title} | ${siteConfig.name}`,
      description: blog.description,
      url: blogUrl,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [siteConfig.name],
      section: blog.category,
      tags: blog.tags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      creator: siteConfig.links.twitter ? siteConfig.links.twitter.replace('https://twitter.com/', '@') : undefined,
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    notFound();
  }

  const jsonLd = generateBlogPostJsonLd(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BlogArticleClient blog={blog} />
    </>
  );
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}
