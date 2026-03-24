import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'bioreactor.ai — Ask your bioreactor anything',
  description: 'Agentic AI for real-time bioprocess monitoring, simulation, and optimization. Connect your bioreactor to an AI that understands biology and physics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7GEHWGZQ52" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7GEHWGZQ52');
        `}</Script>
      </body>
    </html>
  )
}
