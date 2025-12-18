import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff5ee] via-white to-white">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">

        {/* Full logo */}
        <div className="mx-auto mb-8 w-64 sm:w-72 md:w-80">
          <img src="/campus-crib-logo-full.png" alt="CampusCrib" className="w-full h-auto" />
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-quickSand">
          Verified student house listings.
          <span className="block text-[#ee5d6c]">No scams. No stress.</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-10 mb-8 max-w-3xl text-2xl text-[#6a0d83] font-workSans">
          Find safe and affordable housing near campus with verified listings, transparent pricings, and reliable roommates. 
          <br />Home starts here.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/listings" className="rounded-md bg-gradient-to-r from-[#ee5d6c] to-[#fb9062] px-6 py-3 font-workSans text-xl text-white shadow-md transition hover:opacity-90">
            Search Listings
          </Link>

          <Link href="/roommates" className="rounded-md px-6 py-3 font-workSans text-xl text-[#ee5d6c] transition hover:bg-[#fff1eb]">
            Find a Roommate
          </Link>
        </div>

      </div>
    </section>
  )
}
