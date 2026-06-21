'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Upload, Check, AlertTriangle, FolderOpen } from 'lucide-react'
import { authHeaders } from '@/components/admin/auth-guard'

type Project = {
  _id: string
  name: string
  client: string
  sector: string
  location: string
  projectType: string
  description: string
  servicesDelivered: string[]
  outcome: string
  imageUrl: string | null
  imageRef: string | null
}

type FormState = {
  name: string
  client: string
  sector: string
  location: string
  projectType: string
  description: string
  servicesDelivered: string
  outcome: string
  imageFile: File | null
  imagePreview: string
  imageRef: string
}

const SECTORS = ['Government', 'Corporate', 'Hospitality', 'Education', 'Healthcare', 'Retail', 'Other']

const emptyForm = (): FormState => ({
  name: '', client: '', sector: '', location: '', projectType: '',
  description: '', servicesDelivered: '', outcome: '',
  imageFile: null, imagePreview: '', imageRef: '',
})

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  async function loadProjects() {
    try {
      const res = await fetch('/api/projects/list')
      if (!res.ok) throw new Error()
      setProjects(await res.json())
    } catch {
      showToast('Could not load projects', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProjects() }, [])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm())
    setModalOpen(true)
  }

  function openEdit(p: Project) {
    setEditingId(p._id)
    setForm({
      name: p.name,
      client: p.client,
      sector: p.sector,
      location: p.location,
      projectType: p.projectType,
      description: p.description,
      servicesDelivered: (p.servicesDelivered ?? []).join('\n'),
      outcome: p.outcome,
      imageFile: null,
      imagePreview: p.imageUrl ?? '',
      imageRef: p.imageRef ?? '',
    })
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
    setForm(f => ({ ...f, imagePreview: URL.createObjectURL(file), imageFile: file }))
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: authHeaders(), body: fd })
      if (!res.ok) throw new Error()
      const { assetId, url } = await res.json()
      setForm(f => ({ ...f, imageRef: assetId, imagePreview: url }))
    } catch {
      showToast('Image upload failed. Please try again.', 'error')
      setForm(f => ({ ...f, imageFile: null, imagePreview: '', imageRef: '' }))
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSave() {
    if (!form.name.trim()) { showToast('Project name is required', 'error'); return }
    if (uploadingImage) { showToast('Please wait for image to finish uploading', 'error'); return }
    setSaving(true)

    const body = {
      name: form.name,
      client: form.client,
      sector: form.sector,
      location: form.location,
      projectType: form.projectType,
      description: form.description,
      servicesDelivered: form.servicesDelivered.split('\n').map(s => s.trim()).filter(Boolean),
      outcome: form.outcome,
      imageRef: form.imageRef || null,
    }

    try {
      const res = editingId
        ? await fetch(`/api/projects/${editingId}`, { method: 'PUT', headers: { ...authHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await fetch('/api/projects', { method: 'POST', headers: { ...authHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      showToast(editingId ? 'Project updated!' : 'Project added!')
      closeModal()
      loadProjects()
    } catch {
      showToast('Could not save project. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/projects/${deleteTarget._id}`, { method: 'DELETE', headers: authHeaders() })
      if (!res.ok) throw new Error()
      showToast('Project deleted.')
      setDeleteTarget(null)
      loadProjects()
    } catch {
      showToast('Could not delete project.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg text-white text-sm font-medium ${toast.type === 'success' ? 'bg-[#7CB518]' : 'bg-[#E63946]'}`}>
          {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Our Projects</h1>
          <p className="text-[#6B6B6B] mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} in your portfolio</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#1652F0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1242c8] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#1652F0] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && projects.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-[#E5E3DC]">
          <FolderOpen className="w-12 h-12 text-[#E5E3DC] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[#0A0A0A] font-semibold text-lg">No projects yet</p>
          <p className="text-[#6B6B6B] mt-1 mb-6">Click &quot;Add Project&quot; to showcase your first project</p>
          <button onClick={openAdd} className="bg-[#1652F0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1242c8] transition-colors">
            Add Your First Project
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <div key={p._id} className="bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Image */}
              <div className="w-full h-48 bg-[#F6F5F2] relative">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen className="w-12 h-12 text-[#E5E3DC]" strokeWidth={1.5} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#0A0A0A] text-base leading-tight">{p.name}</h3>
                    {p.sector && (
                      <span className="shrink-0 bg-[#1652F0]/10 text-[#1652F0] text-xs font-bold px-2.5 py-1 rounded-lg">{p.sector}</span>
                    )}
                  </div>
                  {p.client && <p className="text-[#6B6B6B] text-sm font-medium">{p.client}</p>}
                  {p.location && <p className="text-[#6B6B6B] text-xs mt-0.5">{p.location}</p>}
                  {p.description && (
                    <p className="text-[#6B6B6B] text-sm mt-2 line-clamp-2">{p.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-[#E5E3DC]">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-[#1652F0] hover:bg-blue-100 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-[#E63946] hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E3DC] sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeModal} className="text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                  Project Name <span className="text-[#E63946]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Municipal Council Hall AV Operations"
                  className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base"
                />
              </div>

              {/* Client + Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Client</label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                    placeholder="e.g. Kuwait Municipality"
                    className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Sector</label>
                  <select
                    value={form.sector}
                    onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base bg-white appearance-none"
                  >
                    <option value="">Select sector...</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Location + Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="e.g. Kuwait City, Kuwait"
                    className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Project Type</label>
                  <input
                    type="text"
                    value={form.projectType}
                    onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))}
                    placeholder="e.g. AV Operations & Training"
                    className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Project Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe what was delivered in this project..."
                  className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base resize-none"
                />
              </div>

              {/* Services Delivered */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-1">Services Delivered</label>
                <p className="text-xs text-[#6B6B6B] mb-2">One service per line</p>
                <textarea
                  value={form.servicesDelivered}
                  onChange={e => setForm(f => ({ ...f, servicesDelivered: e.target.value }))}
                  rows={4}
                  placeholder={`Audio Visual System Operation\nTechnical Staff Training\nAV Equipment Management`}
                  className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base resize-none font-mono text-sm"
                />
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Project Outcome</label>
                <textarea
                  value={form.outcome}
                  onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))}
                  rows={3}
                  placeholder="Describe the results and impact of this project..."
                  className="w-full px-4 py-3 border-2 border-[#E5E3DC] rounded-xl focus:outline-none focus:border-[#1652F0] transition-colors text-base resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Project Image</label>
                {form.imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[#E5E3DC] h-52">
                    <Image src={form.imagePreview} alt="Preview" fill className="object-cover" />
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => { setForm(f => ({ ...f, imagePreview: '', imageFile: null, imageRef: '' })); if (fileRef.current) fileRef.current.value = '' }}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-52 border-2 border-dashed border-[#E5E3DC] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#1652F0] hover:bg-blue-50/50 transition-colors text-[#6B6B6B] hover:text-[#1652F0]"
                  >
                    <Upload className="w-8 h-8" />
                    <span className="font-medium">Click to upload image</span>
                    <span className="text-xs">JPEG, PNG, WebP — max 10MB</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[#E5E3DC] flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="flex-1 py-3 border-2 border-[#E5E3DC] rounded-xl font-semibold text-[#6B6B6B] hover:bg-[#F6F5F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImage}
                className="flex-1 py-3 bg-[#1652F0] text-white rounded-xl font-semibold hover:bg-[#1242c8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
                ) : editingId ? 'Save Changes' : 'Add Project'}
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
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Delete Project?</h3>
            <p className="text-[#6B6B6B] mb-6">
              Are you sure you want to delete <strong className="text-[#0A0A0A]">{deleteTarget.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-3 border-2 border-[#E5E3DC] rounded-xl font-semibold text-[#6B6B6B] hover:bg-[#F6F5F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-[#E63946] text-white rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Deleting…</> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
