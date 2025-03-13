import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { CartProvider } from "@/components/dashboard/cart-context"
import { AuthProvider } from "@/components/auth-context"
import { CategoryProvider } from "@/components/dashboard/category-context"
import LayoutWrapper from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Food Ordering App",
  description: "A modern food ordering application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <CategoryProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </CategoryProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

// {
//   const router = useRouter()
//  const pathname = usePathname()
//  const hideLayoutFor = ["/dashboard"]
//  const shouldHideLayout = hideLayoutFor.includes(pathname)
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <CartProvider>
//             {!shouldHideLayout && <Header />}
//             {children}
//             {!shouldHideLayout && <Footer />}
            
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }