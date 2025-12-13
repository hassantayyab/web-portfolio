'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Check } from 'lucide-react';
import { BlogMetadata, generateSlug, BLOG_CATEGORIES } from '@/lib/blog-validation';

interface BlogMetadataFormProps {
  metadata: BlogMetadata;
  onChange: (metadata: BlogMetadata) => void;
  onImageUpload: (file: File) => Promise<string>;
  errors?: Partial<Record<keyof BlogMetadata, string>>;
}

export function BlogMetadataForm({
  metadata,
  onChange,
  onImageUpload,
  errors = {},
}: BlogMetadataFormProps) {
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Auto-generate slug from title if not manually edited
  useEffect(() => {
    if (!slugManuallyEdited && metadata.title) {
      const newSlug = generateSlug(metadata.title);
      onChange({ ...metadata, slug: newSlug });
    }
  }, [metadata.title, slugManuallyEdited]); // Intentionally not including onChange and metadata

  const handleTitleChange = (value: string) => {
    onChange({ ...metadata, title: value });
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    onChange({ ...metadata, slug: value });
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const url = await onImageUpload(file);
      onChange({ ...metadata, coverImage: url });
    } catch (error) {
      console.error('Cover image upload failed:', error);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !metadata.tags.includes(tag)) {
      onChange({ ...metadata, tags: [...metadata.tags, tag] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({
      ...metadata,
      tags: metadata.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={metadata.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter blog post title"
          maxLength={200}
          className={errors.title ? 'border-red-500' : ''}
        />
        <div className="flex justify-between text-sm">
          {errors.title && <span className="text-red-500">{errors.title}</span>}
          <span className="text-gray-500 ml-auto">
            {metadata.title.length}/200
          </span>
        </div>
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug" className="text-sm font-medium">
          Slug <span className="text-red-500">*</span>
        </Label>
        <Input
          id="slug"
          value={metadata.slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          placeholder="url-friendly-slug"
          maxLength={200}
          className={errors.slug ? 'border-red-500' : ''}
        />
        <div className="flex justify-between text-sm">
          {errors.slug && <span className="text-red-500">{errors.slug}</span>}
          <span className="text-gray-500 ml-auto">
            {metadata.slug.length}/200
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label htmlFor="coverImage" className="text-sm font-medium">Cover Image</Label>
        <div className="space-y-2">
          {metadata.coverImage ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              <img
                src={metadata.coverImage}
                alt="Cover"
                className="w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange({ ...metadata, coverImage: null })}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="hidden"
                disabled={isUploadingCover}
              />
              <label
                htmlFor="coverImage"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isUploadingCover ? 'Uploading...' : 'Click to upload cover image'}
                </span>
              </label>
            </div>
          )}
          {errors.coverImage && (
            <span className="text-sm text-red-500">{errors.coverImage}</span>
          )}
        </div>
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label htmlFor="author" className="text-sm font-medium">
          Author <span className="text-red-500">*</span>
        </Label>
        <Input
          id="author"
          value={metadata.author}
          onChange={(e) => onChange({ ...metadata, author: e.target.value })}
          placeholder="Author name"
          className={errors.author ? 'border-red-500' : ''}
        />
        {errors.author && (
          <span className="text-sm text-red-500">{errors.author}</span>
        )}
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-sm font-medium">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={metadata.excerpt || ''}
          onChange={(e) => onChange({ ...metadata, excerpt: e.target.value })}
          placeholder="Brief summary of the blog post (optional)"
          rows={3}
          maxLength={500}
          className={errors.excerpt ? 'border-red-500' : ''}
        />
        <div className="flex justify-between text-sm">
          {errors.excerpt && <span className="text-red-500">{errors.excerpt}</span>}
          <span className="text-gray-500 ml-auto">
            {(metadata.excerpt || '').length}/500
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">Category</Label>
        <select
          id="category"
          value={metadata.category || ''}
          onChange={(e) => onChange({ ...metadata, category: e.target.value })}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
        >
          <option value="">Select a category</option>
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tags (press Enter)"
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            Add
          </Button>
        </div>
        {metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={metadata.featured}
          onChange={(e) => onChange({ ...metadata, featured: e.target.checked })}
          className="rounded border-gray-300"
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Feature this post on homepage
        </Label>
      </div>
    </div>
  );
}

