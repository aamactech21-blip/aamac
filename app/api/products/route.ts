import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, description, imageRef } = await request.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const doc: Record<string, unknown> = { _type: 'product', name: name.trim(), description: description?.trim() ?? '' }

  if (imageRef) {
    doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imageRef } }
  }

  const created = await sanityWriteClient.create(doc)
  return NextResponse.json(created, { status: 201 })
}
