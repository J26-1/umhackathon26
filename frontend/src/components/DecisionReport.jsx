import React from 'react'

function buildReport(analysisResult) {
  const { best, insight, metrics } = analysisResult

  return [
    'Ka-ching AI Decision Report',
    '================================',
    '',
    `Recommended Option: ${best.option_name}`,
    `Sector: ${best.company_field}`,
    `Item: ${best.item_name}`,
    `Expected Revenue: RM ${best.expected_revenue}`,
    `Expected Profit: RM ${best.expected_profit}`,
    `ROI: ${best.roi}`,
    `Risk Score: ${best.risk_score}%`,
    `Decision Confidence: ${best.decision_confidence}%`,
    `Smart Fallback Used: ${best.smart_fallback_used ? 'Yes' : 'No'}`,
    '',
    'AI Summary:',
    insight.summary,
    '',
    'Why This Wins:',
    ...(insight.why_this_wins || []).map((x) => `- ${x}`),
    '',
    'Trade-offs:',
    ...(insight.tradeoffs || []).map((x) => `- ${x}`),
    '',
    'Recommended Actions:',
    ...(insight.actions || []).map((x) => `- ${x}`),
    '',
    'Comparison:',
    ...metrics.map(
      (m) =>
        `- ${m.option_name}: Profit RM${m.expected_profit}, ROI ${m.roi}, Risk ${m.risk_score}%, Confidence ${m.decision_confidence}%, Opportunity Cost RM${m.opportunity_cost_profit}`
    ),
  ].join('\n')
}

export default function DecisionReport({ analysisResult }) {
  if (!analysisResult) return null

  const report = buildReport(analysisResult)

  function downloadReport() {
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'kaching-ai-decision-report.txt'
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="card">
      <h3>Decision Report</h3>
      <p className="subtitle">
        Export this recommendation as a simple report for your team or judging demo.
      </p>

      <button className="btn-primary" onClick={downloadReport}>
        Download Decision Report
      </button>
    </div>
  )
}