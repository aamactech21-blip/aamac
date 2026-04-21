import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { sanityWriteClient } from '@/lib/sanity-server'

export const metadata: Metadata = {
  title: 'AV & Electrical Products Kuwait | AAMAC Technology',
  description:
    'Browse AAMAC Technology\'s curated range of AV and electrical products. Enquire directly via WhatsApp for pricing and availability in Kuwait.',
}

export const revalidate = 60 // refresh every 60 seconds

const WA_NUMBER = '96566140614'
const waProductUrl = (name: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi AAMAC, I'm interested in ${name}. Could you share more details?`
  )}`

type Product = {
  _id: string
  name: string
  description: string
  imageUrl: string | null
}

async function getProducts(): Promise<Product[]> {
  try {
    return await sanityWriteClient.fetch(
      `*[_type == "product"] | order(_createdAt desc) { _id, name, description, "imageUrl": image.asset->url }`
    )
  } catch {
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#E63946]/15 text-[#E63946] text-xs font-bold px-4 py-2 rounded-full mb-6">
                  NEW Offering
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white text-balance leading-tight mb-5">
                  Premium{' '}
                  <span className="font-accent-italic text-[#E63946]">AV products</span>,<br />
                  direct enquiry
                </h1>
                <p className="text-[#6B6B6B] text-lg leading-relaxed">
                  Browse our curated selection of professional AV and electrical products. No cart, no checkout — just message us on WhatsApp and we will respond with pricing and availability.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AAMAC, I'd like to enquire about your products.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#20c55e] transition-all hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="white" aria-hidden="true">
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-[#F6F5F2] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <p className="text-center text-[#6B6B6B] py-16">No products available yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E5E3DC] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#F6F5F2]">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#E5E3DC]">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[#0A0A0A] font-bold text-base mb-2 leading-snug">{product.name}</h3>
                      <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{product.description}</p>
                      <a
                        href={waProductUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center justify-center gap-2 bg-[#E63946] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#c73040] transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="white" aria-hidden="true">
                          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
                        </svg>
                        Enquire via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Can't find what you need */}
            <div className="mt-16 bg-[#0A0A0A] rounded-2xl p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Can&apos;t find what you need?
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-lg mx-auto">
                Our product catalogue is constantly expanding. If you are looking for something specific, just message us — we source and supply a wide range of professional AV and electrical equipment.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AAMAC, I'm looking for a specific product. Can you help?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20c55e] transition-all hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="white" aria-hidden="true">
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
                </svg>
                Message Us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
