'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/components/auth-context'
// import { SidebarNav } from '@/components/dashboard/sidebar-nav'
// import { Header } from '@/components/dashboard/header'
// import { Footer } from '@/components/dashboard/footer'

// export  function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const router = useRouter()
//   const { user, profile } = useAuth()

//   // Check if user is authenticated and is a restaurant owner
//   useEffect(() => {
//     if (!user) {
//       router.push('/')
//     }
//     if (profile && profile.role !== 'restaurant_owner') {
//       router.push('/')
//     }
//   }, [user, profile, router])

//   if (!user || !profile) {
//     return null
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SidebarNav />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <div className="flex-1 overflow-auto p-4">
//           {children}
//         </div>
//         <Footer />
//       </div>
//     </div>
//   )
// } 

export  function DashboardLayout(){
    return <div>alindcndvdjb</div>
}
