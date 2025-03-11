'use client'

import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { Footer } from '@/components/dashboard/footer'
import { Button } from '@/components/ui/button'
import { User, Store, Bell, Shield, CreditCard, Clock } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Restaurant Profile</h2>
                  <p className="text-gray-500">Manage your restaurant information</p>
                </div>
                <Button className="ml-auto" variant="outline">Edit Profile</Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Restaurant Name</h3>
                  <p className="font-medium">Chili Restaurant</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Email Address</h3>
                  <p className="font-medium">contact@chilirestaurant.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Phone Number</h3>
                  <p className="font-medium">(123) 456-7890</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                  <p className="font-medium">123 Main Street, City, State, 12345</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Business Hours</h3>
                  <p className="font-medium">Mon-Fri: 9:00 AM - 10:00 PM</p>
                  <p className="font-medium">Sat-Sun: 10:00 AM - 11:00 PM</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Website</h3>
                  <p className="font-medium">www.chilirestaurant.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Store className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold">Restaurant Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Menu Management</p>
                    <p className="text-sm text-gray-500">Manage your menu items and categories</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Table Layout</p>
                    <p className="text-sm text-gray-500">Configure your restaurant's table layout</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Staff Management</p>
                    <p className="text-sm text-gray-500">Manage staff accounts and permissions</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive order and reservation updates via email</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="email-toggle" className="sr-only" defaultChecked />
                    <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text messages for new orders</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="sms-toggle" className="sr-only" defaultChecked />
                    <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="push-toggle" className="sr-only" />
                    <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold">Payment Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Payment Methods</p>
                    <p className="text-sm text-gray-500">Configure accepted payment methods</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Tax Settings</p>
                    <p className="text-sm text-gray-500">Configure tax rates and rules</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Billing Information</p>
                    <p className="text-sm text-gray-500">Manage your billing details</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Login History</p>
                    <p className="text-sm text-gray-500">View your recent login activity</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
} 