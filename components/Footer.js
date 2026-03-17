import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#e8ff47', display: 'grid', placeItems: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <circle cx="5.5" cy="5.5" r="3.5" stroke="#07080d" strokeWidth="1.4"/>
                  <line x1="8.2" y1="8.2" x2="13" y2="13" stroke="#07080d" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800, color: '#ecedf5' }}>
                semantic<span style={{ color: '#e8ff47' }}>.</span>ai
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.35)', lineHeight: 1.65 }}>
              A semantic search engine that understands meaning, not just keywords.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)' }}>All systems operational</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '16px' }}>NAVIGATION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/', 'Home'], ['/search', 'Search'], ['/#about', 'Docs']].map(([href, label]) => (
                <Link key={href} href={href} style={{ fontSize: '13px', color: 'rgba(236,237,245,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#ecedf5'}
                  onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.4)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '16px' }}>BUILT WITH</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Next.js 14', 'Tailwind CSS', 'App Router', 'Edge API'].map(t => (
                <span key={t} style={{ fontSize: '13px', color: 'rgba(236,237,245,0.35)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.2)' }}>
            © {new Date().getFullYear()} semantic.ai — built for exploration
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.2)' }}>
            v2.0.0
          </span>
        </div>
      </div>
    </footer>
  )
}