import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { name, client, sector, location, projectType, description, servicesDelivered, outcome, imageRef } = await request.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
  }

  try {
    const patch = sanityWriteClient.patch(id).set({
      name: name.trim(),
      client: client?.trim() ?? '',
      sector: sector?.trim() ?? '',
      location: location?.trim() ?? '',
      projectType: projectType?.trim() ?? '',
      description: description?.trim() ?? '',
      servicesDelivered: Array.isArray(servicesDelivered) ? servicesDelivered : [],
      outcome: outcome?.trim() ?? '',
    })

    if (imageRef) {
      patch.set({ image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } })
    }

    const updated = await patch.commit()
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    await sanityWriteClient.delete(id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
