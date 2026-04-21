import { createClient } from '@sanity/client'

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export function verifyAdminToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  return token === process.env.ADMIN_SECRET
}
