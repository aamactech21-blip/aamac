import { NextResponse } from 'next/server'
import { sanityWriteClient, verifyAdminToken } from '@/lib/sanity-server'

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 10MB' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const asset = await sanityWriteClient.assets.upload('image', buffer, {
    filename: file.name,
    contentType: file.type,
  })

  return NextResponse.json({ assetId: asset._id, url: asset.url })
}
