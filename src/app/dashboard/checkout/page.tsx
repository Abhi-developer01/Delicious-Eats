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

  // CSS styles for animations
  const styles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes confetti-1 {
      0% { transform: translate(0, 0) rotate(0); }
      100% { transform: translate(-20px, 40px) rotate(360deg); }
    }
    
    @keyframes confetti-2 {
      0% { transform: translate(0, 0) rotate(0); }
      100% { transform: translate(20px, 40px) rotate(-360deg); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.5s ease-out forwards;
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .animate-confetti-1 {
      animation: confetti-1 2s ease-out infinite alternate;
    }
    
    .animate-confetti-2 {
      animation: confetti-2 2s ease-out infinite alternate;
    }
    
    .animation-delay-100 {
      animation-delay: 0.1s;
    }
    
    .animation-delay-200 {
      animation-delay: 0.2s;
    }
    
    .animation-delay-300 {
      animation-delay: 0.3s;
    }
  `

  // Add the styles to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style')
      styleElement.innerHTML = styles
      document.head.appendChild(styleElement)
      
      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push('/dashboard/menu')
    }
  }, [items, router, showSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Create order data for Supabase
    const orderData = {
      user_id: user?.id || 'guest',
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

    // Try to save to Supabase, but don't wait for it
    try {
      // Attempt to save to Supabase in the background
      const { error } = await supabase
        .from('orders1')  // Make sure this matches your actual table name in Supabase
        .insert([orderData])
      
      if (error) {
        console.error('Supabase Error:', error)
      } else {
        console.log('Order successfully created')
      }
    } catch (error) {
      console.error('Error creating order:', error)
    }

    // Always show success after a delay, regardless of Supabase result
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      clearCart()
    }, 1500) // Simulate a 1.5 second processing time
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
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-scaleIn">
          <div className="relative">
            {/* Success checkmark with animation */}
            <div className="mb-6 mx-auto relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20"></div>
              
              {/* Confetti animation */}
              <div className="absolute -top-4 -left-4 w-32 h-32 animate-confetti-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full absolute"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full absolute top-4 left-6"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full absolute top-8 left-2"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 animate-confetti-2">
                <div className="w-2 h-2 bg-green-500 rounded-full absolute"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-4 right-6"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full absolute top-8 right-2"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-center animate-fadeInUp">Order Placed Successfully!</h2>
            <p className="text-gray-600 text-center mb-6 animate-fadeInUp animation-delay-100">
              Thank you for your order. You can track your order in the orders section.
            </p>
            
            {/* Order details summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 animate-fadeInUp animation-delay-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">${(totalAmount + 5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">30-45 minutes</span>
              </div>
            </div>
            
            <Button 
              className="w-full animate-fadeInUp animation-delay-300"
              onClick={() => router.push('/dashboard/menu')}
            >
              Continue Shopping
            </Button>
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