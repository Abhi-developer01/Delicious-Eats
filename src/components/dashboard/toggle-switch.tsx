'use client'

import React from 'react'

interface ToggleSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  id?: string
}

export function ToggleSwitch({ checked, onCheckedChange, id }: ToggleSwitchProps) {
  return (
    <div 
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-green-500' : 'bg-gray-200'
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span 
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      {id && <input type="checkbox" className="sr-only" id={id} checked={checked} readOnly />}
    </div>
  )
} 