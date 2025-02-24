'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/types/supabase"
import { useCart } from "./cart-context"

interface MenuItemDialogProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

export function MenuItemDialog({ item, isOpen, onClose }: MenuItemDialogProps) {
  const { addToCart } = useCart()

  if (!item) return null

  const handleAddToCart = () => {
    addToCart(item)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="text-muted-foreground">{item.description}</p>
          <div>
            <h4 className="font-semibold mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside space-y-1">
              {item.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${item.price}</span>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 