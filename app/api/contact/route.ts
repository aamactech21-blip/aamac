import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, phone, email, email2, address } = await request.json()

  if (!id) return NextResponse.json({ error: 'Document id required' }, { status: 400 })

  const updated = await sanityWriteClient
    .patch(id)
    .set({ 'contact.phone': phone ?? '', 'contact.email': email ?? '', 'contact.email2': email2 ?? '', 'contact.address': address ?? '' })
    .commit()

  return NextResponse.json(updated)
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { phone, email, email2, address } = await request.json()

  const existing = await sanityWriteClient.fetch(`*[_type == "siteSettings"][0]._id`)

  if (existing) {
    const updated = await sanityWriteClient
      .patch(existing)
      .set({ 'contact.phone': phone ?? '', 'contact.email': email ?? '', 'contact.email2': email2 ?? '', 'contact.address': address ?? '' })
      .commit()
    return NextResponse.json(updated)
  }

  const created = await sanityWriteClient.create({
    _type: 'siteSettings',
    contact: { phone: phone ?? '', email: email ?? '', email2: email2 ?? '', address: address ?? '' },
    footer: { text: '', links: [] },
  })
  return NextResponse.json(created, { status: 201 })
}
