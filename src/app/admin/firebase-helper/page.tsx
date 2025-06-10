'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export default function FirebaseHelperPage() {
  const [privateKey, setPrivateKey] = useState('')
  const [formattedKey, setFormattedKey] = useState('')
  const { toast } = useToast()

  const formatPrivateKey = () => {
    if (!privateKey) {
      toast({
        title: 'Error',
        description: 'Please enter a private key to format',
      })
      return
    }

    try {
      // Remove any existing quotes and newlines
      let cleanKey = privateKey.replace(/["']/g, '').trim()
      
      // Replace literal \n with actual newlines for display
      cleanKey = cleanKey.replace(/\\n/g, '\n')
      
      // Format for .env file (with quotes and escaped newlines)
      const envFormatted = `FIREBASE_PRIVATE_KEY="${cleanKey.replace(/\n/g, '\\n')}"`
      
      setFormattedKey(envFormatted)
      
      toast({
        title: 'Success',
        description: 'Private key formatted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to format private key',
      })
    }
  }

  const copyToClipboard = () => {
    if (!formattedKey) return
    
    navigator.clipboard.writeText(formattedKey)
    toast({
      title: 'Copied',
      description: 'Formatted key copied to clipboard',
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Firebase Credential Helper</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Format Firebase Private Key</CardTitle>
          <CardDescription>
            Properly format your Firebase private key for use in .env.local file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Paste your raw private key from the Firebase service account JSON
            </label>
            <Textarea
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEF..."
              className="h-40"
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={formatPrivateKey}>Format Key</Button>
          </div>
          
          {formattedKey && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Formatted key for .env.local
              </label>
              <div className="bg-gray-50 p-3 rounded-md">
                <pre className="text-xs whitespace-pre-wrap break-all">{formattedKey}</pre>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="outline" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Firebase Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">1. Create a Firebase Service Account</h3>
              <ol className="list-decimal list-inside text-gray-600 mt-2 ml-4 space-y-2">
                <li>Go to the Firebase Console</li>
                <li>Select your project</li>
                <li>Go to Project Settings → Service accounts</li>
                <li>Click "Generate new private key"</li>
                <li>Download the JSON file</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">2. Add credentials to .env.local</h3>
              <p className="text-gray-600 mt-2">
                Open the downloaded JSON file and add these values to your .env.local file:
              </p>
              <pre className="bg-gray-50 p-3 rounded-md mt-2 text-xs">
{`# Firebase Admin SDK
FIREBASE_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
# Use the helper above to format your private key correctly
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">3. Restart Your Development Server</h3>
              <p className="text-gray-600 mt-2">
                After updating the .env.local file, restart your development server to apply the changes.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.href = '/admin/notifications'} className="w-full">
            Return to Notifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 