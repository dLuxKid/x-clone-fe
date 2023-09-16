// context
import AuthProvider from '@/context/AuthContext';
// next
import type { Metadata } from 'next';
// styles
import '../style/globals.css';
// toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
