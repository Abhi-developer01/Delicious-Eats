'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [testMode, setTestMode] = useState(true)
  const [configStatus, setConfigStatus] = useState<null | { ok: boolean; message: string }>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          link,
          testMode
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Success',
          description: testMode 
            ? 'Test notification processed successfully' 
            : `Notification sent to ${data.userCount} users`,
        })
        setTitle('')
        setMessage('')
        setLink('')
      } else {
        throw new Error(data.message || 'Failed to send notifications')
      }
    } catch (error) {
      console.error('Error details:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send notifications',
      })
    } finally {
      setLoading(false)
    }
  }

  // Function to check Firebase configuration
  const checkFirebaseConfig = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications/check-config', {
        method: 'GET',
      })
      
      const data = await response.json()
      
      setConfigStatus({
        ok: data.success,
        message: data.message
      })
      
      toast({
        title: data.success ? 'Configuration Valid' : 'Configuration Issue',
        description: data.message,
      })
    } catch (error) {
      setConfigStatus({
        ok: false,
        message: error instanceof Error ? error.message : 'Failed to check configuration'
      })
      
      toast({
        title: 'Error',
        description: 'Failed to check Firebase configuration',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Send Push Notifications</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
          <CardDescription>Check if your Firebase configuration is valid</CardDescription>
        </CardHeader>
        <CardContent>
          {configStatus ? (
            <div className={`p-4 rounded-md ${configStatus.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <p className="font-medium">{configStatus.ok ? '✓ Firebase configured correctly' : '⚠ Configuration issue detected'}</p>
              <p className="text-sm mt-1">{configStatus.message}</p>
            </div>
          ) : (
            <p className="text-gray-600">Click the button below to check your Firebase configuration status.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={checkFirebaseConfig} 
            variant="outline" 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Checking...' : 'Check Firebase Configuration'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send Notification to All Users</CardTitle>
          <CardDescription>Create and send push notifications to all users with FCM tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Notification Title
              </label>
              <Input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Link (Optional)
              </label>
              <Input
                value={link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                placeholder="Enter URL (e.g., /dashboard)"
                type="text"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="test-mode"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
              />
              <label htmlFor="test-mode" className="cursor-pointer text-sm">
                Test Mode {testMode ? 
                  <span className="text-yellow-600 ml-1">(No actual notifications will be sent)</span> : 
                  <span className="text-green-600 ml-1">(Notifications will be sent to all users)</span>
                }
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : testMode ? 'Send Test Notification' : 'Send Notification'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Scheduled Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-gray-600">Notifications are automatically sent at:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>9:00 AM - Breakfast notification</li>
              <li>1:30 PM - Lunch notification</li>
              <li>8:00 PM - Dinner notification</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Test Mode Help</CardTitle>
          <CardDescription>Troubleshooting notification issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">About Test Mode</h3>
              <p className="text-gray-600 mt-1">
                Test mode is designed to help you verify your notification system without sending actual notifications to users.
                When enabled, the API will return success without attempting to communicate with Firebase.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">When to Use Test Mode</h3>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                <li>When setting up the notification system for the first time</li>
                <li>When troubleshooting Firebase configuration issues</li>
                <li>When testing the notification form without disturbing users</li>
                <li>During development and testing phases</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Firebase Configuration</h3>
              <p className="text-gray-600 mt-1">
                To send actual notifications, you need proper Firebase credentials in your <code>.env.local</code> file.
                Make sure your project ID, client email, and private key are correctly set.
              </p>
              <div className="mt-2">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800" 
                  onClick={() => window.location.href = '/admin/firebase-helper'}
                >
                  Use Firebase Helper Tool →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 