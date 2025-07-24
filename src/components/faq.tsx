'use client'
import { useState } from "react"

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

type FAQItemProps = {
  question: string;
  answer: string;
  index: number;
};
function FAQItem({ question, answer, index }:FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-0 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-110 transition-transform duration-300">
            {index + 1}
          </div>
          <span className="text-gray-900 font-semibold text-sm sm:text-lg leading-tight flex-1">
            {question}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 sm:px-6 pb-4 sm:pb-5">
          <div className="ml-11 text-gray-600 text-sm sm:text-base leading-relaxed border-l-2 border-blue-100 pl-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-12 sm:py-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-purple-100/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      
      <div className="relative container mx-auto px-4">
        {/* Enhanced header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center sm:w-16 sm:h-16 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 shadow-lg">
            <svg className="sm:w-8 sm:h-8 w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">Find answers to common questions about our service</p>
        </div>

        {/* Modern accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>

        {/* Optional bottom section */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/30">
            <span className="text-gray-600 text-sm">Need more help?</span>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md text-sm">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}