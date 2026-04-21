'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Wrench,
  Phone,
  AlignLeft,
  LogOut,
} from 'lucide-react'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/contact', label: 'Contact Info', icon: Phone },
  { href: '/admin/footer', label: 'Footer', icon: AlignLeft },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  return (
    <aside className="w-64 h-full bg-[#0A0A0A] text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Admin Panel</p>
        <p className="text-lg font-bold">AAMAC Technology</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#1652F0] text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
