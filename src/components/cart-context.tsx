"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { MenuItem } from "@/types/supabase"

type CartContextType = {
  cartItems: MenuItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (item: MenuItem) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<MenuItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCartItems([...cartItems, item])
  }

  const removeFromCart = (item: MenuItem) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id)
    if (index > -1) {
      const newItems = [...cartItems]
      newItems.splice(index, 1)
      setCartItems(newItems)
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

