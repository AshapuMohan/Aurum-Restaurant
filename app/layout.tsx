import type { Metadata } from 'next'
import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'
import CartDrawer from '@/components/CartDrawer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aurum – Fine Dining Experience',
  description: 'Indulge in an extraordinary culinary journey at Aurum. Reserve your table for an unforgettable fine dining experience in an atmosphere of luxury and elegance.',
  keywords: 'fine dining, luxury restaurant, reservations, gourmet cuisine, Aurum restaurant',
  openGraph: {
    title: 'Aurum – Fine Dining Experience',
    description: 'Indulge in an extraordinary culinary journey at Aurum.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-dark-100 text-cream-50 selection:bg-gold-500/30 selection:text-gold-100`}>
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}
