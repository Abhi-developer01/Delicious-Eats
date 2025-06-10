import { Bell } from 'lucide-react'

interface NotificationIconProps {
  size?: number
  color?: string
  className?: string
}

export function NotificationIcon({ 
  size = 24, 
  color = 'currentColor',
  className = ''
}: NotificationIconProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Bell size={size} color={color} />
    </div>
  )
}

export default NotificationIcon 