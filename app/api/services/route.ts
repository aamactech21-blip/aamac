import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'
import { sanityClient } from '@/lib/sanity'

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, title, description, imageRef } = await request.json()

  if (!id) return NextResponse.json({ error: 'Service id required' }, { status: 400 })

  const patch = sanityWriteClient.patch(id).set({ title: title?.trim() ?? '', description: description?.trim() ?? '' })

  if (imageRef) {
    patch.set({ image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } })
  }

  const updated = await patch.commit()
  return NextResponse.json(updated)
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, imageRef } = await request.json()

  const doc: Record<string, unknown> = { _type: 'service', title: title?.trim() ?? '', description: description?.trim() ?? '' }

  if (imageRef) {
    doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imageRef } }
  }

  const created = await sanityWriteClient.create(doc)
  return NextResponse.json(created, { status: 201 })
}
