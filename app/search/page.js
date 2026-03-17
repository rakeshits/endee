'use client'

import { useState, useCallback, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ResultCard from '@/components/ResultCard'

const SUGGESTED = [
  'neural networks', 'quantum physics', 'black holes',
  'consciousness', 'gene editing', 'climate change',
  'evolution', 'mindfulness',
]

const CATEGORIES = ['All', 'technology', 'science', 'philosophy', 'space', 'health', 'nature', 'history']

export default function SearchPage() {
  const [results, setResults]       = useState(null)
  const [filtered, setFiltered]     = useState(null)
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState(null)
  const [lastQuery, setLastQuery]   = useState('')
  const [searchMeta, setSearchMeta] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [history, setHistory]       = useState([])
  const [copied, setCopied]         = useState(false)

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('search_history') || '[]')
      setHistory(saved)
    } catch {}
  }, [])

  // Save to history
  const saveToHistory = (query) => {
    try {
      const prev = JSON.parse(localStorage.getItem('search_history') || '[]')
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 5)
      localStorage.setItem('search_history', JSON.stringify(updated))
      setHistory(updated)
    } catch {}
  }

  // Filter by category
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
    saveToHistory(query)

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.results)
      setFiltered(data.results)
      setSearchMeta({ searchTime: data.searchTime, total: data.totalFound, engine: data.engine })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Share results link
  const handleShare = async () => {
    const url = `${window.location.origin}/search?q=${encodeURIComponent(lastQuery)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem('search_history')
    setHistory([])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '52px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '16px', height: '1px', background: '#e8ff47' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em' }}>
              SEMANTIC ENGINE v2.0
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: '#ecedf5', letterSpacing: '-1px', marginBottom: '6px' }}>
            Search by <span style={{ color: '#e8ff47' }}>meaning</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.35)' }}>
            Ask naturally — the engine understands concepts, not just keywords
          </p>
        </div>

        {/* Search bar */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          initialValue={lastQuery}
        />

        {/* Search History */}
        {!hasSearched && history.length > 0 && (
          <div style={{ marginTop: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em' }}>
                RECENT SEARCHES
              </span>
              <button
                onClick={clearHistory}
                style={{ background: 'none', border: 'none', fontSize: '11px', color: 'rgba(236,237,245,0.28)', cursor: 'pointer', fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#e8ff47'}
                onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.28)'}
              >
                Clear all
              </button>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '10px' }}>
              SUGGESTED QUERIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SUGGESTED.map(q => (
                <button
                  key={q}
                  onClick={() => handleSearch(q)}
                  style={{ padding: '5px 12px', borderRadius: '7px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(236,237,245,0.35)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'rgba(232,255,71,0.3)'; e.target.style.color = '#e8ff47'; e.target.style.background = 'rgba(232,255,71,0.06)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.color = 'rgba(236,237,245,0.35)'; e.target.style.background = 'var(--surface)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading — Radar animation */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '52px 0' }}>
            <div className="radar-container">
              <div className="radar-ping" />
              <div className="radar-ring" />
              <div className="radar-ring-2" />
              <div className="radar-ring-3" />
              <div className="radar-center">✦</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#ecedf5', letterSpacing: '-0.3px', marginBottom: '4px' }}>
                Scanning knowledge base
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>
                "{lastQuery}"
              </div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 20px', minWidth: '220px' }}>
              {['tokenizing query...', 'computing vectors...', 'ranking documents...'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '3px 0' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e8ff47', animation: `pulse 1.4s ${i * 0.35}s infinite` }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.35)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', padding: '12px 16px', marginTop: '16px', fontSize: '13px', color: '#fca5a5' }}>
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
          <div style={{ marginTop: '24px' }}>

            {/* Meta bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(236,237,245,0.35)' }}>
                  <strong style={{ color: 'rgba(236,237,245,0.6)', fontWeight: 500 }}>{filtered?.length} results</strong> for "{lastQuery}"
                </span>
                {searchMeta?.engine === 'Endee Vector Database' && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                    ⚡ Endee
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {searchMeta && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                    {searchMeta.searchTime}
                  </div>
                )}
                {/* Share button */}
                <button
                  onClick={handleShare}
                  className="tooltip"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '7px', padding: '5px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: copied ? '#4ade80' : 'rgba(236,237,245,0.4)', transition: 'all 0.15s', fontFamily: 'var(--font-mono)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <span className="tooltip-text">{copied ? 'Copied!' : 'Share results'}</span>
                  {copied ? '✓ Copied' : '⎘ Share'}
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
                  {cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Result cards */}
            {filtered && filtered.length === 0 ? (
              <div className="surface-card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>◇</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'rgba(236,237,245,0.35)', marginBottom: '6px' }}>
                  No results in this category
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(236,237,245,0.2)' }}>
                  Try selecting a different category filter
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