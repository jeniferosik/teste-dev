import type { Metadata, Viewport } from 'next'
import { Chewy, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const chewy = Chewy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-chewy',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portal Browser — Rick and Morty',
  description:
    'Navegue pelos personagens do multiverso de Rick and Morty. Filtre por nome, espécie, status, gênero e localização.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#13163F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${chewy.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}