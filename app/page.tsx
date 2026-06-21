import Header from '@/components/header'
import Footer from '@/components/footer'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import HeroSection from '@/components/home/hero-section'
import DualOfferingSection from '@/components/home/dual-offering-section'
import ServicesPillarsSection from '@/components/home/services-pillars-section'
import CtaSection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DualOfferingSection />
        <ServicesPillarsSection />
        <CtaSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
