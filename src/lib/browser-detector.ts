'use client'

export const isWebView = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

  // Common webview identifiers
  const webViewRules = [
    /wv\)/, // Android WebView
    /linkedin/i, // LinkedIn
    /fban/i, // Facebook
    /fbav/i,
    /instagram/i,
    /twitter/i,
    /pinterest/i,
    /gsa/i, // Google Search App
  ]

  // Check for iOS webview
  const isIOS = /ip(ad|hone|od)/.test(userAgent)
  if (isIOS && !/safari/.test(userAgent)) {
    return true
  }

  return webViewRules.some(rule => rule.test(userAgent))
}
