import React from 'react'

export default function DecisionModeInfo() {
  return (
    <div className="card">
      <span className="badge">3-Level Input Strategy</span>
      <h3>Decision intelligence layer on top of imperfect SME data</h3>

      <div className="grid grid-3">
        <div className="kpi-card">
          <strong>Level 1 · Basic Mode</strong>
          <p className="small">
            Minimum mandatory manual inputs. Fast and suitable for 1–2 minute SME analysis.
          </p>
        </div>

        <div className="kpi-card">
          <strong>Level 2 · Advanced Mode</strong>
          <p className="small">
            Optional manual inputs improve demand prediction, risk modeling, sales speed, and capacity decisions.
          </p>
        </div>

        <div className="kpi-card">
          <strong>Level 3 · Pro Data</strong>
          <p className="small">
            Upload CSV, connect POS / ERP / Shopee, or use Ilmu GLM-5.1 to extract data from text.
          </p>
        </div>
      </div>
    </div>
  )
}