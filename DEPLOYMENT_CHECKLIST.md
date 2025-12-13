# Blog System Deployment Checklist

Complete checklist for deploying the blog system to production.

---

## Pre-Deployment

### 1. Environment Variables ⚠️

Set these environment variables in your hosting platform (Vercel/Netlify):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com

# Admin Authentication
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
JWT_SECRET=your_secure_random_string_32_chars
```

**Generate Admin Password Hash:**
```bash
# Install bcrypt-cli
npm install -g bcrypt-cli

# Generate hash (replace 'your-password' with your actual password)
bcrypt-cli "your-password"

# Copy the output to ADMIN_PASSWORD_HASH
```

**Generate JWT Secret:**
```bash
# Generate a secure random string
openssl rand -base64 32

# Copy the output to JWT_SECRET
```

---

## Database Setup

### 2. Supabase Configuration ⚠️

#### A. Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy project URL and keys

#### B. Run Migrations
```sql
-- 1. Create blogs table
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

-- 2. Create indexes
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_published_at ON blogs("publishedAt");
CREATE INDEX idx_blogs_featured ON blogs(featured) WHERE featured = true;

-- 3. Create view increment function
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### C. Create Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create new bucket: `blog-images`
3. Set as **Public**
4. Configure policies:

```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload (for admin)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');
```

---

## Code Verification

### 3. Final Code Check ✅

- [x] No TypeScript errors
- [x] No linter errors
- [x] All imports resolved
- [x] Environment variables configured
- [ ] Build succeeds locally

**Test Build Locally:**
```bash
npm run build
```

---

## Deployment Steps

### 4. Vercel Deployment 🚀

#### Initial Setup
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or your project root)
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all variables from Pre-Deployment step
3. Set for: Production, Preview, Development

#### Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Verify deployment URL

---

## Post-Deployment Verification

### 5. Test Checklist 📋

#### Public Pages
- [ ] Home page loads
- [ ] Blog listing page loads (`/blogs`)
- [ ] Featured blogs appear on home page
- [ ] Individual blog post loads (`/blogs/[slug]`)
- [ ] 404 page for non-existent blogs
- [ ] RSS feed accessible (`/blogs/rss.xml`)

#### Admin Features
- [ ] Admin login works (`/admin/login`)
- [ ] Dashboard loads (`/admin/blog-editor`)
- [ ] Can create new blog post (`/blogs/create`)
- [ ] Can edit existing blog
- [ ] Can delete blog (test with test post)
- [ ] Can publish/unpublish blogs
- [ ] Logout works

#### Content Features
- [ ] Rich text editor loads
- [ ] Image upload works
- [ ] Auto-save functions
- [ ] Preview mode works
- [ ] Save draft works
- [ ] Publish works

#### Public Features
- [ ] Blog views increment
- [ ] Social sharing works
- [ ] Copy link works
- [ ] Search works
- [ ] Tag filtering works
- [ ] Sort options work
- [ ] Scroll to top works

#### SEO
- [ ] Meta tags present (check with View Source)
- [ ] Open Graph tags present
- [ ] Twitter Cards present
- [ ] JSON-LD structured data present
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Canonical URLs correct

#### Performance
- [ ] Images load properly
- [ ] Page load < 3 seconds
- [ ] Mobile responsive
- [ ] No console errors

---

## Performance Optimization

### 6. Lighthouse Audit 🔍

Run Lighthouse audit:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select: Performance, Accessibility, SEO
4. Generate report

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: 100

**Common Issues & Fixes:**
- Images not optimized → Use Next.js Image component
- Render blocking resources → Enable Next.js optimizations
- Missing alt text → Add to all images
- Low contrast → Check color scheme

---

## Security

### 7. Security Checklist 🔒

- [ ] ADMIN_PASSWORD_HASH uses strong password
- [ ] JWT_SECRET is truly random (32+ characters)
- [ ] Supabase RLS policies configured (if applicable)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] HTTP-only cookies used for auth
- [ ] No sensitive data in client-side code
- [ ] CORS configured properly
- [ ] Rate limiting considered for APIs

---

## Monitoring

### 8. Set Up Monitoring 📊

#### Vercel Analytics (Built-in)
1. Go to Project → Analytics
2. Enable Web Analytics
3. Monitor traffic and performance

#### Error Tracking (Optional)
Consider integrating:
- **Sentry**: For error tracking
- **LogRocket**: For session replay
- **PostHog**: For product analytics

---

## Maintenance

### 9. Regular Tasks 🔧

#### Daily
- Monitor error logs
- Check system status

#### Weekly
- Review blog analytics
- Check for broken links
- Monitor storage usage

#### Monthly
- Database backup (automatic with Supabase)
- Review and update dependencies
- Check Lighthouse scores
- Review security logs

---

## Backup & Recovery

### 10. Backup Strategy 💾

#### Supabase Backups
- Automatic daily backups (check your plan)
- Manual backups before major changes

#### Code Backups
- Git repository (GitHub)
- Keep deployment history in Vercel

#### How to Restore
1. Supabase: Use dashboard to restore from backup
2. Code: Revert to previous Git commit
3. Redeploy from Vercel

---

## Troubleshooting

### Common Issues

#### Build Fails
- Check environment variables are set
- Run `npm run build` locally first
- Check for TypeScript errors

#### Images Not Loading
- Verify Supabase Storage bucket is public
- Check CORS configuration
- Verify bucket name is `blog-images`

#### Authentication Not Working
- Verify ADMIN_PASSWORD_HASH is set correctly
- Check JWT_SECRET is set
- Verify cookies are working (check browser)

#### Database Errors
- Check Supabase connection
- Verify migrations ran successfully
- Check table permissions

#### 404 on Blog Posts
- Verify blog is published
- Check slug is correct
- Verify database query is working

---

## Support Resources

- **Documentation**: BLOG_SYSTEM_README.md
- **API Reference**: API_DOCUMENTATION.md
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

---

## Final Checklist

Before going live:

- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] Storage bucket configured
- [ ] Build succeeds
- [ ] Deployed to production
- [ ] All tests passed
- [ ] SEO verified
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Monitoring set up
- [ ] Team trained on admin dashboard
- [ ] Backup strategy in place

---

## Launch Day 🎉

1. **Verify** everything one more time
2. **Create** your first real blog post
3. **Share** on social media
4. **Monitor** for issues in first 24 hours
5. **Respond** to any feedback

---

**Remember**: Start with a soft launch, publish a test blog post, verify everything works, then announce to your audience!

**Good luck with your deployment! 🚀**

