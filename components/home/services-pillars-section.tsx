import Link from 'next/link'
import { PencilRuler, Wrench, Settings, Shield, ArrowRight } from 'lucide-react'

const pillars = [
  {
    icon: PencilRuler,
    title: 'Design & Supply',
    description:
      'We translate your vision into a precise technical design — from system architecture to equipment selection and documentation.',
  },
  {
    icon: Wrench,
    title: 'Installation',
    description:
      'Structured, methodical installation by certified engineers who treat every cable run and panel mount with craftsmanship.',
  },
  {
    icon: Settings,
    title: 'Commissioning',
    description:
      'Crestron and Extron certified programming ensures your control systems work intuitively from day one.',
  },
  {
    icon: Shield,
    title: 'Maintenance',
    description:
      'Proactive service contracts and responsive on-site support keep your AV ecosystem performing at its peak.',
  },
]

export default function ServicesPillarsSection() {
  return (
    <section className="bg-[#F6F5F2] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] text-balance">
              The four pillars of every project
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#0A0A0A] font-bold text-sm border-2 border-[#0A0A0A] px-6 py-3 rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            All Services
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-[#E5E3DC] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 bg-[#0A0A0A] rounded-xl flex items-center justify-center group-hover:bg-[#1652F0] transition-colors duration-300">
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-5xl font-extrabold text-[#E5E3DC]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[#0A0A0A] font-bold text-lg mb-3">{title}</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
