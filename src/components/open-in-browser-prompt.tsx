'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'

export default function OpenInBrowserPrompt() {
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <ExternalLink className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Switch Browser to Continue</h3>
        <p className="text-sm text-gray-600 mt-2">
          To sign in securely and use all features, please open this page in your phone's main browser (like Chrome or Safari).
        </p>
        <div className="mt-4 bg-gray-100 p-2 rounded-md text-sm text-gray-700 break-words">
          {currentUrl}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={handleCopy} className="w-full">
            <Copy className="mr-2 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Try to Open in Browser
            </Button>
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          In-app browsers can sometimes block secure sign-ins.
        </p>
      </div>
    </div>
  )
}
