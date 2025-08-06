-- Add new columns to calendar_events table
ALTER TABLE calendar_events
ADD COLUMN location TEXT,
ADD COLUMN description TEXT,
ADD COLUMN contact_id UUID,
ADD COLUMN contact_type TEXT CHECK (contact_type IN ('buyer', 'seller', 'investor'));
