import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import admin from 'firebase-admin'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialize Firebase Admin SDK
let firebaseInitialized = false;

if (!admin.apps.length) {
  try {
    // Log environment variables (partial, for security)
    console.log('Firebase initialization - Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    console.log('Firebase initialization - Client Email exists:', !!process.env.FIREBASE_CLIENT_EMAIL);
    console.log('Firebase initialization - Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);
    
    // Define the service account credentials
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "email-notification-5816a",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    };

    console.log('Firebase initialization - Using Project ID:', serviceAccount.projectId);
    console.log('Firebase initialization - Client Email length:', serviceAccount.clientEmail?.length);
    console.log('Firebase initialization - Private Key starts with:', 
      serviceAccount.privateKey?.substring(0, 27) + '...');

    // Check if we have all required credentials
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      throw new Error('Missing Firebase credentials - check environment variables');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
    });
    
    console.log('Firebase Admin SDK initialized successfully with project ID:', serviceAccount.projectId);
    firebaseInitialized = true;
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    firebaseInitialized = false;
  }
}

export async function POST(request: Request) {
  try {
    const { title, message, link, testMode = false, userId = null } = await request.json()
    
    console.log(`Processing notification request: Title=${title}, Test Mode=${testMode}`);

    // Validate required fields
    if (!title || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Title and message are required',
      }, { status: 400 });
    }

    // Store the notification in the database regardless of test mode
    try {
      // Prepare notification record to match your database schema
      const notificationRecord = {
        title,
        message,
        user_id: userId, // This should be the user ID for user-specific notifications or null for broadcasts
        sent_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        // read_at is left as null (unread)
      };

      console.log('Storing notification in database:', notificationRecord);
      
      // Insert into notifications table
      const { data: notification, error: dbError } = await supabase
        .from('notifications')
        .insert(notificationRecord)
        .select()
        .single();
      
      if (dbError) {
        console.error('Error storing notification in database:', dbError);
        return NextResponse.json({ 
          success: false, 
          message: 'Error storing notification in database: ' + dbError.message,
        }, { status: 500 });
      } else {
        console.log('Notification stored in database successfully:', notification);
      }
    } catch (dbError) {
      console.error('Error in database operation:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error in database operation: ' + (dbError instanceof Error ? dbError.message : 'Unknown error'),
      }, { status: 500 });
    }

    // If test mode, return success without actually sending FCM notifications
    if (testMode) {
      console.log('Test mode requested, bypassing FCM');
      return NextResponse.json({ 
        success: true, 
        message: 'Test notification processed and stored in database',
        userCount: 0,
        testMode: true
      });
    }

    // Check if Firebase is properly initialized
    if (!firebaseInitialized) {
      console.warn('Firebase Admin SDK is not initialized. Cannot send actual notifications.');
      return NextResponse.json({ 
        success: false, 
        message: 'Firebase Admin SDK is not properly initialized. Please check your configuration or use test mode.',
        help: 'Make sure you have set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your .env.local file and restarted the server.'
      }, { status: 500 });
    }

    // Get all users from the database
    console.log('Fetching users from Supabase...');
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, full_name, fcm_token')
      // If userId is provided, only fetch that specific user
      .eq(userId ? 'id' : 'id IS NOT NULL', userId || 'id IS NOT NULL');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error fetching users from database: ' + usersError.message,
      }, { status: 500 });
    }

    console.log(`Fetched ${users.length} users from Supabase`);

    // Filter out users without FCM tokens
    const tokens = users
      .map(user => user.fcm_token)
      .filter((token): token is string => !!token);

    console.log(`Found ${tokens.length} valid FCM tokens out of ${users.length} users`);

    // If no tokens available
    if (tokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Notification stored in database but no recipients with valid FCM tokens found',
        userCount: 0
      });
    }

    // Prepare the notification payload
    const payload = {
      notification: {
        title,
        body: message,
      }
    };
    
    console.log('Sending FCM notifications with payload:', payload);

    // Attempt to send notifications
    try {
      // Send notifications to all tokens
      const sendPromises = tokens.map(token => 
        admin.messaging().send({
          token,
          ...payload
        })
      );
      
      const results = await Promise.all(sendPromises);

      // Log successful notification
      console.log(`Successfully sent ${results.length} notifications`);

      return NextResponse.json({ 
        success: true, 
        message: 'Push notifications sent successfully and stored in database',
        userCount: tokens.length,
        results
      });
    } catch (fcmError) {
      console.error('Error sending FCM notifications:', fcmError);
      
      // Try to extract more detailed error information
      const errorMessage = fcmError instanceof Error 
        ? fcmError.message 
        : 'Unknown error during FCM notification delivery';
        
      const errorCode = fcmError instanceof Error && (fcmError as any).code 
        ? (fcmError as any).code 
        : 'unknown';
        
      return NextResponse.json({ 
        success: false, 
        message: 'Error sending FCM notifications: ' + errorMessage,
        errorCode,
        suggestion: 'Please verify your Firebase configuration or use test mode while troubleshooting'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in notifications API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing notification request: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
} 