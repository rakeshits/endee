# 🔍 AI Semantic Search — Powered by Endee Vector Database

A production-quality semantic search web application built with **Next.js 14** and **[Endee](https://github.com/endee-io/endee)** as the vector database backend.

## 🚀 Project Overview

This project demonstrates real semantic search — going beyond keyword matching to understand **meaning, context, and intent**. Search queries are converted into 128-dimensional vectors and matched against a knowledge base stored in Endee using cosine similarity.

## 🏗️ System Design
```
User Query
    ↓
Next.js Frontend (React + Tailwind CSS)
    ↓
/api/search  (Next.js API Route)
    ↓
Text → 128-dim Vector Embedding
    ↓
Endee Vector Database (Docker)
    ↓
Cosine Similarity Search → Top 3 Results
    ↓
Ranked Results with Confidence Scores
```

## 🧠 How Endee is Used

- **Index name**: `semantic_search`
- **Dimensions**: 128
- **Space type**: Cosine similarity
- **Operation**: 15 knowledge documents upserted as vectors on first request
- **Query**: Each search is vectorized and queried via `index.query({ topK: 3 })`
- **SDK**: Official `endee` npm package (TypeScript SDK)

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Next.js API Routes |
| Vector Database | **Endee** (Docker) |
| Embeddings | Character frequency vectors (128-dim) |
| Fonts | Cabinet Grotesk, Instrument Sans |

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Docker Desktop

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/ai-semantic-search
cd ai-semantic-search
```

### 2. Start Endee Vector Database
```bash
docker run -d -p 8080:8080 -e NDD_AUTH_TOKEN="" --name endee-server endeeio/endee-server:latest
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the app
```bash
npm run dev
```

### 5. Open in browser
```
http://localhost:3000
```

## 📁 Project Structure
```
app/
  page.js                 # Landing page
  search/page.js          # Search interface  
  api/search/route.js     # Endee vector search API
components/
  Navbar.js
  Footer.js
  SearchBar.js
  ResultCard.js
```

## 🔗 Endee Links
- ⭐ Starred: [github.com/endee-io/endee](https://github.com/endee-io/endee)
- - 🍴 Forked: [github.com/rakeshits/endee](https://github.com/rakeshits/endee)
- 📖 Docs: [docs.endee.io](https://docs.endee.io)