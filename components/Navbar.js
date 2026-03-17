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
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/#about', label: 'Docs' },
  ]

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: '56px',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(7,8,13,0.92)' : 'rgba(7,8,13,0.7)',
      backdropFilter: 'blur(24px)',
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: '#e8ff47', display: 'grid', placeItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="5.5" r="3.5" stroke="#07080d" strokeWidth="1.4"/>
            <line x1="8.2" y1="8.2" x2="13" y2="13" stroke="#07080d" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.3px' }}>
          semantic<span style={{ color: '#e8ff47' }}>.</span>ai
        </span>
      </Link>

      {/* Center links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            padding: '6px 12px', borderRadius: '7px',
            fontSize: '13px', fontWeight: 500,
            color: pathname === l.href ? '#ecedf5' : 'rgba(236,237,245,0.35)',
            background: pathname === l.href ? 'rgba(255,255,255,0.07)' : 'transparent',
            textDecoration: 'none', transition: 'all 0.15s',
            fontFamily: 'var(--font-body)',
          }}
          onMouseEnter={e => { if (pathname !== l.href) { e.target.style.color = 'rgba(236,237,245,0.7)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}}
          onMouseLeave={e => { if (pathname !== l.href) { e.target.style.color = 'rgba(236,237,245,0.35)'; e.target.style.background = 'transparent'; }}}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'rgba(236,237,245,0.28)', background: '#12141e',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '3px 8px', borderRadius: '5px', letterSpacing: '0.04em',
        }}>v2.0</span>
        <Link href="/search">
          <button style={{
            height: '32px', padding: '0 16px', borderRadius: '8px',
            background: '#e8ff47', color: '#07080d', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.2px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.target.style.background = '#f0ff6e'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.background = '#e8ff47'; e.target.style.transform = 'translateY(0)'; }}
          >
            Try it free
          </button>
        </Link>
      </div>
    </nav>
  )
}