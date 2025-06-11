'use client'

import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function InAppBrowserBlocker() {
  const [isLinkedIn, setIsLinkedIn] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    const userAgent = navigator.userAgent
    // A simple check for LinkedIn's in-app browser
    if (/linkedin/i.test(userAgent)) {
      setIsLinkedIn(true)
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl)
    alert('URL copied to clipboard!')
  }

  if (!isLinkedIn) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unsupported Browser</h1>
        <p className="text-gray-600 mb-6">
          To sign in with Google and use all features of our app, please open this page in your device's main browser (like Chrome, Safari, or Firefox).
        </p>
        <p className="text-gray-600 mb-8">
          LinkedIn's in-app browser does not support secure sign-in with Google.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <p className="font-semibold">1. Tap the three dots (•••) in the top-right corner.</p>
          <p className="font-semibold">2. Select "Open in Browser".</p>
        </div>
        <div className="mt-8">
            <p className="text-gray-500 text-sm mb-2">Or copy the link below:</p>
            <div className="flex items-center justify-center gap-2 rounded-md border bg-gray-50 p-2">
                <span className="text-sm text-gray-700 truncate">{currentUrl}</span>
                <Button onClick={handleCopy} size="sm" variant="ghost">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
