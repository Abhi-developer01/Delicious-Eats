'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useAuth } from "@/components/auth-context"
import { supabase } from '@/lib/supabase'
import type { MenuItem } from '@/types/supabase'
import { Plus, Minus, ShoppingCart } from 'lucide-react'

interface ProductDetailsProps {
  id: string
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const [item, setItem] = useState<MenuItem | null>(null)
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch main item
        const { data: menuItem, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setItem(menuItem)

        // Fetch related items from same category
        if (menuItem) {
          const { data: related, error: relatedError } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category_id', menuItem.category_id)
            .neq('id', menuItem.id)
            .limit(4)

          if (relatedError) throw relatedError
          setRelatedItems(related)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleAddToCart = () => {
    if (!user) {
      // Show auth modal or redirect to login
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(item!)
    }
  }

  const handleOrderNow = () => {
    if (!user) {
      // Show auth modal or redirect to login
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(item!)
    }
    router.push('/checkout')
  }

  if (loading) return <div>Loading...</div>
  if (!item) return <div>Item not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-muted-foreground">{item.description}</p>
          
          <div>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-1">
              {item.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-2xl font-bold">${item.price}</div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                className="flex-1"
                variant="outline"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1"
                onClick={handleOrderNow}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((relatedItem) => (
              <div
                key={relatedItem.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/menu/${relatedItem.id}`)}
              >
                <img
                  src={relatedItem.image_url}
                  alt={relatedItem.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedItem.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {relatedItem.description}
                  </p>
                  <div className="font-bold">${relatedItem.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 