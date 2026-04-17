"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="tracking-tight hover:opacity-90">
            <div className="flex items-center space-x-2">
              <div className="h-16 w-16 overflow-hidden">
                <img src="/images/campus-crib-logo.png" alt="CampusCrib" className="h-full w-full object-cover" />
              </div>
              <div className="pl-4 text-2xl font-medium font-quickSand">CampusCrib</div>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-4 text-xl font-medium font-quickSand">
            {["Listings", "Roommates", "Guides", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 transition hover:bg-white/15 hover:backdrop-blur-sm"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 text-xl font-medium font-quickSand">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/saved" className="px-4 py-2 transition hover:bg-white/15 rounded-xl">
                  Saved
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-xl bg-white px-4 py-2 text-orange-600 shadow transition hover:bg-orange-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth" className="rounded-xl bg-white px-4 py-2 text-orange-600 shadow transition hover:bg-orange-50">
                Get Started
              </Link>
            )}
          </div>

          <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition hover:bg-white/10" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}