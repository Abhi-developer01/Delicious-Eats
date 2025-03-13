'use client'

export default function TableServicesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Table Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => (
          <div key={table} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Table {table}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                table % 3 === 0 ? 'bg-red-100 text-red-800' : 
                table % 3 === 1 ? 'bg-green-100 text-green-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {table % 3 === 0 ? 'Occupied' : table % 3 === 1 ? 'Available' : 'Reserved'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {table % 3 === 0 && (
                <>
                  <p>Guests: 4</p>
                  <p>Time: 45 min</p>
                  <p>Server: John D.</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
