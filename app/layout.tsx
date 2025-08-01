import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slava App',
  description: 'Created with Slava',
  generator: 'Slava.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
