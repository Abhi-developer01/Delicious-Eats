'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { NotificationPopup } from '@/components/ui/notification-popup'
import { ToggleSwitch } from './toggle-switch'
import { useAuth } from '@/components/auth-context'

export function PushNotificationSender() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [sentTitle, setSentTitle] = useState('')
  const [sentMessage, setSentMessage] = useState('')
  const [testMode, setTestMode] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !message) {
      toast({
        title: 'Error',
        description: 'Please provide both a title and a message.'
      })
      return
    }
    
    setLoading(true)
    console.log('Sending notification with data:', {
      title,
      message,
      testMode,
      userId: user?.id
    });
    
    try {
      // Call the notification API endpoint
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          message,
          testMode,
          userId: user?.id
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from notifications API:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json()
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: testMode 
            ? 'Test notification processed successfully.'
            : `Notification sent to ${result.userCount} users.`
        })
        
        // Save notification content to display in popup
        setSentTitle(title)
        setSentMessage(message)
        
        // Show popup notification
        setShowPopup(true)
        
        // Clear the form
        setTitle('')
        setMessage('')
      } else {
        // Improved error handling for Firebase issues
        if (result.message?.includes('Firebase')) {
          throw new Error('Firebase Admin SDK is not properly configured. Please use test mode or set up Firebase credentials.')
        } else {
          throw new Error(result.message || 'Failed to send notification')
        }
      }
    } catch (error) {
      console.error('Error sending notification:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send notification'
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
      <NotificationPopup 
        title={sentTitle}
        message={sentMessage}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        autoClose={true}
        autoCloseTime={5000}
      />

      <Card>
        <CardHeader>
          <CardTitle>Send Push Notification</CardTitle>
          <CardDescription>
            Send a push notification to all users who have enabled notifications
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Notification Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <ToggleSwitch
                id="test-mode"
                checked={testMode}
                onCheckedChange={setTestMode}
              />
              <label
                htmlFor="test-mode"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Test Mode (No actual notifications will be sent)
              </label>
            </div>
            
            {testMode && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Test Mode Enabled</p>
                    <p className="mt-1">
                      Notifications are being processed in test mode. No actual notifications will be sent to users.
                    </p>
                    <p className="mt-1">
                      To send actual notifications, configure Firebase Admin SDK credentials in your environment variables and disable test mode.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : testMode ? 'Send Test Notification' : 'Send Notification'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
} 