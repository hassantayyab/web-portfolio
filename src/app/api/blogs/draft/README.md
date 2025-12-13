# Draft Auto-Save API

## Endpoint: `/api/blogs/draft`

Save and retrieve blog post drafts with auto-save support.

### Features

- ✅ Create new drafts
- ✅ Update existing drafts
- ✅ Automatic excerpt generation
- ✅ Read time calculation
- ✅ Slug uniqueness validation
- ✅ Full Zod validation

### POST /api/blogs/draft

Create or update a blog post draft.

**Request Body:**
```typescript
{
  id?: string;              // Optional: provide to update existing draft
  title: string;            // Required, max 200 chars
  slug: string;             // Required, max 200 chars, must be unique
  content: object;          // Required, Tiptap JSON format
  excerpt?: string;         // Optional, max 500 chars, auto-generated if not provided
  author: string;           // Required
  coverImage?: string | null; // Optional, must be valid URL
  tags?: string[];          // Optional, default []
  category?: string;        // Optional
  featured?: boolean;       // Optional, default false
}
```

**Example:**
```typescript
const response = await fetch('/api/blogs/draft', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'existing-draft-id', // Omit for new draft
    title: 'My Blog Post',
    slug: 'my-blog-post',
    content: { type: 'doc', content: [...] },
    author: 'John Doe',
    tags: ['javascript', 'react'],
  }),
});
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Draft created successfully",
  "blog": {
    "id": "uuid",
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "content": { ... },
    "excerpt": "Auto-generated excerpt...",
    "author": "John Doe",
    "status": "draft",
    "readTime": 5,
    "views": 0,
    "tags": ["javascript", "react"],
    "publishedAt": null,
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Response (Error - Validation):**
```json
{
  "error": "Validation failed",
  "details": {
    "title": { "_errors": ["Title is required"] },
    "slug": { "_errors": ["Slug is required"] }
  }
}
```

**Response (Error - Duplicate Slug):**
```json
{
  "error": "A blog with this slug already exists"
}
```

### GET /api/blogs/draft?id=xxx

Retrieve a specific draft by ID.

**Request:**
```typescript
const response = await fetch('/api/blogs/draft?id=draft-uuid');
```

**Response (Success):**
```json
{
  "success": true,
  "blog": {
    "id": "draft-uuid",
    "title": "My Blog Post",
    // ... full blog object
  }
}
```

**Response (Error - Not Found):**
```json
{
  "error": "Draft not found"
}
```

### Automatic Features

#### 1. Read Time Calculation
Automatically calculates reading time based on word count (200 words per minute).

#### 2. Excerpt Generation
If no excerpt is provided, generates one from the content (first 200 characters).

#### 3. Timestamp Management
- `updatedAt`: Automatically set on every save
- `publishedAt`: Kept null for drafts

### Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| title | Yes | 1-200 characters |
| slug | Yes | 1-200 characters, unique |
| content | Yes | Must be valid JSON object |
| excerpt | No | Max 500 characters |
| author | Yes | Min 1 character |
| coverImage | No | Must be valid URL or null |
| tags | No | Array of strings |
| category | No | String |
| featured | No | Boolean |

### Usage with Auto-Save Editor

The draft API works seamlessly with the `RichTextEditorWithAutoSave` component:

```tsx
<RichTextEditorWithAutoSave
  blogData={{
    title: 'My Blog',
    slug: 'my-blog',
    author: 'John Doe',
    tags: ['javascript'],
  }}
  onSave={(savedBlog) => {
    console.log('Draft saved:', savedBlog.id);
  }}
  onError={(error) => {
    console.error('Save failed:', error);
  }}
  autoSaveDelay={2000}
  enableAutoSave={true}
/>
```

### Error Codes

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | Validation failed | Invalid request body |
| 400 | Blog ID is required | Missing ID parameter for GET |
| 404 | Draft not found | Draft doesn't exist |
| 409 | Slug already exists | Duplicate slug in database |
| 500 | Failed to create/update draft | Database error |

### Database Schema

The API expects a `blogs` table with the following columns:

```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  featured BOOLEAN DEFAULT false,
  read_time INTEGER,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Security Considerations

- ⚠️ **No authentication**: Currently open to anyone
- ⚠️ **Rate limiting**: Should be added for production
- ⚠️ **Input sanitization**: Zod validation in place
- ✅ **SQL injection**: Protected by Supabase client
- ⚠️ **Authorization**: Add user/role checks for production

### Production Recommendations

1. Add authentication middleware
2. Implement rate limiting
3. Add user ownership checks
4. Log draft saves for audit trail
5. Consider draft expiration/cleanup
6. Add draft versioning for recovery

