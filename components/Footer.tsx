"use client"
import Link from "next/link"
import { Mail, Twitter, MapPin, Send, Globe } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [message, setMessage] = useState("")

  return (
    <footer className="bg-[#ee5d6c] text-white overflow-hidden mt-[10%] sticky pb-0">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold font-quickSand">
            CampusCrib
          </h2>
          <p className="mt-3 text-white/90 text-lg leading-relaxed">
            Student housing built by students — focused on trust, affordability, and safety.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-lg text-white/90">
            <li><Link href="/listings" className="hover:text-white transition">Browse Listings</Link></li>
            <li><Link href="/post" className="hover:text-white transition">List a Property</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Email List */}
        <div className="md:justify-self-start -ml-12">
          <h3 className="text-xl font-semibold mb-4">Join our email list</h3>

          <p className="text-white/90 text-lg mb-4">
            Get new listings and updates straight to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className="relative"
          >
            <input
              type="email"
              required
              placeholder="Enter your email..."
              className="w-full p-3 pr-12 rounded-xl text-sm text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#ee5d6c] p-2 rounded-full shadow hover:scale-110 transition"
            >
              <Send size={18} />
            </button>
          </form>

          {/* Socials */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:scale-110 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Globe />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/80">
        © {new Date().getFullYear()} CampusCrib. All rights reserved.
      </div>
    </footer>
  )
}