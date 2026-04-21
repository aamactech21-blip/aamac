import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import ContactForm from '@/components/contact/contact-form'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { sanityWriteClient } from '@/lib/sanity-server'

export const metadata: Metadata = {
  title: 'Contact AAMAC Technology | Kuwait AV Integration',
  description:
    'Get in touch with AAMAC Technology in Kuwait City. Call, email, or WhatsApp us to discuss your AV project or product enquiry.',
}

export const revalidate = 60

const WA_NUMBER = '96566140614'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi AAMAC, I'd like to discuss a project.")}`

async function getSettings() {
  try {
    return await sanityWriteClient.fetch(`*[_type == "siteSettings"][0]{ contact }`)
  } catch {
    return null
  }
}

export default async function ContactPage() {
  const settings = await getSettings()
  const phone = settings?.contact?.phone || '+965 6614 0614'
  const email = settings?.contact?.email || 'sales@aamactech.com'
  const address = settings?.contact?.address || 'Awtad Tower, Qibla, Kuwait City'
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#6B6B6B] text-sm uppercase font-semibold tracking-widest mb-4">
              Let&apos;s Talk
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white text-balance mb-6">
              Let&apos;s build something{' '}
              <span className="font-accent-italic text-[#1652F0]">great.</span>
            </h1>
            <p className="text-[#6B6B6B] text-lg leading-relaxed max-w-2xl mx-auto">
              Tell us about your project and we will be in touch. We work across corporate, hospitality, education, and government sectors throughout Kuwait.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact details */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] mb-8">Contact details</h2>
                <ul className="flex flex-col gap-5 mb-10">
                  {[
                    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
                    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
                    { icon: MapPin, label: 'Address', value: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
                    { icon: Clock, label: 'Hours', value: 'Sun–Thu, 8:00 AM – 2:00 PM', href: null },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#1652F0]/10">
                          <Icon size={18} className="text-[#1652F0]" />
                        </div>
                        <div>
                          <p className="text-[#6B6B6B] text-xs uppercase font-semibold tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-[#0A0A0A] font-semibold text-base hover:text-[#1652F0] transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-[#0A0A0A] font-semibold text-base">{item.value}</p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>

                {/* WhatsApp CTA */}
                <div className="bg-[#F6F5F2] rounded-2xl p-7 border border-[#E5E3DC]">
                  <h3 className="text-[#0A0A0A] font-bold text-lg mb-3">Prefer to chat?</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
                    For the fastest response, message us directly on WhatsApp. We typically reply within minutes during business hours.
                  </p>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#20c55e] transition-all hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white" aria-hidden="true">
                      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
                    </svg>
                    Open WhatsApp
                  </a>
                </div>

                {/* Map */}
                <div className="mt-8 rounded-2xl overflow-hidden border border-[#E5E3DC] h-64">
                  <iframe
                    title={`AAMAC Technology Location — ${address}`}
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Contact form */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#0A0A0A] mb-8">Send us a message</h2>
                <ContactForm />
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
