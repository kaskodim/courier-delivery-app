import type { Metadata } from 'next'
import '../styles/globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { Header } from '@components/Header/Header'

export const metadata: Metadata = {
  title: 'Courier delivery app',
  description: 'Приложение для доставки посылок',
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
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  )
}
