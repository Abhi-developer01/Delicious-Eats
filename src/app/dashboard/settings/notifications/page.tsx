'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { requestNotificationPermission, sendTestNotification } from '@/lib/firebase-messaging'
import { useAuth } from '@/components/auth-context'
import { supabase } from '@/lib/supabase'
import { Bell, BellOff, BellRing, Mail, MessageSquare, AlertCircle, Settings } from 'lucide-react'

export default function NotificationsPage() {
  const { user, profile } = useAuth()
  const [status, setStatus] = useState<'loading' | 'disabled' | 'enabled' | 'denied'>('loading')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setStatus(profile.fcm_token ? 'enabled' : 'disabled')
      
      // Check if notifications are denied
      if ('Notification' in window && Notification.permission === 'denied') {
        setStatus('denied')
      }
    }
  }, [profile])

  const enableNotifications = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      console.log('Enabling notifications for user:', user.id)
      const token = await requestNotificationPermission()
      console.log('FCM token received:', token)
      
      if (token) {
        console.log('Updating FCM token in database...')
        const { error } = await supabase
          .from('profiles')
          .update({ fcm_token: token })
          .eq('id', user.id)
        
        if (error) {
          console.error('Error updating FCM token:', error)
          throw error
        }
        
        setStatus('enabled')
        console.log('Notifications enabled successfully')
      } else {
        // Check if permissions were denied
        if ('Notification' in window && Notification.permission === 'denied') {
          setStatus('denied')
        } else {
          setStatus('disabled')
        }
        console.error('Failed to get FCM token')
      }
    } catch (error) {
      console.error('Error enabling notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const openBrowserSettings = () => {
    // Instructions to guide users to browser settings
    alert('To enable notifications:\n\n' +
      '1. Click the lock/site info icon in your browser\'s address bar\n' +
      '2. Find "Notifications" in the site permissions\n' +
      '3. Change the setting to "Allow"\n' +
      '4. Refresh this page and try again')
  }

  // Add test notification function
  const handleTestNotification = async () => {
    try {
      // Try the local notification first
      const success = await sendTestNotification()
      
      // Also try the API with testMode to verify server-side setup
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Notification',
          message: 'This is a test notification from the server.',
          testMode: true
        }),
      })
      
      const data = await response.json()
      
      if (!success && !data.success) {
        alert('Could not send test notification. Please make sure notifications are enabled.')
      }
    } catch (error) {
      console.error('Error sending test notification:', error)
      alert('Error sending test notification. Please check console for details.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-orange-500" />
            <CardTitle>Push Notifications</CardTitle>
          </div>
          <CardDescription>
            Get notified about new promotions, offers, and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  {status === 'enabled' ? (
                    <BellRing className="mr-2 h-5 w-5 text-green-500" />
                  ) : status === 'denied' ? (
                    <BellOff className="mr-2 h-5 w-5 text-red-500" />
                  ) : (
                    <BellOff className="mr-2 h-5 w-5 text-yellow-500" />
                  )}
                  <p className="font-medium">Push Notifications</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {status === 'enabled' 
                    ? 'Push notifications are enabled' 
                    : status === 'denied'
                    ? 'Notifications are blocked by your browser'
                    : 'Enable push notifications to get updates'}
                </p>
              </div>
              {status === 'denied' ? (
                <Button 
                  onClick={openBrowserSettings}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Fix Permissions
                </Button>
              ) : (
                <Button 
                  onClick={enableNotifications} 
                  disabled={loading || status === 'enabled'}
                  className={status === 'enabled' ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  {loading ? 'Processing...' : status === 'enabled' ? 'Enabled' : 'Enable'}
                </Button>
              )}
            </div>
            
            {status === 'enabled' && (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
                  <AlertCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">
                    Push notifications are enabled. You will receive updates about promotions, new items, and special offers.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleTestNotification} 
                    variant="outline" 
                    size="sm"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Send Test Notification
                  </Button>
                </div>
              </div>
            )}

            {status === 'denied' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="mb-2">Notifications are blocked by your browser settings. To enable:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Click the lock/site info icon in your browser's address bar</li>
                    <li>Find "Notifications" in the site permissions</li>
                    <li>Change the setting to "Allow"</li>
                    <li>Refresh this page and try again</li>
                  </ol>
                </div>
              </div>
            )}

            {status === 'disabled' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                <AlertCircle className="mr-2 h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Push notifications are currently disabled. Click the Enable button to receive updates about promotions and offers.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-orange-500" />
            <CardTitle>Email Notifications</CardTitle>
          </div>
          <CardDescription>
            Control which emails you receive from us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'Order Updates', desc: 'Receive updates about your orders', icon: <MessageSquare className="h-5 w-5" /> },
              { title: 'Promotions', desc: 'Get notified about special offers and promotions', icon: <Bell className="h-5 w-5" /> },
              { title: 'Newsletter', desc: 'Receive our monthly newsletter', icon: <Mail className="h-5 w-5" /> }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b last:border-0">
                <div className="flex items-start">
                  <div className="mr-3 text-gray-500 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 