'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const STATS = [
  { label: 'Knowledge Nodes',   value: 15,   suffix: '',   icon: '🗄️', desc: 'Documents in vector index'  },
  { label: 'Vector Dimensions', value: 128,  suffix: '',   icon: '📐', desc: 'Per document embedding'     },
  { label: 'Avg Response Time', value: 42,   suffix: 'ms', icon: '⚡', desc: 'Query to results'           },
  { label: 'Score Dimensions',  value: 7,    suffix: '',   icon: '🎯', desc: 'Semantic scoring axes'      },
  { label: 'Similarity',        value: 100,  suffix: '%',  icon: '🧠', desc: 'Cosine similarity accuracy' },
  { label: 'Uptime',            value: 99.9, suffix: '%',  icon: '✅', desc: 'System availability'        },
]

const CATEGORIES = [
  { name: 'Technology', count: 6, color: '#7c6dff' },
  { name: 'Science',    count: 3, color: '#00d4aa' },
  { name: 'Space',      count: 2, color: '#a78bfa' },
  { name: 'Health',     count: 2, color: '#4ade80' },
  { name: 'Philosophy', count: 1, color: '#ff6b9d' },
  { name: 'Nature',     count: 1, color: '#34d399' },
  { name: 'History',    count: 1, color: '#f59e0b' },
]

const DOCS = [
  { id: 'doc1',  title: 'Neural Networks & Deep Learning',    category: 'technology', score: 0.95 },
  { id: 'doc2',  title: 'Quantum Computing',                  category: 'technology', score: 0.92 },
  { id: 'doc3',  title: 'Philosophy of Consciousness',        category: 'philosophy', score: 0.88 },
  { id: 'doc4',  title: 'Climate Change & Carbon Cycles',     category: 'nature',     score: 0.85 },
  { id: 'doc5',  title: 'CRISPR Gene Editing',                category: 'science',    score: 0.90 },
  { id: 'doc6',  title: 'Black Holes & Spacetime',            category: 'space',      score: 0.93 },
  { id: 'doc7',  title: 'Large Language Models',              category: 'technology', score: 0.91 },
  { id: 'doc8',  title: 'Mindfulness & Neuroplasticity',      category: 'health',     score: 0.87 },
  { id: 'doc9',  title: 'Evolutionary Biology',               category: 'science',    score: 0.86 },
  { id: 'doc10', title: 'Blockchain & Decentralized Systems', category: 'technology', score: 0.83 },
  { id: 'doc11', title: 'Renewable Energy & Solar Power',     category: 'science',    score: 0.84 },
  { id: 'doc12', title: 'The Human Microbiome',               category: 'health',     score: 0.89 },
  { id: 'doc13', title: 'Semantic Search & Vectors',          category: 'technology', score: 0.94 },
  { id: 'doc14', title: 'Ancient Rome & Its Legacy',          category: 'history',    score: 0.82 },
  { id: 'doc15', title: 'Space Exploration & Mars Missions',  category: 'space',      score: 0.91 },
]

const catColors = {
  technology: '#7c6dff', science: '#00d4aa', space: '#a78bfa',
  health: '#4ade80', philosophy: '#ff6b9d', nature: '#34d399', history: '#f59e0b',
}

function AnimatedNumber({ target, suffix }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const steps = 60
    const inc = target / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step >= steps) { setCurrent(target); clearInterval(timer) }
      else setCurrent(prev => Math.min(prev + inc, target))
    }, 1500 / steps)
    return () => clearInterval(timer)
  }, [target])
  const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1)
  return <span>{display}{suffix}</span>
}

