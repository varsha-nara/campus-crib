"use client"
import { Search } from "lucide-react";

interface Filters {
  search: string;
  beds: string;
  baths: string;
  price: string;
  distance: string;
  furnished: string;
  amenities: string[];
  utilities: string;
}

interface SearchBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function SearchBar({ filters, onChange }: SearchBarProps) {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className="sticky top-0 z-50 mb-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3 gap-4">
        <div className="relative w-[60%]">
          <input
            type="text"
            placeholder="Search by campus, address, or city..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className="w-full border px-4 py-2 pr-12 rounded-lg text-sm bg-white/90 focus:ring-[#ce4993] focus:ring-2 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white p-2 rounded-full">
            <Search size={16} />
          </button>
        </div>

        <select value={filters.beds} onChange={(e) => update("beds", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>

        <select value={filters.baths} onChange={(e) => update("baths", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Bathrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>

        <select value={filters.price} onChange={(e) => update("price", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Price (monthly)</option>
          <option value="500-1000">$500–$1,000</option>
          <option value="1000-1500">$1,000–$1,500</option>
          <option value="1500+">$1,500+</option>
        </select>

        <select value={filters.distance} onChange={(e) => update("distance", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Distance to Campus</option>
          <option value="1">0–1 mile</option>
          <option value="10">1–10 miles</option>
          <option value="10+">10+ miles</option>
        </select>

        <select value={filters.furnished} onChange={(e) => update("furnished", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Furnished?</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>

        <select value={filters.utilities} onChange={(e) => update("utilities", e.target.value)} className="rounded-lg border px-3 py-2">
          <option value="">Utilities</option>
          <option value="included">Included</option>
        </select>

        <div className="relative group">
          <button className="rounded-lg border px-3 py-2 bg-white">
            Amenities {filters.amenities.length > 0 && `(${filters.amenities.length})`}
          </button>
          <div className="absolute hidden group-focus-within:flex flex-col bg-white border rounded-xl shadow-lg p-3 z-50 gap-2 min-w-[160px]">
            {["WiFi", "Parking", "Laundry", "AC", "Pet Friendly", "Dishwasher"].map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(a)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...filters.amenities, a]
                      : filters.amenities.filter(x => x !== a)
                    onChange({ ...filters, amenities: next })
                  }}
                />
                {a}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}