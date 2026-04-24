# OCE

OCE is an AI-powered opportunity cost engine for e-commerce sellers.
It compares multiple product options, calculates what the seller loses by choosing the wrong option, and uses GLM to generate clear business recommendations.

## Features
- Compare multiple products
- Calculate expected profit and risk
- Show opportunity cost of each choice
- Recommend the best product based on business goal
- Explain trade-offs clearly with GLM
- Run scenario simulation
- Track decision history

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