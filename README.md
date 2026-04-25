# Ka-ching AI  
### AI-Powered Decision Intelligence for SMEs

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-FastAPI-green)
![AI](https://img.shields.io/badge/AI-GLM--5.1-purple)
![Status](https://img.shields.io/badge/status-MVP-orange)

> *Turn messy business data into smart decisions.*

## Overview

Ka-ching AI is a decision intelligence platform that helps SMEs make better decisions using:

- Business data  
- Real-world market signals  
- AI reasoning (Z.ai Ilmu GLM-5.1)

Unlike traditional systems, it works with **imperfect SME data** and provides **clear, explainable recommendations**.

Ka-ching AI is an AI-powered decision intelligence platform for SMEs. It helps business owners compare multiple business options, calculate profit, ROI, risk, opportunity cost, and receive clear recommendations powered by Ilmu GLM-5.1.

Unlike a normal chatbot, Ka-ching AI combines internal business calculations with real-world market intelligence. The system retrieves external market signals, ranks sources by relevance, injects the evidence into Ilmu GLM-5.1, and displays cited sources for transparency.

---

## Demo

Live Demo:  
https://your-vercel-app.vercel.app  

Backend API:  
https://kaching-ai-backend.onrender.com  

Pitch Video:  

---
## Key Features

### User System
- Login / Signup (SME & Admin)
- Business profile setup
- Role-based dashboard

### Decision Intelligence Engine
- Compare 2–5 business options
- Calculates:
  - Profit  
  - ROI  
  - Risk  
  - Opportunity Cost  
  - Confidence  

### AI Reasoning
- Explainable recommendations
- Trade-offs + action steps
- Supports messy SME inputs

### Market Intelligence
- Real-time data (Google News RSS)
- Trend score
- Demand signal
- Source citations

### Auto-Scrapbook
- Stores market insights
- Reuses knowledge
- Improves future decisions

### Scenario Simulation
- What-if analysis
- Adjust cost / demand / price
- Instant impact visualization
---
## System Architecture

```text
React Frontend (Vercel)
        ↓
FastAPI Backend (Render)
        ↓
Decision Intelligence Engine
        ↓
Market Intelligence Layer (RSS + Knowledge Base)
        ↓
ILMU GLM-5.1 API
        ↓
Structured AI Output
        ↓
Dashboard UI
```

## Tech Stack

| Layer | Tech |
|------|------|
| Frontend | React, Vite |
| Backend | FastAPI |
| AI | Z.ai GLM-5.1 |
| Market Data | Google News RSS |
| Deployment | Vercel + Render |

---

## How to Run

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/kaching-ai-sme-decision-intelligence.git
cd kaching-ai-sme-decision-intelligence
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app:app --reload
```
Backend runs at:
http://127.0.0.1:8000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm install recharts
npm run dev
```
Frontend runs at:
http://localhost:5173

---
## Limitations
- No persistent database (MVP uses local storage)
- No full authentication system (demo mode)
- Market data depends on external sources (may occasionally fail)
- No scheduled scraping (manual trigger only)
- No ERP / Shopee integration yet
- Render free tier may cause cold start delay

## System Strengths
- Works with imperfect SME data
- Combines AI + real-world signals
- Explainable and transparent decisions
- Fallback logic for reliability
- Source citation for trust

## Future Enhancements
- ERP / POS / Shopee integration
- Vector database (RAG upgrade)
- Automated market monitoring
- Subscription & billing system
- Mobile app version
- Predictive analytics & forecasting
- AI-powered supplier negotiation
