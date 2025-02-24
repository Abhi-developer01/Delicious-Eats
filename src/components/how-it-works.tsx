import { CheckCircle, ShoppingCart, Truck } from "lucide-react"

const steps = [
  { icon: ShoppingCart, title: "Choose Your Meal", description: "Browse our menu and select your favorite dishes." },
  { icon: CheckCircle, title: "Place Your Order", description: "Confirm your selection and proceed to checkout." },
  { icon: Truck, title: "Fast Delivery", description: "Sit back and relax while we prepare and deliver your food." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <step.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

