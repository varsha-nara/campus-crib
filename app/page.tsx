import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="pb-[10%]">
      <Hero />
      <div className="mt-10 text-center justify-center max-w-5xl mx-auto">
        <h1 className="mt-[5%] text-3xl md:text-3xl lg:text-5xl font-medium font-quickSand mb-0 md:mb-2 lg:mb-3">
          Our Mission
        </h1>
        <p className="mt-[5%] font-quickSand text-2xl" >
          CampusCrib is a student housing platform designed by students for students to restore <b>trust, affordability, and safety</b> in the housing search.
          Because no one should have to choose between unsafe housing and academic success.
        </p>
      </div>
      <div className="mt-[2%] flex justify-center gap-4">
        <button className="rounded-xl bg-white px-4 py-2 font-quickSand font-medium text-2xl text-orange-600 shadow transition hover:bg-orange-50">
          Browse Listings
        </button>
        <button className="px-4 py-2 transition border border-orange-600 text-white font-medium font-quickSand text-2xl hover:bg-white/15 rounded-xl">
          List your property
        </button>
      </div>
    </div>
  )
}
