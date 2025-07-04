import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { CartProvider } from "@/components/dashboard/cart-context"
import { AuthProvider } from '@/components/auth-context';
import InAppBrowserBlocker from '@/components/in-app-browser-blocker';
import { CategoryProvider } from "@/components/dashboard/category-context"
import LayoutWrapper from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Delicious Eats - Food Ordering App",
  description: "Order from your favorite restaurants with just a few clicks. Delicious food delivered to your door.",
  icons: {
  icon: "/images/logo.png", // ✅ Correct
},
  openGraph: {
    title: "Delicious Eats - Food Ordering App",
    description: "Order from your favorite restaurants with just a few clicks. Delicious food delivered to your door.",
    url: "https://delicious-eats-lime.vercel.app/",
    siteName: "Delicious Eats",
    
    images: [
      {
        url: "https://delicious-eats-lime.vercel.app/og-image.svg", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "Delicious Eats - Food Ordering App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delicious Eats - Food Ordering App",
    description: "Order from your favorite restaurants with just a few clicks. Delicious food delivered to your door.",
    images: ["https://delicious-eats-lime.vercel.app/og-image.svg"], // Must be an absolute URL
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add the font link here */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        /> */}

<link
  href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
  rel="stylesheet"
/>

      </head>
      <body className={inter.className}>
        <InAppBrowserBlocker />
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