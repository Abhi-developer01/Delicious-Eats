'use client'

import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  // const { user, profile } = useAuth()

  useEffect(() => {
    // Redirect to the menu page by default
    router.push('/dashboard/product')
    
    // Uncomment when authentication is implemented
    // if (!user) {
    //   router.push('/')
    // }
    // if (profile && profile.role !== 'restaurant_owner') {
    //   router.push('/')
    // }
  }, [router])

  return null // This component will redirect, so no need to render anything
}