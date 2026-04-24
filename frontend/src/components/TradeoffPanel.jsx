import React from 'react'

export default function TradeoffPanel({ insight }) {
  if (!insight) return null

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Why This Wins</h3>
        <ul>
          {insight.why_this_wins?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Trade-Offs</h3>
        <ul>
          {insight.tradeoffs?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>Recommended Actions</h3>
        <ul>
          {insight.actions?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}