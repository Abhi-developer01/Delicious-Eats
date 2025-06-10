'use client'

import { useState, useEffect, useRef } from 'react'
import { BellRing, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type NotificationPopupProps = {
  title: string
  message: string
  isOpen: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export function NotificationPopup({
  title,
  message,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}: NotificationPopupProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    // Create audio element with simple beep sound (data URL)
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU')
    }
    
    // Play sound when notification opens
    if (isOpen && audioRef.current) {
      audioRef.current.volume = 0.5 // Set volume to 50%
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()
      
      // Handle browsers that don't allow autoplay
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio playback prevented by browser:', error)
        })
      }
    }
  }, [isOpen])
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    if (isOpen && autoClose) {
      timeoutId = setTimeout(() => {
        onClose()
      }, autoCloseTime)
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isOpen, autoClose, autoCloseTime, onClose])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="flex items-center justify-between bg-blue-50 p-4 border-b">
              <div className="flex items-center space-x-2">
                <BellRing className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-900">{title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{message}</p>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="text-xs text-gray-500">Just now</div>
              {autoClose && (
                <motion.div 
                  className="h-1 bg-blue-500 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: autoCloseTime / 1000, ease: 'linear' }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 