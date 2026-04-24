import React from 'react'

export default function RecommendationCard({ best, insight }) {
  if (!best || !insight) return null

  return (
    <div className="card">
      <span className="badge">
        Powered by {insight.ai_mode || 'Ilmu GLM-5.1'}
      </span>

      <h2 style={{ marginTop: 14 }}>
        Recommended Option: <span className="highlight">{best.option_name}</span>
      </h2>

      <p className="subtitle">{insight.summary}</p>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="small">Expected Profit</div>
          <div className="kpi-value">RM {best.expected_profit}</div>
        </div>

        <div className="kpi-card">
          <div className="small">Decision Confidence</div>
          <div className="kpi-value">{best.decision_confidence}%</div>
        </div>

        <div className="kpi-card">
          <div className="small">Risk Score</div>
          <div className="kpi-value">{best.risk_score}%</div>
        </div>

        <div className="kpi-card">
          <div className="small">Smart Fallback</div>
          <div className="kpi-value">
            {best.smart_fallback_used ? 'Used' : 'No'}
          </div>
        </div>
      </div>

      {best.smart_fallback_used && (
        <div className="card alert-card" style={{ marginTop: 18 }}>
          <h3>Smart Fallback Used</h3>
          <ul>
            {best.fallback_explanations?.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}