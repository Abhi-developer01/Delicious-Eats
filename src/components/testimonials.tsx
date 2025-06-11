
'use client'
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";


const testimonials = [
  {
    name: "John Doe",
    comment: "The food was amazing ",
    comment2: "The delivery was super fast!",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  },
  {
    name: "Jane Smith",
    comment: "Great variety of restaurants",
    comment2: " Highly recommended!",
    rating: 4,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Mike Johnson",
    comment: "Easy to use app and ",
    comment2: "excellent customer service.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "Emily White",
    comment: "Loved the seamless experience.",
    comment2: "The UI is fantastic!",
    rating: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
  },
  {
    name: "David Lee",
    comment: "Fast service, friendly support,",
    comment2: "and great food options!",
    rating: 4,
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      if (container) {
        scrollAmount += 1;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-8 sm:py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
          What Our Customers Say
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex w-max animate-none whitespace-nowrap gap-6 sm:gap-8"
            style={{ overflow: "hidden", width: "100%" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 w-60 sm:w-72 flex-shrink-0 text-center transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 rounded-full overflow-hidden border-2 border-gray-300 mx-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-center mb-2 sm:mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={16}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-4 italic">
                  "{testimonial.comment}
                </p>
                <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-4 italic">
                  {testimonial.comment2}"
                </p>

                <p className="text-xs font-medium sm:font-semibold text-base sm:text-lg text-gray-800">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
