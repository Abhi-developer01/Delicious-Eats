'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface OpenInBrowserPromptProps {
  onClose: () => void;
}

export default function OpenInBrowserPrompt({ onClose }: OpenInBrowserPromptProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-3">Switch to a Secure Browser</h2>
        <p className="text-gray-600 mb-6">
          To sign in with Google, please open this page in your phone's main browser (like Chrome or Safari).
        </p>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="w-full bg-gray-100 border rounded-md p-2 pr-10 text-sm"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </Button>
        </div>

        <Button onClick={onClose} variant="outline" className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
