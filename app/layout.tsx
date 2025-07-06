import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Creators Pack',
  description: 'Recreation of Eleven Lab AI creator Pack',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
