-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anyone can join the waitlist)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (you can view the list)
CREATE POLICY "Allow public reads" ON waitlist
  FOR SELECT USING (true);

-- Optional: Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Optional: Create an index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at); 