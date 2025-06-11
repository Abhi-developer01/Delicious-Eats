'use client'

import { useState, useEffect } from 'react'
import { isWebView } from '@/lib/browser-detector'
import OpenInBrowserPrompt from '@/components/open-in-browser-prompt'

export default function WebViewDetector({ children }: { children: React.ReactNode }) {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (isWebView()) {
      setShowPrompt(true)
    }
  }, [])

  return (
    <>
      {showPrompt && <OpenInBrowserPrompt />}
      {children}
    </>
  )
}
