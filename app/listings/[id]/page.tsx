import { createClient } from "@/lib/supabase/server"
import { listings as staticListings } from "@/data/listings"
import Navbar from "@/components/Navbar"
import SaveButton from "@/components/SaveButton"
import { notFound } from "next/navigation"

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  // For now pulls from static data, later swap for Supabase query
  const listing = staticListings.find(l => l.id === params.id)
  if (!listing) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 py-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden h-72 md:h-96 w-full mb-8">
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — details */}
          <div className="flex-1">
            <h1 className="text-3xl font-quickSand font-semibold text-white mb-1">{listing.title}</h1>
            <p className="text-2xl font-semibold text-white/90 mb-6">{listing.price}<span className="text-base font-normal">/mo</span></p>

            <div className="bg-white/90 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-quickSand font-semibold text-[#6a0d83] mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Bedrooms</p>
                  <p className="font-medium">{listing.bedrooms}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Bathrooms</p>
                  <p className="font-medium">{listing.bathrooms}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Size</p>
                  <p className="font-medium">{listing.sqft}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Furnished</p>
                  <p className="font-medium">Unfurnished</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-quickSand font-semibold text-[#6a0d83] mb-4">Amenities</h2>
              <ul className="flex flex-wrap gap-2">
                {listing.amenities.map((a, i) => (
                  <li key={i} className="bg-[#f3e8ff] text-[#6a0d83] text-sm px-3 py-1 rounded-full">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews placeholder */}
            <div className="bg-white/90 rounded-2xl p-6">
              <h2 className="text-lg font-quickSand font-semibold text-[#6a0d83] mb-4">Reviews</h2>
              <p className="text-gray-400 text-sm">No reviews yet. Be the first to review this listing.</p>
            </div>
          </div>

          {/* Right — contact card */}
          <div className="lg:w-80">
            <div className="bg-white/90 rounded-2xl p-6 sticky top-24">
              <p className="text-2xl font-semibold text-[#ce4993] mb-1">{listing.price}<span className="text-base font-normal text-gray-500">/mo</span></p>
              <p className="text-sm text-gray-500 mb-6">+ utilities est. ~$150/mo</p>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>🚶 Walk to campus</span>
                  <span className="font-medium">~12 min</span>
                </div>
                <div className="flex justify-between">
                  <span>🚲 Bike to campus</span>
                  <span className="font-medium">~4 min</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand font-medium hover:opacity-90 transition mb-3">
                Contact Landlord
              </button>
              <SaveButton listingId={listing.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}