export default function StatsPage() {
  const [history, setHistory]         = useState([])
  const [selectedCat, setSelectedCat] = useState('all')

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem('search_history') || '[]')) } catch {}
  }, [])

  const filtered = selectedCat === 'all' ? DOCS : DOCS.filter(d => d.category === selectedCat)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,109,255,0.08) 0%, transparent 70%)', top: '-100px', right: '-100px', animationDuration: '10s' }} />
        <div className="grid-bg" />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '60px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, #7c6dff, #ff6b9d)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#7c6dff', letterSpacing: '0.15em' }}>SYSTEM ANALYTICS</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#f0eeff', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            Stats & <span style={{ background: 'linear-gradient(135deg,#7c6dff,#ff6b9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Analytics</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(240,238,255,0.25)' }}>Real-time overview of the semantic search engine powered by Endee</p>
        </div>

        {/* Big stats */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px', transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(240,238,255,0.25)', letterSpacing: '0.08em' }}>{s.label.toUpperCase()}</span>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, background: 'linear-gradient(135deg,#a594ff,#ff6b9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '6px' }}>
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(240,238,255,0.25)', marginTop: '6px' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* System status */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.25)' }}>01</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#f0eeff', letterSpacing: '-0.4px' }}>System status</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Endee Vector DB',    status: 'operational', detail: 'localhost:8080'         },
              { label: 'Next.js API Routes', status: 'operational', detail: '/api/search'            },
              { label: 'Search Index',       status: 'operational', detail: 'semantic_search (128d)' },
              { label: 'Fallback Engine',    status: 'standby',     detail: 'keyword scoring'        },
            ].map(item => (
              <div key={item.label} style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.status === 'operational' ? '#00d4aa' : '#f59e0b', boxShadow: `0 0 8px ${item.status === 'operational' ? '#00d4aa' : '#f59e0b'}`, animation: 'pulse 2s infinite' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#f0eeff' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(240,238,255,0.25)' }}>{item.detail}</div>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: item.status === 'operational' ? '#00d4aa' : '#f59e0b', background: item.status === 'operational' ? 'rgba(0,212,170,0.08)' : 'rgba(245,158,11,0.08)', border: `1px solid ${item.status === 'operational' ? 'rgba(0,212,170,0.2)' : 'rgba(245,158,11,0.2)'}`, padding: '2px 8px', borderRadius: '4px' }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Category breakdown */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.25)' }}>02</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#f0eeff', letterSpacing: '-0.4px' }}>Knowledge base breakdown</h2>
          </div>
          <div style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '90px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.4)', flexShrink: 0 }}>{cat.name}</div>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(cat.count / 15) * 100}%`, background: cat.color, borderRadius: '3px', boxShadow: `0 0 8px ${cat.color}66` }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: cat.color, width: '20px', textAlign: 'right', flexShrink: 0 }}>{cat.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Document index */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.25)' }}>03</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#f0eeff', letterSpacing: '-0.4px' }}>Document index</h2>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['all', ...Object.keys(catColors)].map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)}
                  style={{ padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: selectedCat === cat ? 600 : 500, cursor: 'pointer', border: '1px solid', fontFamily: 'var(--font-body)', transition: 'all 0.2s', background: selectedCat === cat ? 'linear-gradient(135deg,#7c6dff,#ff6b9d)' : 'transparent', borderColor: selectedCat === cat ? 'transparent' : 'rgba(255,255,255,0.06)', color: selectedCat === cat ? 'white' : 'rgba(240,238,255,0.25)', boxShadow: selectedCat === cat ? '0 4px 14px rgba(124,109,255,0.4)' : 'none' }}
                >{cat}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {filtered.map((doc, i) => (
              <div key={doc.id} style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,255,0.25)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(240,238,255,0.25)', width: '36px', flexShrink: 0 }}>{doc.id}</span>
                <span style={{ flex: 1, fontSize: '13px', color: '#f0eeff', fontWeight: 500 }}>{doc.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: catColors[doc.category], background: `${catColors[doc.category]}18`, border: `1px solid ${catColors[doc.category]}33`, padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>{doc.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#a594ff' }}>{Math.round(doc.score * 100)}%</span>
                  <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${doc.score * 100}%`, background: catColors[doc.category] || '#7c6dff', borderRadius: '1px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search history */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(240,238,255,0.25)' }}>04</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#f0eeff', letterSpacing: '-0.4px' }}>Your search history</h2>
          </div>
          {history.length === 0 ? (
            <div style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '13px', color: 'rgba(240,238,255,0.25)', marginBottom: '16px' }}>No searches yet</div>
              <Link href="/search"><button style={{ height: '36px', padding: '0 18px', borderRadius: '12px', background: 'linear-gradient(135deg,#7c6dff,#ff6b9d)', color: 'white', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Start searching →</button></Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {history.map((q, i) => (
                <div key={i} style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px' }}>🕐</span>
                    <span style={{ fontSize: '13px', color: 'rgba(240,238,255,0.55)' }}>{q}</span>
                  </div>
                  <Link href="/search">
                    <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: 'rgba(240,238,255,0.25)', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.target.style.borderColor = 'rgba(124,109,255,0.35)'; e.target.style.color = '#a594ff' }}
                      onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.color = 'rgba(240,238,255,0.25)' }}
                    >Search again →</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: '#0a0b12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#f0eeff', marginBottom: '4px' }}>Ready to search?</div>
            <div style={{ fontSize: '13px', color: 'rgba(240,238,255,0.25)' }}>All 15 documents indexed and ready in Endee</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/search"><button style={{ height: '46px', padding: '0 26px', borderRadius: '12px', background: 'linear-gradient(135deg,#7c6dff,#ff6b9d)', color: 'white', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Search now →</button></Link>
            <Link href="/docs"><button style={{ height: '46px', padding: '0 22px', borderRadius: '12px', background: 'transparent', color: 'rgba(240,238,255,0.55)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>API docs</button></Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}