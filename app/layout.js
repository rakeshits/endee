import './globals.css'

export const metadata = {
  title: 'semantic.ai — Search by meaning',
  description: 'A semantic search engine that understands meaning, context, and intent.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}