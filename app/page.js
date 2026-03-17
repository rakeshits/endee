'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const DEMOS = [
  '"How do neural networks learn?"',
  '"What causes black holes?"',
  '"Explain quantum entanglement"',
  '"What is consciousness?"',
]

const BENTO = [
  { label: 'KNOWLEDGE NODES', value: '15', desc: 'Topics across science, tech & philosophy', span: 1 },
  { label: 'RESPONSE TIME', value: '<50ms', desc: 'Ranked results in milliseconds', span: 1 },
  { label: 'SCORE DIMENSIONS', value: '7', desc: 'Semantic scoring axes per query', span: 1 },
]

export default function Home() {
  const [demoIndex, setDemoIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDemoIndex(i => (i + 1) % DEMOS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        {/* ── HERO ── */}
        <section style={{ padding: '80px 0 64px', maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <div style={{ width: '24px', height: '1px', background: '#e8ff47' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47', letterSpacing: '0.1em' }}>SEMANTIC SEARCH ENGINE</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6vw,68px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2.5px', color: '#ecedf5', marginBottom: '24px' }}>
            Find meaning,<br />
            <em style={{ fontStyle: 'normal', color: '#e8ff47' }}>not just</em><br />
            <span style={{ color: 'rgba(236,237,245,0.28)' }}>keywords.</span>
          </h1>

          <p style={{ fontSize: '16px', color: 'rgba(236,237,245,0.55)', maxWidth: '420px', lineHeight: 1.75, marginBottom: '36px', fontWeight: 400 }}>
            A search engine that understands what you're asking — mapping concepts, context, and intent across a curated knowledge base.
          </p>

          {/* Demo query */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '10px 16px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47', fontWeight: 600 }}>Try →</span>
            <span key={demoIndex} style={{ fontSize: '13px', color: 'rgba(236,237,245,0.6)', animation: 'fadeUp 0.4s ease both' }}>
              {DEMOS[demoIndex]}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/search">
              <button className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="#07080d" strokeWidth="1.5"/>
                  <line x1="8.5" y1="8.5" x2="13" y2="13" stroke="#07080d" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Start searching
              </button>
            </Link>
            <Link href="/#about">
              <button className="btn-ghost">See how it works →</button>
            </Link>
          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 0', marginBottom: '64px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', animation: 'marquee 22s linear infinite' }}>
            {[...Array(2)].map((_, ri) =>
              ['NEURAL NETWORKS', 'QUANTUM PHYSICS', 'CONSCIOUSNESS', 'BLACK HOLES', 'GENE EDITING', 'CLIMATE CHANGE', 'BLOCKCHAIN', 'EVOLUTION', 'MINDFULNESS', 'SPACETIME'].map(item => (
                <div key={`${ri}-${item}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e8ff47', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.08em' }}>{item}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '10px' }}>
            {BENTO.map(b => (
              <div key={b.label} className="surface-card" style={{ padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '14px' }}>{b.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 900, color: '#e8ff47', letterSpacing: '-3px', lineHeight: 1, marginBottom: '4px' }}>{b.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(236,237,245,0.28)', lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            ))}

            {/* Wide card */}
            <div className="surface-card" style={{ padding: '28px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '26px', marginBottom: '12px' }}>🧠</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.5px', marginBottom: '8px' }}>Beyond keyword matching</h3>
              <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.65, marginBottom: '16px' }}>
                Traditional search finds documents containing your exact words. Semantic search understands what you mean — finding relevant results even when they share no common vocabulary with your query.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Concept & intent extraction', 'Multi-axis relevance scoring', 'Natural language queries'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(236,237,245,0.55)' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(232,255,71,0.08)', border: '1px solid rgba(232,255,71,0.2)', display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: '9px', color: '#e8ff47' }}>✓</div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#ecedf5', marginBottom: '6px', letterSpacing: '-0.2px' }}>Built for speed</h3>
              <p style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)', lineHeight: 1.6 }}>Edge-ready API routes with sub-50ms scoring across the full knowledge base.</p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="about" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>01</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.5px' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { n: 'STEP 01', t: 'Enter your query', b: 'Type anything in natural language — a question, a concept, a topic. No special syntax needed.' },
              { n: 'STEP 02', t: 'Semantic analysis', b: 'The engine tokenizes, extracts concepts, and computes similarity across 7 scoring dimensions.' },
              { n: 'STEP 03', t: 'Ranked results', b: 'Top 3 documents returned with confidence scores, tags, and relevance percentages.' },
            ].map(s => (
              <div key={s.n} className="surface-card" style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#e8ff47', marginBottom: '12px' }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#ecedf5', marginBottom: '6px', letterSpacing: '-0.2px' }}>{s.t}</div>
                <div style={{ fontSize: '12px', color: 'rgba(236,237,245,0.35)', lineHeight: 1.6 }}>{s.b}</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}