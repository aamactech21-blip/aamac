import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { CheckCircle, ArrowRight, Users, Mic, Wrench, BookOpen, LayoutGrid } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Projects | AAMAC Technology',
  description:
    'Explore AAMAC Technology\'s delivered AV and communication projects across Kuwait — including government, corporate, and institutional installations.',
}

const servicesDelivered = [
  { icon: Mic, label: 'Audio Visual System Operation' },
  { icon: Users, label: 'Technical Staff Training' },
  { icon: LayoutGrid, label: 'AV Equipment Management' },
  { icon: Wrench, label: 'Operational Support' },
  { icon: BookOpen, label: 'Knowledge Transfer' },
]

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight text-balance mb-6">
                Our{' '}
                <span className="font-accent-italic text-[#1652F0]">Projects</span>
              </h1>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                Delivering reliable AV and communication solutions across Kuwait.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Project */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">
                Featured Project
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] text-balance">
                Municipal Council Hall Audio Visual Operations &amp; Training
              </h2>
            </div>

            {/* Project Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0A0A0A] mb-12">
              <Image
                src="/images/municipal-council-hall.jpg"
                alt="Kuwait Municipal Council Hall AV System"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Info Card */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Description */}
                <div className="bg-[#F6F5F2] rounded-2xl p-8">
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-4">Project Overview</h3>
                  <p className="text-[#6B6B6B] text-base leading-relaxed">
                    AAMAC Technology successfully delivered audio-visual operation support for the main Municipal Council Hall in Kuwait. The project included operating the hall&apos;s AV systems and training Kuwait Municipality&apos;s technical staff on proper operation and management of the council hall&apos;s AV infrastructure.
                  </p>
                </div>

                {/* Services Delivered */}
                <div className="bg-[#F6F5F2] rounded-2xl p-8">
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-6">Services Delivered</h3>
                  <ul className="flex flex-col gap-4">
                    {servicesDelivered.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-[#1652F0]/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon size={17} className="text-[#1652F0]" />
                        </div>
                        <span className="text-[#0A0A0A] font-semibold text-sm">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="bg-[#0A0A0A] rounded-2xl p-8">
                  <h3 className="text-white font-bold text-lg mb-4">Project Outcome</h3>
                  <p className="text-[#6B6B6B] text-base leading-relaxed mb-6">
                    Kuwait Municipality&apos;s technical team was fully trained and equipped to independently operate and manage the council hall&apos;s AV infrastructure. AAMAC Technology ensured seamless day-to-day AV operations throughout the engagement, maintaining the highest standards of performance and reliability in a high-profile government setting.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {['Seamless AV Operations', 'Trained In-House Team', 'Government-Grade Reliability'].map((point) => (
                      <span key={point} className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#6B6B6B] text-xs font-semibold px-4 py-2 rounded-full">
                        <CheckCircle size={13} className="text-[#1652F0] shrink-0" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Card */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#F6F5F2] rounded-2xl p-8 sticky top-28">
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-6">Project Details</h3>
                  <ul className="flex flex-col gap-5">
                    <li>
                      <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Client</p>
                      <p className="text-[#0A0A0A] font-bold text-sm">Kuwait Municipality</p>
                    </li>
                    <li>
                      <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Sector</p>
                      <p className="text-[#0A0A0A] font-bold text-sm">Government</p>
                    </li>
                    <li>
                      <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Location</p>
                      <p className="text-[#0A0A0A] font-bold text-sm">Kuwait City, Kuwait</p>
                    </li>
                    <li>
                      <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-widest mb-1">Project Type</p>
                      <p className="text-[#0A0A0A] font-bold text-sm">AV Operations &amp; Training</p>
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-[#E5E3DC]">
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
                      Interested in a similar solution for your organisation?
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full bg-[#1652F0] text-white font-bold text-sm px-5 py-3.5 rounded-xl hover:bg-[#1245d6] transition-all hover:-translate-y-0.5"
                    >
                      Discuss Your Project
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F6F5F2] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A0A0A] rounded-2xl p-12 text-center">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">
                Work With Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-balance mb-5">
                Ready to start your next{' '}
                <span className="font-accent-italic text-[#1652F0]">AV project</span>?
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-xl mx-auto mb-10">
                From government council halls to corporate boardrooms, AAMAC Technology delivers AV solutions built to last. Get in touch to discuss your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#1652F0] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1245d6] transition-all hover:-translate-y-0.5"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#2A2A2A] text-white font-bold px-8 py-4 rounded-xl hover:border-[#1652F0] transition-all"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
