import type { Metadata } from 'next'
import '../styles/globals.css'

import { Header } from '@components/Header/Header'

export const metadata: Metadata = {
  title: 'Courier delivery app',
  description: 'Приложение для доставки посылок',
  icons: '/',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 overflow-hidden p-4">{children}</main>
      </body>
    </html>
  )
}
