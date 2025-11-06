-- Create links table for URL shortening
CREATE TABLE IF NOT EXISTS public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  long_url TEXT NOT NULL,
  short_code TEXT NOT NULL UNIQUE,
  clicks INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on short_code for fast lookups
CREATE INDEX IF NOT EXISTS idx_links_short_code ON public.links(short_code);

-- Enable Row Level Security (RLS)
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert links (public shortener)
CREATE POLICY "Anyone can create short links"
  ON public.links
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read links (needed for redirects)
CREATE POLICY "Anyone can read links"
  ON public.links
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to update click counts
CREATE POLICY "Anyone can update clicks"
  ON public.links
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);