'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Blog } from '@/lib/types';
import { BlogCard } from '@/components/blog/blog-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal,
  Calendar,
  TrendingUp,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface BlogsListClientProps {
  initialBlogs: Blog[];
}

type SortOption = 'latest' | 'popular' | 'oldest';

export function BlogsListClient({ initialBlogs }: BlogsListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  // Extract unique categories and tags
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialBlogs.forEach((blog) => {
      if (blog.category) cats.add(blog.category);
    });
    return Array.from(cats).sort();
  }, [initialBlogs]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    initialBlogs.forEach((blog) => {
      blog.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [initialBlogs]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = initialBlogs;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query) ||
          blog.author.toLowerCase().includes(query) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((blog) => blog.tags?.includes(selectedTag));
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt || b.createdAt).getTime() - 
                 new Date(a.publishedAt || a.createdAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt || a.createdAt).getTime() - 
                 new Date(b.publishedAt || b.createdAt).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialBlogs, searchQuery, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
    setSortBy('latest');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag || sortBy !== 'latest';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Thoughts, tutorials, and insights about web development, design, and technology.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters:</span>
              </div>

              {/* Sort Options */}
              <Button
                variant={sortBy === 'latest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('latest')}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('popular')}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Popular
              </Button>
              <Button
                variant={sortBy === 'oldest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('oldest')}
                className="gap-2"
              >
                <Clock className="h-4 w-4" />
                Oldest
              </Button>

              <div className="h-4 w-px bg-border" />

              {/* Category Filter */}
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Button>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Tag Filter */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold mb-2">No articles found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

