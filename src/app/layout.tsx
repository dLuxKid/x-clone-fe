import '../style/globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Twitter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-screen-2xl min-h-screen bg-black'>
        {children}
      </body>
    </html>
  )
}
