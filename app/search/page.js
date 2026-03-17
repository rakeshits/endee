'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import ResultCard from '@/components/ResultCard'

const SUGGESTED = [
  'neural networks', 'quantum physics', 'black holes',
  'consciousness', 'gene editing', 'climate change',
  'evolution', 'mindfulness',
]

export default function SearchPage() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastQuery, setLastQuery] = useState('')
  const [searchMeta, setSearchMeta] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(async (query) => {
    setIsLoading(true)
    setError(null)
    setResults(null)
    setLastQuery(query)
    setHasSearched(true)
    setSearchMeta(null)
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.results)
      setSearchMeta({ searchTime: data.searchTime, total: data.totalFound })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '52px 32px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '16px', height: '1px', background: '#e8ff47' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em' }}>SEMANTIC ENGINE v2.0</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: '#ecedf5', letterSpacing: '-1px', marginBottom: '6px' }}>
            Search by <span style={{ color: '#e8ff47' }}>meaning</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.35)' }}>
            Ask naturally — the engine understands concepts, not just keywords
          </p>
        </div>

        {/* Search bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={lastQuery} />

        {/* Chips */}
        {!hasSearched && !isLoading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px', marginBottom: '12px' }}>
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => handleSearch(q)}
                style={{ padding: '5px 12px', borderRadius: '7px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(236,237,245,0.35)', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => { e.target.style.borderColor = 'rgba(232,255,71,0.3)'; e.target.style.color = '#e8ff47'; e.target.style.background = 'rgba(232,255,71,0.06)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.color = 'rgba(236,237,245,0.35)'; e.target.style.background = 'var(--surface)'; }}
              >{q}</button>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '52px 0' }}>
            <div style={{ position: 'relative', width: '52px', height: '52px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(232,255,71,0.15)', borderTopColor: '#e8ff47', animation: 'spin 1s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '9px', borderRadius: '50%', border: '1.5px solid rgba(232,255,71,0.08)', borderBottomColor: 'rgba(232,255,71,0.4)', animation: 'spin 1.8s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: '18px', borderRadius: '50%', background: 'rgba(232,255,71,0.1)', display: 'grid', placeItems: 'center', fontSize: '11px', color: '#e8ff47' }}>✦</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#ecedf5', letterSpacing: '-0.3px', marginBottom: '4px' }}>Scanning knowledge base</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>"{lastQuery}"</div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 20px', minWidth: '200px' }}>
              {['tokenizing query', 'computing vectors', 'ranking documents'].map((s, i) => (
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(236,237,245,0.35)' }}>
                <strong style={{ color: 'rgba(236,237,245,0.6)', fontWeight: 500 }}>{results.length} results</strong> for "{lastQuery}"
              </span>
              {searchMeta && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  {searchMeta.searchTime}
                </div>
              )}
            </div>
            {results.map((r, i) => <ResultCard key={r.id} result={r} index={i} />)}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}