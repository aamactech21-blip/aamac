'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) router.replace('/admin/dashboard')
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError('Incorrect email or password. Please try again.')
        return
      }

      const { token } = await res.json()
      localStorage.setItem('admin_token', token)
      router.push('/admin/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F5F2] px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0A0A0A] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">Admin Login</h1>
          <p className="text-[#6B6B6B] mt-1">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@aamactech.com"
              className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#1652F0] text-white text-base font-semibold rounded-xl hover:bg-[#1242c8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
