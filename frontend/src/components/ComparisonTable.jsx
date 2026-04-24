import React from 'react'

export default function ComparisonTable({ metrics }) {
  if (!metrics?.length) return null

  return (
    <div className="card table-wrap">
      <h3>Comparison Dashboard</h3>

      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Sector</th>
            <th>Item</th>
            <th>Predicted Units</th>
            <th>Revenue</th>
            <th>Profit</th>
            <th>ROI</th>
            <th>Risk</th>
            <th>Confidence</th>
            <th>Fallback</th>
            <th>Opp. Cost</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((item) => (
            <tr key={item.option_name}>
              <td>{item.option_name}</td>
              <td>{item.company_field}</td>
              <td>{item.item_name}</td>
              <td>{item.predicted_units}</td>
              <td>RM {item.expected_revenue}</td>
              <td>RM {item.expected_profit}</td>
              <td>{item.roi}</td>
              <td>{item.risk_score}%</td>
              <td>{item.decision_confidence}%</td>
              <td>{item.smart_fallback_used ? 'Used' : 'No'}</td>
              <td className={item.opportunity_cost_profit > 0 ? 'loss' : 'win'}>
                RM {item.opportunity_cost_profit}
              </td>
              <td>{item.base_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}