'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const WA_NUMBER = '96566140614'
const waUrl = (name: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi AAMAC, I'm interested in ${name}. Could you share more details?`
  )}`

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="white" aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.836 1.8 6.858L2 30l7.338-1.775A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 0 1-5.862-1.606l-.42-.252-4.354 1.054 1.082-4.244-.276-.435A11.455 11.455 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.405c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172s-.89 1.118-1.092 1.349c-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.706-1.022-.912-1.712-2.037-1.912-2.38-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.201.23-.344.344-.574.115-.23.058-.431-.028-.603-.086-.172-.776-1.87-1.064-2.562-.28-.672-.565-.58-.776-.59l-.66-.011c-.23 0-.603.086-.919.431s-1.205 1.177-1.205 2.87 1.233 3.33 1.405 3.56c.172.23 2.428 3.706 5.88 5.195.822.354 1.463.566 1.963.724.824.262 1.575.225 2.168.136.661-.099 2.036-.832 2.323-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z" />
  </svg>
)

type Product = {
  _id: string
  name: string
  description: string
  price: string | null
  imageUrl: string | null
}

const PREVIEW_LENGTH = 120

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const isLong = product.description.length > PREVIEW_LENGTH

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E3DC] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col transform-gpu">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F6F5F2]">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-4" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E5E3DC]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-[#0A0A0A] font-bold text-base mb-1 leading-snug line-clamp-2">{product.name}</h3>
          {product.price && (
            <p className="text-[#E63946] font-extrabold text-lg mb-2">{product.price}</p>
          )}

          <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1 line-clamp-3">{product.description}</p>

          {isLong && (
            <button
              onClick={() => setOpen(true)}
              className="mt-2 text-[#1652F0] text-xs font-semibold hover:underline text-left"
            >
              Read more
            </button>
          )}

          <a
            href={waUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 bg-[#E63946] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#c73040] transition-all duration-200 hover:-translate-y-0.5"
          >
            <WhatsAppIcon size={16} />
            Enquire via WhatsApp
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal image */}
            {product.imageUrl && (
              <div className="relative aspect-[16/9] bg-[#F6F5F2] rounded-t-2xl overflow-hidden">
                <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-6" />
              </div>
            )}

            <div className="p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-[#0A0A0A] font-extrabold text-xl leading-snug">{product.name}</h2>
                  {product.price && (
                    <p className="text-[#E63946] font-extrabold text-2xl mt-1">{product.price}</p>
                  )}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#F6F5F2] text-[#6B6B6B] hover:bg-[#E5E3DC] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-[#6B6B6B] text-sm leading-relaxed whitespace-pre-line">{product.description}</p>

              <a
                href={waUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-[#25D366] text-white font-bold px-6 py-4 rounded-xl hover:bg-[#20c55e] transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={18} />
                Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
