'use client'
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-context"
import { AuthProvider } from "@/components/auth-context"
import { usePathname, useRouter } from "next/navigation"
const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Food Ordering App",
//   description: "Order your favorite food online",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
 const pathname = usePathname()
 const hideLayoutFor = ["/dashboard"]
 const shouldHideLayout = hideLayoutFor.includes(pathname)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {!shouldHideLayout && <Header />}
            {children}
            {!shouldHideLayout && <Footer />}
            
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

