# Blog System Documentation

Complete documentation for the blog system implementation in Hassan Tayyab's portfolio.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Components](#components)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

This portfolio includes a full-featured blog system with:

- Rich text editor (Tiptap) with advanced formatting
- Authentication for admin access
- Auto-save functionality
- SEO optimization with structured data
- Image upload and management
- View tracking
- Tag and category filtering
- RSS feed generation

---

## Features

### Content Creation

- **Rich Text Editor**: Full-featured Tiptap editor with:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headings (H1-H4)
  - Lists (ordered and unordered)
  - Code blocks with syntax highlighting
  - Tables with row/column management
  - Images with upload
  - Links and blockquotes
  - Text alignment and colors

- **Auto-save**: Automatic draft saving every 2 seconds
- **Preview Mode**: Toggle between edit and preview
- **Metadata Management**:
  - Title and slug (auto-generated, editable)
  - Excerpt/summary
  - Cover image upload
  - Tags (add/remove)
  - Category selection
  - Featured flag

### Content Management

- **Dashboard**: Admin dashboard with:
  - Blog list with search and filters
  - Statistics (total posts, views, etc.)
  - Status management (publish/unpublish)
  - Delete functionality
  - Quick edit access

- **Blog Editor**: Edit existing blogs with:
  - Pre-populated content
  - Unsaved changes warning
  - Version tracking (timestamps)

### Public Features

- **Blog Listing**: Searchable, filterable blog index
- **Individual Posts**:
  - Beautiful typography
  - Table of contents with scroll spy
  - Social sharing buttons
  - View counter
  - Breadcrumb navigation
  - Scroll to top button

- **SEO**:
  - Dynamic meta tags
  - Open Graph tags
  - Twitter Cards
  - JSON-LD structured data
  - Sitemap generation
  - Canonical URLs
  - RSS feed

---

## Architecture

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Editor**: Tiptap (React)
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Storage**: Supabase Storage
- **Image Processing**: Sharp

### File Structure

```
src/
├── app/
│   ├── blogs/
│   │   ├── [slug]/              # Individual blog post
│   │   ├── create/              # Blog creation page
│   │   ├── page.tsx             # Blog listing
│   │   └── rss.xml/             # RSS feed
│   ├── admin/
│   │   ├── login/               # Admin login
│   │   └── blog-editor/         # Admin dashboard & editor
│   └── api/
│       ├── auth/                # Authentication endpoints
│       ├── blogs/               # Blog CRUD operations
│       └── upload/              # Image upload
├── components/
│   ├── blog/                    # Blog-specific components
│   │   ├── rich-text-editor.tsx
│   │   ├── rich-text-renderer.tsx
│   │   ├── blog-metadata-form.tsx
│   │   └── table-of-contents.tsx
│   └── shared/                  # Shared components
│       ├── breadcrumbs.tsx
│       ├── share-buttons.tsx
│       └── scroll-to-top.tsx
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── auth.ts                  # Auth utilities
│   ├── types.ts                 # TypeScript types
│   └── data-validation.ts       # Zod schemas
└── supabase/
    └── migrations/              # Database migrations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Environment variables configured

### Environment Variables

Create a `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Admin Authentication
ADMIN_PASSWORD_HASH=your_bcrypt_hash
JWT_SECRET=your_jwt_secret
```

### Database Setup

1. Run migrations in Supabase:

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  "publishedAt" TIMESTAMPTZ,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'draft',
  "coverImage" TEXT,
  tags TEXT[] DEFAULT '{}',
  "readTime" INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  category TEXT,
  featured BOOLEAN DEFAULT FALSE
);

-- Create function to increment views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;
```

2. Set up Supabase Storage bucket for blog images:
   - Create a public bucket named `blog-images`
   - Configure CORS and access policies

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Usage Guide

### Creating a Blog Post

