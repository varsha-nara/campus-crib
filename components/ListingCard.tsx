import Link from "next/link";

type ListingCardProps = {
  id: string;
  title: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
};

export default function ListingCard({
  id,
  title,
  price,
  image,
  bedrooms,
  bathrooms,
}: ListingCardProps) {
  return (
    <Link
      href={`/listings/${id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-quickSand text-lg font-medium text-[#6a0d83]">
          {title}
        </h3>

        <p className="mt-1 text-[#ce4993] font-semibold text-lg">
          {price}
        </p>

        <div className="mt-2 flex gap-4 text-sm text-black">
          <span>{bedrooms} bd</span>
          <span>{bathrooms} ba</span>
        </div>
      </div>
    </Link>
  );
}
