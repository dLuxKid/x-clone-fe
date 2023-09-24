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
      <body className='max-w-screen-[1390px] min-h-screen bg-black'>
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
          className={'h-fit p-4 z-50'}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
