import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

export default function OpportunityChart({ metrics }) {
  if (!metrics?.length) return null

  const data = metrics.map((item) => ({
    name: item.option_name,
    profit: item.expected_profit,
    opportunityCost: item.opportunity_cost_profit,
    confidence: item.decision_confidence,
    risk: item.risk_score,
  }))

  return (
    <div className="card" style={{ height: 380 }}>
      <h3>Profit vs Opportunity Cost</h3>

      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Bar dataKey="profit" />
          <Bar dataKey="opportunityCost" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}