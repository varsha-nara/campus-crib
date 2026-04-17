import React from 'react';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { listings } from "@/data/listings";

interface ListingProps {
  id: string;
  title: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  amenities: string[];
}

const Listing = ({ id, title, price, image, bedrooms, bathrooms, sqft, amenities }: ListingProps) => {
  const router = useRouter()
  const handleSearch = () => {
    router.push(`/listings/${id}`)
  }

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row">
      <div className="relative w-full lg:w-[60%] h-1/2 lg:h-full">
        <img 
          src={image}
          alt="Picture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative w-full lg:w-[40%] flex flex-col justify-center lg:h-full lg:ml-8">
        <h3 className="text-xl lg:text-2xl font-medium text-[#6a0d83] lg:mb-2 font-quickSand">{title}</h3>
        <p className="text-xl lg:text-3xl font-semibold text-[#ce4993] mb-2 lg:mb-4">{price}</p>
        <ul className="space-y-1 lg:space-y-2">
          <li className="flex items-center text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
            {bedrooms} bed, {bathrooms} bath
          </li>
          <li className="flex items-center text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3"></span>
            {sqft}
          </li>
          <li className="flex items-start text-black font-quickSand">
            <span className="w-2 h-2 bg-[#ce4993] rounded-full mr-3 mt-2 flex-shrink-0"></span>
            Amenities: {amenities.slice(0, 3).join(", ")}
          </li>
        </ul>
        <button className="relative p-2 px-4 mt-5 lg:mt-10 font-quickSand bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white rounded-md" onClick={handleSearch}>
          Explore
        </button>
      </div>
    </div>
  );
};

export default Listing;