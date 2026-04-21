'use client'

import { useEffect, useState } from 'react'
import { Phone, Mail, MapPin, Check, AlertTriangle } from 'lucide-react'
import { authHeaders } from '@/components/admin/auth-guard'

export default function ContactPage() {
  const [settingsId, setSettingsId] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data) {
          setSettingsId(data._id)
          setPhone(data.contact?.phone ?? '')
          setEmail(data.contact?.email ?? '')
          setAddress(data.contact?.address ?? '')
        }
      })
      .catch(() => showToast('Could not load contact info', 'error'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const body = { id: settingsId, phone, email, address }
      const method = settingsId ? 'PUT' : 'POST'
      const res = await fetch('/api/contact', {
        method,
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      if (!settingsId) {
        const data = await res.json()
        setSettingsId(data._id)
      }
      showToast('Contact info saved successfully!')
    } catch {
      showToast('Could not save. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg text-white text-sm font-medium ${toast.type === 'success' ? 'bg-[#7CB518]' : 'bg-[#E63946]'}`}>
          {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Contact Information</h1>
        <p className="text-[#6B6B6B] mt-1">Update your business contact details</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#1652F0] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E3DC] p-8 max-w-xl shadow-sm">
          <div className="space-y-6">
            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] mb-2">
                <Phone className="w-4 h-4 text-[#1652F0]" /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+965 XXXX XXXX"
                className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] mb-2">
                <Mail className="w-4 h-4 text-[#1652F0]" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@aamactech.com"
                className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors"
              />
            </div>


            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] mb-2">
                <MapPin className="w-4 h-4 text-[#1652F0]" /> Office Address
              </label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                rows={3}
                placeholder="Building, Street, Area, Kuwait"
                className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E3DC]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-4 bg-[#1652F0] text-white text-base font-semibold rounded-xl hover:bg-[#1242c8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : (
                'Save Contact Info'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
