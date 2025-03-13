'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/dashboard/cart-context"
import { useAuth } from "@/components/auth-context"
import { Check, ArrowLeft } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'cod', name: 'Cash on Delivery' },
]

interface CardDetails {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

interface UPIDetails {
  upiId: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [upiDetails, setUpiDetails] = useState<UPIDetails>({
    upiId: ''
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/dashboard/menu')
    }
  }, [items, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Create order in Supabase
      const orderData = {
        user_id: user.id,
        customer_details: address,
        payment_method: paymentMethod,
        payment_details: paymentMethod === 'card' ? cardDetails : 
                        paymentMethod === 'upi' ? upiDetails : null,
        items: items,
        subtotal: totalAmount,
        delivery_fee: 5,
        total_amount: totalAmount + 5,
        status: 'pending',
        created_at: new Date().toISOString()
      }

      console.log('Order Data:', orderData) // Log order data for debugging

      const { data, error } = await supabase
        .from('orders1')
        .insert([orderData])
        .select()

      if (error) {
        console.error('Supabase Error:', error) // Log Supabase error
        throw error
      }

      console.log('Order successfully created:', data) // Log success

      // Show success state and clear cart
      setLoading(false)
      setShowSuccess(true)
      clearCart()
      
      // Redirect to menu after showing success animation
      setTimeout(() => {
        router.push('/dashboard/menu')
      }, 2000)
    } catch (error) {
      console.error('Error creating order:', error)
      setLoading(false)
      alert('There was an error processing your order. Please try again.') // Show error message to user
    }
  }

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4 mt-4 p-4 border rounded-lg">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardHolder">Card Holder Name</Label>
              <Input
                id="cardHolder"
                value={cardDetails.cardHolder}
                onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        )
      case 'upi':
        return (
          <div className="space-y-4 mt-4 p-4 border rounded-lg">
            <div className="grid gap-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                value={upiDetails.upiId}
                onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                placeholder="username@upi"
                required
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600 animate-ping" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Thank you for your order. You can track your order in the orders section.</p>
          <div className="animate-bounce mt-4">
            <div className="w-2 h-2 bg-green-600 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      
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
            {renderPaymentDetails()}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalAmount + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}