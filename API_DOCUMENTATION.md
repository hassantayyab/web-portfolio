# Blog System API Documentation

Complete API reference for the blog system.

## Base URL

```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

## Authentication

Protected endpoints require a JWT token in cookies.

**Login Flow:**
1. POST `/api/auth/verify-password` with password
2. Receive JWT token in HTTP-only cookie
3. Use token in subsequent requests

**Token Lifetime:** 7 days

---

## Public Endpoints

### Get Blogs

Get a list of published blogs with optional filtering.

**Endpoint:** `GET /api/blogs`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| featured | boolean | No | false | Filter featured blogs only |
| limit | number | No | 100 | Maximum number of blogs to return |
| status | string | No | 'published' | Filter by status ('published' or 'draft') |
| search | string | No | - | Search in title and excerpt |
| tag | string | No | - | Filter by specific tag |
| sort | string | No | 'latest' | Sort order ('latest', 'oldest', 'popular') |

**Example Request:**
```bash
GET /api/blogs?featured=true&limit=6&sort=popular
```

**Response:**
```json
{
  "blogs": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Next.js 14",
      "slug": "getting-started-nextjs-14",
      "content": { /* Tiptap JSON */ },
      "excerpt": "Learn the basics of Next.js 14 and the App Router...",
      "author": "Hassan Tayyab",
      "publishedAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "status": "published",
      "coverImage": "https://example.com/cover.jpg",
      "tags": ["nextjs", "react", "webdev"],
      "readTime": 8,
      "views": 1234,
      "category": "Web Development",
      "featured": true
    }
  ]
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### Increment Blog Views

Increment the view count for a blog post.

**Endpoint:** `POST /api/blogs/[id]/view`

**Path Parameters:**
- `id` (string, required): Blog post UUID

**Example Request:**
```bash
POST /api/blogs/550e8400-e29b-41d4-a716-446655440000/view
```

**Response:**
```json
{
  "views": 1235
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### Validate Slug

Check if a slug is available for use.

**Endpoint:** `GET /api/blogs/validate-slug`

**Query Parameters:**
- `slug` (string, required): Slug to validate
- `id` (string, optional): Current blog ID (for editing)

**Example Request:**
```bash
GET /api/blogs/validate-slug?slug=my-new-blog&id=550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "available": true,
  "slug": "my-new-blog"
}
```

**Status Codes:**
- 200: Success
- 400: Missing slug parameter
- 500: Server error

---

### RSS Feed

Get RSS feed of published blogs.

**Endpoint:** `GET /api/blogs/rss.xml`

**Response:** XML formatted RSS feed

**Example Request:**
```bash
GET /api/blogs/rss.xml
```

**Status Codes:**
- 200: Success
- 500: Server error

---

## Authentication Endpoints

### Verify Password

Authenticate with admin password and receive JWT token.

**Endpoint:** `POST /api/auth/verify-password`

**Request Body:**
```json
{
  "password": "your-admin-password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful"
}
```

**Status Codes:**
- 200: Success (sets HTTP-only cookie with JWT)
- 400: Missing password
- 401: Invalid password
- 500: Server error

---

### Check Session

Verify current authentication session.

**Endpoint:** `GET /api/auth/session`

**Response:**
```json
{
  "authenticated": true,
  "expiresAt": "2024-01-22T10:00:00Z"
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated

---

### Logout

Logout and clear authentication token.

**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Status Codes:**
- 200: Success

---

## Protected Endpoints

All protected endpoints require authentication via JWT cookie.

### List All Blogs (Admin)

Get all blogs including drafts.

**Endpoint:** `GET /api/blogs/auth/list`

**Response:**
```json
{
  "blogs": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "My Draft Blog",
      "slug": "my-draft-blog",
      "status": "draft",
      // ... other fields
    }
  ]
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 500: Server error

---

### Get Blog by ID (Admin)

Get a single blog post by ID, including drafts.

**Endpoint:** `GET /api/blogs/auth/get`

**Query Parameters:**
- `id` (string, required): Blog UUID

**Example Request:**
```bash
GET /api/blogs/auth/get?id=550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "blog": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My Blog Post",
    // ... all blog fields
  }
}
```

**Status Codes:**
- 200: Success
- 400: Missing blog ID
- 401: Not authenticated
- 404: Blog not found
- 500: Server error

---

### Save Blog

Create a new blog or update an existing one.

**Endpoint:** `POST /api/blogs/save`

**Request Body:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",  // Optional, omit for new blog
  "title": "My Awesome Blog Post",
  "slug": "my-awesome-blog-post",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Blog content here..."
          }
        ]
      }
    ]
  },
  "excerpt": "A brief summary of the blog post...",
  "author": "Hassan Tayyab",
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["webdev", "nextjs", "react"],
  "category": "Web Development",
  "featured": true,
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog published successfully",
  "blog": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    // ... all blog fields including computed readTime
  }
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 401: Not authenticated
- 409: Slug already exists
- 500: Server error

**Notes:**
- `readTime` is automatically calculated based on word count
- `publishedAt` is set automatically when status is 'published'
- `updatedAt` is updated automatically

---

### Save Draft

Auto-save a blog draft (optimized for frequent saves).

**Endpoint:** `POST /api/blogs/draft`

**Request Body:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",  // Optional for new draft
  "title": "Work in Progress",
  "slug": "work-in-progress",
  "content": { /* Tiptap JSON */ },
  "excerpt": "Draft excerpt...",
  "author": "Hassan Tayyab",
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["draft"],
  "category": "Technology",
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Draft saved successfully",
  "blog": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "draft",
    // ... other fields
  },
  "savedAt": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 401: Not authenticated
- 500: Server error

---

### Update Blog Status

Change blog status between 'published' and 'draft'.

**Endpoint:** `PATCH /api/blogs/auth/update-status`

**Request Body:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog published successfully",
  "blog": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "published",
    "publishedAt": "2024-01-15T10:30:00Z",
    // ... other fields
  }
}
```

