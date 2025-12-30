import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="sticky top-0 z-50 mb-2">
        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3 gap-4">
          {/* Search bar */}
          <div className="relative w-[60%]">
            <input
              type="text"
              placeholder="Search by campus, address, or city..."
              className="w-full border px-4 py-2 pr-12 sm:pr-14 md:pr-16 rounded-lg text-sm sm:text-base md:text-base bg-white/90 focus:ring-[#ce4993] focus:ring-2 focus:outline-none"
            />
            <button className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white p-1 md:p-2 lg:p-3 rounded-full">
              <Search size={16} className="xs:w-2.5 xs:h-2.5 w-4 h-4" />
            </button>
          </div>

          {/* Filters */}
          <select className="rounded-lg border px-3 py-2">
            <option>Beds</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
          </select>

          <select className="rounded-lg border px-3 py-2">
            <option>Bathrooms</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
          </select>

          <select className="rounded-lg border px-3 py-2">
            <option>Price (monthly)</option>
            <option>$500-$1,000</option>
            <option>$1,000-$1,500</option>
            <option>$1,500</option>
          </select>

          <select className="rounded-lg border px-3 py-2">
            <option>Distance to Campus</option>
            <option>0 - 1 mile</option>
            <option>1 - 10 mile</option>
            <option>10+ mile</option>
          </select>
        </div>
      </div>
  );
}
