import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const validEmail = process.env.ADMIN_EMAIL
  const validPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SECRET

  if (!validEmail || !validPassword || !secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ token: secret })
  response.cookies.set('admin_session', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return response
}
