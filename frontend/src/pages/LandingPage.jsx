import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="container hero">
      <span className="badge">Powered by Ilmu GLM-5.1</span>

      <h1 className="title">
        Ka-ching AI helps SMEs choose the most profitable decision.
      </h1>

      <p className="subtitle" style={{ maxWidth: 860 }}>
        A decision intelligence layer on top of imperfect SME data. Compare choices,
        predict outcomes, calculate hidden opportunity cost, and get clear AI-powered
        recommendations.
      </p>

      <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
        <Link to="/signup">
          <button className="btn-primary">Get Started</button>
        </Link>

        <Link to="/login">
          <button className="btn-secondary">Login</button>
        </Link>

        <Link to="/pricing">
          <button className="btn-secondary">View Pricing</button>
        </Link>
      </div>

      <div className="grid grid-3 section">
        <div className="card">
          <span className="badge">General SME</span>
          <h3>Applicable to Any Sector</h3>
          <p className="small">
            Works with general business inputs and optional sector-specific fields.
          </p>
        </div>

        <div className="card">
          <span className="badge">Smart Input</span>
          <h3>3-Level Input Strategy</h3>
          <p className="small">
            Basic manual input, advanced optional input, and future Pro data import.
          </p>
        </div>

        <div className="card">
          <span className="badge">GLM Core</span>
          <h3>Not Just a Calculator</h3>
          <p className="small">
            Ilmu GLM-5.1 interprets data, explains trade-offs, and recommends actions.
          </p>
        </div>
      </div>

      <div className="grid grid-3 section">
        <div className="card">
          <h3>F&B Demo</h3>
          <p className="small">
            Compare cafe promotions such as Matcha Latte vs Cheesecake Combo.
          </p>
        </div>

        <div className="card">
          <h3>Beauty Demo</h3>
          <p className="small">
            Decide which SKU or campaign should receive more budget.
          </p>
        </div>

        <div className="card">
          <h3>Manufacturing Demo</h3>
          <p className="small">
            Compare production batches using profit, capacity, and risk.
          </p>
        </div>
      </div>
    </div>
  )
}