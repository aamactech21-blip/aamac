import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import { Award, MapPin, Users, Lightbulb, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About AAMAC Technology | Kuwait AV Integration Company',
  description:
    'Learn about AAMAC Technology — 15+ years of AV integration excellence in Kuwait. Crestron Certified and Extron Authorized programmer.',
}

const values = [
  {
    icon: Lightbulb,
    title: 'Design-led Thinking',
    description:
      'Every project starts with a deep understanding of your space, your users, and your goals. We design systems that feel intuitive and look beautiful.',
  },
  {
    icon: Award,
    title: 'Certified Craftsmanship',
    description:
      'As Crestron Certified and Extron Authorized programmers, our work meets the highest industry standards for performance and reliability.',
  },
  {
    icon: MapPin,
    title: 'Local Support',
    description:
      'We are based in Kuwait City. Our team is available for on-site support, quick response maintenance, and project consultations.',
  },
  {
    icon: Users,
    title: 'Client-First Partnership',
    description:
      'We listen, advise honestly, and build long-term relationships. Your success is our reputation.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">
                About Us
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight text-balance mb-6">
                Kuwait&apos;s most trusted{' '}
                <span className="font-accent-italic text-[#1652F0]">AV integrator</span>
              </h1>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                AAMAC Technology has been designing and delivering premium audio-visual environments across Kuwait for over 15 years — from intimate meeting rooms to large auditoriums, broadcast studios, and smart buildings.
              </p>
            </div>
          </div>
        </section>

        {/* Company overview */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">
                  Who We Are
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] text-balance mb-6">
                  Engineering experiences, not just systems
                </h2>
                <div className="flex flex-col gap-5 text-[#6B6B6B] text-base leading-relaxed">
                  <p>
                    Founded in Kuwait, AAMAC Technology was built on a single belief: that technology should serve people, not the other way around. We specialize in AV and low-voltage integration — combining technical precision with thoughtful design to create spaces that work beautifully.
                  </p>
                  <p>
                    Our team of certified engineers and programmers handles every phase of a project — from initial consultancy and system design through to installation, commissioning, and long-term maintenance. We work across corporate, hospitality, education, and government sectors.
                  </p>
                  <p>
                    In 2024, we expanded our offering to include a curated range of electrical products, available to enquire about directly via WhatsApp for a fast, personal experience.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#1A1A1A] transition-all hover:-translate-y-0.5"
                  >
                    Our Services
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold px-7 py-4 rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about-team.jpg"
                  alt="AAMAC Technology AV installation team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-[#F6F5F2] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">
                Industry Recognition
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
                Certified by the industry&apos;s best
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                {
                  name: 'Crestron Certified Programmer',
                  description:
                    'Official Crestron certification verifying expertise in programming Crestron control systems for AV and smart building environments.',
                  color: '#1652F0',
                },
                {
                  name: 'Extron Authorized Programmer',
                  description:
                    'Extron authorization confirming proficiency in configuring and programming Extron AV systems and signal processing solutions.',
                  color: '#E63946',
                },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white border border-[#E5E3DC] rounded-2xl p-8 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <Award size={26} style={{ color: cert.color }} />
                  </div>
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-3">{cert.name}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">
                Our Principles
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
                The values behind every project
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-[#F6F5F2] rounded-2xl p-7">
                  <div className="w-11 h-11 bg-[#0A0A0A] rounded-xl flex items-center justify-center mb-5">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-[#0A0A0A] font-bold text-base mb-3">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{description}</p>
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
