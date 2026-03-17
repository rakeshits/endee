'use client'

import { useState, useRef, useEffect } from 'react'

export default function SearchBar({ onSearch, isLoading, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setQuery(initialValue) }, [initialValue])

  const handleSubmit = () => {
    if (!query.trim()) { setError('Enter a query to continue.'); return }
    setError('')
    onSearch(query.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') { setQuery(''); setError('') }
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Input */}
      <div style={{
        background: 'var(--surface)', border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px', display: 'flex', alignItems: 'center',
        padding: '8px 8px 8px 16px', gap: '10px', transition: 'all 0.2s',
        marginBottom: '12px',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'rgba(232,255,71,0.35)'}
      onBlur={e => e.currentTarget.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ color: 'rgba(236,237,245,0.3)', flexShrink: 0 }}>
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
          <line x1="9.5" y1="9.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); if (error) setError('') }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. how do machines learn to think?"
          disabled={isLoading}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: '15px', fontWeight: 400, color: '#ecedf5',
            fontFamily: 'var(--font-body)', caretColor: '#e8ff47',
          }}
        />

        {query && !isLoading && (
          <button onClick={() => { setQuery(''); setError(''); inputRef.current?.focus() }}
            style={{ background: 'none', border: 'none', color: 'rgba(236,237,245,0.3)', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', fontSize: '14px', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'rgba(236,237,245,0.7)'}
            onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.3)'}
          >✕</button>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            height: '36px', padding: '0 18px', borderRadius: '9px',
            background: isLoading ? 'rgba(232,255,71,0.4)' : '#e8ff47',
            color: '#07080d', border: 'none',
            fontSize: '13px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.2px',
            transition: 'all 0.15s', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#f0ff6e' }}
          onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = '#e8ff47' }}
        >
          {isLoading ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite' }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#07080d" strokeWidth="1.5" strokeOpacity="0.3"/>
                <path d="M6.5 1.5 A5 5 0 0 1 11.5 6.5" stroke="#07080d" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Searching
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <line x1="2" y1="6.5" x2="11" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <polyline points="7,2.5 11,6.5 7,10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Search
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fca5a5', marginBottom: '8px' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#f87171" strokeWidth="1.2"/>
            <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="6" cy="8.5" r="0.6" fill="#f87171"/>
          </svg>
          {error}
        </div>
      )}

      {/* Hints */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '4px' }}>
        {[['Enter', 'search'], ['Esc', 'clear']].map(([k, a]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.2)' }}>
            <span style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px', color: 'rgba(236,237,245,0.25)' }}>{k}</span>
            {a}
          </div>
        ))}
      </div>
    </div>
  )
}