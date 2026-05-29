-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "allow public inserts"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow counting rows
CREATE POLICY "allow public count"
ON waitlist
FOR SELECT
TO anon
USING (true);

-- Ensure email is unique
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique
ON waitlist(email);
