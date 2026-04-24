import React from 'react'

export default function ValidationCard() {
  return (
    <div className="card info-card">
      <h3>Validation</h3>
      <p className="subtitle">
        Ka-ching AI is validated through simulated SME cases across F&B, Beauty, Manufacturing, and General SME decisions.
      </p>

      <div className="pill-row">
        <span className="pill">F&B: promo decision</span>
        <span className="pill">Beauty: SKU campaign</span>
        <span className="pill">Manufacturing: batch planning</span>
        <span className="pill">General SME: option comparison</span>
        <span className="pill">Scenario simulation</span>
      </div>

      <div className="grid grid-3" style={{ marginTop: 16 }}>
        <div className="kpi-card">
          <div className="small">Decision Time</div>
          <div className="kpi-value">2h → 5m</div>
        </div>

        <div className="kpi-card">
          <div className="small">Simulated Profit Uplift</div>
          <div className="kpi-value">+12%</div>
        </div>

        <div className="kpi-card">
          <div className="small">Wrong Campaign Risk</div>
          <div className="kpi-value">-35%</div>
        </div>
      </div>
    </div>
  )
}