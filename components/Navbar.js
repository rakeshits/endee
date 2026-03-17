'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '/',       label: 'Home'   },
    { href: '/search', label: 'Search' },
    { href: '/about',  label: 'About'  },
    { href: '/docs',   label: 'Docs'   },
    { href: '/stats',  label: 'Stats'  },
  ]

  return (
    <>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '58px',
        background: scrolled ? 'rgba(5,5,8,0.92)' : 'rgba(5,5,8,0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(124,109,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'all 0.3s',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c6dff, #ff6b9d)',
            display: 'grid', placeItems: 'center', fontSize: '14px',
            boxShadow: '0 4px 20px rgba(124,109,255,0.4)',
            animation: 'glow 3s ease-in-out infinite',
          }}>✦</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700,
            background: 'linear-gradient(135deg, var(--p2), var(--pk))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>semantic.ai</span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '6px 14px', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500,
              color: pathname === l.href ? 'var(--tx)' : 'var(--tx3)',
              background: pathname === l.href ? 'rgba(124,109,255,0.15)' : 'transparent',
              textDecoration: 'none', transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => {
              if (pathname !== l.href) {
                e.currentTarget.style.color = 'var(--tx2)'
                e.currentTarget.style.background = 'var(--b1)'
              }
            }}
            onMouseLeave={e => {
              if (pathname !== l.href) {
                e.currentTarget.style.color = 'var(--tx3)'
                e.currentTarget.style.background = 'transparent'
              }
            }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/search">
          <button style={{
            height: '34px', padding: '0 18px', borderRadius: '9px',
            background: 'linear-gradient(135deg, var(--p), var(--pk))',
            color: 'white', border: 'none',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'var(--font-body)', transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(124,109,255,0.35)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,109,255,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,109,255,0.35)'
          }}
          >
            Try it free →
          </button>
        </Link>
      </nav>

      {/* Toast notification */}
      <div id="global-toast" style={{
        position: 'fixed', bottom: '24px', right: '24px',
        background: 'var(--s2)', border: '1px solid rgba(0,212,170,0.3)',
        borderRadius: '12px', padding: '12px 20px',
        fontSize: '13px', color: 'var(--g)',
        fontFamily: 'var(--font-mono)', zIndex: 9999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        display: 'none', animation: 'slideUp 0.3s ease',
      }}>
        ✓ Link copied to clipboard!
      </div>
    </>
  )
}