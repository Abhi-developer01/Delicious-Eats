'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminEmailNotificationsPage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [testMode, setTestMode] = useState(true) // Default to test mode
  const [forceRealEmail, setForceRealEmail] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [lastResult, setLastResult] = useState<null | { isTest: boolean; success: boolean; message: string }>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPreviewUrl('')
    setLastResult(null)

    // Validate test email if in test mode
    if (testMode && !testEmail) {
      toast({
        title: 'Error',
        description: 'Please enter a test email address when using test mode',
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/email-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          link,
          testMode,
          testEmail: testMode ? testEmail : undefined,
          forceRealEmail
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Success',
          description: data.message || (testMode 
            ? 'Test email sent successfully' 
            : `Emails sent to ${data.userCount} users`),
        })
        console.log("gidedwyuidgfigdwyuifgdiwfgiwgfigwfig")
        
        // Save the result
        setLastResult({
          isTest: data.isTest || false,
          success: true,
          message: data.message
        })
        
        // If there's a preview URL (for test emails), save it
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl)
        }
        
        if (!testMode) {
          setTitle('')
          setMessage('')
          setLink('')
        }
      } else {
        throw new Error(data.message || 'Failed to send email notifications')
      }
    } catch (error) {
      console.error('Error details:', error)
      
      setLastResult({
        isTest: false,
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email notifications'
      })
      
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send email notifications',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Send Email Notifications</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Notification</CardTitle>
          <CardDescription>Send emails to all users or test with a single email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Subject
              </label>
              <Input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Enter email subject"
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
                placeholder="Enter email message content"
                required
                className="min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Call to Action Link (Optional)
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
                  <span className="text-yellow-600 ml-1">(Send to test email only)</span> : 
                  <span className="text-green-600 ml-1">(Send to all users)</span>
                }
              </label>
            </div>
            
            {testMode && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Test Email Address
                </label>
                <Input
                  value={testEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestEmail(e.target.value)}
                  placeholder="Enter your email for testing"
                  type="email"
                  required={testMode}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="force-real"
                checked={forceRealEmail}
                onChange={(e) => setForceRealEmail(e.target.checked)}
                className="h-4 w-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
              />
              <label htmlFor="force-real" className="cursor-pointer text-sm">
                Force Real Delivery
                <span className="text-red-600 ml-1">
                  (Only enable if your email configuration is set up)
                </span>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : testMode ? 'Send Test Email' : 'Send Email to All Users'}
            </Button>
          </form>
          
          {lastResult && (
            <div className={`mt-6 p-4 border rounded-md ${lastResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start">
                {lastResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium text-sm">
                    {lastResult.success ? 'Email Processed Successfully' : 'Email Delivery Issue'}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{lastResult.message}</p>
                  
                  {lastResult.isTest && (
                    <p className="text-xs text-amber-600 mt-1">
                      <strong>Important:</strong> Email was processed using Ethereal (test service).
                      {!previewUrl && ' No actual emails were delivered to recipients.'}
                    </p>
                  )}
                  
                  {!lastResult.isTest && lastResult.success && (
                    <p className="text-xs text-green-600 mt-1">
                      <strong>Success:</strong> Real emails were sent through your configured email provider.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {previewUrl && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="font-medium text-sm mb-2">Test Email Preview</h3>
              <p className="text-xs text-gray-600 mb-2">
                Your email was sent using Ethereal (a test service). View the test email here:
              </p>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View Test Email
              </a>
              <p className="text-xs text-gray-500 mt-2 italic">
                This is a preview only. No actual email was delivered to the recipient's inbox.
                To send real emails, configure your email settings and enable "Force Real Delivery".
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>Set up your email provider</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            To send real emails, you need to configure the following environment variables in your <code>.env.local</code> file:
          </p>
          
          <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
            <pre className="text-xs">
{`# Email Configuration
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=587                # Or try 465 if you have SSL issues
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=food-ordering@example.com
EMAIL_SECURE=false           # Set to true if using port 465`}
            </pre>
          </div>
          
          <p className="text-gray-600 mt-4">
            Without these variables, or if there's a connection issue, the system will use Ethereal Email (a test service) which doesn&apos;t actually deliver emails 
            but provides preview links.
          </p>
          
          <div className="mt-4 border-l-4 border-blue-500 bg-blue-50 p-4">
            <h3 className="font-medium text-blue-700">Gmail Setup Instructions:</h3>
            <ol className="list-decimal ml-5 text-sm text-gray-700 mt-2 space-y-1">
              <li>Go to your Google Account settings</li>
              <li>Turn on 2-Step Verification if not already enabled</li>
              <li>Go to "Security" → "App passwords"</li>
              <li>Create a new app password for "Mail"</li>
              <li>Copy the 16-character password (without spaces)</li>
              <li>Use this as your EMAIL_PASSWORD</li>
            </ol>
          </div>
          
          <div className="mt-4 border-l-4 border-amber-500 bg-amber-50 p-4">
            <h3 className="font-medium text-amber-700">SSL/TLS Connection Issues:</h3>
            <p className="text-sm text-gray-700 mt-2">
              If you see "wrong version number" errors, try these fixes:
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 mt-2 space-y-1">
              <li>If using port 587, set EMAIL_SECURE=false</li>
              <li>If using port 465, set EMAIL_SECURE=true</li>
              <li>Try switching ports (587 ↔ 465)</li>
              <li>Verify your email provider allows app access</li>
              <li>Check if your email provider requires special settings</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.href = '/admin'} className="w-full">
            Return to Admin Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 