'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCategory } from "@/components/dashboard/category-context"
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/dashboard/cart-context"
import { FloatingCart } from "@/components/dashboard/floating-cart"

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  type: 'Veg' | 'Non Veg';
  category: string;
  discount?: number;
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetails({ params }: PageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { filteredItems } = useCategory()
  const { addToCart } = useCart()
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [relatedItems, setRelatedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const resolvedParams = use(params)

  useEffect(() => {
    try {
      // Find the item with the matching id
      const foundItem = filteredItems.find(item => item.id === parseInt(params.id)) as MenuItem | undefined;
      setMenuItem(foundItem || null);

      // Find related items from the same category
      if (foundItem) {
        const related = filteredItems
          .filter(item => item.category === foundItem.category && item.id !== foundItem.id)
          .slice(0, 4);
        setRelatedItems(related);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id, filteredItems]);

  const handleBack = () => {
    router.push('/dashboard/menu')
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1)
    } else {
      setQuantity(prev => Math.max(1, prev - 1))
    }
  }

  const handleAddToCart = () => {
    if (!menuItem) return;
    
    addToCart({
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price,
      quantity: quantity,
      image: menuItem.image,
      type: menuItem.type
    });
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${menuItem.title} added to your cart`,
    });
  }

  const handlePlaceOrder = () => {
    if (!menuItem) return;

    addToCart({
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price,
      quantity: quantity,
      image: menuItem.image,
      type: menuItem.type
    });
    
    router.push('/dashboard/checkout');
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!menuItem) return <div className="flex justify-center items-center h-screen">Item not found</div>

  // Sample ingredients list
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange('decrease')}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange('increase')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <Card className="mb-12 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-[400px]">
            <img
              src={menuItem.image}
              alt={menuItem.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {menuItem.discount && (
              <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
                {menuItem.discount}% Off
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl font-bold mb-2">{menuItem.title}</h1>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${menuItem.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}></span>
                  <span className="text-sm text-gray-500">{menuItem.type}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">Category</span>
                <p className="text-sm font-medium">{menuItem.category}</p>
              </div>
            </div>

            <div className="text-3xl font-bold text-orange-600 mb-6">${menuItem.price.toFixed(2)}</div>

            {/* Ingredients */}
            <div className="flex-grow">
              <h3 className="font-semibold mb-3">Key Ingredients</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-600">• {ingredient}</li>
                ))}
              </ul>
            </div>

            <Button 
              className="w-full mt-6"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </Card>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((relatedItem) => (
              <Card
                key={relatedItem.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/dashboard/menu/${relatedItem.id}`)}
              >
                <img
                  src={relatedItem.image}
                  alt={relatedItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedItem.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-orange-600">${relatedItem.price.toFixed(2)}</div>
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
  )
} 