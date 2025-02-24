'use client'

import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { CategoryFilter } from '@/components/dashboard/category-filter'
import { FoodGrid } from '@/components/dashboard/food-grid'
import { Cart } from '@/components/dashboard/cart'
import { Footer } from '@/components/dashboard/footer'

  export default function DashboardPage() {
  // const { user, profile } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/')
  //   }
  //   if (profile && profile.role !== 'restaurant_owner') {
  //     router.push('/')
  //   }
  // }, [user, profile, router])

  // if (!user || !profile) {
  //   return null
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <SidebarNav /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto p-4">
            <CategoryFilter />
            <FoodGrid />
          </main>
          <Cart />
        </div>
        <Footer />
      </div>
    </div>
  )
}



// export default function Dashboard(){
//   return <div>alindcndvdjb</div>
// }