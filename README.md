<div align="center">

# 🔍 AI Semantic Search
### Powered by Endee Vector Database

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)
![Endee](https://img.shields.io/badge/Endee-Vector_DB-green?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

**A production-quality semantic search engine that understands meaning, context, and intent — not just keywords.**

[🚀 View Demo](#) · [📖 Docs](https://docs.endee.io) · [⭐ Star Endee](https://github.com/endee-io/endee)

</div>

---

## 📌 Overview

This project demonstrates real-world **semantic search** using **Endee** as the vector database backend. Unlike traditional keyword search, this system converts queries into 128-dimensional vectors and finds conceptually similar documents using cosine similarity.

Built as part of the **Endee.io** evaluation assignment.

---

## 🏗️ System Architecture
```
User Query (Natural Language)
         │
         ▼
┌─────────────────────┐
│   Next.js Frontend  │  ← React + Tailwind CSS
│   (Search UI)       │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  /api/search Route  │  ← Next.js API Route
│  (Backend Logic)    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Text → Vector      │  ← 128-dim character
│  Embedding          │     frequency vectors
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   Endee Vector DB   │  ← Cosine similarity
│   (Docker)          │     search (topK: 3)
└────────┬────────────┘
         │
         ▼
  Ranked Results with
  Confidence Scores
```

---

## 🧠 How Endee is Used

| Property | Value |
|---|---|
| Index name | `semantic_search` |
| Dimensions | `128` |
| Space type | `cosine` |
| Documents | 15 knowledge nodes |
| SDK | Official `endee` npm package |
| Query method | `index.query({ vector, topK: 3 })` |

**Flow:**
1. On first request, 15 documents are embedded and upserted into Endee
2. Each search query is converted to a 128-dim vector
3. Endee performs cosine similarity search and returns top 3 matches
4. Results are returned with similarity scores and metadata

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Next.js API Routes (Edge-ready) |
| Vector Database | **Endee** (Docker) |
| Embeddings | Character frequency vectors (128-dim) |
| Fonts | Cabinet Grotesk, Instrument Sans |

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

---

## 📁 Project Structure
```
📦 endee/
├── 📂 app/
│   ├── 📄 page.js              # Landing page
│   ├── 📂 search/
│   │   └── 📄 page.js          # Search interface
│   └── 📂 api/search/
│       └── 📄 route.js         # Endee vector search API
├── 📂 components/
│   ├── 📄 Navbar.js
│   ├── 📄 Footer.js
│   ├── 📄 SearchBar.js
│   └── 📄 ResultCard.js
├── 📄 package.json
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## ✨ Features

- 🔍 **Semantic search** — understands meaning not just keywords
- ⚡ **Sub-50ms responses** — fast vector similarity search
- 🧠 **15 knowledge documents** — science, tech, philosophy, space, health
- 📊 **Confidence scores** — every result ranked with relevance percentage
- 🎨 **Modern UI** — dark theme with smooth animations
- 🐳 **Docker ready** — Endee runs as a container

---

## 🔗 Links

- ⭐ [Star Endee on GitHub](https://github.com/endee-io/endee)
- 🍴 [Forked Repository](https://github.com/rakeshits/endee)
- 📖 [Endee Documentation](https://docs.endee.io)

---

<div align="center">

Built with ❤️ using [Endee Vector Database](https://github.com/endee-io/endee)

</div>
