'use client'

import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { Footer } from '@/components/dashboard/footer'
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Calendar } from 'lucide-react'

export default function AccountingPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Accounting</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Revenue</p>
                  <p className="text-2xl font-bold">$1,245</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Order</p>
                  <p className="text-2xl font-bold">$25.95</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold">$28,456</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Dine-in</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">$645.30</span>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> 12%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Takeout</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">$325.75</span>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> 8%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Delivery</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">$274.25</span>
                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" /> 3%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {[
                  { id: 'TRX-1234', amount: '$42.50', time: '10:23 AM', method: 'Credit Card', type: 'Dine-in' },
                  { id: 'TRX-1235', amount: '$18.75', time: '11:05 AM', method: 'Cash', type: 'Takeout' },
                  { id: 'TRX-1236', amount: '$35.20', time: '12:30 PM', method: 'Credit Card', type: 'Delivery' },
                  { id: 'TRX-1237', amount: '$27.80', time: '1:45 PM', method: 'Debit Card', type: 'Dine-in' },
                  { id: 'TRX-1238', amount: '$22.15', time: '2:10 PM', method: 'Credit Card', type: 'Takeout' },
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{transaction.id}</p>
                      <p className="text-sm text-gray-500">{transaction.time} - {transaction.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.method}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <div className="h-64 flex items-end space-x-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                const height = Math.floor(Math.random() * 80) + 20;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full ${index === 9 ? 'bg-green-500' : 'bg-blue-400'} rounded-t`} 
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs mt-2">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
} 