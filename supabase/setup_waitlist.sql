ALTER TABLE "flekvar/waitlist" RENAME TO waitlist;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow public inserts" ON waitlist;

CREATE POLICY "allow public inserts"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "allow public reads" ON waitlist;

CREATE POLICY "allow public reads"
ON waitlist
FOR SELECT
TO anon
USING (true);
