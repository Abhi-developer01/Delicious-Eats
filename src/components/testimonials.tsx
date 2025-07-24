'use client'
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "Food Enthusiast",
    comment: "The food was amazing and the delivery was super fast! Every bite was perfection.",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    name: "Jane Smith",
    role: "Regular Customer",
    comment: "Great variety of restaurants and cuisines. Highly recommended for anyone who loves good food!",
    rating: 4,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Mike Johnson",
    role: "Tech Professional",
    comment: "Easy to use app with excellent customer service. The interface is intuitive and smooth.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "Emily White",
    role: "UI/UX Designer",
    comment: "Loved the seamless experience from start to finish. The UI is absolutely fantastic!",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
  },
  {
    name: "David Lee",
    role: "Business Owner",
    comment: "Fast service, friendly support, and incredible food options. Everything exceeded expectations!",
    rating: 4,
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let translateX = 0;
    const cardWidth = 400; // Card width + gap
    const totalWidth = cardWidth * testimonials.length;
    
    const animate = () => {
      if (!isPaused) {
        translateX -= 0.5;
        if (Math.abs(translateX) >= totalWidth) {
          translateX = 0;
        }
        container.style.transform = `translateX(${translateX}px)`;
      }
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [isPaused]);

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center sm:w-16 sm:h-16 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Quote className="sm:w-8 sm:h-8 w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real customers think about our service.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="">
          {/* Gradient Masks for Smooth Edges */}
          <div className="absolute -left-[60px] top-[200px] bottom-51 h-[420px] w-24 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute -right-[60px] top-[200px] bottom-51 h-[420px] w-24 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="">
            <div
              ref={containerRef}
              className="flex gap-8 w-max"
              style={{ willChange: 'transform' }}
            >
              {/* Render testimonials twice for seamless loop */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-8 w-80 flex-shrink-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                >
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Floating Quote Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex justify-start mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-500 fill-yellow-500 w-5 h-5 mr-1 drop-shadow-sm"
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 text-base leading-relaxed font-medium h-20 flex items-start">
                      "{testimonial.comment}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center space-x-4 mt-8">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-100 transition-all duration-500">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Online Indicator */}
                        {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm">
                          <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>
                        </div> */}
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-lg leading-tight">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-sm font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  {/* <div className="absolute top-6 right-6 w-2 h-2 bg-blue-300 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"></div> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats or CTA */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}