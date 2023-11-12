import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashbord',
  description: 'Vaageswari Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>{children}<Toaster /></AuthProvider>
      </body>
    </html>
  )
}
