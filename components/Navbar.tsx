import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand */}
            <Link href="/" className="tracking-tight hover:opacity-90">
              <div className="flex items-center space-x-2">
                <div className="h-16 w-16 overflow-hidden">
                  <img src="/images/campus-crib-logo.png" alt="CampusCrib" className="h-full w-full object-cover" />
                </div>
                <div className="pl-4 text-2xl font-medium font-quickSand">Campus Crib</div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-4 text-xl font-medium font-quickSand">
              {["Listings", "Roommates", "Guides", "About"].map((item) => (
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
              <Link href="/auth" className="rounded-xl bg-white px-4 py-2 text-orange-600 shadow transition hover:bg-orange-50">
                Get Started
              </Link>
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition hover:bg-white/10"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    )
}