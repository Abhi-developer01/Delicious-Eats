"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, TableIcon as TableBar, Truck, Settings, CalendarRange } from "lucide-react"

const navItems = [
  { icon: Menu, label: "Menu", path: "/dashboard/product" },
  { icon: TableBar, label: "Table", path: "/dashboard/table-services" },
  { icon: CalendarRange, label: "Reserve", path: "/dashboard/reservation" },
  { icon: "home", label: "Home", path: "/" },
  { icon: Truck, label: "Delivery", path: "/dashboard/delivery" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md h-14 md:hidden grid grid-cols-6 items-center text-center">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path
        const isHome = item.icon === "home"

        return (
          <Link
            key={index}
            href={item.path}
            className={`flex flex-col items-center text-xs ${isActive ? "text-green-600" : "text-gray-500"} hover:text-green-700`}
          >
            {isHome ? (
              <img
                src="/images/delicious eat.png"
                alt="Delicious Eats"
                className="h-5 w-5 mb-0.5 object-contain"
              />
            ) : (
              <item.icon className="h-5 w-5 mb-0.5" />
            )}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
