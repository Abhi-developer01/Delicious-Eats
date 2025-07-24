'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Pizza, UtensilsCrossed } from "lucide-react";

const categories = [
  { id: 1, name: 'Pizza', image_url: '/images/image1.png' },
  { id: 2, name: 'Burger', image_url: '/images/image2.png' },
  { id: 3, name: 'Momo', image_url: '/images/image3.png' },
  { id: 4, name: 'Rolls', image_url: '/images/image4.png' },
  { id: 5, name: 'Cake', image_url: '/images/image5.png' },
  { id: 6, name: 'Chinese', image_url: '/images/image6.png' },
  { id: 7, name: 'Dosa', image_url: '/images/image7.png' },
  { id: 8, name: 'Chole Bhature', image_url: '/images/image8.png' },
  { id: 9, name: 'Shawarma', image_url: '/images/image9.png' },
  { id: 10, name: 'Shake', image_url: '/images/image10.png' },
  { id: 11, name: 'Noodles', image_url: '/images/image11.png' },
  { id: 12, name: 'Pure Veg', image_url: '/images/image12.png' },
  { id: 13, name: 'Patty', image_url: '/images/image13.png' },
  { id: 14, name: 'Idli', image_url: '/images/image14.png' }
]

export default function Menu() {
  const router = useRouter()

  return (
    <section id="menu" className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Pizza className="w-8 h-8 text-white" />
          </div> */}
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-clip-text text-black">
             Menu 
          </h2>
          {/* <p className="text-base sm:text-lg text-gray-600">
            Everything you need to manage your restaurant efficiently in one place
          </p> */}
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-white w-full h-28 md:h-32 lg:h-40"
              onClick={() => router.push(`/dashboard/product?category=${category.id}`)}
            >
              {/* Full-Sized Category Image */}
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
