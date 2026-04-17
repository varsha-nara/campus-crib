"use client"
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

interface MapProps {
  listings: { id: string; title: string; price: string; lng: number; lat: number }[]
}

export default function Map({ listings }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-119.8601, 34.4124], // UCSB
      zoom: 14,
    })

    map.current.addControl(new mapboxgl.NavigationControl())

    listings.forEach((listing) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<strong>${listing.title}</strong><br/>${listing.price}`
      )

      new mapboxgl.Marker({ color: "#ce4993" })
        .setLngLat([listing.lng, listing.lat])
        .setPopup(popup)
        .addTo(map.current!)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  return <div ref={mapContainer} style={{ height: "100vh", width: "100%", position: "sticky", top: 0 }} />
}