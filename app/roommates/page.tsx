"use client"
import { useState, useMemo } from "react"
import { roommates } from "@/data/roommates"
import { X } from "lucide-react"

function ScoreDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${i < value ? "bg-[#ce4993]" : "bg-gray-200"}`}
        />
      ))}
    </div>
  )
}

const defaultFilters = {
    sleep: "",
    minCleanliness: "",
    minSocial: "",
    pets: "",
    budget: "",
    moveIn: ""
};

export default function RoommatesPage() {
  const [filters, setFilters] = useState({...defaultFilters, })

  const filtered = useMemo(() => {
    return roommates.filter(r => {
      if (filters.sleep && r.sleep !== filters.sleep) return false
      if (filters.minCleanliness && r.cleanliness < parseInt(filters.minCleanliness)) return false
      if (filters.minSocial && r.social < parseInt(filters.minSocial)) return false
      if (filters.pets === "yes" && !r.pets) return false
      if (filters.pets === "no" && r.pets) return false
      if (filters.moveIn && r.moveIn !== filters.moveIn) return false
      return true
    })
  }, [filters])

  const update = (key: keyof typeof filters, value: string) =>
    setFilters(f => ({ ...f, [key]: value }))

  const activeChips: { label: string; clear: () => void }[] = []
  if (filters.sleep) activeChips.push({ label: `"${filters.sleep}"`, clear: () => setFilters(f => ({ ...f, search: "" })) })
  if (filters.minCleanliness) activeChips.push({ label: `${filters.minCleanliness}`, clear: () => setFilters(f => ({ ...f, beds: "" })) })
  if (filters.minSocial) activeChips.push({ label: `${filters.minSocial}`, clear: () => setFilters(f => ({ ...f, baths: "" })) })
  if (filters.pets) activeChips.push({ label: `$${filters.pets}`, clear: () => setFilters(f => ({ ...f, price: "" })) })
  if (filters.moveIn) activeChips.push({ label: `After ${filters.moveIn}`, clear: () => setFilters(f => ({ ...f, distance: "" })) })
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 py-10">
        <h1 className="text-4xl font-quickSand font-semibold text-white mb-2">Find a Roommate</h1>
        <p className="text-white/90 font-quickSand text-xl mb-8">Browse verified student profiles and find your perfect match.</p>

        {/* Filters */}
        <div className="bg-white/20 p-2 rounded-2xl mb-8 font-quickSand flex flex-wrap gap-4">
          <select value={filters.sleep} onChange={e => update("sleep", e.target.value)} className="rounded-lg border px-3 py-2 text-lg">
            <option value="">Sleep schedule</option>
            <option value="early">Early bird</option>
            <option value="normal">Normal</option>
            <option value="late">Night owl</option>
          </select>

          <select value={filters.minCleanliness} onChange={e => update("minCleanliness", e.target.value)} className="rounded-lg border px-3 py-2 text-lg">
            <option value="">Cleanliness</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </select>

          <select value={filters.minSocial} onChange={e => update("minSocial", e.target.value)} className="rounded-lg border px-3 py-2 text-lg">
            <option value="">Social level</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>

          <select value={filters.pets} onChange={e => update("pets", e.target.value)} className="rounded-lg border px-3 py-2 text-lg">
            <option value="">Pets</option>
            <option value="yes">Has pets</option>
            <option value="no">No pets</option>
          </select>

          <select value={filters.moveIn} onChange={e => update("moveIn", e.target.value)} className="rounded-lg border px-3 py-2 text-lg">
            <option value="">Move-in date</option>
            <option value="June 2025">June 2025</option>
            <option value="July 2025">July 2025</option>
            <option value="August 2025">August 2025</option>
          </select>
        </div>

        <div className="flex flex-row justify-between">
        {filtered.length !== 0 && <p className="text-white text-md font-quickSand mb-4">{filtered.length} roommate{filtered.length !== 1 ? "s" : ""} found</p>}
        {filtered.length === 0 && <p className="text-white text-md font-quickSand mb-4">No roommates found.</p>}
        {activeChips.length > 0 && (
            <div className="relative pt-0 flex flex-wrap gap-2 px-6 py-2">
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
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(r => (
            <div key={r.id} className="bg-white/90 font-quickSand rounded-2xl p-4 flex flex-col gap-4 hover:shadow-xl transition self-start ">
              <div className="flex items-center gap-4">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-quickSand font-semibold text-[#6a0d83] text-xl">{r.name}</h3>
                  <p className="text-md text-[#ce4993]">{r.year} · {r.major}</p>
                </div>
              </div>

              <p className="text-md text-[#01184e] leading-relaxed">{r.bio}</p>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-md">
                  <span className="text-[#af8017]">Cleanliness</span>
                  <ScoreDots value={r.cleanliness} />
                </div>
                <div className="flex justify-between items-center text-md">
                  <span className="text-[#af8017]">Social</span>
                  <ScoreDots value={r.social} />
                </div>
                <div className="flex justify-between items-center text-md">
                  <span className="text-[#af8017]">Sleep</span>
                  <span className="text-md bg-[#f3e8ff] text-[#6a0d83] px-2 py-0.5 rounded-full capitalize">{r.sleep === "early" ? "🌅 Early bird" : r.sleep === "late" ? "🌙 Night owl" : "😴 Normal"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-sm">
                {r.pets && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full">🐾 Has pets</span>}
                {r.smoking && <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">🚬 Smoker</span>}
                {!r.smoking && <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">✓ Non-smoker</span>}
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-md text-[#6a0d83]">Budget</p>
                  <p className="text-md font-semibold text-[#ce4993]">{r.budget}</p>
                </div>
                <div className="text-right">
                  <p className="text-md text-[#6a0d83]">Move-in</p>
                  <p className="text-md font-medium text-gray-700">{r.moveIn}</p>
                </div>
              </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand text-sm font-medium hover:opacity-90 transition">
                    Message
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}