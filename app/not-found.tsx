import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-[#0A0A0A] min-h-[calc(100vh-80px)] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-2xl">
              <p className="font-accent-italic text-[#1652F0] text-[clamp(6rem,20vw,10rem)] leading-none mb-4 select-none">
                404
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight text-balance mb-5">
                Page not found
              </h1>
              <p className="text-[#6B6B6B] text-lg leading-relaxed mb-10">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-[#1652F0] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#1246D6] transition-all hover:-translate-y-0.5"
                >
                  Go Home
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#F6F5F2] text-[#F6F5F2] font-bold px-7 py-4 rounded-xl hover:bg-[#F6F5F2] hover:text-[#0A0A0A] transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
