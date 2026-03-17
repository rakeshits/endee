<div align="center">

<br />

<img src="https://img.shields.io/badge/semantic.ai-Vector%20Search-7c6dff?style=for-the-badge&labelColor=050508" alt="semantic.ai" />

<br /><br />

# 🔍 AI Semantic Search
### Powered by Endee Vector Database

<p>A production-quality semantic search engine that understands <strong>meaning, context, and intent</strong> — not just keywords.</p>

<br />

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Endee](https://img.shields.io/badge/Endee-Vector_DB-7c6dff?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-green?style=flat-square)

<br />

[🚀 Try Search](#-setup-instructions) · [📖 API Docs](#-api-reference) · [⭐ Star Endee](https://github.com/endee-io/endee) · [🍴 Forked Repo](https://github.com/rakeshits/endee)

<br />

</div>

---

## 📌 Overview

**AI Semantic Search** is a full-stack web application that demonstrates real-world semantic search using **[Endee](https://github.com/endee-io/endee)** as the vector database backend.

Unlike traditional keyword search, this system converts natural language queries into **128-dimensional vectors** and finds conceptually similar documents using **cosine similarity** — even when the documents share no common vocabulary with the query.

> Built as part of the **Tap Academy × Endee.io** evaluation assignment — March 2026.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Semantic Search** | Understands meaning and intent, not just keywords |
| ⚡ **Endee Vector DB** | Real vector similarity search via Docker + npm SDK |
| 🎯 **Ranked Results** | Top 3 results with cosine similarity confidence scores |
| 📊 **Category Filter** | Filter results by technology, science, philosophy, etc. |
| 🕐 **Search History** | Remembers your recent searches locally |
| 📋 **Copy & Share** | Copy results or share search links instantly |
| 📡 **Animated UI** | Radar loader, typing effect, floating orbs, hover animations |
| 📖 **API Docs Page** | Full documentation at `/docs` |
| 📈 **Stats Dashboard** | Analytics overview at `/stats` |
| 🌐 **About Page** | Project overview, timeline and tech stack at `/about` |

---

## 🏗️ System Architecture
```
User Query (Natural Language)
          │
          ▼
┌─────────────────────────┐
│   Next.js Frontend      │  ← React 18 + Tailwind CSS
│   Space Grotesk UI      │     Animations, Typing Effect
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   /api/search Route     │  ← Next.js App Router
│   (Backend Logic)       │     Edge-ready API
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   Text → Vector         │  ← Character frequency
│   Embedding             │     128-dimensional space
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│   Endee Vector DB       │  ← Docker container
│   localhost:8080        │     Cosine similarity
└──────────┬──────────────┘
           │
           ▼
   Ranked Results
   with Scores & Metadata
```

---

## 🧠 How Endee is Used

| Property | Value |
|---|---|
| **Index name** | `semantic_search` |
| **Dimensions** | `128` |
| **Space type** | `cosine` |
| **Documents** | 15 knowledge nodes |
| **SDK** | Official `endee` npm package |
| **Query** | `index.query({ vector, topK: 3 })` |
| **Host** | `http://localhost:8080` |

### Integration Code
```javascript
import { Endee } from 'endee'

// 1. Connect to Endee
const client = new Endee()
client.setBaseUrl('http://localhost:8080/api/v1')

// 2. Create index
await client.createIndex({
  name: 'semantic_search',
  dimension: 128,
  spaceType: 'cosine',
})

// 3. Upsert documents as vectors
const index = await client.getIndex('semantic_search')
await index.upsert(documents.map(doc => ({
  id: doc.id,
  vector: textToVector(doc.title + ' ' + doc.snippet),
  meta: { title, snippet, tags, category }
})))

// 4. Query with vector similarity
const results = await index.query({
  vector: textToVector(userQuery),
  topK: 3
})
// results[0].similarity = cosine similarity score (0-1)
// results[0].meta = document metadata
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 14, React 18 | UI & routing |
| **Styling** | Tailwind CSS | Utility styling |
| **Typography** | Space Grotesk, Plus Jakarta Sans, Space Mono | Premium fonts |
| **Backend** | Next.js API Routes | Server logic |
| **Vector DB** | **Endee** (Docker) | Semantic search |
| **Embeddings** | Character frequency vectors (128-dim) | Text → vector |
| **SDK** | Official `endee` npm package | Endee integration |

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Docker Desktop

### 1. Clone the repository
```bash
git clone https://github.com/rakeshits/endee
cd endee
```

### 2. Start Endee Vector Database
```bash
docker run -d -p 8080:8080 \
  -e NDD_AUTH_TOKEN="" \
  --name endee-server \
  endeeio/endee-server:latest
```

> Verify it's running: `docker ps` — you should see `endee-server`

### 3. Install dependencies
```bash
npm install
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Open in browser
```
http://localhost:3000
```

> On first search, the app automatically creates the Endee index and upserts all 15 documents as vectors.

---

## 📁 Project Structure
```
📦 endee/
├── 📂 app/
│   ├── 📄 page.js                 # Landing page with hero
│   ├── 📂 search/
│   │   └── 📄 page.js             # Search interface
│   ├── 📂 about/
│   │   └── 📄 page.js             # About & timeline
│   ├── 📂 stats/
│   │   └── 📄 page.js             # Analytics dashboard
│   ├── 📂 docs/
│   │   └── 📄 page.js             # API documentation
│   └── 📂 api/search/
│       └── 📄 route.js            # Endee vector search API
├── 📂 components/
│   ├── 📄 Navbar.js               # Sticky navigation
│   ├── 📄 Footer.js               # Site footer
│   ├── 📄 SearchBar.js            # Search input component
│   └── 📄 ResultCard.js           # Result card with actions
├── 📄 app/globals.css             # Design system & animations
├── 📄 tailwind.config.js
├── 📄 package.json
└── 📄 README.md
```

---

## 🔍 API Reference

### Endpoint
```
GET /api/search?query=<string>
```

### Example Request
```bash
curl "http://localhost:3000/api/search?query=neural+networks"
```

### Example Response
```json
{
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
}
```

### Response Fields

| Field | Type | Description |
|---|---|---|
| `query` | string | Original search query |
| `results` | array | Top 3 ranked results |
| `score` | number | Cosine similarity (0–1) |
| `source` | string | `endee` or `fallback` |
| `engine` | string | Search engine used |
| `searchTime` | string | Query processing time |

---

## 📊 Knowledge Base

15 curated documents across 7 categories:

| Category | Documents |
|---|---|
| 🔵 Technology | Neural Networks, Quantum Computing, LLMs, Blockchain, Semantic Search |
| 🟢 Science | CRISPR, Evolutionary Biology, Renewable Energy |
| 🟣 Space | Black Holes, Mars Missions |
| 🩵 Health | Mindfulness, Human Microbiome |
| 🟡 Philosophy | Consciousness |
| 🟤 Nature | Climate Change |
| 🔴 History | Ancient Rome |

---

## 🗺️ Pages

| Page | Route | Description |
|---|---|---|
| 🏠 Home | `/` | Hero, stats, features, how it works |
| 🔍 Search | `/search` | Main search interface |
| 📖 About | `/about` | Project overview & timeline |
| 📈 Stats | `/stats` | Analytics dashboard |
| 📄 Docs | `/docs` | Full API documentation |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--p` | `#7c6dff` | Primary purple accent |
| `--pk` | `#ff6b9d` | Pink accent |
| `--g` | `#00d4aa` | Green / success |
| `--bg` | `#050508` | Page background |
| `--tx` | `#f0eeff` | Primary text |
| Display font | Space Grotesk | Headings |
| Body font | Plus Jakarta Sans | UI text |
| Mono font | Space Mono | Labels, code |

---

## 🔗 Links

| Resource | URL |
|---|---|
| ⭐ Star Endee | [github.com/endee-io/endee](https://github.com/endee-io/endee) |
| 🍴 Forked Repo | [github.com/rakeshits/endee](https://github.com/rakeshits/endee) |
| 📖 Endee Docs | [docs.endee.io](https://docs.endee.io) |
| 🌐 Endee Website | [endee.io](https://endee.io) |

---

## 🏗️ Build Timeline
```
Day 1 AM  →  Forked Endee repo, setup Next.js + Tailwind CSS
Day 1 PM  →  Built semantic search engine with 15 documents
Day 2 AM  →  Integrated Endee vector DB via Docker + npm SDK
Day 2 PM  →  Built full UI — hero, search, about, stats, docs
Day 2 PM  →  Added animations, typing effect, search history
Day 2 EOD →  Pushed to GitHub, submitted to Tap Academy
```

---

<div align="center">

<br />

Built with ❤️ using **[Endee Vector Database](https://github.com/endee-io/endee)**

*Tap Academy × Endee.io Evaluation Assignment — March 2026*

<br />

</div>
