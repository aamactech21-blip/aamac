'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

const serviceTypes = [
  'AV Consultancy & Design',
  'AV Installation',
  'AV Programming (Crestron/Extron)',
  'Service & Maintenance',
  'Digital Signage',
  'Video Conferencing',
  'Electrical Products',
  'Other',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const contactInfo = data.get('contactInfo') as string
    const serviceType = data.get('serviceType') as string
    const message = data.get('message') as string

    const mailBody = encodeURIComponent(
      `Name: ${name}\nContact: ${contactInfo}\nService Type: ${serviceType}\n\nMessage:\n${message}`
    )
    window.location.href = `mailto:sales@aamactech.com?subject=Project Enquiry — ${serviceType}&body=${mailBody}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[#F6F5F2] rounded-2xl p-10 text-center border border-[#E5E3DC]">
        <div className="w-14 h-14 bg-[#7CB518]/15 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7CB518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[#0A0A0A] font-bold text-xl mb-3">Message sent!</h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed">
          Your email client should have opened. We will get back to you as soon as possible.
        </p>
        <button
          className="mt-6 text-[#1652F0] font-semibold text-sm hover:underline"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[#0A0A0A] text-sm font-semibold">
          Full Name <span className="text-[#E63946]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Ahmed Al-Rashidi"
          className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-[#0A0A0A] text-sm bg-white placeholder:text-[#9b9b9b] focus:outline-none focus:ring-2 focus:ring-[#1652F0]/30 focus:border-[#1652F0] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contactInfo" className="text-[#0A0A0A] text-sm font-semibold">
          Email or Phone <span className="text-[#E63946]">*</span>
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="text"
          required
          placeholder="ahmed@company.com or +965 XXXX XXXX"
          className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-[#0A0A0A] text-sm bg-white placeholder:text-[#9b9b9b] focus:outline-none focus:ring-2 focus:ring-[#1652F0]/30 focus:border-[#1652F0] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="serviceType" className="text-[#0A0A0A] text-sm font-semibold">
          Service Type <span className="text-[#E63946]">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          defaultValue=""
          className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-[#0A0A0A] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1652F0]/30 focus:border-[#1652F0] transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Select a service...
          </option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[#0A0A0A] text-sm font-semibold">
          Message <span className="text-[#E63946]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, space, or requirements..."
          className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-[#0A0A0A] text-sm bg-white placeholder:text-[#9b9b9b] focus:outline-none focus:ring-2 focus:ring-[#1652F0]/30 focus:border-[#1652F0] transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white font-bold text-sm px-7 py-4 rounded-xl hover:bg-[#1A1A1A] transition-all hover:-translate-y-0.5 hover:shadow-lg mt-2"
      >
        Send Message
        <Send size={16} />
      </button>

      <p className="text-[#6B6B6B] text-xs text-center">
        This will open your email client pre-filled with your message.
      </p>
    </form>
  )
}
