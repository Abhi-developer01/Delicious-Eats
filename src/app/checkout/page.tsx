'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/cart-context"
import { useAuth } from "@/components/auth-context"
import { supabase } from '@/lib/supabase'

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'cod', name: 'Cash on Delivery' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push('/menu')
    return null
  }

  // Redirect if not logged in
  if (!user) {
    router.push('/menu')
    return null
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0) + 5 // Including delivery fee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          delivery_address: address,
          payment_method: paymentMethod
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: 1,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/orders/${order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Delivery Address</h2>
            
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id}>{method.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow h-fit space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(total - 5).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 