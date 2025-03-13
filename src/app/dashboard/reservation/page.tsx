'use client'

import { Calendar } from 'lucide-react'

export default function ReservationPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>

      {/* Today's Reservations */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Today's Reservations</h2>
        <div className="space-y-4">
          {[
            { time: '12:30 PM', name: 'John Smith', guests: 4, status: 'Confirmed' },
            { time: '1:00 PM', name: 'Emily Johnson', guests: 2, status: 'Confirmed' },
            { time: '2:15 PM', name: 'Michael Brown', guests: 6, status: 'Pending' },
            { time: '6:30 PM', name: 'Sarah Wilson', guests: 3, status: 'Confirmed' },
            { time: '7:45 PM', name: 'David Lee', guests: 5, status: 'Cancelled' }
          ].map((reservation, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium">{reservation.time} - {reservation.name}</p>
                  <p className="text-sm text-gray-500">{reservation.guests} guests</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                reservation.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {reservation.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reservations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Reservations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { date: 'Tomorrow', count: 12 },
            { date: 'This Week', count: 45 },
            { date: 'Next Week', count: 28 },
            { date: 'This Month', count: 87 }
          ].map((period, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-medium">{period.date}</h3>
              <p className="text-2xl font-bold">{period.count}</p>
              <p className="text-sm text-gray-500">reservations</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
