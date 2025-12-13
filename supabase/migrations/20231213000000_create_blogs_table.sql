-- Create blog_status enum type
CREATE TYPE blog_status AS ENUM ('draft', 'published');

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt VARCHAR(500) NOT NULL,
  author VARCHAR(100) NOT NULL,
  "publishedAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  status blog_status NOT NULL DEFAULT 'draft',
  "coverImage" TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  "readTime" INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Add constraints
  CONSTRAINT valid_slug CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT valid_read_time CHECK ("readTime" > 0),
  CONSTRAINT valid_views CHECK (views >= 0),
  CONSTRAINT valid_tags CHECK (array_length(tags, 1) BETWEEN 1 AND 10)
);

-- Create indexes for better query performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_published_at ON blogs("publishedAt" DESC NULLS LAST);
CREATE INDEX idx_blogs_views ON blogs(views DESC);
CREATE INDEX idx_blogs_featured ON blogs(featured) WHERE featured = TRUE;
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags);
CREATE INDEX idx_blogs_category ON blogs(category) WHERE category IS NOT NULL;

-- Create a function to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updatedAt
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create a function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs
  SET views = views + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read published blogs
CREATE POLICY "Allow public read access to published blogs"
  ON blogs
  FOR SELECT
  USING (status = 'published');

-- Create policy to allow authenticated users to read all blogs (including drafts)
CREATE POLICY "Allow authenticated users to read all blogs"
  ON blogs
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to insert blogs
CREATE POLICY "Allow authenticated users to insert blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update blogs
CREATE POLICY "Allow authenticated users to update blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete blogs
CREATE POLICY "Allow authenticated users to delete blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Add comment to table
COMMENT ON TABLE blogs IS 'Stores blog posts with rich text content';
COMMENT ON COLUMN blogs.content IS 'Rich text content in JSON format from the editor (Tiptap/Lexical)';
COMMENT ON COLUMN blogs.slug IS 'URL-friendly slug for the blog post';
COMMENT ON COLUMN blogs.excerpt IS 'Short summary/preview of the blog post';
COMMENT ON COLUMN blogs."readTime" IS 'Estimated read time in minutes';
COMMENT ON COLUMN blogs.views IS 'Number of times the blog post has been viewed';

