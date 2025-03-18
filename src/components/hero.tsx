'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'
import { AuthModal } from './auth-modal'
// import { Button } from '@/components/ui/button'
import { Button } from './ui/moving-border'
import { ArrowRight, Store } from 'lucide-react'
import Image from 'next/image'

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
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/1.avif"
          alt="Food background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/75" />
        
        {/* Animated particles effect */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 7%, transparent 8%)',
            backgroundSize: '3vmin 3vmin',
            backgroundRepeat: 'repeat',
            animation: 'particles 20s linear infinite'
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Delicious Food Delivered To Your Door
          </h1>
          <p className="text-xl mb-8 animate-fade-in-delay">
            Order from your favorite restaurants with just a few clicks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            {/* <Button 
              onClick={handleOrderClick} 
              size="lg" 
              variant="secondary"
              className="bg-white text-black hover:bg-white/90"
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
            <Button 
              onClick={handleDashboardClick} 
              // size="lg" 
              // variant="outline"
              // // className="text-white border-white hover:bg-white"
              // className="bg-white text-black hover:bg-white/90"

              borderRadius="1.75rem"
              className="bg-black text-white dark:text-white border-white-100 border-slate-900"
            >
              <Store className="mr-2 h-5 w-5" />
              Restaurant Dashboard
            </Button>
            
          </div>
          <p className="relative top-10 text-sm text-gray-100 animate-fade-in-delay-3">
            Are you a restaurant owner? Get access to our powerful dashboard
          </p>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Add the animation keyframes */}
      <style jsx global>{`
        @keyframes particles {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

