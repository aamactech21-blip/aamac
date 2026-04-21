'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E3DC] shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="AAMAC Technology" width={240} height={96} className="h-20 w-auto object-contain" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative group ${
                  pathname === link.href
                    ? 'text-[#1652F0]'
                    : 'text-[#0A0A0A] hover:text-[#1652F0]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#1652F0] transition-all duration-200 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#0A0A0A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1A1A1A] transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#0A0A0A] hover:bg-[#F6F5F2] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E3DC] animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? 'bg-[#F6F5F2] text-[#1652F0]'
                    : 'text-[#0A0A0A] hover:bg-[#F6F5F2]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 bg-[#0A0A0A] text-white text-sm font-semibold px-5 py-3 rounded-xl text-center hover:bg-[#1A1A1A] transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
