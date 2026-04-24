import React from 'react'

export default function OpportunityCostHighlight({ metrics, best }) {
  if (!metrics?.length || !best) return null

  const alternatives = metrics
    .filter((item) => item.option_name !== best.option_name)
    .sort((a, b) => b.opportunity_cost_profit - a.opportunity_cost_profit)

  const biggestLoss = alternatives[0]
  if (!biggestLoss) return null

  return (
    <div className="card alert-card">
      <span className="badge">Hidden Opportunity Cost</span>

      <h2 style={{ marginTop: 12 }}>
        Choosing <span className="highlight">{biggestLoss.option_name}</span> instead of{' '}
        <span className="win">{best.option_name}</span> may lose:
      </h2>

      <div className="loss" style={{ fontSize: '2.2rem', marginTop: 10 }}>
        RM {biggestLoss.opportunity_cost_profit}
      </div>

      <p className="subtitle">
        This is the estimated profit difference between the best-scored option and this
        alternative option.
      </p>
    </div>
  )
}