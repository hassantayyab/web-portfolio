# Blog System Quick Start Guide

Fast-track guide to get your blog system up and running.

---

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```bash
# Copy from .env.example if it exists, or create new:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD_HASH=your_bcrypt_hash
JWT_SECRET=your_jwt_secret
```

**Quick Hash Generation:**

```bash
# Install bcrypt-cli globally
npm install -g bcrypt-cli

# Hash your password
bcrypt-cli "your-password"

# Generate JWT secret
openssl rand -base64 32
```

### 3. Set Up Database

Go to Supabase Dashboard → SQL Editor and run:

```sql
-- Create table
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

-- Create function
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;
```

### 4. Create Storage Bucket

1. Go to Supabase → Storage
2. Create bucket: `blog-images`
3. Make it **Public**

### 5. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📝 Create Your First Blog Post

### Step 1: Login

1. Navigate to `/admin/login`
2. Enter your admin password
3. Click "Login"

### Step 2: Create Blog

1. Click "New Blog Post" on dashboard
2. Fill in:
   - **Title**: "My First Blog Post"
   - **Slug**: Auto-generated (editable)
   - **Cover Image**: Upload or paste URL
   - **Excerpt**: Brief summary (max 500 chars)
   - **Tags**: Add at least one (press Enter)
   - **Category**: Optional
3. Write content in the rich text editor
4. Click "Save Draft" or "Publish"

### Step 3: View Blog

1. If published, click "View" button
2. Or navigate to `/blogs/your-slug`

---

## 🎨 Using the Editor

### Basic Formatting

- **Bold**: Cmd/Ctrl + B
- **Italic**: Cmd/Ctrl + I
- **Underline**: Cmd/Ctrl + U
- **Code**: Cmd/Ctrl + E

### Headings

Type `#` followed by space for H1
Type `##` for H2, `###` for H3, etc.

### Lists

- Ordered: Type `1.` followed by space
- Unordered: Type `-` or `*` followed by space

### Links

1. Select text
2. Press Cmd/Ctrl + K
3. Enter URL
4. Press Enter

### Images

1. Click image icon in toolbar
2. Choose:
   - **Upload**: Select file (max 5MB)
   - **URL**: Paste image URL
3. Add alt text (optional)

### Code Blocks

1. Type ` ``` ` followed by language name
2. Type your code
3. Type ` ``` ` to close

Example:

```
\`\`\`javascript
console.log('Hello, World!');
\`\`\`
```

### Tables

1. Click table icon
2. Choose dimensions
3. Fill in cells
4. Use toolbar to add/remove rows/columns

---

## 🔧 Common Tasks

### Edit a Blog

1. Go to `/admin/blog-editor`
2. Find your blog
3. Click "Edit"
4. Make changes
5. Click "Update"

### Delete a Blog

1. Go to dashboard
2. Find blog
3. Click "Delete"
4. Confirm

### Publish a Draft

1. Dashboard → Find draft
2. Click "Publish" button
3. Confirm

### Unpublish a Blog

1. Dashboard → Find published blog
2. Click "Unpublish"
3. Confirm

---

## 🔍 Search & Filter

### On Blog Listing Page

- **Search**: Type in search box
- **Filter by Tag**: Click a tag
- **Sort**: Use dropdown (Latest/Oldest/Popular)

### On Dashboard

- **Search**: Search bar at top
- **Filter**: Dropdown (All/Published/Draft)
- **Sort**: Latest/Oldest/Views

---

## 🐛 Troubleshooting

### Can't Login

- Verify `ADMIN_PASSWORD_HASH` in `.env.local`
- Check browser console for errors
- Try clearing cookies

### Images Won't Upload

- Verify Supabase Storage bucket exists
- Check bucket is public
- Verify file size < 5MB

### Blog Not Showing on Homepage

- Make sure blog is **Published**
- Set **Featured** flag to true
- Refresh the page

### Auto-Save Not Working

- Check network tab for errors
- Verify you're logged in
- Check browser console

---

## 📚 Keyboard Shortcuts

| Action    | Shortcut                          |
| --------- | --------------------------------- |
| Bold      | Cmd/Ctrl + B                      |
| Italic    | Cmd/Ctrl + I                      |
| Underline | Cmd/Ctrl + U                      |
| Code      | Cmd/Ctrl + E                      |
| Link      | Cmd/Ctrl + K                      |
| Undo      | Cmd/Ctrl + Z                      |
| Redo      | Cmd/Ctrl + Shift + Z              |
| Save      | Cmd/Ctrl + S (triggers auto-save) |

---

## 🌐 URLs Reference

| Page            | URL                       |
| --------------- | ------------------------- |
| Home            | `/`                       |
| All Blogs       | `/blogs`                  |
| Individual Blog | `/blogs/[slug]`           |
| Create Blog     | `/blogs/create`           |
| Admin Login     | `/admin/login`            |
| Dashboard       | `/admin/blog-editor`      |
| Edit Blog       | `/admin/blog-editor/[id]` |
| RSS Feed        | `/blogs/rss.xml`          |

---

## 💡 Pro Tips

1. **Auto-Save**: Editor saves every 2 seconds - don't worry about losing work!
2. **Preview Mode**: Toggle preview before publishing to see final result
3. **SEO**: Add relevant tags - they become keywords for SEO
4. **Images**: Compress images before upload for better performance
5. **Excerpts**: Write compelling excerpts - they appear in listings
6. **Slugs**: Keep slugs short and descriptive (great for SEO)
7. **Categories**: Use consistent categories across posts
8. **Featured**: Mark best posts as featured for homepage

---

## 📖 Full Documentation

For detailed information:

- **System Overview**: `BLOG_SYSTEM_README.md`
- **API Reference**: `API_DOCUMENTATION.md`
- **Deployment**: `DEPLOYMENT_CHECKLIST.md`
- **Implementation**: `BLOG_IMPLEMENTATION_SUMMARY.md`

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review error messages in browser console
3. Check the full documentation
4. Verify environment variables are set
5. Check Supabase logs

---

## ✅ Quick Checklist

Before creating your first post:

- [ ] Environment variables set
- [ ] Database table created
- [ ] Storage bucket created
- [ ] Development server running
- [ ] Admin login working

---

**You're all set! Start creating amazing blog posts! 🎉**
