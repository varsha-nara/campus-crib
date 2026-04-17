import { listings as staticListings } from "@/data/listings"
import { getTravelTimes } from "@/lib/distance"
import SaveButton from "@/components/SaveButton"
import ListingMap from "@/components/ListingMap"
import { notFound } from "next/navigation"

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = staticListings.find(l => l.id === params.id)
  if (!listing) notFound()

  function parsePrice(str: string) {
    const clean = str.replace(/[^\d.]/g, "");
    return Number(clean);
  }

  const travel = await getTravelTimes(listing.lng, listing.lat)

  return (
    <div className="min-h-screen w-full flex flex-col mx-auto">
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 py-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden h-72 md:h-96 w-full mb-8">
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-3xl font-quickSand font-semibold text-white mb-1">{listing.title}</h1>
            <p className="text-2xl font-semibold text-white/90 mb-6">
              {listing.price}<span className="text-base font-normal"></span>
            </p>

            {/* Details */}
            <div className="bg-white/90 font-quickSand justify-center rounded-2xl p-4 pl-6 mb-6">
              <h2 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mb-4">Details</h2>
              <div className="grid grid-cols-3 gap-4 text-md text-gray-700">
                <div>
                  <p className="text-[#ee5d6c] text-lg mb-1">Bedrooms</p>
                  <p className="font-medium text-lg">{listing.bedrooms}</p>
                </div>
                <div>
                  <p className="text-[#ee5d6c] text-lg mb-1">Bathrooms</p>
                  <p className="font-medium text-lg">{listing.bathrooms}</p>
                </div>
                <div>
                  <p className="text-[#ee5d6c] text-lg mb-1">Size</p>
                  <p className="font-medium text-lg">{listing.sqft}</p>
                </div>
                <div>
                  <p className="text-[#ee5d6c] text-lg mb-1">Furnished</p>
                  <p className="font-medium text-lg">{listing.furnished ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-[#ee5d6c] text-lg mb-1">Utilities</p>
                  <p className="font-medium text-lg">{listing.utilities_included ? "Yes" : "No (~$150/mo)"}</p>
                </div>
              </div>
              {/* Amenities */}
              <div className="rounded-2xl pt-4">
                <p className="text-lg font-quickSand text-[#ee5d6c] mb-4">Amenities</p>
                <ul className="flex flex-wrap gap-2">
                  {listing.amenities.map((a, i) => (
                    <li key={i} className="bg-[#0de9ff]/50 text-[#1d4e56] text-md px-3 py-1 rounded-xl">{a}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-6">
                  <h2 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mb-4">Total</h2>
                  <p className="font-medium text-xl">$ {listing.utilities_included ? parsePrice(listing?.price).toLocaleString() : (parsePrice(listing?.price) + 150).toLocaleString()}/mo</p>
                  <p className="text-sm text-gray-600">(all estimated prices included)</p>
                </div>  
            </div>         

            {/* Reviews placeholder */}
            <div className="bg-white/90 rounded-2xl p-6">
              <h2 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mb-4">Reviews</h2>
              <p className="text-gray-400 text-sm">No reviews yet. Be the first to review this listing.</p>
            </div>

            <div className="pt-10">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand font-medium hover:opacity-90 transition mb-3">
                  Contact Landlord
              </button>
              <SaveButton listingId={listing.id} />
            </div>
          </div>

          {/* Right — contact card */}
          <div className="lg:w-[50%]">
            <div className="bg-white/90 rounded-2xl p-4 sticky top-24">
              <h2 className="text-lg font-quickSand font-semibold text-[#6a0d83] mb-4">Location</h2>
              <div className="rounded-2xl p-2 mb-6 w-full h-80">
                <ListingMap lng={listing.lng} lat={listing.lat} title={listing.title} />
              </div>

              {/* Travel times */}
              <div className="rounded-xl font-quickSand">
                <p className="text-md font-semibold text-[#6a0d83] uppercase mb-3">Distance from UCSB</p>
                <div className="text-md text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>🚶 Walking</span>
                    <span className="font-semibold text-[#6a0d83]">{travel.walking}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🚲 Cycling</span>
                    <span className="font-semibold text-[#6a0d83]">{travel.cycling}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🚗 Driving</span>
                    <span className="font-semibold text-[#6a0d83]">{travel.driving}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}