-- Create function to increment blog views atomically
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blogs
  SET views = COALESCE(views, 0) + 1,
      "updatedAt" = NOW()
  WHERE id = blog_id;
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION increment_blog_views(UUID) TO anon, authenticated;


