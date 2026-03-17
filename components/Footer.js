import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--b1)', marginTop: '80px', position: 'relative' }}>

      {/* Top glow line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--p), var(--pk), transparent)', opacity: 0.5 }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'linear-gradient(135deg, var(--p), var(--pk))', display: 'grid', placeItems: 'center', fontSize: '13px', boxShadow: '0 4px 14px rgba(124,109,255,0.3)' }}>✦</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, background: 'linear-gradient(135deg, var(--p2), var(--pk))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                semantic.ai
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--tx3)', lineHeight: 1.7, marginBottom: '16px', maxWidth: '220px' }}>
              AI-powered semantic search engine built on Endee vector database. Find meaning, not just keywords.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--g)', boxShadow: '0 0 8px var(--g)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.05em' }}>All systems operational</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.12em', marginBottom: '16px' }}>PRODUCT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/search', label: 'Search' },
                { href: '/stats',  label: 'Analytics' },
                { href: '/docs',   label: 'API Docs' },
                { href: '/about',  label: 'About' },
              ].map(item => (
                <Link key={item.href} href={item.href} style={{ fontSize: '13px', color: 'var(--tx3)', textDecoration: 'none', transition: 'color 0.15s', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--p2)'}
                  onMouseLeave={e => e.target.style.color = 'var(--tx3)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.12em', marginBottom: '16px' }}>TECH STACK</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Next.js 14', 'React 18', 'Tailwind CSS', 'Endee SDK'].map(tech => (
                <span key={tech} style={{ fontSize: '13px', color: 'var(--tx3)', fontFamily: 'var(--font-body)' }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Endee */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.12em', marginBottom: '16px' }}>ENDEE DB</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: 'https://github.com/endee-io/endee', label: '⭐ Star on GitHub' },
                { href: 'https://docs.endee.io',             label: '📖 Documentation'  },
                { href: 'https://endee.io',                  label: '🌐 Website'         },
              ].map(item => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'var(--tx3)', textDecoration: 'none', transition: 'color 0.15s', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--p2)'}
                  onMouseLeave={e => e.target.style.color = 'var(--tx3)'}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--b1)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--tx3)' }}>
            © {new Date().getFullYear()} semantic.ai — Built for Endee.io evaluation
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="https://github.com/rakeshits/endee" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--tx3)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--p2)'}
              onMouseLeave={e => e.target.style.color = 'var(--tx3)'}
            >GitHub ↗</a>
            <a href="https://docs.endee.io" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--tx3)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--p2)'}
              onMouseLeave={e => e.target.style.color = 'var(--tx3)'}
            >Endee Docs ↗</a>
          </div>
        </div>
      </div>
    </footer>
  )
}