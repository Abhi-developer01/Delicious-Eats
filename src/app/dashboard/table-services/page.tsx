'use client'

import { Users, CheckCircle, Clock } from 'lucide-react'

export default function TableServicesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Table Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => {
          const status = table % 3 === 0 ? 'Occupied' : table % 3 === 1 ? 'Available' : 'Reserved';

          const statusStyles = {
            Occupied: 'bg-red-100 text-red-800',
            Available: 'bg-green-100 text-green-800',
            Reserved: 'bg-yellow-100 text-yellow-800',
          };

          const Icon =
            status === 'Occupied' ? Users :
            status === 'Available' ? CheckCircle :
            Clock;

          return (
            <div
              key={table}
              className="bg-white rounded-lg shadow p-4 relative overflow-hidden"
            >
              {/* Background icon */}
              <Icon className="absolute right-4 bottom-4 h-20 w-20 text-gray-100 pointer-events-none" />

              <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="font-semibold text-lg">Table {table}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}
                >
                  {status}
                </span>
              </div>

              <div className="text-sm text-gray-500 relative z-10">
                {status === 'Occupied' && (
                  <>
                    <p>Guests: 4</p>
                    <p>Time: 45 min</p>
                    <p>Server: John D.</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
