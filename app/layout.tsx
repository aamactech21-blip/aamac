import type { Metadata } from 'next'
import { Manrope, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'AAMAC Technology | AV & Low-Voltage Integration Kuwait',
  description:
    'AAMAC Technology — Kuwait\'s trusted partner for AV integration, low-voltage systems, electrical products, Crestron & Extron programming, and professional AV maintenance.',
  keywords: 'AV integration Kuwait, Crestron programmer Kuwait, Extron programmer, audio visual systems, digital signage, video conferencing, AAMAC',
  openGraph: {
    title: 'AAMAC Technology | AV & Low-Voltage Integration Kuwait',
    description: 'From boardrooms to broadcast studios — elegant AV and electrical solutions across Kuwait.',
    url: 'https://aamactech.com',
    siteName: 'AAMAC Technology',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AAMAC Technology | AV & Low-Voltage Integration Kuwait',
    description: 'From boardrooms to broadcast studios — elegant AV and electrical solutions across Kuwait.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
