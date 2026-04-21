import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read token from .env.local
const envPath = resolve(__dirname, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
)

const token = env['SANITY_API_WRITE_TOKEN']
if (!token || token === 'paste_token_here' || token === '') {
  console.error('\n❌  SANITY_API_WRITE_TOKEN is missing in .env.local\n')
  process.exit(1)
}

const client = createClient({
  projectId: '9vgo50c2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const products = [
  { name: 'Crestron Touch Panel Controller', description: 'Intuitive touch panel for controlling AV systems, lighting, and climate. Sleek design with customizable GUI.' },
  { name: 'Commercial LED Display — Large Format', description: 'Professional-grade commercial displays designed for digital signage, corporate lobbies, and meeting rooms.' },
  { name: 'Laser Projector — 4K', description: 'High-brightness 4K laser projector for boardrooms, auditoriums, and large meeting spaces. No lamp replacements.' },
  { name: 'Ceiling Speaker System', description: 'Premium flush-mount ceiling speakers for background music, PA, and speech intelligibility in commercial spaces.' },
  { name: 'Video Conferencing Bar', description: 'All-in-one 4K video conferencing camera and soundbar, compatible with Microsoft Teams, Zoom, and Webex.' },
  { name: 'DSP Audio Processor', description: 'Digital signal processor for routing, mixing, and managing audio across complex multi-zone installations.' },
  { name: 'HDMI Matrix Switcher', description: 'Multi-input, multi-output HDMI matrix for distributing video signals across rooms, screens, and zones.' },
  { name: 'Fine Pitch LED Video Wall', description: 'Modular indoor fine-pitch LED panels for seamless large-scale video walls in corporate and broadcast environments.' },
]

const services = [
  { title: 'Consultancy & Design', description: 'Great AV starts long before a single cable is pulled. Our consultancy phase transforms your project brief into a detailed technical design — covering system architecture, equipment selection, signal flow diagrams, rack layouts, and full documentation ready for tender or build.' },
  { title: 'Installation', description: 'Our engineers bring the design to life with structured, professional installation. Every cable route is planned, every bracket is mounted to tolerance, and every system is documented for future maintenance. We work cleanly, punctually, and with minimal disruption to your operations.' },
  { title: 'AV Programming', description: 'As Crestron Certified and Extron Authorized programmers, we deliver control systems that work exactly as your users expect. We write clean, intuitive, and maintainable code — and we test rigorously before handover to ensure every button, every scene, and every automation performs flawlessly.' },
  { title: 'Service & Maintenance', description: 'AV systems need care. Our maintenance contracts keep your investment performing at its peak — with scheduled preventive visits, firmware management, and priority on-site response when issues arise. We also offer reactive support for ad-hoc incidents.' },
]

const siteSettings = {
  _type: 'siteSettings',
  contact: {
    phone: '+965 6614 0614',
    email: 'sales@aamactech.com',
    address: 'Adal Tower, Kuwait City',
  },
  footer: {
    text: '© 2025 AAMAC Technology. All rights reserved.',
    links: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about' },
      { label: 'Services', url: '/services' },
      { label: 'Products', url: '/products' },
      { label: 'Contact', url: '/contact' },
    ],
  },
}

async function seed() {
  console.log('\n🌱  Seeding Sanity...\n')

  // Products
  for (const p of products) {
    await client.create({ _type: 'product', ...p })
    console.log(`  ✅  Product: ${p.name}`)
  }

  // Services
  for (const s of services) {
    await client.create({ _type: 'service', ...s })
    console.log(`  ✅  Service: ${s.title}`)
  }

  // Site Settings (only create if none exists)
  const existing = await client.fetch(`*[_type == "siteSettings"][0]._id`)
  if (existing) {
    console.log(`  ⏭️   Site Settings already exists — skipping`)
  } else {
    await client.create(siteSettings)
    console.log(`  ✅  Site Settings created`)
  }

  console.log('\n🎉  Done! All data has been added to Sanity.\n')
}

seed().catch(err => {
  console.error('\n❌  Error:', err.message, '\n')
  process.exit(1)
})
