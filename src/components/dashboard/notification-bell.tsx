 'use client'

import { useState, useEffect } from 'react'
import { BellRing, Bell } from 'lucide-react'
import { useAuth } from '@/components/auth-context'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Notification } from '@/types/supabase'

// Extended type to match our database structure
interface NotificationWithReadStatus extends Omit<Notification, 'read'> {
  read_at: string | null;
  sent_at: string;
  read: boolean; // Added by our API transformation
}

export function NotificationBell() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationWithReadStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  // Fetch notifications when user logs in or popover opens
  useEffect(() => {
    if (user && open) {
      fetchNotifications()
    }
  }, [user, open])

  // Check for notifications on initial load
  useEffect(() => {
    if (user) {
      checkForUnreadNotifications()
    }
  }, [user])

  const checkForUnreadNotifications = async () => {
    if (!user) return
    try {
      setLoading(true)
      const response = await fetch(`/api/notifications/get?userId=${user.id}&limit=1`)
      const result = await response.json()
      
      console.log('Checking for unread notifications - response:', result);
      
      if (result.success && result.data) {
        // Just check if there are any unread notifications
        setHasUnread(result.data.some((notification: NotificationWithReadStatus) => !notification.read))
      }
    } catch (error) {
      console.error('Error checking for notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNotifications = async () => {
    if (!user) return
    try {
      setLoading(true)
      const response = await fetch(`/api/notifications/get?userId=${user.id}&limit=10`)
      const result = await response.json()
      
      console.log('Fetching notifications - response:', result);
      
      if (result.success && result.data) {
        setNotifications(result.data)
        setHasUnread(result.data.some((notification: NotificationWithReadStatus) => !notification.read))
      } else {
        throw new Error(result.message || 'Failed to fetch notifications')
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      // Use empty array if we can't fetch real notifications
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      // First update local state for immediate feedback
      setNotifications(notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true, read_at: new Date().toISOString() } 
          : notification
      ))
      
      // Check if there are still unread notifications
      const stillHasUnread = notifications.some(notification => 
        notification.id !== id && !notification.read
      )
      setHasUnread(stillHasUnread)
      
      // Then update in the database
      const response = await fetch('/api/notifications/get', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, read: true })
      })
      
      if (!response.ok) {
        // If update fails, revert local state
        const result = await response.json()
        throw new Error(result.message || 'Failed to mark notification as read')
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
      // Refresh notifications to ensure consistent state
      fetchNotifications()
    }
  }

  const handleNotificationClick = (notification: NotificationWithReadStatus) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    
    setOpen(false)
  }

  const markAllAsRead = async () => {
    // First update local state
    const unreadNotifications = notifications.filter(n => !n.read)
    if (unreadNotifications.length === 0) return
    
    const now = new Date().toISOString()
    setNotifications(notifications.map(n => ({ 
      ...n, 
      read: true,
      read_at: n.read_at || now  
    })))
    setHasUnread(false)
    
    // Then update each notification in the database
    try {
      const promises = unreadNotifications.map(n => 
        fetch('/api/notifications/get', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: n.id, read: true })
        })
      )
      
      await Promise.all(promises)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      // Refresh notifications to ensure consistent state
      fetchNotifications()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hours ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {hasUnread && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
              <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
          {hasUnread ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          <p className="text-sm text-gray-500">
            You have {notifications.filter(n => !n.read).length} unread notifications
          </p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-sm">{notification.title}</h5>
                    <span className="text-xs text-gray-500">{formatTime(notification.sent_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
        <div className="p-3 border-t flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={!hasUnread}
          >
            Mark all as read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/dashboard/settings/notifications')}
          >
            Manage notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
} 