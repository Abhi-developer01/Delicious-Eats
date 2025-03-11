'use client'

import { FoodCard } from "./food-card"
import { useCategory } from "./category-context"

export function FoodGrid() {
  const { filteredItems, selectedCategory } = useCategory()

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{selectedCategory} Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredItems.map((item, index) => (
          <FoodCard 
            key={index} 
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            discount={item.discount}
            type={item.type as "Veg" | "Non Veg"}
            category={item.category}
          />
        ))}
      </div>
    </div>
  )
}

