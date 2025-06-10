import { Menu, TableIcon as TableBar, CalendarRange, Truck, Calculator, Settings, LogOut, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { icon: Menu, label: "Menu", path: "/dashboard/product", color: "text-gray-600" },
  { icon: TableBar, label: "Table Services", path: "/dashboard/table-services", color: "text-gray-600" },
  { icon: CalendarRange, label: "Reservation", path: "/dashboard/reservation", color: "text-gray-600" },
  { icon: Truck, label: "Delivery", path: "/dashboard/delivery", color: "text-gray-600" },
  { icon: Calculator, label: "Accounting", path: "/dashboard/accounting", color: "text-gray-600" },
  { icon: BellRing, label: "Notifications", path: "/dashboard/notifications", color: "text-gray-600" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings", color: "text-gray-600" },
]

export function SidebarNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="w-64 p-4 border-r h-screen bg-white">
      <div className="flex items-center gap-2 mb-8">
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg"
          alt="Chili POS Logo"
          className="w-8 h-8"
        /> */}
        <Link href="/" className="inline-flex items-center space-x-3">
  <img
    src="/images/delicious eat.png"
    alt="Delicious Eats logo"
    className="h-8 w-auto transform scale-150 object-contain"
  />
  <span className="text-2xl text-primary" style={{ fontFamily: "'Pacifico', cursive" }}>
    Delicious Eats
  </span>
</Link>
        {/* <span className="font-semibold">CHILI POS</span> */}
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Button
              key={index}
              variant={isActive ? "default" : "ghost"}
              className={`w-full flex items-center pl-1 justify-start transition-all duration-200 ${isActive
                  ? "bg-green-700 text-white font-medium shadow-md hover:bg-green-700"
                  : `hover:bg-gray-100 ${item.color}`
                }`}
              onClick={() => handleNavigation(item.path)}
            >
              {isActive && (
                <div className=" h-1 w-1 rounded-full bg-white mr-2"></div>
              )}
              <div className="flex items-center gap-x-2">
                <item.icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                {item.label}
              </div>
            </Button>
          );
        })}
      </nav>

      <Button
        variant="ghost"
        className="w-full justify-start mt-auto text-gray-600 absolute bottom-4 hover:bg-red-50 hover:text-red-600"
        onClick={() => router.push("/")}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

