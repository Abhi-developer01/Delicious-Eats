# Supabase Database Setup for Notifications

This guide explains how to set up the database tables required for the push notification system.

## Prerequisites

1. A Supabase project
2. Access to the Supabase SQL Editor

## Setting up the Notifications Table

### Option 1: Using the SQL Editor

1. Go to the [Supabase Dashboard](https://app.supabase.io/)
2. Select your project
3. Navigate to the SQL Editor
4. Create a new query
5. Copy and paste the following SQL:

```sql
-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);

-- Add RLS policies for proper security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own notifications and broadcast notifications (where user_id is null)
CREATE POLICY "Users can read their own and broadcast notifications"
  ON notifications FOR SELECT
  USING (
    auth.uid() = user_id
    OR
    user_id IS NULL
  );

-- Policy for users to update only their own notifications
CREATE POLICY "Users can update only their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for admins to insert notifications for any user
CREATE POLICY "Admins can insert notifications"
  ON notifications FOR INSERT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'restaurant_owner'
  );

-- Admins can delete any notification
CREATE POLICY "Admins can delete notifications"
  ON notifications FOR DELETE
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'restaurant_owner'
  );
```

6. Click "Run" to execute the SQL

### Option 2: Using Migrations (Recommended for Development)

1. The migration file is already created at `supabase/migrations/20240321-create-notifications-table.sql`
2. If you're using Supabase CLI, run:
   ```bash
   supabase db reset
   ```
3. This will apply all migration files in the migrations directory

## Updating the User Profile Table

Ensure your `profiles` table has an `fcm_token` field to store Firebase Cloud Messaging tokens:

```sql
-- Check if the column exists first
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'profiles' AND column_name = 'fcm_token') THEN
        ALTER TABLE profiles ADD COLUMN fcm_token TEXT;
    END IF;
END $$;
```

## Testing the Setup

To test if your database is set up correctly:

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. You should see a "notifications" table
4. Try inserting a test notification:

```sql
INSERT INTO notifications (title, message, user_id)
VALUES ('Test Notification', 'This is a test notification', NULL);
```

5. Use the REST API to fetch notifications:
   ```bash
   curl -X GET "https://your-project-ref.supabase.co/rest/v1/notifications?order=created_at.desc&limit=10" \
     -H "apikey: YOUR_ANON_KEY" \
     -H "Authorization: Bearer USER_JWT_TOKEN"
   ```
