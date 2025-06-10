'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View and manage all customer orders</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push('/admin/orders')}
              className="w-full"
            >
              Manage Orders
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Add, edit, or remove items from the menu</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push('/admin/menu')}
              className="w-full"
            >
              Manage Menu
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View and manage user accounts</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push('/admin/users')}
              className="w-full"
            >
              Manage Users
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Send push notifications to all users or test notifications</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push('/admin/notifications')}
              className="w-full"
            >
              Send Push Notifications
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Send email notifications to all users with registered email addresses</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => router.push('/admin/email-notifications')}
              className="w-full"
            >
              Send Email Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 