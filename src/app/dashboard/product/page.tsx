'use client'

import { CategoryFilter } from '@/components/dashboard/category-filter'
import { FoodGrid } from '@/components/dashboard/food-grid'

export default function MenuPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      <CategoryFilter />
      <FoodGrid />
    </>
  )
}
