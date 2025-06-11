'use client'

import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { CategoryProvider } from '@/components/dashboard/category-context'
import BottomNav from '@/components/dashboard/bottom-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden relative">
      {/* Sidebar - Visible only on md+ */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-[250px] bg-white shadow-lg z-10 md:block">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-[250px]">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <main className="max-w-full">
            <CategoryProvider>
              {children}
            </CategoryProvider>
          </main>
        </div>
      </div>

      {/* Bottom Navigation - Only for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-20">
        <BottomNav />
      </div>
    </div>
  )
} 