import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity-server'

export async function GET() {
  try {
    const projects = await sanityWriteClient.fetch(
      `*[_type == "project"] | order(_createdAt desc) {
        _id, name, client, sector, location, projectType,
        description, servicesDelivered, outcome,
        "imageUrl": image.asset->url, "imageRef": image.asset._ref
      }`
    )
    return NextResponse.json(projects)
  } catch (err) {
    console.error('[/api/projects/list]', err)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
