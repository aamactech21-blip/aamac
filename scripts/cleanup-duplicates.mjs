import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
    .split('\n').filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim().replace(/^"|"$/g, '')] })
)

const client = createClient({
  projectId: '9vgo50c2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: env['SANITY_API_WRITE_TOKEN'],
})

async function cleanup() {
  console.log('\n🧹  Cleaning up duplicates...\n')

  // Products
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt asc) { _id, name }`)
  const seenProducts = new Set()
  for (const p of products) {
    if (seenProducts.has(p.name)) {
      await client.delete(p._id)
      console.log(`  🗑️  Deleted duplicate product: ${p.name}`)
    } else {
      seenProducts.add(p.name)
    }
  }

  // Services
  const services = await client.fetch(`*[_type == "service"] | order(_createdAt asc) { _id, title }`)
  const seenServices = new Set()
  for (const s of services) {
    if (seenServices.has(s.title)) {
      await client.delete(s._id)
      console.log(`  🗑️  Deleted duplicate service: ${s.title}`)
    } else {
      seenServices.add(s.title)
    }
  }

  // Site Settings — keep only the first
  const settings = await client.fetch(`*[_type == "siteSettings"] | order(_createdAt asc) { _id }`)
  for (let i = 1; i < settings.length; i++) {
    await client.delete(settings[i]._id)
    console.log(`  🗑️  Deleted duplicate siteSettings`)
  }

  console.log('\n✅  Done! No more duplicates.\n')
}

cleanup().catch(err => { console.error('\n❌', err.message); process.exit(1) })
