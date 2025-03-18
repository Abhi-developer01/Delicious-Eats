'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Grid, Coffee, Soup, UtensilsCrossed, ChefHat, Sandwich } from "lucide-react"

// Define food items for each category
const allFoodItems = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3872370/pexels-photo-3872370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Tasty Vegetable Salad Healthy Diet",
    price: 17.99,
    discount: 20,
    type: "Veg",
    category: "All"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/12557797/pexels-photo-12557797.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Original Chess Meat Burger With Chips",
    price: 23.99,
    type: "Non Veg",
    category: "All"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/4955090/pexels-photo-4955090.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Tacos Salsa With Chickens Grilled",
    price: 14.99,
    type: "Non Veg",
    category: "All"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/8679370/pexels-photo-8679370.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Fresh Orange Juice With Basil Seed",
    price: 12.99,
    type: "Veg",
    category: "All"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Meat Sushi Maki With Tuna, Ship And Other",
    price: 9.99,
    type: "Non Veg",
    category: "All"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Original Chess Burger With French Fries",
    price: 10.59,
    discount: 20,
    type: "Veg",
    category: "All"
  },
  // Breakfast items
  {
    id: 7,
    image: "https://images.pexels.com/photos/2662875/pexels-photo-2662875.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Classic Pancakes with Maple Syrup",
    price: 12.99,
    type: "Veg",
    category: "Breakfast"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Avocado Toast with Poached Eggs",
    price: 14.99,
    type: "Veg",
    category: "Breakfast"
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Breakfast Burrito with Salsa",
    price: 13.99,
    discount: 15,
    type: "Non Veg",
    category: "Breakfast"
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "French Toast with Berries",
    price: 11.99,
    type: "Veg",
    category: "Breakfast"
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Eggs Benedict with Hollandaise",
    price: 16.99,
    type: "Non Veg",
    category: "Breakfast"
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Granola Bowl with Fresh Fruits",
    price: 10.99,
    type: "Veg",
    category: "Breakfast"
  },
  // Soups
  {
    id: 13,
    image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Creamy Tomato Basil Soup",
    price: 9.99,
    type: "Veg",
    category: "Soups"
  },
  {
    id: 14,
    image: "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Chicken Noodle Soup",
    price: 11.99,
    type: "Non Veg",
    category: "Soups"
  },
  {
    id: 15,
    image: "https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Butternut Squash Soup",
    price: 10.99,
    discount: 10,
    type: "Veg",
    category: "Soups"
  },
  {
    id: 16,
    image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "French Onion Soup with Cheese",
    price: 12.99,
    type: "Veg",
    category: "Soups"
  },
  {
    id: 17,
    image: "https://images.pexels.com/photos/5409009/pexels-photo-5409009.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Seafood Chowder",
    price: 15.99,
    type: "Non Veg",
    category: "Soups"
  },
  {
    id: 18,
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lentil Soup with Herbs",
    price: 9.99,
    type: "Veg",
    category: "Soups"
  },
  // Pasta
  {
    id: 19,
    image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Spaghetti Carbonara",
    price: 16.99,
    type: "Non Veg",
    category: "Pasta"
  },
  {
    id: 20,
    image: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Fettuccine Alfredo",
    price: 15.99,
    type: "Veg",
    category: "Pasta"
  },
  {
    id: 21,
    image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Penne Arrabbiata",
    price: 14.99,
    discount: 15,
    type: "Veg",
    category: "Pasta"
  },
  {
    id: 22,
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lasagna Bolognese",
    price: 18.99,
    type: "Non Veg",
    category: "Pasta"
  },
  {
    id: 23,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mushroom Risotto",
    price: 17.99,
    type: "Veg",
    category: "Pasta"
  },
  {
    id: 24,
    image: "https://images.pexels.com/photos/1460872/pexels-photo-1460872.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Seafood Linguine",
    price: 19.99,
    type: "Non Veg",
    category: "Pasta"
  },
  // Main Course
  {
    id: 25,
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Grilled Salmon with Asparagus",
    price: 24.99,
    type: "Non Veg",
    category: "Main Course"
  },
  {
    id: 26,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Beef Wellington",
    price: 29.99,
    discount: 10,
    type: "Non Veg",
    category: "Main Course"
  },
  {
    id: 27,
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Vegetable Curry with Rice",
    price: 18.99,
    type: "Veg",
    category: "Main Course"
  },
  {
    id: 28,
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Roast Chicken with Vegetables",
    price: 22.99,
    type: "Non Veg",
    category: "Main Course"
  },
  {
    id: 29,
    image: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Steak with Garlic Butter",
    price: 27.99,
    type: "Non Veg",
    category: "Main Course"
  },
  {
    id: 30,
    image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Eggplant Parmesan",
    price: 19.99,
    type: "Veg",
    category: "Main Course"
  },
  // Burgers
  {
    id: 31,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Classic Cheeseburger",
    price: 14.99,
    type: "Non Veg",
    category: "Burges"
  },
  {
    id: 32,
    image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Veggie Burger with Avocado",
    price: 13.99,
    discount: 15,
    type: "Veg",
    category: "Burges"
  },
  {
    id: 33,
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "BBQ Bacon Burger",
    price: 16.99,
    type: "Non Veg",
    category: "Burges"
  },
  {
    id: 34,
    image: "https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mushroom Swiss Burger",
    price: 15.99,
    type: "Non Veg",
    category: "Burges"
  },
  {
    id: 35,
    image: "https://images.pexels.com/photos/3504876/pexels-photo-3504876.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Spicy Chicken Burger",
    price: 14.99,
    type: "Non Veg",
    category: "Burges"
  },
  {
    id: 36,
    image: "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Double Beef Burger with Fries",
    price: 18.99,
    type: "Non Veg",
    category: "Burges"
  }
]

// Define categories
export const categories = [
  { icon: Grid, label: "All", items: "36 Items" },
  { icon: Coffee, label: "Breakfast", items: "6 Items" },
  { icon: Soup, label: "Soups", items: "6 Items" },
  { icon: UtensilsCrossed, label: "Pasta", items: "6 Items" },
  { icon: ChefHat, label: "Main Course", items: "6 Items" },
  { icon: Sandwich, label: "Burges", items: "6 Items" },
]

// Define the context type
type CategoryContextType = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  filteredItems: typeof allFoodItems
}

// Create the context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

// Create a provider component
export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Filter items based on selected category
  const filteredItems = selectedCategory === "All" 
    ? allFoodItems.slice(0, 6) // Show first 6 items for "All"
    : allFoodItems.filter(item => item.category === selectedCategory)

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory, filteredItems }}>
      {children}
    </CategoryContext.Provider>
  )
}

// Create a hook to use the context
export function useCategory() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
} 