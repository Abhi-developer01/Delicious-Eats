'use client'

import { SidebarNav } from '@/components/dashboard/sidebar-nav'
import { Header } from '@/components/dashboard/header'
import { CategoryProvider } from '@/components/dashboard/category-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-[250px] bg-white shadow-lg z-10">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <div className="ml-[250px] flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <main className="max-w-full">
            <CategoryProvider>
              {children}
            </CategoryProvider>
          </main>
        </div>
      </div>
    </div>
  )
} 