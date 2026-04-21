import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { sanityWriteClient } from '@/lib/sanity-server'

async function getSettings() {
  try {
    return await sanityWriteClient.fetch(`*[_type == "siteSettings"][0]{ contact }`)
  } catch {
    return null
  }
}

export default async function Footer() {
  const settings = await getSettings()
  const phone = settings?.contact?.phone || '+965 6614 0614'
  const email = settings?.contact?.email || 'sales@aamactech.com'
  const address = settings?.contact?.address || 'Awtad Tower, Qibla, Kuwait City'
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="AAMAC Technology" width={200} height={80} className="h-16 w-auto object-contain bg-white rounded-xl p-2" />
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
              Technology for Communications
            </p>
            <p className="text-[#6B6B6B] text-sm leading-relaxed">
              Kuwait&apos;s trusted partner for AV integration, low-voltage systems, and electrical products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Products', href: '/products' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B6B6B] text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {[
                'Consultancy & Design',
                'Installation',
                'AV Programming',
                'Maintenance',
                'Digital Signage',
                'Video Conferencing',
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[#6B6B6B] text-sm hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#1652F0] mt-0.5 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-[#6B6B6B] text-sm hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#1652F0] mt-0.5 shrink-0" />
                <a href={`mailto:${email}`} className="text-[#6B6B6B] text-sm hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#1652F0] mt-0.5 shrink-0" />
                <span className="text-[#6B6B6B] text-sm">{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-[#1652F0] mt-0.5 shrink-0" />
                <span className="text-[#6B6B6B] text-sm">Sun–Thu, 8:00 AM – 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-[#6B6B6B] text-xs">
            <p>&copy; {new Date().getFullYear()} AAMAC Technology. All rights reserved.</p>
            <span className="hidden sm:inline">·</span>
            <p>
              Developed by{' '}
              <a
                href="https://www.ticodetech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1652F0] hover:text-white transition-colors"
              >
                Ticode Technologies
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#1A1A1A] text-[#6B6B6B] text-xs px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#7CB518] rounded-full inline-block" />
              Crestron Certified
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#1A1A1A] text-[#6B6B6B] text-xs px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#7CB518] rounded-full inline-block" />
              Extron Authorized
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
