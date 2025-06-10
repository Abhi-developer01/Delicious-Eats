# Push Notification Setup Guide

This guide explains how to set up the push notification system for your Food Ordering application.

## Prerequisites

1. A Firebase project
2. Access to the Firebase Console
3. A Supabase project (for user management)

## Step 1: Configure Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Navigate to Project Settings (gear icon in the top left)

### Web App Configuration

1. In Project Settings, scroll down to "Your apps"
2. If you don't have a web app, click the web icon to add one
3. Register your app with a nickname and click "Register app"
4. Copy the Firebase configuration object
5. Add the configuration values to your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Generate VAPID Key

1. In Project Settings, go to the "Cloud Messaging" tab
2. Scroll down to "Web configuration"
3. Click "Generate key pair" in the Web Push certificates section
4. Copy the generated key
5. Add it to your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your-vapid-key
```

## Step 2: Configure Firebase Admin SDK

To send notifications from your server, you need to set up the Firebase Admin SDK:

1. In Project Settings, go to the "Service accounts" tab
2. Click "Generate new private key"
3. Save the JSON file (keep it secret!)
4. Extract the `client_email` and `private_key` values from the JSON
5. Add them to your `.env.local` file:

```
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key goes here\n-----END PRIVATE KEY-----\n"
```

**Note:** Make sure to keep the quotes around the private key and preserve all newlines with `\n`.

## Step 3: Enable Cloud Messaging API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to "APIs & Services" > "Library"
4. Search for "Firebase Cloud Messaging API"
5. Click on it and make sure it's enabled

## Step 4: Update Database Schema

Make sure your Supabase database has an `fcm_token` field in the `profiles` table:

```sql
ALTER TABLE profiles ADD COLUMN fcm_token TEXT;
```

## Step 5: Test the Setup

1. Use the Test Mode in the dashboard to verify everything is working without sending actual notifications
2. If everything looks good, turn off Test Mode and send a real notification to all users

## Troubleshooting

### Firebase Admin SDK Initialization Error

If you see "Firebase Admin SDK is not properly initialized", check:

1. The `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` in your `.env.local` file
2. Make sure the private key includes all newlines as `\n` and is surrounded by quotes
3. Restart your development server after changing environment variables

### No FCM Tokens Found

If you see "No recipients with valid FCM tokens found", it means:

1. No users have given notification permission in their browser
2. Or users have granted permission, but the FCM tokens aren't saved in the database

### Browser Permissions

If users aren't receiving notifications, check:

1. Browser notifications are enabled (chrome://settings/content/notifications)
2. The website has notification permission
3. Service Worker is registered correctly

## Using Notification Settings

Users can manage their notification settings at:

- `/dashboard/settings/notifications`

## Testing Push Notifications

1. Go to `/dashboard/notifications`
2. Fill in the notification form
3. Toggle Test Mode off to send real notifications
