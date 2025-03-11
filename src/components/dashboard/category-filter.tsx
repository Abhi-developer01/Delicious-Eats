'use client'

import { useCategory, categories } from './category-context'
import { Grid, Coffee, Soup, UtensilsCrossed, ChefHat, Sandwich } from "lucide-react"

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useCategory()

  return (
    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
      {categories.map((category, index) => {
        const isActive = selectedCategory === category.label
        return (
          <div
            key={index}
            className={`flex flex-col items-center p-3 rounded-xl min-w-[100px] ${
              isActive ? "bg-green-50 text-green-600 border-green-200" : "bg-white"
            } border cursor-pointer hover:bg-green-50 transition-all duration-200`}
            onClick={() => setSelectedCategory(category.label)}
          >
            <category.icon className={`h-6 w-6 mb-1 ${isActive ? "text-green-600" : ""}`} />
            <span className={`text-sm font-medium ${isActive ? "text-green-600" : ""}`}>{category.label}</span>
            <span className="text-xs text-gray-500">{category.items}</span>
          </div>
        )
      })}
    </div>
  )
}

