'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Plus, Minus, Trash2 } from 'lucide-react'
import type { MenuItem } from "@/types/supabase"

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CartPage() {
  const router = useRouter()
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart()

  const groupedItems = cartItems.reduce<Record<number, CartItem>>((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 }
    }
    acc[item.id].quantity++
    return acc
  }, {})

  const total = cartItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0)

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/menu')}>View Menu</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {Object.values(groupedItems).map((item: CartItem) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromCart(item)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive"
                    onClick={() => {
                      for (let i = 0; i < item.quantity; i++) {
                        removeFromCart(item)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>$5.00</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${(total + 5).toFixed(2)}</span>
          </div>
          <Button 
            className="w-full"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
} 