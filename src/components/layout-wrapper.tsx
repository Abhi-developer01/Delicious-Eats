'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // Hide layout for any path that starts with /dashboard
  const isDashboard = pathname.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
      <Toaster />
    </>
  )
} 