import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity-server'

export async function GET() {
  try {
    const products = await sanityWriteClient.fetch(
      `*[_type == "product"] | order(_createdAt desc) { _id, name, description, "imageUrl": image.asset->url, "imageRef": image.asset._ref }`
    )
    return NextResponse.json(products)
  } catch (err) {
    console.error('[/api/products/list]', err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
