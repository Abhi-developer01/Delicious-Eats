'use client'

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemCount = cartItems.reduce((total, item) => total + 1, 0)

  return (
    <header className="bg-background border-b sticky top-0 z-50">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#menu" className="text-gray-900 hover:text-primary">Menu</Link></li>
              <li><Link href="#how-it-works" className="text-gray-900 hover:text-primary">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-gray-900 hover:text-primary">Testimonials</Link></li>
              <li><Link href="#faq" className="text-gray-900 hover:text-primary">FAQ</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" className="flex items-center" onClick={() => router.push('/cart')}>
                  <ShoppingCart className="mr-2" size={20} />
                  Cart ({cartItemCount})
                </Button>
                <Button variant="ghost" onClick={() => signOut()}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="outline" 
            className="flex items-center mr-2"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && <span className="ml-2">({cartItemCount})</span>}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
              <li><Link href="#menu" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900 hover:text-primary">Menu</Link></li>
              <li><Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900 hover:text-primary">How It Works</Link></li>
              <li><Link href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900 hover:text-primary">Testimonials</Link></li>
              <li><Link href="#faq" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-900 hover:text-primary">FAQ</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              {user ? (
                <Button variant="ghost" onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full justify-start">
                  Sign Out
                </Button>
              ) : (
                <Button onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  )
}

