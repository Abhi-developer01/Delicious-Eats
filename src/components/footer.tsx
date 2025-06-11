'use client'

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-10  text-gray-300 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          
          {/* About Section */}
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Delicious Eats</h2>
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
              Bringing the best local food right to your doorstep, one delicious meal at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#menu" className="hover:text-white text-xs sm:text-sm transition-colors">Menu</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white text-xs sm:text-sm transition-colors">How It Works</Link></li>
              <li><Link href="#testimonials" className="hover:text-white text-xs sm:text-sm transition-colors">Testimonials</Link></li>
              <li><Link href="#faq" className="hover:text-white text-xs sm:text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white text-xs sm:text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white text-xs sm:text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white text-xs sm:text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Connect With Us</h3>
            <div className="flex space-x-4 sm:space-x-5 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} className="sm:size-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} className="sm:size-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} className="sm:size-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} className="sm:size-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} className="sm:size-5" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 border-t border-gray-800 pt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-white">Delicious Eats</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
