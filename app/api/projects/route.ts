import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, client, sector, location, projectType, description, servicesDelivered, outcome, imageRef } = await request.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: 'project',
    name: name.trim(),
    client: client?.trim() ?? '',
    sector: sector?.trim() ?? '',
    location: location?.trim() ?? '',
    projectType: projectType?.trim() ?? '',
    description: description?.trim() ?? '',
    servicesDelivered: Array.isArray(servicesDelivered) ? servicesDelivered : [],
    outcome: outcome?.trim() ?? '',
  }

  if (imageRef) {
    doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imageRef } }
  }

  try {
    const created = await sanityWriteClient.create(doc)
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
