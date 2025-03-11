'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCategory } from "@/components/dashboard/category-context"
import { ArrowLeft, Edit, Trash } from 'lucide-react'

interface ProductDetailsProps {
  params: {
    id: string
  }
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const router = useRouter()
  const { filteredItems } = useCategory()
  const [item, setItem] = useState<any>(null)
  const [relatedItems, setRelatedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the item with the matching id
    const foundItem = filteredItems.find(item => item.id === parseInt(params.id))
    setItem(foundItem)

    // Find related items from the same category
    if (foundItem) {
      const related = filteredItems
        .filter(i => i.category === foundItem.category && i.id !== foundItem.id)
        .slice(0, 4)
      setRelatedItems(related)
    }
    
    setLoading(false)
  }, [params.id, filteredItems])

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit item:', item)
  }

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete item:', item)
    router.push('/dashboard/menu')
  }

  const handleBack = () => {
    router.push('/dashboard/menu')
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!item) return <div className="flex justify-center items-center h-screen">Item not found</div>

  return (
    <div className="p-6">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Menu
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${item.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className="text-sm text-gray-500">{item.type}</span>
          </div>

          <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
          
          {item.discount && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm inline-block">
              {item.discount}% Off
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Category:</h3>
            <p className="text-muted-foreground">{item.category}</p>
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
                    <div className="font-bold">${relatedItem.price.toFixed(2)}</div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${relatedItem.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}></span>
                      <span className="text-xs text-gray-500">{relatedItem.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 