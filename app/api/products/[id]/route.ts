import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { name, description, imageRef } = await request.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const patch = sanityWriteClient
    .patch(id)
    .set({ name: name.trim(), description: description?.trim() ?? '' })

  if (imageRef) {
    patch.set({ image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } })
  }

  const updated = await patch.commit()
  return NextResponse.json(updated)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await sanityWriteClient.delete(id)
  return NextResponse.json({ ok: true })
}
