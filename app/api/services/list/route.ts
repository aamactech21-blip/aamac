import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity-server'

export async function GET() {
  try {
    const services = await sanityWriteClient.fetch(
      `*[_type == "service"] | order(_createdAt asc) { _id, title, description, "imageUrl": image.asset->url, "imageRef": image.asset._ref }`
    )
    return NextResponse.json(services)
  } catch (err) {
    console.error('[/api/services/list]', err)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}
