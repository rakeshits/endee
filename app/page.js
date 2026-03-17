'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const TYPING_WORDS = ['keywords', 'boundaries', 'limits', 'the obvious']

const STATS = [
  { label: 'KNOWLEDGE NODES',  value: '15',    suffix: ''   },
  { label: 'VECTOR DIMENSIONS', value: '128',   suffix: ''   },
  { label: 'RESPONSE TIME',    value: '<50',   suffix: 'ms' },
  { label: 'UPTIME',           value: '99.9',  suffix: '%'  },
]

const FEATURES = [
  { icon: '🧠', title: 'Semantic understanding', desc: 'Understands the true meaning behind your words — not just pattern matching on text.' },
  { icon: '⚡', title: 'Lightning fast',          desc: 'Sub-50ms responses powered by Endee\'s high-performance vector similarity engine.' },
  { icon: '🎯', title: 'Precision ranking',       desc: 'Every result scored with cosine similarity and ranked by true relevance confidence.' },
  { icon: '🌐', title: 'Deep knowledge base',     desc: '15 curated documents spanning science, tech, philosophy, space, health and more.'  },
]

const STEPS = [
  { n: '01', t: 'Enter your query',  b: 'Type anything in natural language. No special syntax needed.'                           },
  { n: '02', t: 'Semantic analysis', b: 'Engine tokenizes, extracts concepts and computes vectors via Endee.'                    },
  { n: '03', t: 'Ranked results',    b: 'Top 3 docs returned with cosine similarity scores and metadata.'                       },
]

const MARQUEE_ITEMS = ['NEURAL NETWORKS','QUANTUM PHYSICS','CONSCIOUSNESS','BLACK HOLES','GENE EDITING','CLIMATE CHANGE','BLOCKCHAIN','EVOLUTION','MINDFULNESS','SPACETIME','DARK MATTER','RELATIVITY']

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const word = TYPING_WORDS[wordIndex]
    let t
    if (!deleting && displayed.length < word.length) {
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 110)
    } else if (!deleting && displayed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 65)
    } else {
      setDeleting(false)
      setWordIndex(i => (i + 1) % TYPING_WORDS.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, wordIndex])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '580px', display: 'flex', alignItems: 'center', padding: '72px 32px 56px', overflow: 'hidden' }}>

        {/* Background orbs */}
        <div className="orb" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,109,255,0.15) 0%, transparent 70%)', top: '-200px', right: '-100px', animationDuration: '8s' }} />
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 70%)', bottom: '-100px', left: '-50px', animationDuration: '10s', animationDelay: '2s' }} />
        <div className="orb" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', top: '40%', left: '45%', animationDuration: '6s', animationDelay: '1s' }} />
        <div className="grid-bg" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>

          {/* Badge */}
          <div className="animate-fade-up delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,109,255,0.1)', border: '1px solid rgba(124,109,255,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '28px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--g)', boxShadow: '0 0 8px var(--g)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.65)', letterSpacing: '0.05em' }}>
              POWERED BY ENDEE VECTOR DATABASE
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-up delay-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,66px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-1.5px', marginBottom: '20px' }}>
            <span style={{ color: 'var(--tx)', display: 'block' }}>Search beyond</span>
            <span style={{ display: 'inline-block' }}>
              <span className="grad-text">{displayed}</span>
              <span className="typing-cursor" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-3" style={{ fontSize: '16px', color: 'var(--tx2)', maxWidth: '440px', lineHeight: 1.75, marginBottom: '36px', fontWeight: 400 }}>
            AI-powered semantic search that understands{' '}
            <strong style={{ color: 'rgba(240,238,255,0.85)', fontWeight: 600 }}>meaning, context, and intent</strong>
            {' '}— not just the words you type.
          </p>

          {/* Buttons */}
          <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/search">
              <button className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="white" strokeWidth="1.5"/>
                  <line x1="8.5" y1="8.5" x2="13" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Start searching
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-ghost">How it works →</button>
            </Link>
          </div>

          {/* Mini stats row */}
          <div className="animate-fade-up delay-5" style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
            {[['15', 'knowledge nodes'], ['128d', 'vector space'], ['<50ms', 'response']].map(([v, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, background: 'linear-gradient(135deg, var(--p2), var(--pk))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{v}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.05em' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)', padding: '12px 0', overflow: 'hidden', background: 'rgba(124,109,255,0.03)' }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="surface-card animate-fade-up" style={{ padding: '24px', animationDelay: `${i * 80}ms` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.1em', marginBottom: '12px' }}>{s.label}</div>
              <div className="stat-number">{s.value}{s.suffix}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--p)', letterSpacing: '0.15em', marginBottom: '8px', textAlign: 'center' }}>CAPABILITIES</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--tx)', letterSpacing: '-0.5px', marginBottom: '32px', textAlign: 'center' }}>
          Built for <span className="grad-text-2">intelligent</span> search
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="surface-card animate-fade-up" style={{ padding: '28px', cursor: 'default', animationDelay: `${i * 100}ms` }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,109,255,0.35)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.4)'
                e.currentTarget.querySelector('.feat-icon-wrap').style.background = 'rgba(124,109,255,0.22)'
                e.currentTarget.querySelector('.feat-icon-wrap').style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--b1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.querySelector('.feat-icon-wrap').style.background = 'rgba(124,109,255,0.1)'
                e.currentTarget.querySelector('.feat-icon-wrap').style.transform = 'scale(1)'
              }}
            >
              {/* Bottom border animation */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--p), var(--pk))', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s' }}
                ref={el => {
                  if (!el) return
                  const card = el.parentElement
                  card.addEventListener('mouseenter', () => { el.style.transform = 'scaleX(1)' })
                  card.addEventListener('mouseleave', () => { el.style.transform = 'scaleX(0)' })
                }}
              />
              <div className="feat-icon-wrap" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(124,109,255,0.1)', border: '1px solid rgba(124,109,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '16px', transition: 'all 0.3s' }}>
                {f.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--tx)', marginBottom: '6px' }}>{f.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--tx3)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="about" style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 32px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--p)', letterSpacing: '0.15em', marginBottom: '8px' }}>HOW IT WORKS</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--tx)', letterSpacing: '-0.5px', marginBottom: '28px' }}>
          From query to result in <span className="grad-text-2">milliseconds</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '48px' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="surface-card" style={{ padding: '24px', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--b1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg, var(--p2), var(--pk))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px', opacity: 0.6 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--tx)', marginBottom: '6px' }}>{s.t}</div>
              <p style={{ fontSize: '12px', color: 'var(--tx3)', lineHeight: 1.65 }}>{s.b}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="surface-card" style={{ padding: '48px 40px', textAlign: 'center', marginBottom: '0', cursor: 'default', position: 'relative' }}>
          <div className="orb" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124,109,255,0.12) 0%, transparent 70%)', top: '-100px', left: '50%', transform: 'translateX(-50%)', animationDuration: '6s' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--p)', letterSpacing: '0.15em', marginBottom: '14px' }}>READY TO BEGIN?</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, color: 'var(--tx)', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              Experience semantic search
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--tx3)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px', lineHeight: 1.65 }}>
              See the difference between keyword matching and true vector-based semantic understanding.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/search"><button className="btn-primary">Start searching →</button></Link>
              <Link href="/docs"><button className="btn-ghost">View API docs</button></Link>
              <Link href="/stats"><button className="btn-ghost">View stats</button></Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: '80px' }} />
      <Footer />
    </div>
  )
}