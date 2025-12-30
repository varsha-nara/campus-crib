import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";

export default function ListingsPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <SearchBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className="hidden lg:block w-1/2 bg-gray-200">
          <div className="h-full flex items-center justify-center text-gray-500">
            Map coming soon
          </div>
        </div>

        {/* Listings */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {listings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
