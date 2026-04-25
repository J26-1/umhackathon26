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

## Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
npm install recharts
npm run dev
```

