import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Truck, 
  Settings, 
  Receipt
} from "lucide-react"

const features = [
  { 
    icon: LayoutDashboard, 
    title: "Dashboard Overview", 
    description: "Get a quick glance at your orders, revenue, and performance metrics all in one place.",
    color: "bg-blue-500/10 text-blue-600"
  },
  { 
    icon: UtensilsCrossed, 
    title: "Menu Management", 
    description: "Easily manage your menu items, update prices, and organize categories efficiently.",
    color: "bg-orange-500/10 text-orange-600"
  },
  { 
    icon: ClipboardList, 
    title: "Order Tracking", 
    description: "Track all your orders in real-time, from preparation to delivery status.",
    color: "bg-green-500/10 text-green-600"
  },
  { 
    icon: Truck, 
    title: "Delivery Management", 
    description: "Manage delivery zones, track drivers, and ensure timely deliveries to customers.",
    color: "bg-purple-500/10 text-purple-600"
  },
  { 
    icon: Receipt, 
    title: "Accounting", 
    description: "Keep track of your earnings, expenses, and generate detailed financial reports.",
    color: "bg-pink-500/10 text-pink-600"
  },
  { 
    icon: Settings, 
    title: "Settings & Customization", 
    description: "Customize your restaurant profile, working hours, and delivery preferences.",
    color: "bg-yellow-500/10 text-yellow-600"
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Dashboard Features</h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your restaurant efficiently in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Ready to streamline your restaurant operations?
          </p>
          <div className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors cursor-pointer">
            Get Started Now
          </div>
        </div>
      </div>
    </section>
  )
}

