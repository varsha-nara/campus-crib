"use client"
import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

const UCSB = [-119.8489, 34.4140] as [number, number]

export default function ListingMap({ lng, lat, title }: { lng: number; lat: number; title: string }) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !container.current) return

    map.current = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [(lng + UCSB[0]) / 2, (lat + UCSB[1]) / 2],
      zoom: 13,
    })

    // Listing marker
    new mapboxgl.Marker({ color: "#ce4993" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setText(title))
      .addTo(map.current)

    // UCSB marker
    new mapboxgl.Marker({ color: "#6a0d83" })
      .setLngLat(UCSB)
      .setPopup(new mapboxgl.Popup().setText("UCSB"))
      .addTo(map.current)

    // Draw route
    map.current.on("load", async () => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${UCSB[0]},${UCSB[1]};${lng},${lat}?geometries=geojson&access_token=${token}`
      )
      const data = await res.json()
      const route = data.routes?.[0]?.geometry

      if (!route || !map.current) return

      map.current.addSource("route", { type: "geojson", data: { type: "Feature", properties: {}, geometry: route } })
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ce4993", "line-width": 4, "line-opacity": 0.8 },
      })
    })

    return () => { map.current?.remove(); map.current = null }
  }, [lng, lat, title])

  return <div ref={container} style={{ height: "100%", width: "100%" }} className="rounded-xl overflow-hidden" />
}