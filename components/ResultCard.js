'use client'

import { useState } from 'react'

const icons = {
  technology: '⚡', science: '🔬', philosophy: '🧠',
  history: '📜', nature: '🌿', health: '🧘',
  space: '🌌', default: '◇'
}

export default function ResultCard({ result, index }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const pct = Math.round(result.score * 100)
  const tier = result.score >= 0.72 ? 0 : result.score >= 0.42 ? 1 : 2

  const pillStyles = [
    { bg: 'rgba(232,255,71,0.1)',   color: '#e8ff47', border: '1px solid rgba(232,255,71,0.2)',  label: 'Top match' },
    { bg: 'rgba(79,139,255,0.1)',   color: '#93b8ff', border: '1px solid rgba(79,139,255,0.2)',  label: 'Relevant'  },
    { bg: 'rgba(255,255,255,0.05)', color: 'rgba(236,237,245,0.4)', border: '1px solid rgba(255,255,255,0.07)', label: 'Related' },
  ]

  const barColors = [
    'linear-gradient(90deg, #e8ff47, #c8f060)',
    'linear-gradient(90deg, #4f8bff, #93b8ff)',
    'rgba(255,255,255,0.2)',
  ]

  const pill = pillStyles[tier]
  const delay = index * 110

  // Copy snippet to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${result.title}\n\n${result.snippet}\n\nTags: ${result.tags.join(', ')}`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this:', `${result.title} — ${result.snippet}`)
    }
  }

  // Share this result
  const handleShare = async () => {
    const text = `${result.title}: ${result.snippet}`
    try {
      if (navigator.share) {
        await navigator.share({ title: result.title, text, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(text)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {}
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px', padding: '20px', marginBottom: '10px',
        transition: 'all 0.2s', cursor: 'default',
        animation: `cardIn 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
        e.currentTarget.style.background = 'var(--surface2)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.background = 'var(--surface)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', flexShrink: 0 }}>
            0{index + 1}
          </span>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>
            {icons[result.category] || icons.default}
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#ecedf5', letterSpacing: '-0.3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {result.title}
          </h3>
        </div>
        <span style={{ flexShrink: 0, padding: '2px 9px', borderRadius: '5px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em', fontFamily: 'var(--font-mono)', background: pill.bg, color: pill.color, border: pill.border }}>
          {pill.label}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '12px' }} />

      {/* Snippet */}
      <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.55)', lineHeight: 1.65, marginBottom: '14px' }}>
        {result.snippet}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>

        {/* Left — tags + endee badge */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
          {result.tags?.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(236,237,245,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '2px 7px', borderRadius: '5px', fontFamily: 'var(--font-mono)' }}>
              {tag}
            </span>
          ))}
          {result.source === 'endee' && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.05)', padding: '2px 7px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              ⚡ Endee
            </span>
          )}
        </div>

        {/* Right — score + action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="tooltip"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', color: copied ? '#4ade80' : 'rgba(236,237,245,0.3)', transition: 'all 0.15s', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ecedf5' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = copied ? '#4ade80' : 'rgba(236,237,245,0.3)' }}
          >
            <span className="tooltip-text">{copied ? 'Copied!' : 'Copy result'}</span>
            {copied ? (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <polyline points="1.5,5.5 4,8 9,2" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="1" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                <path d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="tooltip"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px', color: shared ? '#4ade80' : 'rgba(236,237,245,0.3)', transition: 'all 0.15s', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ecedf5' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = shared ? '#4ade80' : 'rgba(236,237,245,0.3)' }}
          >
            <span className="tooltip-text">{shared ? 'Copied!' : 'Share result'}</span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="9" cy="2" r="1.5" stroke="currentColor" strokeWidth="1"/>
              <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="1"/>
              <circle cx="2" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1"/>
              <line x1="3.4" y1="4.8" x2="7.6" y2="2.7" stroke="currentColor" strokeWidth="1"/>
              <line x1="3.4" y1="6.2" x2="7.6" y2="8.3" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {shared ? 'Copied' : 'Share'}
          </button>

          {/* Score bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, color: pill.color }}>
              {pct}%
            </span>
            <div style={{ width: '64px', height: '2px', borderRadius: '1px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '1px', width: `${pct}%`, background: barColors[tier], animation: `grow 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + 250}ms both` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}