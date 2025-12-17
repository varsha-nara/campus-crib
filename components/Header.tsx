import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-[#FF6B6B] via-[#FFA56B] to-[#FFD56B] text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-22 items-center justify-between">
          <div className="shrink-0 flex items-center space-x-2">
            <img src="/campus-crib-logo.png" alt="CampusCrib Logo" className="h-20 w-20"/>
            <Link href="/" className="hover:opacity-90 transition-opacity text-2xl font-bold tracking-tight">
              CampusCrib
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-5 text-xl font-medium">
            {["Listings", "Roommates", "Guides", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative px-6 py-4 transition-all hover:bg-white/20 hover:backdrop-blur-sm hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Link href="/signup" className="rounded-lg bg-white px-5 py-2 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
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