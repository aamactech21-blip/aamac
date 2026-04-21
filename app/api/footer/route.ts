import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, text, links } = await request.json()

  if (!id) return NextResponse.json({ error: 'Document id required' }, { status: 400 })

  const updated = await sanityWriteClient
    .patch(id)
    .set({ 'footer.text': text ?? '', 'footer.links': links ?? [] })
    .commit()

  return NextResponse.json(updated)
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { text, links } = await request.json()

  const existingId = await sanityWriteClient.fetch(`*[_type == "siteSettings"][0]._id`)

  if (existingId) {
    const updated = await sanityWriteClient
      .patch(existingId)
      .set({ 'footer.text': text ?? '', 'footer.links': links ?? [] })
      .commit()
    return NextResponse.json(updated)
  }

  const created = await sanityWriteClient.create({
    _type: 'siteSettings',
    contact: { phone: '', email: '', address: '' },
    footer: { text: text ?? '', links: links ?? [] },
  })
  return NextResponse.json(created, { status: 201 })
}
