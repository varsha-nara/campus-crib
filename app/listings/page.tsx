"use client"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import ListingCard from "@/components/ListingCard"
import { listings } from "@/data/listings"
import dynamic from "next/dynamic"
import Footer from "@/components/Footer"

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const UCSB = { lat: 34.4140, lng: -119.8489 }

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

const defaultFilters = {
  search: "",
  beds: "",
  baths: "",
  price: "",
  distance: "",
  furnished: "",
  amenities: [] as string[],
  utilities: "",
}

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    ...defaultFilters,
    search: searchParams.get("search") ?? "",
  })

  // Sync URL search param on mount
  useEffect(() => {
    const q = searchParams.get("search")
    if (q) setFilters(f => ({ ...f, search: q }))
  }, [searchParams])

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (filters.search && !l.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !l.amenities.some(a => a.toLowerCase().includes(filters.search.toLowerCase()))) return false
      if (filters.beds && l.bedrooms < parseInt(filters.beds)) return false
      if (filters.baths && l.bathrooms < parseInt(filters.baths)) return false
      if (filters.price) {
        const price = parseInt(l.price.replace(/\D/g, ""))
        if (filters.price === "500-1000" && (price < 500 || price > 1000)) return false
        if (filters.price === "1000-1500" && (price < 1000 || price > 1500)) return false
        if (filters.price === "1500+" && price < 1500) return false
      }
      if (filters.distance) {
        const d = distanceMiles(UCSB.lat, UCSB.lng, l.lat, l.lng)
        if (filters.distance === "1" && d > 1) return false
        if (filters.distance === "10" && (d < 1 || d > 10)) return false
        if (filters.distance === "10+" && d < 10) return false
      }
      if (filters.furnished) {
        if (filters.furnished === "furnished" && !l.furnished) return false
        if (filters.furnished === "unfurnished" && l.furnished) return false
      }
      if (filters.utilities === "included" && !l.utilities_included) return false
      if (filters.amenities.length > 0 && !filters.amenities.every(a => l.amenities.includes(a))) return false
      return true
    })
  }, [filters])

  // Build active filter chips
  const activeChips: { label: string; clear: () => void }[] = []
  if (filters.search) activeChips.push({ label: `"${filters.search}"`, clear: () => setFilters(f => ({ ...f, search: "" })) })
  if (filters.beds) activeChips.push({ label: `${filters.beds}+ beds`, clear: () => setFilters(f => ({ ...f, beds: "" })) })
  if (filters.baths) activeChips.push({ label: `${filters.baths}+ baths`, clear: () => setFilters(f => ({ ...f, baths: "" })) })
  if (filters.price) activeChips.push({ label: `$${filters.price}/mo`, clear: () => setFilters(f => ({ ...f, price: "" })) })
  if (filters.distance) activeChips.push({ label: `Within ${filters.distance} mi`, clear: () => setFilters(f => ({ ...f, distance: "" })) })
  if (filters.furnished) activeChips.push({ label: filters.furnished, clear: () => setFilters(f => ({ ...f, furnished: "" })) })
  if (filters.utilities) activeChips.push({ label: "Utilities included", clear: () => setFilters(f => ({ ...f, utilities: "" })) })
  filters.amenities.forEach(a => activeChips.push({
    label: a,
    clear: () => setFilters(f => ({ ...f, amenities: f.amenities.filter(x => x !== a) }))
  }))

  return (
    <div className="relative flex flex-col min-h-screen">
      <SearchBar filters={filters} onChange={setFilters} />

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="relative z-20 flex flex-wrap gap-2 px-6 py-2">
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.clear}
              className="flex items-center gap-1 bg-white/90 text-[#6a0d83] text-sm px-3 py-1 rounded-full shadow hover:bg-white transition"
            >
              {chip.label}
              <X size={12} />
            </button>
          ))}
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-sm text-white/80 underline hover:text-white px-2"
          >
            Clear all
          </button>
        </div>
      )}

      <img src="/images/sun.png" className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90%] h-auto z-0" alt="Sun"/>
      <img id="cloud1" src="/images/cloud1.png" className="absolute left-0 top-[15vh] lg:top-[30vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 -translate-x-1/3 pointer-events-none" />
      <img id="cloud2" src="/images/cloud2.png" className="absolute right-0 top-[35vh] lg:top-[70vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 flex flex-1">
        <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
          <Map listings={filtered} />
        </div>

        <div className="w-full lg:w-1/2 mt-0">
          <p className="text-white text-md font-quickSand ml-5">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="p-4">
            {filtered.length === 0 ? (
              <p className="text-white font-quickSand text-lg">No listings match your filters.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}