1. Navigate to `/admin/login`
2. Enter admin password
3. Click "New Blog Post" on the dashboard
4. Fill in metadata:
   - Title (auto-generates slug)
   - Cover image (upload or paste URL)
   - Excerpt (brief summary)
   - Tags (press Enter to add)
   - Category (optional)
   - Featured checkbox (optional)
5. Write content in the rich text editor
6. Click "Save Draft" or "Publish"

### Editing a Blog Post

1. Go to `/admin/blog-editor`
2. Find the blog post
3. Click "Edit"
4. Make changes
5. Click "Save Draft" or "Update"

### Managing Blogs

From the dashboard (`/admin/blog-editor`):

- **Search**: Filter by title, tags, or content
- **Filter**: By status (all/published/draft)
- **Sort**: By date or views
- **Publish/Unpublish**: Toggle blog status
- **Delete**: Remove blogs (with confirmation)
- **View**: See published blog on live site

### Adding Images

**Method 1: Upload**

1. Click image icon in editor toolbar
2. Select file (max 5MB)
3. Image uploads automatically
4. Add alt text (optional)

**Method 2: URL**

1. Click image icon
2. Paste image URL
3. Add alt text (optional)

### Formatting Content

- **Bold**: Cmd/Ctrl + B
- **Italic**: Cmd/Ctrl + I
- **Code**: Cmd/Ctrl + E
- **Link**: Cmd/Ctrl + K
- **Headings**: # (H1), ## (H2), etc.
- **Lists**: - or 1.
- **Code Block**: ```language
- **Table**: Use table button in toolbar

---

## API Documentation

### Public Endpoints

#### GET `/api/blogs`

Get published blogs with filtering.

**Query Parameters:**

- `featured` (boolean): Filter featured blogs
- `limit` (number): Max blogs to return
- `status` (string): 'published' or 'draft'
- `search` (string): Search query
- `tag` (string): Filter by tag
- `sort` (string): 'latest', 'oldest', or 'popular'

**Response:**

```json
{
  "blogs": [
    {
      "id": "uuid",
      "title": "Blog Title",
      "slug": "blog-title",
      "excerpt": "Brief summary...",
      "coverImage": "https://...",
      "tags": ["tag1", "tag2"],
      "readTime": 5,
      "views": 100,
      "publishedAt": "2024-01-01T00:00:00Z",
      ...
    }
  ]
}
```

#### POST `/api/blogs/[id]/view`

Increment view count for a blog.

**Response:**

```json
{
  "views": 101
}
```

### Protected Endpoints (Require Authentication)

#### GET `/api/blogs/auth/list`

Get all blogs (including drafts).

#### GET `/api/blogs/auth/get?id=xxx`

Get single blog by ID.

#### POST `/api/blogs/save`

Create or update a blog.

**Request Body:**

```json
{
  "id": "uuid (optional for update)",
  "title": "Blog Title",
  "slug": "blog-title",
  "content": {
    /* Tiptap JSON */
  },
  "excerpt": "Brief summary...",
  "author": "Author Name",
  "coverImage": "https://...",
  "tags": ["tag1", "tag2"],
  "category": "Technology",
  "featured": false,
  "status": "published"
}
```

#### DELETE `/api/blogs/auth/delete?id=xxx`

Delete a blog post.

#### PATCH `/api/blogs/auth/update-status`

Update blog status (publish/unpublish).

**Request Body:**

```json
{
  "id": "uuid",
  "status": "published"
}
```

#### POST `/api/upload`

Upload an image.

**Request:** multipart/form-data with `file` field

**Response:**

```json
{
  "url": "https://supabase-url/storage/v1/object/public/blog-images/filename.jpg",
  "publicUrl": "https://..."
}
```

---

## Components

### RichTextEditor

Full-featured Tiptap editor.

**Props:**

- `initialContent`: Initial editor content (JSON)
- `onChange`: Callback when content changes
- `placeholder`: Placeholder text

**Usage:**

```tsx
<RichTextEditor initialContent={content} onChange={setContent} placeholder='Start writing...' />
```

### RichTextRenderer

Renders Tiptap JSON as formatted HTML.

**Props:**

- `content`: Tiptap JSON content

**Usage:**

```tsx
<RichTextRenderer content={blog.content} />
```

### BlogMetadataForm

Form for blog metadata (title, slug, tags, etc.).

**Props:**

- `title`, `setTitle`
- `slug`, `setSlug`
- `excerpt`, `setExcerpt`
- `coverImage`, `setCoverImage`
- `tags`, `setTags`
- `category`, `setCategory`
- `featured`, `setFeatured`
- `existingBlogId`: For slug validation

### TableOfContents

Auto-generated TOC from headings with scroll spy.

**Props:**

- `content`: Blog content (JSON)

### ShareButtons

Social media sharing buttons.

**Props:**

- `title`: Blog title
- `url`: Blog URL

---

## Database Schema

### blogs Table

| Column      | Type        | Description                   |
| ----------- | ----------- | ----------------------------- |
| id          | UUID        | Primary key                   |
| title       | TEXT        | Blog title                    |
| slug        | TEXT        | URL-friendly slug (unique)    |
| content     | JSONB       | Tiptap JSON content           |
| excerpt     | TEXT        | Brief summary                 |
| author      | TEXT        | Author name                   |
| publishedAt | TIMESTAMPTZ | Publication date              |
| updatedAt   | TIMESTAMPTZ | Last update date              |
| status      | TEXT        | 'draft' or 'published'        |
| coverImage  | TEXT        | Cover image URL               |
| tags        | TEXT[]      | Array of tags                 |
| readTime    | INTEGER     | Estimated read time (minutes) |
| views       | INTEGER     | View count                    |
| category    | TEXT        | Blog category                 |
| featured    | BOOLEAN     | Featured flag                 |

### Functions

- `increment_blog_views(blog_id UUID)`: Increment view count

---

## Configuration

### Admin Password

Generate a bcrypt hash for your password:

```bash
npm install -g bcrypt-cli
bcrypt-cli "your-password"
```

Add to `.env.local`:

```
ADMIN_PASSWORD_HASH=your_generated_hash
```

### JWT Secret

Generate a secure random string:

```bash
openssl rand -base64 32
```

Add to `.env.local`:

```
JWT_SECRET=your_generated_secret
```

### Image Upload Limits

Configure in `/src/app/api/upload/route.ts`:

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
```

