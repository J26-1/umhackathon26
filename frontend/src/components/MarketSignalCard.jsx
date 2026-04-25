import React from 'react'

export default function MarketSignalCard({ marketIntelligence }) {
  if (!marketIntelligence?.market_signal) return null

  const signal = marketIntelligence.market_signal

  return (
    <div className="card info-card">
      <span className="badge">Real-World Market Intelligence</span>
      <h3>Latest Market Signal</h3>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="small">Trend Score</div>
          <div className="kpi-value">{signal.trend_score}/100</div>
        </div>

        <p className="small" style={{ marginTop: 14 }}>
        Market signal is generated from retrieved external sources. See citations below for reference.
        </p>

        <div className="kpi-card">
          <div className="small">Demand Signal</div>
          <div className="kpi-value">{signal.demand_signal}</div>
        </div>

        <div className="kpi-card">
          <div className="small">Competitor Pressure</div>
          <div className="kpi-value">{signal.competitor_pressure_signal}</div>
        </div>

        <div className="kpi-card">
          <div className="small">Freshness</div>
          <div className="kpi-value" style={{ fontSize: '1rem' }}>
            {signal.data_freshness}
          </div>
        </div>
      </div>

      <p className="subtitle" style={{ marginTop: 16 }}>
        Search query: {marketIntelligence.query}
      </p>
    </div>
  )
}