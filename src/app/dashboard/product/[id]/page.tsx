"use client"

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCategory } from "@/components/dashboard/category-context"
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/dashboard/cart-context"
import { useAuth } from "@/components/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { FloatingCart } from "@/components/dashboard/floating-cart"

interface ProductDetailsProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { filteredItems } = useCategory()
  const { addToCart } = useCart()
  const [item, setItem] = useState<any>(null)
  const [relatedItems, setRelatedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { user } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const resolvedParams = use(params)

  useEffect(() => {
    const foundItem = filteredItems.find(item => item.id === Number(resolvedParams.id))
    setItem(foundItem)

    if (foundItem) {
      const related = filteredItems
        .filter(i => i.category === foundItem.category && i.id !== foundItem.id)
        .slice(0, 4)
      setRelatedItems(related)
    }

    setLoading(false)
  }, [resolvedParams.id, filteredItems])

  const handleBack = () => {
    router.push('/dashboard/product')
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1))
  }

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity,
      image: item.image,
      type: item.type
    })

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${item.title} added to your cart`,
    })
  }

  const handlePlaceOrder = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity,
      image: item.image,
      type: item.type
    })

    if (!user) {
      setIsAuthModalOpen(true)
    } else {
      router.push('/dashboard/checkout')
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!item) return <div className="flex justify-center items-center h-screen">Item not found</div>

  const ingredients = [
    "2 cups all-purpose flour",
    "1 cup milk",
    "2 eggs",
    "1 tablespoon sugar",
    "2 tablespoons butter",
    "1 teaspoon vanilla extract",
    "Pinch of salt"
  ]

  return (
    <>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2">
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange('decrease')}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange('increase')}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 sm:h-80 md:h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {item.discount && (
                <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
                  {item.discount}% Off
                </div>
              )}
            </div>

            <div className="p-4 sm:p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className="text-sm text-gray-500">{item.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="text-sm font-medium">{item.category}</p>
                </div>
              </div>

              <div className="text-xl sm:text-3xl font-bold text-orange-600 mb-4 sm:mb-6">Rs {item.price.toFixed(2)}</div>

              <div className="flex-grow">
                <h3 className="font-semibold mb-3">Key Ingredients</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm text-gray-600">• {ingredient}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full mt-4 sm:mt-6" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </div>
        </Card>

        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <Card
                  key={relatedItem.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/dashboard/product/${relatedItem.id}`)}
                >
                  <img
                    src={relatedItem.image}
                    alt={relatedItem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{relatedItem.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-orange-600">Rs {relatedItem.price.toFixed(2)}</div>
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${relatedItem.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}></span>
                        <span className="text-xs text-gray-500">{relatedItem.type}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        <FloatingCart />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
