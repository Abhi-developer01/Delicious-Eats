'use client'

import { Truck, Package, Clock, MapPin } from 'lucide-react'

const DELIVERY_DATA = [
  { id: 'ORD-1234', customer: 'John Smith', address: '123 Main St, Apt 4B', status: 'Out for Delivery', driver: 'Mike Johnson', eta: '15 min' },
  { id: 'ORD-1235', customer: 'Sarah Wilson', address: '456 Oak Ave', status: 'Preparing', driver: 'Pending', eta: '30 min' },
  { id: 'ORD-1236', customer: 'David Lee', address: '789 Pine Rd', status: 'Out for Delivery', driver: 'Lisa Chen', eta: '10 min' },
  { id: 'ORD-1237', customer: 'Emily Brown', address: '321 Maple Dr', status: 'Preparing', driver: 'Pending', eta: '25 min' },
  { id: 'ORD-1238', customer: 'Michael Garcia', address: '654 Cedar Ln', status: 'Out for Delivery', driver: 'Tom Wilson', eta: '5 min' }
]

export default function DeliveryPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Delivery Management</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Package, bg: 'bg-blue-100', text: 'text-blue-600', title: 'New Orders', count: 12 },
          { icon: Clock, bg: 'bg-yellow-100', text: 'text-yellow-600', title: 'Processing', count: 8 },
          { icon: Truck, bg: 'bg-green-100', text: 'text-green-600', title: 'Out for Delivery', count: 5 },
          { icon: MapPin, bg: 'bg-purple-100', text: 'text-purple-600', title: 'Delivered Today', count: 24 }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className={`${card.bg} p-3 rounded-full mr-4`}>
              <card.icon className={`h-6 w-6 ${card.text}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Deliveries Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Active Deliveries</h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'Customer', 'Address', 'Status', 'Driver', 'ETA'].map((header, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {DELIVERY_DATA.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Out for Delivery' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
