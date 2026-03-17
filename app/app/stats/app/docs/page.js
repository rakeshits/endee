'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const SECTIONS = [
  { id: 'overview',     label: 'Overview'          },
  { id: 'quickstart',   label: 'Quick Start'        },
  { id: 'endpoint',     label: 'API Endpoint'       },
  { id: 'request',      label: 'Request'            },
  { id: 'response',     label: 'Response'           },
  { id: 'examples',     label: 'Examples'           },
  { id: 'errors',       label: 'Error Handling'     },
  { id: 'endee',        label: 'Endee Integration'  },
]

function CodeBlock({ code, language = 'json' }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none', borderRadius: '10px 10px 0 0', padding: '8px 16px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.3)', letterSpacing: '0.08em' }}>{language}</span>
        <button
          onClick={handleCopy}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '10px', color: copied ? '#4ade80' : 'rgba(236,237,245,0.3)', transition: 'color 0.15s' }}
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="code-block" style={{ borderRadius: '0 0 10px 10px', marginBottom: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {code}
      </pre>
    </div>
  )
}

function Section({ id, title, num, children }) {
  return (
    <section id={id} style={{ marginBottom: '56px', scrollMarginTop: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)' }}>{num}</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#ecedf5', letterSpacing: '-0.5px' }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Param({ name, type, required, desc }) {
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#e8ff47', background: 'rgba(232,255,71,0.08)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>{name}</code>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#93b8ff', background: 'rgba(79,139,255,0.08)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>{type}</code>
      {required && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#f87171', background: 'rgba(248,113,113,0.08)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>required</span>}
      <span style={{ fontSize: '13px', color: 'rgba(236,237,245,0.45)', lineHeight: 1.6 }}>{desc}</span>
    </div>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 32px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px' }}>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '80px', height: 'fit-content' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '12px' }}>ON THIS PAGE</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {SECTIONS.map(s => (
              
                key={s.id}
                href={`#${s.id}`}
                className={`docs-nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Quick links */}
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '12px' }}>QUICK LINKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link href="/search" style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#e8ff47'}
                onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.4)'}
              >→ Try Search</Link>
              <Link href="/stats" style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#e8ff47'}
                onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.4)'}
              >→ View Stats</Link>
              <a href="https://docs.endee.io" target="_blank" style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#e8ff47'}
                onMouseLeave={e => e.target.style.color = 'rgba(236,237,245,0.4)'}
              >→ Endee Docs ↗</a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div>

          {/* Page header */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '1px', background: '#e8ff47' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47', letterSpacing: '0.1em' }}>API REFERENCE</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: '#ecedf5', letterSpacing: '-1.5px', marginBottom: '12px' }}>
              API Documentation
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(236,237,245,0.45)', lineHeight: 1.7, maxWidth: '560px' }}>
              The semantic search API powered by Endee vector database. Send natural language queries and receive ranked results with similarity scores.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              {[['GET', '#4ade80'], ['REST', '#93b8ff'], ['JSON', '#e8ff47']].map(([label, color]) => (
                <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color, background: `${color}18`, border: `1px solid ${color}33`, padding: '3px 10px', borderRadius: '5px' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <Section id="overview" title="Overview" num="01">
            <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.75, marginBottom: '16px' }}>
              The semantic search API converts text queries into 128-dimensional vectors and performs cosine similarity search against the Endee vector database. Results are ranked by similarity score and returned with metadata.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Base URL',     value: 'http://localhost:3000' },
                { label: 'Endee Host',   value: 'http://localhost:8080'  },
                { label: 'Auth',         value: 'None required'           },
                { label: 'Format',       value: 'JSON'                    },
              ].map(item => (
                <div key={item.label} className="surface-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)' }}>{item.label}</span>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47' }}>{item.value}</code>
                </div>
              ))}
            </div>
          </Section>

          {/* Quick Start */}
          <Section id="quickstart" title="Quick Start" num="02">
            <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>
              Get results in seconds. Make a GET request with your query:
            </p>
            <CodeBlock language="bash" code={`curl "http://localhost:3000/api/search?query=how+do+neural+networks+learn"`} />
            <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>
              Or using JavaScript fetch:
            </p>
            <CodeBlock language="javascript" code={`const response = await fetch(
  '/api/search?query=how+do+neural+networks+learn'
)
const data = await response.json()
console.log(data.results) // Top 3 ranked results`} />
          </Section>

          {/* Endpoint */}
          <Section id="endpoint" title="API Endpoint" num="03">
            <div className="surface-card" style={{ padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 10px', borderRadius: '6px' }}>GET</span>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#ecedf5' }}>/api/search</code>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.45)', lineHeight: 1.7 }}>
              Returns the top 3 semantically similar documents from the Endee vector index for a given query string.
            </p>
          </Section>

          {/* Request */}
          <Section id="request" title="Request Parameters" num="04">
            <div className="surface-card" style={{ padding: '0 20px' }}>
              <Param name="query" type="string" required desc="The search query in natural language. Converted to a 128-dim vector and matched against the Endee index." />
            </div>
            <div style={{ marginTop: '16px' }}>
              <CodeBlock language="bash" code={`# Basic query
GET /api/search?query=quantum+computing

# Natural language query  
GET /api/search?query=how+does+the+brain+work

# Multi-word query
GET /api/search?query=effects+of+climate+change+on+oceans`} />
            </div>
          </Section>

          {/* Response */}
          <Section id="response" title="Response Format" num="05">
            <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>
              All responses return JSON with the following structure:
            </p>
            <CodeBlock language="json" code={`{
  "query": "neural networks",
  "results": [
    {
      "id": "doc1",
      "title": "Neural Networks & Deep Learning",
      "snippet": "Artificial neural networks are computing systems...",
      "tags": ["AI", "machine learning", "neural"],
      "category": "technology",
      "score": 0.923,
      "source": "endee"
    },
    {
      "id": "doc7",
      "title": "Large Language Models",
      "snippet": "LLMs like GPT-4 are trained on massive datasets...",
      "tags": ["AI", "LLM", "NLP"],
      "category": "technology",
      "score": 0.841,
      "source": "endee"
    },
    {
      "id": "doc13",
      "title": "Semantic Search & Vector Embeddings",
      "snippet": "Semantic search understands the meaning...",
      "tags": ["search", "AI", "NLP"],
      "category": "technology",
      "score": 0.798,
      "source": "endee"
    }
  ],
  "totalFound": 3,
  "searchTime": "28ms",
  "engine": "Endee Vector Database",
  "endee": {
    "index": "semantic_search",
    "dimensions": 128,
    "spaceType": "cosine",
    "host": "localhost:8080"
  }
}`} />

            {/* Response fields */}
            <div className="surface-card" style={{ padding: '0 20px' }}>
              <Param name="query"       type="string"  desc="The original search query string" />
              <Param name="results"     type="array"   desc="Array of top 3 ranked result objects" />
              <Param name="totalFound"  type="number"  desc="Number of results returned (max 3)" />
              <Param name="searchTime"  type="string"  desc="Time taken to process the query" />
              <Param name="engine"      type="string"  desc="Search engine used — Endee or fallback" />
              <Param name="endee"       type="object"  desc="Endee vector database metadata" />
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(236,237,245,0.28)', letterSpacing: '0.1em', marginBottom: '12px' }}>RESULT OBJECT FIELDS</div>
              <div className="surface-card" style={{ padding: '0 20px' }}>
                <Param name="id"       type="string" desc="Unique document identifier" />
                <Param name="title"    type="string" desc="Document title" />
                <Param name="snippet"  type="string" desc="Short description of the document" />
                <Param name="tags"     type="array"  desc="Relevant topic tags" />
                <Param name="category" type="string" desc="Document category (technology, science, etc.)" />
                <Param name="score"    type="number" desc="Cosine similarity score from Endee (0 to 1)" />
                <Param name="source"   type="string" desc="endee (vector search) or fallback (keyword)" />
              </div>
            </div>
          </Section>

          {/* Examples */}
          <Section id="examples" title="Examples" num="06">
            {[
              { title: 'Search for AI topics',     query: 'machine learning algorithms',    },
              { title: 'Natural language question', query: 'what happens inside black holes' },
              { title: 'Topic exploration',         query: 'human consciousness and brain'   },
            ].map(ex => (
              <div key={ex.title} style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#ecedf5', marginBottom: '8px' }}>{ex.title}</div>
                <CodeBlock language="javascript" code={`const res = await fetch('/api/search?query=${encodeURIComponent(ex.query)}')
const { results, engine, searchTime } = await res.json()

console.log(\`Engine: \${engine}\`)
console.log(\`Time: \${searchTime}\`)
results.forEach(r => {
  console.log(\`\${r.title} — \${Math.round(r.score * 100)}% match\`)
})`} />
              </div>
            ))}
          </Section>

          {/* Errors */}
          <Section id="errors" title="Error Handling" num="07">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {[
                { code: '400', message: 'Query parameter is required', desc: 'No query string was provided' },
                { code: '500', message: 'Internal server error',        desc: 'Unexpected server-side error'  },
              ].map(err => (
                <div key={err.code} className="surface-card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', padding: '2px 10px', borderRadius: '5px', flexShrink: 0 }}>
                    {err.code}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ecedf5', marginBottom: '2px' }}>{err.message}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(236,237,245,0.4)' }}>{err.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <CodeBlock language="json" code={`// Error response format
{
  "error": "Query parameter is required"
}`} />
          </Section>

          {/* Endee Integration */}
          <Section id="endee" title="Endee Integration" num="08">
            <p style={{ fontSize: '14px', color: 'rgba(236,237,245,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
              This API uses Endee as the vector database backend. Here's exactly how the integration works:
            </p>
            <CodeBlock language="javascript" code={`import { Endee } from 'endee'

// 1. Connect to Endee
const client = new Endee()
client.setBaseUrl('http://localhost:8080/api/v1')

// 2. Create index (first time only)
await client.createIndex({
  name: 'semantic_search',
  dimension: 128,
  spaceType: 'cosine',
})

// 3. Convert text to 128-dim vector
function textToVector(text, dim = 128) {
  const vec = new Array(dim).fill(0)
  const str = text.toLowerCase()
  for (let i = 0; i < str.length; i++) {
    vec[str.charCodeAt(i) % dim] += 1
  }
  const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1
  return vec.map(v => v / mag)
}

// 4. Upsert documents into Endee
const index = await client.getIndex('semantic_search')
await index.upsert(documents.map(doc => ({
  id: doc.id,
  vector: textToVector(doc.title + ' ' + doc.snippet),
  meta: { title: doc.title, snippet: doc.snippet, tags: doc.tags }
})))

// 5. Query with cosine similarity
const results = await index.query({
  vector: textToVector(userQuery),
  topK: 3
})
// results[0].similarity = cosine similarity score (0-1)
// results[0].meta = document metadata`} />

            <div className="surface-card" style={{ padding: '20px', borderColor: 'rgba(232,255,71,0.15)' }}>
              <div style={{ display: 'flex', items: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>⚡</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#e8ff47' }}>Fallback mode</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.45)', lineHeight: 1.65 }}>
                If Endee is not running, the API automatically falls back to a keyword-based scoring engine. This ensures the app always works — even without Docker running. Results will show <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8ff47' }}>source: "fallback"</code> instead of <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4ade80' }}>source: "endee"</code>.
              </p>
            </div>
          </Section>

          {/* Bottom CTA */}
          <div className="surface-card" style={{ padding: '28px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#ecedf5', marginBottom: '8px' }}>
              Ready to try it?
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(236,237,245,0.4)', marginBottom: '20px' }}>
              The API is live and ready to use
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/search"><button className="btn-primary">Try search UI →</button></Link>
              <Link href="/stats"><button className="btn-ghost">View stats</button></Link>
              <a href="https://docs.endee.io" target="_blank">
                <button className="btn-ghost">Endee docs ↗</button>
              </a>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}