import type { Metadata } from 'next'
import '../style/globals.css'
import { Toaster } from 'sonner'
import AuthModal from '@/components/AuthModal'
import AuthProvider from '@/context/AuthContext'


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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
