import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Truck, 
  Settings, 
  Receipt,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  { 
    icon: LayoutDashboard, 
    title: "Dashboard Overview", 
    description: "Get a quick glance at your orders, revenue, and performance metrics all in one place.",
    color: "bg-blue-100 text-blue-600"
  },
  { 
    icon: UtensilsCrossed, 
    title: "Menu Management", 
    description: "Easily manage your menu items, update prices, and organize categories efficiently.",
    color: "bg-orange-100 text-orange-600"
  },
  { 
    icon: ClipboardList, 
    title: "Order Tracking", 
    description: "Track all your orders in real-time, from preparation to delivery status.",
    color: "bg-green-100 text-green-600"
  },
  { 
    icon: Truck, 
    title: "Delivery Management", 
    description: "Manage delivery zones, track drivers, and ensure timely deliveries to customers.",
    color: "bg-purple-100 text-purple-600"
  },
  { 
    icon: Receipt, 
    title: "Accounting", 
    description: "Keep track of your earnings, expenses, and generate detailed financial reports.",
    color: "bg-pink-100 text-pink-600"
  },
  { 
    icon: Settings, 
    title: "Settings & Customization", 
    description: "Customize your restaurant profile, working hours, and delivery preferences.",
    color: "bg-yellow-100 text-yellow-600"
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Powerful Dashboard Features
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Everything you need to manage your restaurant efficiently in one place
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-xl mb-6 ${feature.color} sm:w-12 sm:h-12`}>
                <feature.icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              
              <h3 className="text-sm sm:text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to streamline your restaurant operations?
          </p>
          <Link href="/dashboard">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

