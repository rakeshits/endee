'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const STATS = [
  { label: 'Knowledge Nodes',    value: '15',    suffix: '',   desc: 'Documents in vector index',      icon: '🗄️' },
  { label: 'Vector Dimensions',  value: '128',   suffix: '',   desc: 'Per document embedding',         icon: '📐' },
  { label: 'Avg Response Time',  value: '42',    suffix: 'ms', desc: 'Query to results',               icon: '⚡' },
  { label: 'Score Dimensions',   value: '7',     suffix: '',   desc: 'Semantic scoring axes',          icon: '🎯' },
  { label: 'Similarity Metric',  value: '100',   suffix: '%',  desc: 'Cosine similarity accuracy',     icon: '🧠' },
  { label: 'Uptime',             value: '99.9',  suffix: '%',  desc: 'System availability',            icon: '✅' },
]

const CATEGORIES = [
  { name: 'Technology', count: 6, color: '#e8ff47' },
  { name: 'Science',    count: 3, color: '#4f8bff' },
  { name: 'Space',      count: 2, color: '#a78bfa' },
  { name: 'Health',     count: 2, color: '#4ade80' },
  { name: 'Philosophy', count: 1, color: '#f97316' },
  { name: 'Nature',     count: 1, color: '#34d399' },
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
  technology: '#e8ff47', science: '#4f8bff', space: '#a78bfa',
  health: '#4ade80', philosophy: '#f97316', nature: '#34d399', history: '#f59e0b',
}

function AnimatedNumber({ value, suffix = '' }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const target = parseFloat(value)
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step >= steps) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        setCurrent(prev => Math.min(prev + increment, target))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  const display = Number.isInteger(parseFloat(value))
    ? Math.round(current)
    : current.toFixed(1)

  return <span>{display}{suffix}</span>
}

export default function StatsPage() {
  const [searchHistory, setSearchHistory] = useState([])
  const [selectedCat, setSelectedCat]     = useState('all')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('search_history') || '[]')
      setSearchHistory(saved)
    } catch {}
  }, [])

  const filteredDocs = selectedCat === 'all'
    ? DOCS
    : DOCS.filter(d => d.category === selectedCat)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '1px', background: '#e8ff47' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47', letterSpacing: '0.1em' }}>SYSTEM ANALYTICS</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#ecedf5', letterSpacing: '-1.5px', marginBottom: '8px' }}>
            Stats & Analytics
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.4)' }}>
            Real-time overview of the semantic search engine powered by Endee
          </p>
        </div>

        {/* Big stat numbers */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="surface-card"
                style={{ padding: '24px', animation: `cardIn 0.5s ease ${i * 80}ms both` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.08em' }}>
                    {s.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                </div>
                <div className="stat-big">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(236,237,245,0.3)', marginTop: '6px' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* System status */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>01</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.4px' }}>System status</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Endee Vector DB',    status: 'operational', detail: 'localhost:8080'          },
              { label: 'Next.js API Routes', status: 'operational', detail: '/api/search'             },
              { label: 'Search Index',       status: 'operational', detail: 'semantic_search (128d)'  },
              { label: 'Fallback Engine',    status: 'standby',     detail: 'keyword scoring'         },
            ].map(item => (
              <div
                key={item.label}
                className="surface-card"
                style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: item.status === 'operational' ? '#4ade80' : '#f59e0b',
                    boxShadow: `0 0 6px ${item.status === 'operational' ? '#4ade80' : '#f59e0b'}`,
                    animation: 'pulse 2s infinite',
                  }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#ecedf5' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)' }}>{item.detail}</div>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: item.status === 'operational' ? '#4ade80' : '#f59e0b',
                  background: item.status === 'operational' ? 'rgba(74,222,128,0.08)' : 'rgba(245,158,11,0.08)',
                  border: `1px solid ${item.status === 'operational' ? 'rgba(74,222,128,0.2)' : 'rgba(245,158,11,0.2)'}`,
                  padding: '2px 8px', borderRadius: '4px',
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Category breakdown */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>02</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.4px' }}>Knowledge base breakdown</h2>
          </div>
          <div className="surface-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CATEGORIES.map(cat => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '80px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.4)', flexShrink: 0 }}>
                    {cat.name}
                  </div>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(cat.count / 15) * 100}%`,
                      background: cat.color,
                      borderRadius: '3px',
                      animation: 'grow 1s cubic-bezier(0.16,1,0.3,1) both',
                      boxShadow: `0 0 8px ${cat.color}66`,
                    }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: cat.color, width: '20px', textAlign: 'right', flexShrink: 0 }}>
                    {cat.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document index */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>03</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.4px' }}>Document index</h2>
            </div>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCat('all')}
                className={`cat-pill ${selectedCat === 'all' ? 'active' : ''}`}
              >All</button>
              {Object.keys(catColors).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
                >{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {filteredDocs.map((doc, i) => (
              <div
                key={doc.id}
                className="surface-card"
                style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', animation: `slideInLeft 0.3s ease ${i * 40}ms both` }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.2)', width: '32px', flexShrink: 0 }}>
                  {doc.id}
                </span>
                <span style={{ flex: 1, fontSize: '13px', color: '#ecedf5', fontWeight: 500 }}>{doc.title}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: catColors[doc.category] || '#e8ff47',
                  background: `${catColors[doc.category]}18` || 'rgba(232,255,71,0.08)',
                  border: `1px solid ${catColors[doc.category]}33` || 'rgba(232,255,71,0.2)',
                  padding: '2px 7px', borderRadius: '4px', flexShrink: 0,
                }}>
                  {doc.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#e8ff47' }}>
                    {Math.round(doc.score * 100)}%
                  </span>
                  <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${doc.score * 100}%`, background: catColors[doc.category] || '#e8ff47', borderRadius: '1px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search history */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>04</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.4px' }}>Your search history</h2>
          </div>
          {searchHistory.length === 0 ? (
            <div className="surface-card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🔍</div>
              <div style={{ fontSize: '13px', color: 'rgba(236,237,245,0.35)', marginBottom: '16px' }}>No searches yet</div>
              <Link href="/search">
                <button className="btn-primary" style={{ height: '36px', fontSize: '12px', padding: '0 18px' }}>
                  Start searching →
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {searchHistory.map((q, i) => (
                <div
                  key={i}
                  className="surface-card"
                  style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="rgba(236,237,245,0.28)" strokeWidth="1"/>
                      <polyline points="6,3 6,6 7.5,7.5" stroke="rgba(236,237,245,0.28)" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: '13px', color: 'rgba(236,237,245,0.6)' }}>{q}</span>
                  </div>
                  <Link href={`/search?q=${encodeURIComponent(q)}`}>
                    <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: 'rgba(236,237,245,0.35)', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.target.style.borderColor = 'rgba(232,255,71,0.3)'; e.target.style.color = '#e8ff47' }}
                      onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.color = 'rgba(236,237,245,0.35)' }}
                    >
                      Search again →
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="surface-card" style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#ecedf5', marginBottom: '4px' }}>
              Ready to search?
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(236,237,245,0.4)' }}>
              All 15 documents indexed and ready in Endee
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/search"><button className="btn-primary">Search now →</button></Link>
            <Link href="/docs"><button className="btn-ghost">API docs</button></Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}