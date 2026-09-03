-- Migration: Create contact_submissions table with Row Level Security (RLS) & Hardened Security Grants
-- Description: Secure storage for portfolio contact messages submitted by anonymous visitors.

CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL CONSTRAINT name_not_empty CHECK (char_length(trim(name)) > 0),
    email VARCHAR(100) NOT NULL CONSTRAINT email_not_empty CHECK (char_length(trim(email)) > 0),
    message VARCHAR(2000) NOT NULL CONSTRAINT message_not_empty CHECK (char_length(trim(message)) > 0),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Revoke all default table permissions from public roles
REVOKE ALL ON TABLE public.contact_submissions FROM PUBLIC, anon, authenticated;

-- Grant ONLY INSERT privileges to public (anon) and authenticated roles
GRANT INSERT ON TABLE public.contact_submissions TO anon, authenticated;

-- Policy: Allow anonymous and authenticated visitors to submit messages (INSERT only) with strict input validation
DROP POLICY IF EXISTS "Allow public insert to contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow public insert to contact_submissions"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(name)) > 0 AND char_length(name) <= 100 AND
        char_length(trim(email)) > 0 AND char_length(email) <= 100 AND
        char_length(trim(message)) > 0 AND char_length(message) <= 2000
    );

-- Explicitly ensure NO SELECT, UPDATE, or DELETE policies exist for anon/authenticated visitors.
-- Only the Supabase service-role key or Dashboard admin role has SELECT/DELETE access.
