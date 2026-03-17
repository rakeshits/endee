'use client'

import { useState, useCallback, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ResultCard from '@/components/ResultCard'

const SUGGESTED = [
  'neural networks', 'quantum physics', 'black holes',
  'consciousness', 'gene editing', 'climate change',
  'evolution', 'mindfulness', 'blockchain', 'spacetime',
]

const CATEGORIES = ['All', 'technology', 'science', 'philosophy', 'space', 'health', 'nature', 'history']

export default function SearchPage() {
  const [results, setResults]             = useState(null)
  const [filtered, setFiltered]           = useState(null)
  const [isLoading, setIsLoading]         = useState(false)
  const [error, setError]                 = useState(null)
  const [lastQuery, setLastQuery]         = useState('')
  const [searchMeta, setSearchMeta]       = useState(null)
  const [hasSearched, setHasSearched]     = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [history, setHistory]             = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('search_history') || '[]')
      setHistory(saved)
    } catch {}
  }, [])

  const saveHistory = (query) => {
    try {
      const prev = JSON.parse(localStorage.getItem('search_history') || '[]')
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 6)
      localStorage.setItem('search_history', JSON.stringify(updated))
      setHistory(updated)
    } catch {}
  }

  useEffect(() => {
    if (!results) return
    if (activeCategory === 'All') {
      setFiltered(results)
    } else {
      setFiltered(results.filter(r => r.category === activeCategory))
    }
  }, [activeCategory, results])

  const handleSearch = useCallback(async (query) => {
    setIsLoading(true)
    setError(null)
    setResults(null)
    setFiltered(null)
    setLastQuery(query)
    setHasSearched(true)
    setSearchMeta(null)
    setActiveCategory('All')
    saveHistory(query)
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.results)
      setFiltered(data.results)
      setSearchMeta({ searchTime: data.searchTime, engine: data.engine })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/search?q=${encodeURIComponent(lastQuery)}`
      await navigator.clipboard.writeText(url)
      const toast = document.getElementById('global-toast')
      if (toast) {
        toast.style.display = 'block'
        setTimeout(() => { toast.style.display = 'none' }, 2500)
      }
    } catch {}
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,109,255,0.08) 0%, transparent 70%)', top: '-100px', right: '-150px', animationDuration: '10s' }} />
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%)', bottom: '-100px', left: '-100px', animationDuration: '12s', animationDelay: '3s' }} />
        <div className="grid-bg" />
      </div>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', padding: '52px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '16px', height: '1px', background: 'linear-gradient(90deg, var(--p), var(--pk))' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--p)', letterSpacing: '0.15em' }}>
              SEMANTIC ENGINE v2.0
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 700, color: 'var(--tx)', letterSpacing: '-1px', marginBottom: '6px' }}>
            Search by{' '}
            <span className="grad-text">meaning</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--tx3)', lineHeight: 1.6 }}>
            Ask naturally — the engine understands concepts, not just keywords
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={lastQuery} />

        {/* Search History */}
        {!hasSearched && history.length > 0 && (
          <div style={{ marginTop: '20px', marginBottom: '12px', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.1em' }}>RECENT SEARCHES</span>
              <button onClick={() => { localStorage.removeItem('search_history'); setHistory([]) }}
                style={{ background: 'none', border: 'none', fontSize: '10px', color: 'var(--tx3)', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'var(--p)'}
                onMouseLeave={e => e.target.style.color = 'var(--tx3)'}
              >Clear all</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {history.map(q => (
                <button key={q} className="history-chip" onClick={() => handleSearch(q)}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
                    <polyline points="5,2.5 5,5 6.5,6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {!hasSearched && !isLoading && (
          <div style={{ marginTop: history.length > 0 ? '8px' : '20px', marginBottom: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)', letterSpacing: '0.1em', marginBottom: '10px' }}>
              SUGGESTED QUERIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {SUGGESTED.map(q => (
                <button key={q} className="query-chip" onClick={() => handleSearch(q)}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '52px 0', animation: 'fadeIn 0.3s ease' }}>
            <div className="radar-wrap">
              <div className="radar-ping" />
              <div className="radar-r1" />
              <div className="radar-r2" />
              <div className="radar-r3" />
              <div className="radar-center">✦</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--tx)', letterSpacing: '-0.3px', marginBottom: '4px' }}>
                Scanning knowledge base
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--tx3)' }}>
                "{lastQuery}"
              </div>
            </div>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: '14px', padding: '14px 20px', minWidth: '220px' }}>
              {['tokenizing query...', 'computing vectors...', 'ranking results...'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '3px 0' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--p)', animation: `pulse 1.4s ${i * 0.35}s infinite`, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '14px 18px', marginTop: '16px', fontSize: '13px', color: '#fca5a5', animation: 'fadeIn 0.3s ease' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1.3"/>
              <line x1="7" y1="4" x2="7" y2="7.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="7" cy="10" r="0.7" fill="#f87171"/>
            </svg>
            {error}
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <div style={{ marginTop: '24px', animation: 'fadeIn 0.4s ease' }}>

            {/* Meta bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid var(--b1)', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--tx3)' }}>
                  <strong style={{ color: 'var(--tx2)', fontWeight: 500 }}>{filtered?.length} results</strong>
                  {' '}for "{lastQuery}"
                </span>
                {searchMeta?.engine === 'Endee Vector Database' && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--g)', border: '1px solid rgba(0,212,170,0.25)', background: 'rgba(0,212,170,0.06)', padding: '2px 7px', borderRadius: '5px' }}>
                    ⚡ Endee
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {searchMeta && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--tx3)' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--g)', boxShadow: '0 0 6px var(--g)' }} />
                    {searchMeta.searchTime}
                  </div>
                )}
                <button onClick={handleShare}
                  style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: '7px', padding: '5px 10px', cursor: 'pointer', fontSize: '11px', color: 'var(--tx3)', fontFamily: 'var(--font-mono)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,109,255,0.4)'; e.currentTarget.style.color = 'var(--p2)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--b1)'; e.currentTarget.style.color = 'var(--tx3)' }}
                >
                  ⎘ Share
                </button>
              </div>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Cards */}
            {filtered && filtered.length === 0 ? (
              <div style={{ background: 'var(--s1)', border: '1px solid var(--b1)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>◇</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--tx3)', marginBottom: '6px' }}>
                  No results in this category
                </div>
                <div style={{ fontSize: '12px', color: 'var(--tx3)', opacity: 0.6 }}>
                  Try selecting a different filter
                </div>
              </div>
            ) : (
              filtered?.map((r, i) => (
                <ResultCard key={r.id} result={r} index={i} />
              ))
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}