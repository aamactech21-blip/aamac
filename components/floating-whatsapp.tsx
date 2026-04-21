'use client'

import { useState } from 'react'

const WA_NUMBER = '96566140614'
const WA_MESSAGE = encodeURIComponent("Hi AAMAC, I'd like to discuss a project.")
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <span
        className={`bg-[#0A0A0A] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 whitespace-nowrap ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us
      </span>

      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
        </svg>
      </div>
    </a>
  )
}