---

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Production

Set all variables from `.env.local` in Vercel:

- Project Settings → Environment Variables
- Add each variable
- Redeploy

### Database Configuration

Ensure Supabase is configured:

- Run migrations
- Set up Storage bucket
- Configure RLS policies (if needed)

---

## Troubleshooting

### Common Issues

**Issue: Images not uploading**

- Check Supabase Storage bucket exists
- Verify bucket is public
- Check CORS configuration
- Verify file size under limit

**Issue: Auto-save not working**

- Check network tab for API errors
- Verify authentication token is valid
- Check browser console for errors

**Issue: Blog not appearing on homepage**

- Verify blog status is 'published'
- Check 'featured' flag is set
- Verify API endpoint is fetching correctly

**Issue: View count not incrementing**

- Verify `increment_blog_views` function exists
- Check database function permissions
- Review API logs for errors

### Debug Mode

Enable debug logging:

```typescript
// In lib/logger.ts
export const DEBUG = process.env.NODE_ENV === 'development';
```

### Performance Optimization

- Use Next.js Image component for all images
- Enable static generation where possible
- Implement proper caching headers
- Optimize database queries with indexes

---

## Support

For issues or questions:

- Check this documentation
- Review PLAN.md for implementation details
- Check component README files in `/src/components/blog/`
- Review API error responses in browser console

---

## License

This blog system is part of Hassan Tayyab's portfolio. All rights reserved.
