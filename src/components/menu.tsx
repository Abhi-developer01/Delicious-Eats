'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Menu Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-white w-full h-36 md:h-40 lg:h-48"
              onClick={() => router.push(`/dashboard/menu?category=${category.id}`)}
            >
              {/* Full-Sized Category Image */}
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
