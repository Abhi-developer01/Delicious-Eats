'use client'

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { useAuth } from "./auth-context"
import { useState } from "react"
import { AuthModal } from "./auth-modal"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const { cartItems } = useCart()
  const { user, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const cartItemCount = cartItems.reduce((total, item) => total + 1, 0)

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="inline-flex items-center space-x-3">
  <img
    src="/images/delicious eat.png"
    alt="Delicious Eats logo"
    className="h-8 w-auto transform scale-150 object-contain"
  />
  <span className="text-2xl text-primary" style={{ fontFamily: "'Pacifico', cursive" }}>
    Delicious Eats
  </span>
</Link>


        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#menu" className="text-gray-900 hover:text-primary">
                Menu
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="text-gray-900 hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-gray-900 hover:text-primary">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-gray-900 hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="mr-2" size={20} />
                Cart ({cartItemCount})
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  )
}

