import Hero from "@/components/hero"
import Menu from "@/components/menu"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <main>
      <Hero />
      <Menu />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  )
}

