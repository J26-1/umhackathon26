import React from 'react'

export default function MarketPanel({ marketContext }) {
  if (!marketContext) return null

  return (
    <div className="card">
      <h3>Live Market Context</h3>

      <div className="grid grid-3">
        <div className="card">
          <div className="small">Benchmark</div>
          <div style={{ fontWeight: 800 }}>{marketContext.benchmark_name}</div>
        </div>
        <div className="card">
          <div className="small">Benchmark Price</div>
          <div style={{ fontWeight: 800 }}>USD {marketContext.benchmark_price_usd}</div>
        </div>
        <div className="card">
          <div className="small">Inventory Signal</div>
          <div style={{ fontWeight: 800 }}>{marketContext.inventory_signal}</div>
        </div>
      </div>

      <p className="subtitle" style={{ marginTop: 14 }}>
        {marketContext.market_note}
      </p>
    </div>
  )
}