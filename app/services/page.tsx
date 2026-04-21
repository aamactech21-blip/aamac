import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { sanityWriteClient } from '@/lib/sanity-server'

export const metadata: Metadata = {
  title: 'AV Services Kuwait | AAMAC Technology',
  description:
    'AAMAC Technology provides AV consultancy, design, installation, Crestron/Extron programming, and maintenance across Kuwait.',
}

export const revalidate = 60

const WA_NUMBER = '96566140614'
const waUrl = (title: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi AAMAC, I'd like to discuss ${title} for my project.`)}`

const specializations = [
  'Video Projection','Professional Audio','Background Music & PA','Control & Automation',
  'Unified Communications','Digital Signage','Interactive Presentation','Video Walls',
  'Room Booking Systems','AV Streaming','Intelligent Lighting','Automated Rooms',
  'Wireless Collaboration','Surround Audio',
]

type Service = { _id: string; title: string; description: string; imageUrl: string | null }

async function getServices(): Promise<Service[]> {
  try {
    return await sanityWriteClient.fetch(
      `*[_type == "service"] | order(_createdAt asc) { _id, title, description, "imageUrl": image.asset->url }`
    )
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">What We Do</p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white text-balance leading-tight mb-6">
                Full-lifecycle{' '}
                <span className="font-accent-italic text-[#1652F0]">AV services</span>
              </h1>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                From the first sketch to the final handover — and everything in between. AAMAC delivers
                end-to-end AV integration services for corporate, hospitality, education, and government clients across Kuwait.
              </p>
            </div>
          </div>
        </section>

        {/* Service sections */}
        <div className="bg-white">
          {services.map((service, idx) => (
            <section key={service._id} className={`py-20 ${idx % 2 === 1 ? 'bg-[#F6F5F2]' : 'bg-white'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                  <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                    <span className="text-[#1652F0] text-xs font-bold uppercase tracking-widest mb-3 block">
                      0{idx + 1}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] text-balance mb-5">
                      {service.title}
                    </h2>
                    <p className="text-[#6B6B6B] leading-relaxed mb-7">{service.description}</p>
                    <a
                      href={waUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#20c55e] transition-all hover:-translate-y-0.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white" aria-hidden="true">
                        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
                      </svg>
                      Enquire via WhatsApp
                    </a>
                  </div>

                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#F6F5F2] ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {service.imageUrl ? (
                      <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#E5E3DC]">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 9 5 5m0-5-5 5"/></svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Specializations */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">Our Expertise</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">14 system specializations</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {specializations.map((spec) => (
                <div key={spec} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-center hover:border-[#1652F0] transition-colors duration-200">
                  <span className="text-white text-xs font-semibold">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
