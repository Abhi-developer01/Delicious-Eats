'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'
import { AuthModal } from './auth-modal'
import { Button } from '@/components/ui/button'
import { ArrowRight, Store } from 'lucide-react'

export default function Hero() {
  const router = useRouter()
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleOrderClick = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDashboardClick = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <section className="relative bg-slate-950 text-white py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Delicious Food Delivered To Your Door
          </h1>
          <p className="text-xl mb-8">
            Order from your favorite restaurants with just a few clicks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleOrderClick} size="lg" variant="secondary">
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleDashboardClick} 
              size="lg" 
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <Store className="mr-2 h-5 w-5" />
              Restaurant Dashboard
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Are you a restaurant owner? Get access to our powerful dashboard
          </p>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </section>
  )
}

