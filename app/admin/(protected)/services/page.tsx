'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Pencil, X, Upload, Check, AlertTriangle, Plus, Trash2 } from 'lucide-react'
import { type Service } from '@/lib/sanity'
import { authHeaders } from '@/components/admin/auth-guard'

type FormState = { title: string; description: string; imagePreview: string; imageRef: string }
const emptyForm = (): FormState => ({ title: '', description: '', imagePreview: '', imageRef: '' })

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  async function loadServices() {
    try {
      const res = await fetch('/api/services/list')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setServices(data)
    } catch {
      showToast('Could not load services', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadServices() }, [])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  function openEdit(s: Service) {
    setEditingId(s._id)
    setForm({ title: s.title, description: s.description, imagePreview: s.imageUrl ?? '', imageRef: s.imageRef ?? '' })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    setForm(f => ({ ...f, imagePreview: URL.createObjectURL(file) }))
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: authHeaders(), body: fd })
      if (!res.ok) throw new Error()
      const { assetId, url } = await res.json()
      setForm(f => ({ ...f, imageRef: assetId, imagePreview: url }))
    } catch {
      showToast('Image upload failed', 'error')
      setForm(f => ({ ...f, imagePreview: '', imageRef: '' }))
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSave() {
    if (!form.title.trim()) { showToast('Service title is required', 'error'); return }
    if (uploadingImage) { showToast('Please wait for the image to finish uploading', 'error'); return }
    setSaving(true)

    const body = { id: editingId, title: form.title, description: form.description, imageRef: form.imageRef || null }

    try {
      const res = editingId
        ? await fetch('/api/services', { method: 'PUT', headers: { ...authHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await fetch('/api/services', { method: 'POST', headers: { ...authHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

      if (!res.ok) throw new Error()
      showToast(editingId ? 'Service updated!' : 'Service added!')
      closeModal()
      loadServices()
    } catch {
      showToast('Could not save. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      // Services use the products delete endpoint pattern (direct Sanity delete)
      const res = await fetch(`/api/products/${deleteTarget._id}`, { method: 'DELETE', headers: authHeaders() })
      if (!res.ok) throw new Error()
      showToast('Service deleted.')
      setDeleteTarget(null)
      loadServices()
    } catch {
      showToast('Could not delete. Please try again.', 'error')
    } finally {
      setDeleting(false)
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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Services</h1>
          <p className="text-[#6B6B6B] mt-1">Edit your service listings</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#1652F0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1242c8] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#1652F0] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && services.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-[#E5E3DC]">
          <p className="text-[#0A0A0A] font-semibold text-lg">No services yet</p>
          <p className="text-[#6B6B6B] mt-1 mb-6">Click "Add Service" to create your first service</p>
          <button onClick={openAdd} className="bg-[#1652F0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1242c8] transition-colors">Add Service</button>
        </div>
      )}

      <div className="space-y-4">
        {services.map(s => (
          <div key={s._id} className="bg-white rounded-2xl border border-[#E5E3DC] p-5 flex gap-5 items-start shadow-sm">
            {s.imageUrl && (
              <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0">
                <Image src={s.imageUrl} alt={s.title} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#0A0A0A] text-lg">{s.title}</h3>
              {s.description && <p className="text-[#6B6B6B] text-sm mt-1 line-clamp-2">{s.description}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(s)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-[#1652F0] hover:bg-blue-100 transition-colors">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button onClick={() => setDeleteTarget(s)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-[#E63946] hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E3DC]">
              <h2 className="text-xl font-bold text-[#0A0A0A]">{editingId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={closeModal} className="text-[#6B6B6B] hover:text-[#0A0A0A]"><X className="w-6 h-6" /></button>
            </div>
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Service Title <span className="text-[#E63946]">*</span></label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. AV System Design" className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] text-base" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Describe this service…" className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] text-base resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Service Image</label>
                {form.imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[#E5E3DC] h-40">
                    <Image src={form.imagePreview} alt="Preview" fill className="object-cover" />
                    {uploadingImage && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" /></div>}
                    <button type="button" onClick={() => { setForm(f => ({ ...f, imagePreview: '', imageRef: '' })); if (fileRef.current) fileRef.current.value = '' }} className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()} className="w-full h-40 border-2 border-dashed border-[#E5E3DC] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#1652F0] hover:bg-blue-50/50 transition-colors text-[#6B6B6B] hover:text-[#1652F0]">
                    <Upload className="w-7 h-7" />
                    <span className="font-medium">Click to upload image</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </div>
            </div>
            <div className="px-6 py-5 border-t border-[#E5E3DC] flex gap-3">
              <button onClick={closeModal} className="flex-1 py-3 border-2 border-[#E5E3DC] rounded-xl font-semibold text-[#6B6B6B] hover:bg-[#F6F5F2]">Cancel</button>
              <button onClick={handleSave} disabled={saving || uploadingImage} className="flex-1 py-3 bg-[#1652F0] text-white rounded-xl font-semibold hover:bg-[#1242c8] disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</> : (editingId ? 'Save Changes' : 'Add Service')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trash2 className="w-8 h-8 text-[#E63946]" />
            </div>
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Delete Service?</h3>
            <p className="text-[#6B6B6B] mb-6">Delete <strong className="text-[#0A0A0A]">{deleteTarget.title}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 py-3 border-2 border-[#E5E3DC] rounded-xl font-semibold text-[#6B6B6B]">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-3 bg-[#E63946] text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2">
                {deleting ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Deleting…</> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
