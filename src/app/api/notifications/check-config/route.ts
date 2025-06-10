import { NextResponse } from 'next/server'
import admin from 'firebase-admin'

export async function GET() {
  try {
    // Check if we have the necessary environment variables
    const envCheck = {
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: !!process.env.FIREBASE_PRIVATE_KEY
    };
    
    // If any are missing, return detailed error
    if (!envCheck.projectId || !envCheck.clientEmail || !envCheck.privateKey) {
      return NextResponse.json({
        success: false,
        message: 'Missing Firebase configuration variables',
        details: {
          projectId: envCheck.projectId ? 'Found' : 'Missing',
          clientEmail: envCheck.clientEmail ? 'Found' : 'Missing',
          privateKey: envCheck.privateKey ? 'Found' : 'Missing'
        },
        suggestion: 'Check your .env.local file and ensure all Firebase credentials are properly set'
      });
    }
    
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      try {
        // Try a basic operation to validate the connection
        const app = admin.app();
        return NextResponse.json({
          success: true,
          message: 'Firebase Admin SDK is initialized and appears to be working correctly',
          appName: app.name,
          options: {
            projectId: app.options.projectId,
            databaseURL: app.options.databaseURL
          }
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: 'Firebase Admin SDK is initialized but encountered an error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    // If Firebase isn't initialized yet, return the status of variables
    return NextResponse.json({
      success: false,
      message: 'Firebase Admin SDK is not yet initialized, but all required environment variables are present',
      suggestion: 'Try restarting your server to apply the new environment variables'
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error checking Firebase configuration',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 