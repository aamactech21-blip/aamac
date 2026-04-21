'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Wrench, Phone, AlignLeft, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const [productCount, setProductCount] = useState<number | null>(null)
  const [serviceCount, setServiceCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/products/list').then(r => r.json()).then(d => setProductCount(d.length)).catch(() => setProductCount(0))
    fetch('/api/services/list').then(r => r.json()).then(d => setServiceCount(d.length)).catch(() => setServiceCount(0))
  }, [])

  const CARDS = [
    {
      href: '/admin/products',
      icon: Package,
      label: 'Products',
      count: productCount,
      color: 'bg-[#1652F0]',
      desc: 'Add, edit, or remove products',
    },
    {
      href: '/admin/services',
      icon: Wrench,
      label: 'Services',
      count: serviceCount,
      color: 'bg-[#E63946]',
      desc: 'Update your service descriptions',
    },
    {
      href: '/admin/contact',
      icon: Phone,
      label: 'Contact Info',
      count: null,
      color: 'bg-[#7CB518]',
      desc: 'Update phone, email & address',
    },
    {
      href: '/admin/footer',
      icon: AlignLeft,
      label: 'Footer',
      count: null,
      color: 'bg-[#0A0A0A]',
      desc: 'Edit footer text and links',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Welcome back 👋</h1>
        <p className="text-[#6B6B6B] mt-1">Manage your website content from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
        {CARDS.map(({ href, icon: Icon, label, count, color, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E3DC] hover:shadow-md transition-shadow flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {count !== null && (
                <span className="text-2xl font-bold text-[#0A0A0A]">
                  {count ?? '—'}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold text-[#0A0A0A] text-lg">{label}</p>
              <p className="text-sm text-[#6B6B6B] mt-0.5">{desc}</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#1652F0]">
              Manage <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
