import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  { 
    name: "John Doe", 
    comment: "The food was amazing and the delivery was super fast!", 
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  },
  { 
    name: "Jane Smith", 
    comment: "Great variety of restaurants to choose from. Highly recommended!", 
    rating: 4,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  { 
    name: "Mike Johnson", 
    comment: "Easy to use app and excellent customer service.", 
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  { 
    name: "Emily White", 
    comment: "Loved the seamless experience. The UI is fantastic!", 
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  },
  { 
    name: "David Lee", 
    comment: "Fast service, friendly support, and great food options!", 
    rating: 4,
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-xl"
            >
              {/* User Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  width={96} 
                  height={96} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Star Rating */}
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                ))}
              </div>

              {/* Testimonial Comment */}
              <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>

              {/* User Name */}
              <p className="font-semibold text-lg text-gray-800">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
