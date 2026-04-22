"use client"
import Link from "next/link"
import { Mail, Twitter, MapPin, Send, Globe } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function page() {
  return (
    <div>
    <section className="relative bg-[#eeaf61] text-white min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-6 py-16 flex flex-col items-center">
            {/* Email List */}
            <div className="w-full">
            <h3 className="text-5xl font-quickSand font-semibold mb-4">
                Join our email list
            </h3>

            <p className="text-white/90 text-2xl font-quickSand mb-4">
                Get new listings and updates straight to your inbox.
            </p>

            <form
                onSubmit={(e) => e.preventDefault()}
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

            <div className="flex gap-4 mt-5 justify-center">
                <a href="#" className="hover:scale-110 transition">
                <Twitter />
                </a>
                <a href="#" className="hover:scale-110 transition">
                <Globe />
                </a>
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}