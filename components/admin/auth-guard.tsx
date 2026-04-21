'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.replace('/admin')
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F5F2]">
        <div className="w-8 h-8 border-4 border-[#1652F0] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}

export function getAdminToken(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('admin_token') ?? ''
}

export function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${getAdminToken()}` }
}
