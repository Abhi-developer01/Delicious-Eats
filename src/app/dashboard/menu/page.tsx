'use client'

import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { CategoryFilter } from '@/components/dashboard/category-filter'
import { FoodGrid } from '@/components/dashboard/food-grid'
import { Cart } from '@/components/dashboard/cart'
import { Footer } from '@/components/dashboard/footer'
import { CategoryProvider } from '@/components/dashboard/category-context'

export default function MenuPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-[250px] bg-white shadow-lg z-10">
        <SidebarNav />
      </div>

      {/* Main Content (with left margin to avoid overlap) */}
      <div className="ml-[250px] flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
            <CategoryProvider>
              <CategoryFilter />
              <FoodGrid />
            </CategoryProvider>
          </main>
          {/* <Cart /> */}
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  )
}
