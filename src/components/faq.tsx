import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our menu, select your items, and proceed to checkout. You can pay online or choose cash on delivery.",
  },
  { question: "What are your delivery hours?", answer: "We deliver from 10 AM to 10 PM, seven days a week." },
  { question: "Is there a minimum order amount?", answer: "The minimum order amount is $10 for delivery orders." },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you'll receive a tracking link via SMS and email to monitor your delivery in real-time.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-lg sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="text-sm max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

