import React from 'react'

export default function InputQualityCard({ metrics }) {
  if (!metrics?.length) return null

  const warnings = []

  metrics.forEach((item) => {
    if (item.expected_profit <= 0) {
      warnings.push(`${item.option_name}: expected profit is low or negative.`)
    }

    if (item.risk_score >= 50) {
      warnings.push(`${item.option_name}: risk score is high.`)
    }

    if (item.stockout_risk >= 30) {
      warnings.push(`${item.option_name}: estimated demand may exceed available capacity.`)
    }

    if (item.smart_fallback_used) {
      item.fallback_explanations?.forEach((msg) => {
        warnings.push(`${item.option_name}: ${msg}`)
      })
    }
  })

  return (
    <div className={`card ${warnings.length ? 'alert-card' : 'success-card'}`}>
      <h3>Input Quality & Smart Fallback</h3>

      {warnings.length ? (
        <>
          <p className="subtitle">
            Some inputs were missing or risky. Ka-ching AI used transparent SME fallback
            assumptions where needed.
          </p>

          <ul>
            {warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="subtitle">
          Inputs look complete and reliable. No major fallback or risk warning detected.
        </p>
      )}
    </div>
  )
}