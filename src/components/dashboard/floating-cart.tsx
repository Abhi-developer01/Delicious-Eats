'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useCart } from './cart-context'

export function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart } = useCart()

  const handleCheckout = () => {
    setIsOpen(false)
    router.push('/dashboard/checkout')
  }

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-col items-center">
            <ShoppingCart className="h-6 w-6 mb-1" />
            <span className="text-xs">{totalItems}</span>
          </div>
        </Button>
      ) : (
        <Card className="w-80 p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Cart Items</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-auto">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-orange-600">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
} 