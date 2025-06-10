'use client'

import { PushNotificationSender } from "@/components/dashboard/push-notification-sender"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellRing, Users, Clock } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Push Notifications</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <BellRing className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle>Active Subscribers</CardTitle>
              <CardDescription>Users with enabled notifications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <CardTitle>Notification Rate</CardTitle>
              <CardDescription>% of users with notifications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Avg. time to open notification</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2m</div>
            <p className="text-xs text-muted-foreground">-10% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send">
          <PushNotificationSender />
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                View the history of notifications you've sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">New Menu Items Added</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Check out our new seasonal menu items for spring!
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                          Sent to 247 users
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {i === 1 ? '2 hours ago' : i === 2 ? 'Yesterday' : '3 days ago'}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {i === 1 ? '82% open rate' : i === 2 ? '76% open rate' : '68% open rate'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 