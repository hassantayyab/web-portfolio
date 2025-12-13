'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  CheckCircle2,
  Circle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PageLayout } from '@/components/shared/page-layout';
import { Blog } from '@/lib/types';
import { toast } from 'sonner';

export function BlogEditorDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'views'>('latest');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter and sort blogs
  useEffect(() => {
    let filtered = [...blogs];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((blog) => blog.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    setFilteredBlogs(filtered);
  }, [blogs, searchQuery, statusFilter, sortBy]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs/auth/list', {
        credentials: 'include',
      });

      if (response.status === 401) {
        router.push('/admin/login?redirect=/admin/blog-editor');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/blogs/auth/delete?id=${id}`, {
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
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch('/api/blogs/auth/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: blog.id, status: newStatus }),
      });

      if (response.status === 401) {
        router.push('/admin/login?redirect=/admin/blog-editor');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      toast.success(`Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
      
      // Update local state
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
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

  // Calculate statistics
  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === 'published').length,
    drafts: blogs.filter((b) => b.status === 'draft').length,
    totalViews: blogs.reduce((sum, b) => sum + b.views, 0),
  };

  if (loading) {
    return (
      <PageLayout title="Blog Dashboard" description="Loading...">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Blog Dashboard" 
      description="Manage and edit your blog posts"
      maxWidth="7xl"
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
          <Link href="/blogs/create">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              New Post
            </Button>
          </Link>
        </div>
      }
    >

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Posts</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Published</p>
                <p className="text-3xl font-bold">{stats.published}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Drafts</p>
                <p className="text-3xl font-bold">{stats.drafts}</p>
              </div>
              <Circle className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </Card>
        </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </Card>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first blog post'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link href="/blogs/create">
                <Button>Create Your First Blog</Button>
              </Link>
            )}
        </Card>
      ) : (
        <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{blog.title}</h3>
                          <Badge
                            variant={blog.status === 'published' ? 'default' : 'secondary'}
                            className="ml-2"
                          >
                            {blog.status === 'published' ? (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            ) : (
                              <Circle className="w-3 h-3 mr-1" />
                            )}
                            {blog.status}
                          </Badge>
                          {blog.featured && (
                            <Badge variant="outline" className="bg-primary/10">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime} min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views.toLocaleString()} views</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {blog.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {blog.tags.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{blog.tags.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/admin/blog-editor/${blog.id}`}>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(blog)}
                      className="gap-2"
                    >
                      {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    {blog.status === 'published' && (
                      <Link href={`/blogs/${blog.slug}`} target="_blank">
                        <Button size="sm" variant="outline" className="gap-2 w-full">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      disabled={deletingId === blog.id}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </PageLayout>
  );
}