**Status Codes:**
- 200: Success
- 400: Validation error
- 401: Not authenticated
- 500: Server error

---

### Delete Blog

Delete a blog post permanently.

**Endpoint:** `DELETE /api/blogs/auth/delete`

**Query Parameters:**
- `id` (string, required): Blog UUID

**Example Request:**
```bash
DELETE /api/blogs/auth/delete?id=550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Missing blog ID
- 401: Not authenticated
- 500: Server error

**Warning:** This action is irreversible!

---

### Upload Image

Upload an image for use in blog posts.

**Endpoint:** `POST /api/upload`

**Request:** multipart/form-data

**Form Fields:**
- `file` (File, required): Image file

**Accepted Formats:**
- image/jpeg
- image/png
- image/webp
- image/gif

**Max File Size:** 5MB

**Example Request:**
```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
  credentials: 'include',
});
```

**Response:**
```json
{
  "url": "https://supabase-url/storage/v1/object/public/blog-images/abc123.jpg",
  "publicUrl": "https://cdn.example.com/blog-images/abc123.jpg"
}
```

**Status Codes:**
- 200: Success
- 400: Invalid file type or size
- 401: Not authenticated
- 500: Server error

**Notes:**
- Images are automatically optimized
- Unique filename is generated
- Images are stored in Supabase Storage

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong",
  "details": {
    // Optional additional error details
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists (e.g., slug) |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting in production for:
- `/api/blogs/save` - Prevent spam
- `/api/upload` - Prevent storage abuse
- `/api/auth/verify-password` - Prevent brute force

---

## Data Validation

All endpoints use Zod schemas for validation. Common validation rules:

**Title:**
- Min: 1 character
- Max: 200 characters

**Slug:**
- Min: 1 character
- Max: 200 characters
- Format: lowercase letters, numbers, hyphens only
- Must be unique

**Excerpt:**
- Min: 10 characters
- Max: 500 characters

**Tags:**
- Min: 1 tag
- Max: 10 tags
- Each tag max: 50 characters

**Cover Image:**
- Must be valid URL
- Max length: 500 characters

---

## Best Practices

### Client-Side

1. **Error Handling:**
```typescript
try {
  const response = await fetch('/api/blogs/save', { /* ... */ });
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
    // Handle error
  }
} catch (error) {
  console.error('Network Error:', error);
  // Handle network error
}
```

2. **Debouncing Auto-saves:**
```typescript
const debouncedSave = debounce(async (content) => {
  await fetch('/api/blogs/draft', { /* ... */ });
}, 2000);
```

3. **Optimistic Updates:**
```typescript
// Update UI immediately
setBlogs(prev => [...prev, newBlog]);

// Then sync with server
const response = await fetch('/api/blogs/save', { /* ... */ });
if (!response.ok) {
  // Revert on error
  setBlogs(prev => prev.filter(b => b.id !== newBlog.id));
}
```

### Server-Side

1. **Always validate input:**
```typescript
const result = schema.safeParse(data);
if (!result.success) {
  return NextResponse.json({ error: result.error }, { status: 400 });
}
```

2. **Handle database errors gracefully:**
```typescript
const { data, error } = await supabase.from('blogs').select();
if (error) {
  console.error('Database error:', error);
  return NextResponse.json({ error: 'Server error' }, { status: 500 });
}
```

3. **Use proper HTTP methods:**
- GET: Retrieve data
- POST: Create new resource
- PATCH: Partial update
- DELETE: Remove resource

---

## Testing

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/verify-password \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}' \
  -c cookies.txt
```

**Create Blog:**
```bash
curl -X POST http://localhost:3000/api/blogs/save \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @blog-data.json
```

### Using Postman

1. Create environment with `baseUrl` variable
2. Set up authentication using Cookie storage
3. Use pre-request scripts for token management

---

## Support

For API issues:
1. Check response error messages
2. Review validation requirements
3. Verify authentication status
4. Check browser console and network tab
5. Review server logs

---

## Changelog

### v1.0.0 (Current)
- Initial API implementation
- Blog CRUD operations
- Authentication system
- Image upload
- Draft auto-save
- RSS feed generation

