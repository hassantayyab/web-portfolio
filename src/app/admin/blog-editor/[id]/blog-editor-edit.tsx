'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Trash2, LogOut, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/shared/page-layout';
import { BlogMetadataForm } from '@/components/blog/blog-metadata-form';
import { RichTextEditor } from '@/components/blog/rich-text-editor';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Blog } from '@/lib/types';
import { BlogMetadata } from '@/lib/blog-validation';
import { toast } from 'sonner';

interface BlogEditorEditProps {
  blogId: string;
}

export function BlogEditorEdit({ blogId }: BlogEditorEditProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form state
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
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Load blog data
  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/auth/get?id=${blogId}`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        router.push('/admin/login?redirect=/admin/blog-editor');
        return;
      }

      if (response.status === 404) {
        toast.error('Blog not found');
        router.push('/admin/blog-editor');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }

      const data = await response.json();
      const blogData = data.blog;

      setBlog(blogData);
      setMetadata({
        title: blogData.title || '',
        slug: blogData.slug || '',
        excerpt: blogData.excerpt || '',
        author: blogData.author || 'Hassan Tayyab',
        coverImage: blogData.coverImage || null,
        tags: blogData.tags || [],
        category: blogData.category || '',
        featured: blogData.featured || false,
      });
      setContent(blogData.content || '');
      setStatus(blogData.status);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
      router.push('/admin/blog-editor');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async (publishNow: boolean = false) => {
    try {
      // Validation
      if (!metadata.title.trim()) {
        toast.error('Title is required');
        return;
      }
      if (!metadata.slug.trim()) {
        toast.error('Slug is required');
        return;
      }

      setSaving(true);
      const response = await fetch('/api/blogs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: blogId,
          ...metadata,
          coverImage: metadata.coverImage || null,
          content,
          status: publishNow ? 'published' : status,
        }),
      });

      if (response.status === 401) {
        router.push('/admin/login?redirect=/admin/blog-editor');
        return;
      }

      if (response.status === 409) {
        toast.error('A blog with this slug already exists');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to save blog');
      }

      const data = await response.json();
      setBlog(data.blog);
      setStatus(data.blog.status);
      setHasUnsavedChanges(false);
      toast.success(data.message || 'Blog saved successfully');
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${metadata.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/auth/delete?id=${blogId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.status === 401) {
        router.push('/admin/login?redirect=/admin/blog-editor');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      toast.success('Blog deleted successfully');
      router.push('/admin/blog-editor');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  if (loading) {
    return (
      <PageLayout title="Edit Blog Post" description="Loading...">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Edit Blog Post"
      description={blog ? `Last updated: ${new Date(blog.updatedAt).toLocaleString()}` : 'Edit your blog post'}
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
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            size="sm"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="gap-2"
          >
            {status === 'published' ? 'Update' : 'Publish'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      }
    >

      {!showPreview ? (
        <div className="space-y-8">
          {/* Metadata Form */}
          <BlogMetadataForm
            metadata={metadata}
            onChange={(newMetadata) => {
              setMetadata(newMetadata);
              setHasUnsavedChanges(true);
            }}
            onImageUpload={handleImageUpload}
          />

          {/* Rich Text Editor */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <RichTextEditor
              content={content}
              onChange={handleContentChange}
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

