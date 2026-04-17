"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SaveButton({ listingId }: { listingId: string }) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      setUserId(data.user.id)

      const { data: existing } = await supabase
        .from("saved_listings")
        .select("*")
        .eq("user_id", data.user.id)
        .eq("listing_id", listingId)
        .single()

      setSaved(!!existing)
    })
  }, [listingId])

  const toggle = async () => {
    if (!userId) { router.push("/auth"); return }
    setLoading(true)

    if (saved) {
      await supabase.from("saved_listings")
        .delete()
        .eq("user_id", userId)
        .eq("listing_id", listingId)
      setSaved(false)
    } else {
      await supabase.from("saved_listings")
        .insert({ user_id: userId, listing_id: listingId })
      setSaved(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`w-full py-3 rounded-xl border-2 font-quickSand font-medium transition ${
        saved
          ? "border-[#ce4993] text-[#ce4993] bg-pink-50"
          : "border-gray-300 text-gray-600 hover:border-[#ce4993] hover:text-[#ce4993]"
      }`}
    >
      {saved ? "♥ Saved" : "♡ Save Listing"}
    </button>
  )
}