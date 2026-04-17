const UCSB = [-119.8489, 34.4140] as [number, number]

export interface TravelTimes {
  walking: string
  cycling: string
  driving: string
}

export async function getTravelTimes(lng: number, lat: number): Promise<TravelTimes> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  const destination = `${lng},${lat}`
  const origin = `${UCSB[0]},${UCSB[1]}`

  const modes = ["walking", "cycling", "driving"] as const

  const results = await Promise.all(
    modes.map(async (mode) => {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin};${destination}?access_token=${token}`
      )
      const data = await res.json()
      const seconds = data.routes?.[0]?.duration ?? 0
      const minutes = Math.round(seconds / 60)
      return minutes < 60 ? `${minutes} min` : `${Math.round(minutes / 60)}h ${minutes % 60}m`
    })
  )

  return {
    walking: results[0],
    cycling: results[1],
    driving: results[2],
  }
}