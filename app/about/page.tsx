"use client"
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react"
import Footer from "@/components/Footer";

export default function ListingsPage() {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
        ).matches

        if (prefersReducedMotion) return
        const onScroll = () => {
            const y = window.scrollY

            const left = document.getElementById("cloud1")
            const right = document.getElementById("cloud2")
            if (!left || !right) return

            left.style.transform = `translateX(calc(-33% + ${y * 0.15}px))`
            right.style.transform = `translateX(calc(33% - ${y * 0.15}px))`
        }
        window.addEventListener("scroll", onScroll)
      return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const profiles = [
        { name: "Katherine Santiago", role: "Project Lead", image: "/images/katherine.png" },
        { name: "Jaslynn Nol Cornejo", role: "Social Media Manager", image: "/images/jaslynn.jpg" },
        { name: "Varsha Narasiman", role: "Technical Design", image: "/images/vn.png" },
        { name: "Raghvi Sharma", role: "Project Outreach", image: "/images/raghvi.png" }
    ];

    return (
        <div className="pb-[10%]">
        <section className="relative overflow-hidden min-h-screen pb-[20vh]">
            <img id="cloud1" src="/images/cloud1.png" className="absolute left-0 top-[15vh] opacity-70 lg:top-[30vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 -translate-x-1/3 pointer-events-none" />
            <img id="cloud2" src="/images/cloud2.png" className="absolute right-0 top-[35vh] opacity-70 lg:top-[70vh] w-[50vw] sm:w-3/5 md:w-2/3 lg:w-1/2 translate-x-1/3 pointer-events-none" />
            <div className="text-center z-10">
                <h1 className="mt-10 text-lg md:text-3xl lg:text-5xl font-medium font-quickSand text-white mb-0 md:mb-2 lg:mb-3">
                We are CampusCrib
                </h1>

                <div className="mt-10 text-left justify-center max-w-5xl mx-auto">
                    <p className="font-quickSand text-white text-xl" >
                        
                    </p>
                </div>

                <div className="flex flex-row mt-[5%] justify-center gap-8 w-full">
                {profiles.map((profile, i) => (
                    <div key={i} className="flex flex-col mx-4 items-center text-center">
                    <div className="relative w-40 h-40 mb-3 overflow-hidden rounded-full border-2 border-gray-200">
                        <img 
                        src={profile.image} 
                        alt={profile.name}  
                        className="w-full h-full object-cover" 
                        />
                    </div>
                    {/* Name and Major */}
                    <h3 className="font-bold font-quickSand text-2xl">{profile.name}</h3>
                    <p className="font-quickSand text-lg">{profile.role}</p>
                    </div>
                ))}
                </div>
                <div className="mt-10 text-center justify-center max-w-5xl mx-auto">
                    <p className="font-quickSand text-2xl">
                        We are a team of students, engineers, and researchers working directly on the university housing crisis across multiple campuses.
                        We’re not studying the problem from a distance — we’re building tools while actively working with student governments, Basic Needs Centers, and campus administrators.
                    </p>

                    <div className="mt-10 font-quickSand grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                            <h3 className="text-[#6a0d83] font-semibold text-2xl mb-3">
                            Verified Listings
                            </h3>
                            <p className="text-[#01184e]/80 text-lg font-medium">
                            We flag scams, overcrowding, and misleading listings before students sign a lease, helping prevent costly mistakes.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                            <h3 className="text-[#6a0d83] font-semibold text-2xl mb-3">
                            Roommate Matching
                            </h3>
                            <p className="text-[#01184e]/80 text-lg font-medium">
                            Lifestyle-based matching verified through university emails to help students find compatible, trustworthy roommates.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                            <h3 className="text-[#6a0d83] font-semibold text-2xl mb-3">
                            Tenant Education Hub
                            </h3>
                            <p className="text-[#01184e]/80 text-lg font-medium">
                            Simple, student-focused guidance on leases, deposits, and legal rights so renters actually understand what they’re signing.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-16 text-left justify-center max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-medium font-quickSand">
                        Why CampusCrib?
                    </h1>

                    <p className="mt-6 text-2xl font-quickSand">
                        Most housing platforms are built from the outside looking in. We’re building this from inside the system.
                        Our team includes student leaders working on basic needs policy across California higher education, with direct relationships to campus organizations already in place.
                        That means we’re not just building a product — we’re building something positioned for real campus adoption.
                    </p>
                </div>
                <div className="mt-16 text-center justify-center max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-medium font-quickSand">
                    Our Advantages
                    </h1>
                </div>
                <div className="mt-10 font-quickSand grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Reviews & Ratings
                        </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Rent Transparency
                        </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Verified Listings
                        </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Interactive Map View
                        </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Saved Searches & Alerts
                        </h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                        <h3 className="text-[#1d4e56] font-semibold text-2xl mb-3">
                        Community Forum
                        </h3>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}