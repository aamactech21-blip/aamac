import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const offerings = [
  {
    badge: 'AV Integration',
    title: 'Integrated AV & Low-Voltage Systems',
    description:
      'We design and deploy state-of-the-art audio-visual environments — from intimate meeting rooms to large-scale auditoriums. Every system is engineered for simplicity, reliability, and impact.',
    features: [
      'Control & Automation (Crestron & Extron)',
      'Video Conferencing & Collaboration',
      'Digital Signage & Video Walls',
      'Intelligent Lighting Control',
      'AV Programming & Commissioning',
      'Preventive Maintenance',
    ],
    cta: { label: 'Explore AV Services', href: '/services' },
    accentColor: '#1652F0',
    bg: 'bg-[#F6F5F2]',
    badgeBg: 'bg-[#1652F0]/10 text-[#1652F0]',
    checkColor: '#1652F0',
  },
  {
    badge: 'NEW',
    title: 'Electrical Products — Direct Enquiry',
    description:
      'We now supply a curated range of premium electrical products. No cart, no complexity — just message us on WhatsApp with what you need and we will get back to you promptly.',
    features: [
      'Premium brand selection',
      'Competitive pricing',
      'Expert advice included',
      'Fast WhatsApp response',
      'Kuwait-wide delivery',
      'Installation available',
    ],
    cta: { label: 'Browse Products', href: '/products' },
    accentColor: '#E63946',
    bg: 'bg-[#0A0A0A]',
    badgeBg: 'bg-[#E63946]/20 text-[#E63946]',
    checkColor: '#E63946',
    dark: true,
  },
]

export default function DualOfferingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] text-balance">
            Two ways to work with AAMAC
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offerings.map((item) => (
            <div
              key={item.badge}
              className={`${item.bg} rounded-2xl p-8 md:p-10 flex flex-col`}
            >
              <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full mb-6 w-fit ${item.badgeBg}`}>
                {item.badge}
              </span>
              <h3
                className={`text-2xl md:text-3xl font-extrabold mb-4 text-balance ${
                  item.dark ? 'text-white' : 'text-[#0A0A0A]'
                }`}
              >
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-8 ${item.dark ? 'text-[#6B6B6B]' : 'text-[#6B6B6B]'}`}>
                {item.description}
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {item.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: item.checkColor }} className="flex-shrink-0" />
                    <span className={`text-sm font-medium ${item.dark ? 'text-[#ccc]' : 'text-[#0A0A0A]'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href={item.cta.href}
                  className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5`}
                  style={{
                    backgroundColor: item.accentColor,
                    color: '#fff',
                  }}
                >
                  {item.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
