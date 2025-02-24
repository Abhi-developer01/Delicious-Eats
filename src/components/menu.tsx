'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { supabase } from '@/lib/supabase'
import type { MenuItem, Category } from '@/types/supabase'

export default function Menu() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredItems, setFeaturedItems] = useState<Record<number, MenuItem[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError
        setCategories(categoriesData)

        // Fetch 6 items from each category
        const featuredByCategory: Record<number, MenuItem[]> = {}
        for (const category of categoriesData) {
          const { data: items, error: itemsError } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category_id', category.id)
            .limit(6)

          if (itemsError) throw itemsError
          featuredByCategory[category.id] = items
        }
        setFeaturedItems(featuredByCategory)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading menu...</div>
  }

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Menu</h2>
        
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">{category.name}</h3>
              <Button 
                variant="outline"
                onClick={() => router.push(`/menu?category=${category.id}`)}
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems[category.id]?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  onClick={() => router.push(`/menu/${item.id}`)}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">${item.price}</span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/menu/${item.id}`)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

