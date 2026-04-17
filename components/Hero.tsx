"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import HeroCard from "./HeroCard"
import Listing from "./Listing"
import { listings } from "@/data/listings";

interface ListingData {
  id: string;
  title: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  amenities: string[];
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/listings?search=${encodeURIComponent(search.trim())}`)
    } else {
      router.push("/listings")
    }
  }

  useEffect(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (prefersReducedMotion) return

      const onScroll = () => {
        const y = window.scrollY

        const left = document.getElementById("cloud1")
        const right = document.getElementById("cloud2")

        const wave1 = document.getElementById("wave1")
        const wave2 = document.getElementById("wave2")
        const wave3 = document.getElementById("wave3")

        if (!left || !right) return

        left.style.transform = `translateX(calc(-33% + ${y * 0.15}px))`
        right.style.transform = `translateX(calc(33% - ${y * 0.15}px))`

        if (wave1) wave1.style.transform = `translateX(${y * 0.05}px)`
        if (wave2) wave2.style.transform = `translateX(${y * 0.10}px)`
        if (wave3) wave3.style.transform = `translateX(${y * 0.15}px)`
      }

      window.addEventListener("scroll", onScroll)
      return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % listings.length)
    }, 15000) // Change slide every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % listings.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + listings.length) % listings.length)
  }

  return (
    <section className="relative overflow-hidden min-h-screen pb-[20vh]">
      {/* Clouds */}
      <img id="cloud1" src="/images/cloud1.png" className="absolute left-0 top-[15vh] lg:top-[30vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 -translate-x-1/3 pointer-events-none transition-transform duration-75 ease-out" />
      <img id="cloud2" src="/images/cloud2.png" className="absolute right-0 top-[35vh] lg:top-[70vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 translate-x-1/3 pointer-events-none transition-transform duration-75 ease-out" />

      {/* Logo theme */}
      <div className="relative w-full flex flex-col items-center">
        <img src="/images/sun.png" className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90%] h-auto z-0" alt="Sun"/>
        <img src="/images/cap-card.png" className="relative w-[90%]" alt="Home Slide Background" />

        {/* Hero text on the roof */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-10 text-center w-full">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-quickSand text-white mb-0">
            Built by students, for students.
          </h1>
          <p className="text-sm md:text-lg lg:text-2xl text-white font-quickSand xs:mt-0 sm:mt-0 mt-2">
            Student housing you can trust with verified listings...
          </p>
          <div className="relative w-[50%] max-w-xl mx-auto sm:w-[40%] md:w-[50%] lg:w-xl mt-2 sm:mt-5 md:mt-5 lg:mt-12">
            <input
              type="text"
              placeholder="Search Listings..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-2 py-0.5 sm:px-3 sm:py-0.5 md:px-3 md:py-1 lg:px-5 lg:py-2 pr-12 sm:pr-14 md:pr-16 rounded-full text-sm sm:text-base md:text-base bg-white/90 focus:ring-[#ce4993] focus:ring-2 focus:outline-none"
            />
            <button onClick={handleSearch} className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ee5d6c] via-[#fb9062] to-[#eeaf61] text-white p-1 md:p-2 lg:p-3 rounded-full">
              <Search size={16} className="xs:w-2.5 xs:h-2.5 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Listing cards carousel in the beige area */}
        <div className="absolute top-[32%] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 w-full justify-center px-4">
          <div className="transition-all duration-500 ease-in-out">
            <HeroCard onNext={nextSlide} onPrev={prevSlide}><Listing {...listings[currentSlide]} /></HeroCard>
          </div>          
        </div>
      </div>

      {/* Waves */}
      <div className="relative top-[10vh] lg:top-[20vh] left-0 w-full">
        <img id="wave1" src="/images/wave1.png" className="absolute bottom-[8vh] lg:bottom-[16vh] left-0 w-full pointer-events-none transition-transform duration-75 mt-20" />
        <img id="wave2" src="/images/wave2.png" className="absolute bottom-[4vh] lg:bottom-[8vh] left-0 w-full pointer-events-none transition-transform duration-75" />
        <img id="wave3" src="/images/wave3.png" className="absolute bottom-[0vh] lg:bottom-[0vh] left-0 w-full pointer-events-none transition-transform duration-75" />
      </div>
    </section>
  )
}