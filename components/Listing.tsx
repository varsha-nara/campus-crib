import React from 'react';

interface ListingProps {
  title: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  amenities: string[];
}

const Listing = ({ title, price, image, bedrooms, bathrooms, sqft, amenities }: ListingProps) => {
  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row">
      <div className="relative w-full lg:w-[70%] h-1/2 lg:h-full">
        <img 
          src={image}
          alt="Picture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative w-full lg:w-[30%] flex flex-col justify-center lg:h-full lg:ml-8">
        <h3 className="text-xl lg:text-2xl font-medium text-[#6a0d83] lg:mb-2 font-quickSand">{title}</h3>
        <p className="text-xl lg:text-3xl font-semibold text-[#ce4993] mb-2 lg:mb-4">{price}</p>
        <ul className="space-y-1 lg:space-y-2">
          <li className="flex items-center text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
            {bedrooms} bedrooms
          </li>
          <li className="flex items-center text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
            {bathrooms} bathrooms
          </li>
          <li className="flex items-center text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
            {sqft}
          </li>
          {amenities.map((amenity, idx) => (
            <li key={idx} className="flex items-center text-black font-quickSand">
              <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
              {amenity}
            </li>
          ))}
        </ul>
        <button className="relative p-2 px-4 mt-5 lg:mt-10 font-quickSand bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white rounded-md">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Listing;