import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { siteConfig } from './config/site'
import { ErrorBoundary } from './components/ErrorBoundary'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Bufete de Abogados`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: `${siteConfig.name} — Bufete de Abogados`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 300, height: 250, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} — Bufete de Abogados`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-dvh bg-white font-sans text-black antialiased`}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}