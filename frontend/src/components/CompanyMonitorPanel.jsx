import React, { useState } from 'react'
import { marketSearch } from '../api'

export default function CompanyMonitorPanel() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function runSearch() {
    if (!query.trim()) {
      alert('Enter company, product, or market keyword.')
      return
    }

    try {
      setLoading(true)
      const data = await marketSearch(query)
      setResult(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <span className="badge">Auto-Scrapbook Engine</span>
      <h3>Company / Market Monitor</h3>
      <p className="subtitle">
        Search latest market information and store it into the lightweight knowledge base.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: lip serum Malaysia trend"
          style={{ flex: 1, minWidth: 240 }}
        />
        <button className="btn-primary" onClick={runSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search Latest Info'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h4>Market Signal</h4>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="small">Trend Score</div>
              <div className="kpi-value">{result.market_signal.trend_score}/100</div>
            </div>
            <div className="kpi-card">
              <div className="small">Demand</div>
              <div className="kpi-value">{result.market_signal.demand_signal}</div>
            </div>
            <div className="kpi-card">
              <div className="small">Pressure</div>
              <div className="kpi-value">{result.market_signal.competitor_pressure_signal}</div>
            </div>
          </div>

          <h4 style={{ marginTop: 20 }}>Latest Sources</h4>
          <div className="grid">
            {result.items?.map((item, idx) => (
              <div className="kpi-card" key={idx}>
                <strong>{item.title}</strong>
                <p className="small">{item.published_at}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="highlight">
                    Open source
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}