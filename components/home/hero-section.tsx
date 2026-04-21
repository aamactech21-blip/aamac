import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Monitor, Zap, Award, Headphones } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Modern AV-integrated boardroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#7CB518] rounded-full" />
              Kuwait-Based AV Integration
            </span>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-tight text-balance mb-6">
              We create{' '}
              <span className="font-accent-italic text-[#1652F0]">elegant</span>{' '}
              solutions for modern spaces.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-10">
              From boardrooms to broadcast studios, AAMAC designs, installs, and maintains integrated AV
              and electrical systems across Kuwait.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-[#1652F0] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#1242c8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-7 py-4 rounded-xl hover:bg-white hover:text-[#0A0A0A] transition-all duration-200 hover:-translate-y-0.5"
              >
                Shop Products
              </Link>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4 mt-10">
              <span className="text-xs text-white/40 uppercase font-semibold tracking-wider">Certified by</span>
              <div className="flex items-center gap-3">
                <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Crestron
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Extron
                </span>
              </div>
            </div>
          </div>

          {/* Right: system overview card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 opacity-60">
                System Overview
              </h3>
              <ul className="flex flex-col gap-5">
                {[
                  {
                    icon: Monitor,
                    label: 'AV & Low Voltage',
                    desc: 'End-to-end design, installation & programming',
                    color: '#1652F0',
                  },
                  {
                    icon: Zap,
                    label: 'Electrical Products',
                    desc: 'Premium brands, WhatsApp enquiry',
                    color: '#E63946',
                  },
                  {
                    icon: Award,
                    label: 'Certifications',
                    desc: 'Crestron & Extron authorized programmer',
                    color: '#7CB518',
                  },
                  {
                    icon: Headphones,
                    label: 'Local Support',
                    desc: 'Kuwait-based team, Sun–Thu 8–5',
                    color: '#25D366',
                  },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}1A` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{label}</p>
                      <p className="text-[#6B6B6B] text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#1A1A1A]">
                <p className="text-[#6B6B6B] text-xs text-center">
                  15+ years · 200+ projects · 14 specializations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
