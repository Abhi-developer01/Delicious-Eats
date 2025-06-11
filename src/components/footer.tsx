'use client'

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold mb-4">Delicious Eats</h3>
            <p className="text-sm">Bringing the best local food right to your doorstep.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#menu" className="hover:text-primary">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-primary">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Delicious Eats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

