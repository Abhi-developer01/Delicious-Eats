import { Star } from "lucide-react"

const testimonials = [
  { name: "John Doe", comment: "The food was amazing and the delivery was super fast!", rating: 5 },
  { name: "Jane Smith", comment: "Great variety of restaurants to choose from. Highly recommended!", rating: 4 },
  { name: "Mike Johnson", comment: "Easy to use app and excellent customer service.", rating: 5 },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.comment}</p>
              <p className="font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

