import type { ReactNode } from "react"
import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#ee5d6c] via-[#fb9062] to-[#eeaf61]">
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  )
}
