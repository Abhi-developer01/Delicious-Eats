export const isWebView = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Common webview user agent patterns
  const webViewPatterns = [
    'linkedin',
    'fbav',
    'fban',
    'instagram',
    'twitter',
    'pinterest',
    'snapchat',
    'wv', // Android System WebView
    'ip(hone|ad|od);.*applewebkit(?!.*safari)' // iOS UIWebView
  ];

  return webViewPatterns.some(pattern => userAgent.includes(pattern));
};

export const isGoogleAuthBlocked = () => {
  // Google specifically blocks auth from certain webviews.
  // We can be more specific here if needed, but a general webview check is a good start.
  return isWebView();
};
