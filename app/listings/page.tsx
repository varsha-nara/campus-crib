import ListingClient from "@/components/ListingClient"

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>
}) {
  const params = await searchParams

  return (
    <ListingClient initialSearch={params?.search ?? ""} />
  )
}