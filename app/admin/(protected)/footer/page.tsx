'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Check, AlertTriangle } from 'lucide-react'
import { authHeaders } from '@/components/admin/auth-guard'

type FooterLink = { label: string; url: string }

export default function FooterPage() {
  const [settingsId, setSettingsId] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [links, setLinks] = useState<FooterLink[]>([])
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
      .then((data: { _id: string; footer?: { text?: string; links?: FooterLink[] } } | null) => {
        if (data) {
          setSettingsId(data._id)
          setText(data.footer?.text ?? '')
          setLinks(data.footer?.links ?? [])
        }
      })
      .catch(() => showToast('Could not load footer', 'error'))
      .finally(() => setLoading(false))
  }, [])

  function addLink() {
    setLinks(l => [...l, { label: '', url: '' }])
  }

  function updateLink(index: number, field: keyof FooterLink, value: string) {
    setLinks(l => l.map((link, i) => i === index ? { ...link, [field]: value } : link))
  }

  function removeLink(index: number) {
    setLinks(l => l.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const cleanLinks = links.filter(l => l.label.trim() && l.url.trim())
      const body = { id: settingsId, text, links: cleanLinks }
      const method = settingsId ? 'PUT' : 'POST'
      const res = await fetch('/api/footer', {
        method,
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      if (!settingsId) {
        const data = await res.json()
        setSettingsId(data._id)
      }
      setLinks(cleanLinks)
      showToast('Footer saved successfully!')
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
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Footer</h1>
        <p className="text-[#6B6B6B] mt-1">Edit your website footer text and links</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#1652F0] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E3DC] p-8 max-w-xl shadow-sm space-y-8">
          {/* Footer text */}
          <div>
            <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Footer Text</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={3}
              placeholder="© 2024 AAMAC Technology. All rights reserved."
              className="w-full px-4 py-3 text-base border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors resize-none"
            />
          </div>

          {/* Footer links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#0A0A0A]">Footer Links</label>
              <button
                onClick={addLink}
                className="flex items-center gap-1.5 text-sm font-medium text-[#1652F0] hover:text-[#1242c8] transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>

            {links.length === 0 && (
              <p className="text-sm text-[#6B6B6B] py-3">No links yet. Click "Add Link" to add footer navigation links.</p>
            )}

            <div className="space-y-3">
              {links.map((link, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={link.label}
                    onChange={e => updateLink(i, 'label', e.target.value)}
                    placeholder="Label (e.g. About Us)"
                    className="flex-1 px-3 py-2.5 text-sm border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={e => updateLink(i, 'url', e.target.value)}
                    placeholder="URL (e.g. /about)"
                    className="flex-1 px-3 py-2.5 text-sm border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors"
                  />
                  <button
                    onClick={() => removeLink(i)}
                    className="p-2.5 text-[#E63946] hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E5E3DC]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-4 bg-[#1652F0] text-white text-base font-semibold rounded-xl hover:bg-[#1242c8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : (
                'Save Footer'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
