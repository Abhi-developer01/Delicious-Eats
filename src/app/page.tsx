import Hero from "@/components/hero"
import Menu from "@/components/menu"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import AISuggestionBox from "@/components/AISuggestionBox"; // Added import

export default function Home() {
  return (
    <main>
      <Hero />
      <AISuggestionBox /> {/* Added AI Suggestion Box */}
      <Menu />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  )
}

