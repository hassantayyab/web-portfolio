'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/shared/page-layout';
import { BlogMetadataForm } from '@/components/blog/blog-metadata-form';
import { RichTextEditor } from '@/components/blog/rich-text-editor';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import {
  BlogMetadata,
  blogMetadataSchema,
  publishBlogSchema,
} from '@/lib/blog-validation';
import { ArrowLeft, Eye, Save, Send, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateBlogPage() {
  const router = useRouter();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [blogId, setBlogId] = useState<string | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof BlogMetadata, string>>>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [metadata, setMetadata] = useState<BlogMetadata>({
    title: '',
    slug: '',
    excerpt: '',
    author: 'Hassan Tayyab',
    coverImage: null,
    tags: [],
    category: '',
    featured: false,
  });

  const [content, setContent] = useState<string>('');

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const { url } = await response.json();
    return url;
  };

  const validateMetadata = (forPublish = false) => {
    const schema = forPublish ? publishBlogSchema : blogMetadataSchema;
    const result = schema.safeParse(metadata);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BlogMetadata, string>> = {};
      if (result.error && result.error.issues && Array.isArray(result.error.issues)) {
        result.error.issues.forEach((err) => {
          const field = err.path[0] as keyof BlogMetadata;
          fieldErrors[field] = err.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handlePublish = async () => {
    if (!validateMetadata(true)) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!content || !content.trim()) {
      toast.error('Blog content is required');
      return;
    }

    setIsPublishing(true);
    try {
      const response = await fetch('/api/blogs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blogId,
          ...metadata,
          content,
          status: 'published',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        
        // Show detailed validation errors
        if (error.details) {
          const errorMessages: string[] = [];
          Object.keys(error.details).forEach((key) => {
            if (key !== '_errors' && error.details[key]?._errors) {
              errorMessages.push(`${key}: ${error.details[key]._errors[0]}`);
            }
          });
          if (errorMessages.length > 0) {
            toast.error(errorMessages.join(', '));
            return;
          }
        }
        
        // If slug exists, show helpful error
        if (error.error?.includes('slug already exists')) {
          toast.error('This slug already exists. Try changing the slug to something unique.');
        } else {
          toast.error(error.error || 'Failed to publish blog');
        }
        return;
      }

      const { blog } = await response.json();
      toast.success('Blog published successfully! 🎉');
      router.push(`/blogs/${blog.slug}`);
    } catch (error) {
      console.error('Publish error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to publish blog');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!validateMetadata(false)) {
      toast.error('Please fill in the required fields');
      return;
    }

    try {
      const response = await fetch('/api/blogs/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blogId,
          ...metadata,
          content,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save draft');
      }

      const result = await response.json();
      
      // Store the blog ID for future saves
      if (result.blog?.id) {
        setBlogId(result.blog.id);
      }
      
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save draft');
    }
  };

  const handleDiscard = () => {
    if (confirm('Are you sure you want to discard this blog post? All changes will be lost.')) {
      router.push('/');
    }
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;

    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
      setIsLoggingOut(false);
    }
  };

  return (
    <PageLayout
      title="Create Blog Post"
      description="Write and publish your blog post"
      maxWidth="7xl"
      actions={
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/admin/blog-editor">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      }
    >
      {!isPreviewMode ? (
        <div className="space-y-8">
          {/* Metadata Form */}
          <BlogMetadataForm
            metadata={metadata}
            onChange={setMetadata}
            onImageUpload={handleImageUpload}
            errors={errors}
          />

          {/* Rich Text Editor */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <RichTextEditor
              content={content}
              onChange={setContent}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cover Image */}
          {metadata.coverImage && (
            <div className="rounded-2xl overflow-hidden aspect-video shadow-lg">
              <img
                src={metadata.coverImage}
                alt={metadata.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="space-y-4">
            {metadata.category && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {metadata.category}
                </span>
                {metadata.featured && (
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-sm font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {metadata.title || 'Untitled Post'}
            </h1>

            {metadata.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {metadata.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {metadata.author?.charAt(0).toUpperCase() || 'H'}
                </div>
                <div>
                  <div className="font-medium text-foreground">{metadata.author}</div>
                  <div className="text-xs">Author</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Blog Content */}
          <MarkdownRenderer content={content} />
        </div>
      )}
    </PageLayout>
  );
}
