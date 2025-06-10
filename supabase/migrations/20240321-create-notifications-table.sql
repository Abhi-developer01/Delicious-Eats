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