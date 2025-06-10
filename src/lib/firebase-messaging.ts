import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import app from './firebase'

// Initialize Firebase Messaging
const messaging = app ? getMessaging(app) : null

export async function requestNotificationPermission() {
  try {
    if (!messaging) {
      // console.error('Firebase messaging not initialized. Check if Firebase app is properly initialized.')
      return null
    }

    // Check if notifications are already denied
    if ('Notification' in window && Notification.permission === 'denied') {
      // console.log('Notification permission previously denied by user')
      return null
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        // console.log('Service Worker registered with scope:', registration.scope)
      } catch (error) {
        // console.error('Service Worker registration failed:', error)
        return null
      }
    } else {
      console.error('Service Worker not supported')
      return null
    }

    // console.log('Requesting notification permission...')
    const permission = await Notification.requestPermission()
    // console.log('Notification permission status:', permission)

    if (permission !== 'granted') {
      console.log('Notification permission denied')
      return null
    }

    // console.log('Getting FCM token...')
    // console.log('VAPID Key:', process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY)
    
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: await navigator.serviceWorker.ready
      })

      if (!token) {
        console.error('No registration token available')
        return null
      }

      // console.log('FCM token generated successfully:', token)
      return token
    } catch (tokenError) {
      console.error('Error getting FCM token:', tokenError)
      return null
    }
  } catch (error) {
    console.error('Error in requestNotificationPermission:', error)
    return null
  }
}

// Create a test notification function to verify notifications are working
export async function sendTestNotification() {
  try {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications')
      return false
    }
    
    if (Notification.permission !== 'granted') {
      console.error('Notification permission not granted')
      return false
    }
    
    const registration = await navigator.serviceWorker.ready
    
    await registration.showNotification('Test Notification', {
      body: 'This is a test notification to verify your setup is working.',
      icon: '/notification-icon.svg',
      badge: '/notification-badge.svg',
    })
    
    // console.log('Test notification sent successfully')
    return true
  } catch (error) {
    console.error('Error sending test notification:', error)
    return false
  }
}

export function onMessageListener() {
  if (!messaging) {
    console.error('Firebase messaging not initialized')
    return null
  }

  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload)
      resolve(payload)
    })
  })
} 