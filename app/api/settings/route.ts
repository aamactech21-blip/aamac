import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity-server'

export async function GET() {
  const settings = await sanityWriteClient.fetch(
    `*[_type == "siteSettings"][0]{ _id, contact, footer }`
  )
  return NextResponse.json(settings ?? null)
}
