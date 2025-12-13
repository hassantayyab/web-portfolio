# Image Upload API

## Endpoint: `/api/upload`

Upload and optimize images for blog posts using Supabase Storage.

### Features

- ✅ Image validation (type and size)
- ✅ Automatic optimization using Sharp
- ✅ Resize large images (max 1920x1080)
- ✅ Format conversion and compression
- ✅ Unique filename generation
- ✅ Supabase Storage integration
- ✅ GIF animation preservation

### POST /api/upload

Upload a single image file.

**Request:**
```typescript
// Form data with file
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
```

**Response (Success):**
```json
{
  "success": true,
  "url": "https://your-project.supabase.co/storage/v1/object/public/blog-images/uploads/xyz.jpg",
  "fileName": "abc123.jpg",
  "fileSize": 245678,
  "fileType": "image/jpeg"
}
```

**Response (Error):**
```json
{
  "error": "File too large. Maximum size: 5MB"
}
```

### DELETE /api/upload

Delete an uploaded image.

**Request:**
```typescript
const response = await fetch('/api/upload?path=uploads/abc123.jpg', {
  method: 'DELETE',
});
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### Configuration

Located at the top of `route.ts`:

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const STORAGE_BUCKET = 'blog-images';
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;
```

### Setup Requirements

1. **Supabase Storage Bucket**
   - Create a bucket named `blog-images` in your Supabase project
   - Set it to public access for blog images
   - Configure CORS if needed

2. **Environment Variables**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Dependencies**
   ```bash
   npm install sharp nanoid
   ```

### Image Optimization

The API automatically:
- Resizes images larger than 1920px wide
- Converts PNGs to optimized PNGs (85% quality)
- Converts WebP to optimized WebP (85% quality)
- Converts other formats to JPEG (85% quality)
- Preserves GIF animations (no optimization)

### Error Handling

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | No file provided | Missing file in form data |
| 400 | Invalid file type | File type not in allowed list |
| 400 | File too large | File exceeds 5MB limit |
| 500 | Upload failed | Supabase storage error |
| 500 | Unexpected error | Other server errors |

### Usage in Editor

The upload API integrates seamlessly with the RichTextEditor:

```tsx
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

<RichTextEditor onImageUpload={handleImageUpload} />
```

### Security Considerations

- ✅ File type validation
- ✅ File size limits
- ✅ Unique filenames prevent overwrites
- ✅ Service role key kept server-side
- ⚠️ Consider adding authentication for production
- ⚠️ Consider rate limiting for production

