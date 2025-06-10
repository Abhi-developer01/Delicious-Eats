# Push Notification System Documentation

This document provides an overview of the push notification system in the Food Ordering application.

## System Overview

The application uses Firebase Cloud Messaging (FCM) to send push notifications to users. The system includes:

1. **Client-side components**: For subscribing to notifications and displaying them
2. **Admin interface**: For sending manual notifications
3. **Server-side API endpoint**: For processing notification requests
4. **Scheduled notifications**: Automatic notifications at specified times

## Testing Mode

The notification system includes a testing mode that allows you to verify the notification workflow without actually sending notifications to users. This is useful during development, testing, and when troubleshooting Firebase configuration issues.

### How Testing Mode Works

When test mode is enabled:

- The notification API will bypass Firebase sending
- It will return success responses without attempting to communicate with Firebase
- You can test the full notification workflow without affecting users

### When to Use Testing Mode

- During initial setup and development
- When troubleshooting Firebase configuration issues
- When making changes to the notification system
- Before sending actual notifications to users

## Firebase Configuration

To send actual notifications, you need to configure Firebase properly:

1. Set up a Firebase project and enable Firebase Cloud Messaging
2. Create a service account with the necessary permissions
3. Configure the following environment variables in `.env.local`:

```
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your-vapid-key

# Firebase Admin SDK
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key goes here\n-----END PRIVATE KEY-----\n"
```

## Components

### 1. Admin Notifications Page

Located at `/admin/notifications`, this page allows administrators to:

- Send manual notifications to all users
- Test the notification system without sending actual notifications
- View information about scheduled notifications

### 2. Notification Settings Page

Located at `/dashboard/settings/notifications`, this page allows users to:

- Enable or disable push notifications
- Send a test notification to their device
- Manage notification preferences

### 3. API Endpoint

The `/api/notifications` endpoint processes notification requests:

- It can operate in test mode or actual sending mode
- It retrieves user FCM tokens from the Supabase database
- It sends notifications via Firebase Cloud Messaging
- It handles errors gracefully and provides detailed responses

## Troubleshooting

### Common Issues

1. **No FCM tokens found**

   - Ensure users have granted notification permissions
   - Check that the service worker is correctly registering tokens
   - Verify tokens are being stored in the Supabase database

2. **Firebase initialization errors**

   - Check that all environment variables are correctly set
   - Verify the private key format (including newlines)
   - Confirm the project ID matches in all locations

3. **Notification permissions**
   - Users must explicitly grant permission to receive notifications
   - The permission prompt should be triggered at an appropriate time

### Debugging Tools

- Check the browser console for client-side errors
- Review server logs for API endpoint errors
- Use test mode to isolate issues between client and server components

## Further Improvements

Potential enhancements to the notification system:

1. **User segmentation**: Send notifications to specific user groups
2. **Notification templates**: Create and reuse common notification formats
3. **Schedule management**: Interface for managing scheduled notifications
4. **Analytics**: Track notification open rates and engagement
