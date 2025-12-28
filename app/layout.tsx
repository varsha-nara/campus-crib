import "@/styles/globals.css"
import Header from "@/components/Header"
import type { ReactNode } from "react"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gradient-to-b from-[#ee5d6c] via-[#fb9062] to-[#eeaf61]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
