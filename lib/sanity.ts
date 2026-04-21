import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export type Product = {
  _id: string
  name: string
  description: string
  imageUrl: string | null
  imageRef: string | null
}

export type Service = {
  _id: string
  title: string
  description: string
  imageUrl: string | null
  imageRef: string | null
}

export type SiteSettings = {
  _id: string
  contact: {
    phone: string
    email: string
    address: string
  }
  footer: {
    text: string
    links: { label: string; url: string }[]
  }
}
