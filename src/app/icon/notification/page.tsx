'use client'

import { useEffect } from 'react'
import { Bell, BellRing } from 'lucide-react'

export default function GenerateIconPage() {
  useEffect(() => {
    // Generate icon when the component mounts
    generateIcons()
  }, [])

  const generateIcons = async () => {
    try {
      // Create a canvas for the notification icon
      const iconCanvas = document.createElement('canvas')
      iconCanvas.width = 192
      iconCanvas.height = 192
      const iconCtx = iconCanvas.getContext('2d')
      
      if (iconCtx) {
        // Draw background
        iconCtx.fillStyle = '#FF5722' // Orange
        iconCtx.beginPath()
        iconCtx.arc(96, 96, 96, 0, Math.PI * 2)
        iconCtx.fill()
        
        // Draw bell icon
        iconCtx.fillStyle = '#FFFFFF'
        iconCtx.strokeStyle = '#FFFFFF'
        iconCtx.lineWidth = 8
        
        // Draw bell manually (simplified)
        iconCtx.beginPath()
        iconCtx.arc(96, 70, 24, 0, Math.PI * 2) // Bell top
        iconCtx.fill()
        
        iconCtx.beginPath()
        iconCtx.moveTo(72, 70)
        iconCtx.lineTo(72, 110)
        iconCtx.arc(96, 110, 24, Math.PI, Math.PI * 2, false)
        iconCtx.lineTo(120, 70)
        iconCtx.stroke()
        
        iconCtx.beginPath()
        iconCtx.arc(96, 134, 8, 0, Math.PI * 2) // Bell bottom
        iconCtx.fill()
      }
      
      // Create a canvas for the badge
      const badgeCanvas = document.createElement('canvas')
      badgeCanvas.width = 96
      badgeCanvas.height = 96
      const badgeCtx = badgeCanvas.getContext('2d')
      
      if (badgeCtx) {
        // Draw background
        badgeCtx.fillStyle = '#FF5722' // Orange
        badgeCtx.beginPath()
        badgeCtx.arc(48, 48, 48, 0, Math.PI * 2)
        badgeCtx.fill()
        
        // Draw a dot
        badgeCtx.fillStyle = '#FFFFFF'
        badgeCtx.beginPath()
        badgeCtx.arc(48, 48, 16, 0, Math.PI * 2)
        badgeCtx.fill()
      }

      console.log('Icons generated successfully!')
      
      // Display the icons on the page
      const container = document.getElementById('icon-container')
      if (container) {
        container.appendChild(iconCanvas)
        container.appendChild(badgeCanvas)
        
        // Add download links
        const iconLink = document.createElement('a')
        iconLink.href = iconCanvas.toDataURL('image/png')
        iconLink.download = 'notification-icon.png'
        iconLink.textContent = 'Download Notification Icon'
        iconLink.className = 'block p-2 mt-2 bg-blue-500 text-white text-center rounded'
        container.appendChild(iconLink)
        
        const badgeLink = document.createElement('a')
        badgeLink.href = badgeCanvas.toDataURL('image/png')
        badgeLink.download = 'notification-badge.png'
        badgeLink.textContent = 'Download Notification Badge'
        badgeLink.className = 'block p-2 mt-2 bg-blue-500 text-white text-center rounded'
        container.appendChild(badgeLink)
      }
    } catch (error) {
      console.error('Error generating icons:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notification Icons Generator</h1>
      <p className="mb-4">This page generates notification icons for the service worker.</p>
      
      <div className="flex gap-4 mb-4">
        <div className="p-4 border rounded flex flex-col items-center">
          <Bell size={64} className="text-orange-500" />
          <p className="mt-2">Bell Icon</p>
        </div>
        
        <div className="p-4 border rounded flex flex-col items-center">
          <BellRing size={64} className="text-orange-500" />
          <p className="mt-2">Bell Ring Icon</p>
        </div>
      </div>
      
      <div id="icon-container" className="mt-8 grid grid-cols-2 gap-4">
        <p>Generated icons will appear here...</p>
      </div>
      
      <div className="mt-8">
        <p className="text-sm text-gray-600">
          Instructions: After generating, download these icons and place them in the /public folder of your project.
          They will be used by the service worker for push notifications.
        </p>
      </div>
    </div>
  )
} 