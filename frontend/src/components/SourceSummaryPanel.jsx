import React from 'react'

export default function SourceSummaryPanel({ marketIntelligence }) {
  const sources = marketIntelligence?.market_signal?.sources || []

  if (!sources.length) {
    return (
      <div className="card">
        <h3>Source Summary</h3>
        <p className="subtitle">
          No live source was retrieved. The recommendation relies mainly on user input and internal scoring.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <span className="badge">Source Citations</span>
      <h3>Market Evidence Used</h3>
      <p className="subtitle">
        Ka-ching AI uses these retrieved sources as supporting market evidence before sending context to Ilmu GLM-5.1.
      </p>

      <div className="grid">
        {sources.map((source, idx) => (
          <div className="kpi-card" key={idx}>
            <strong>
              [{idx + 1}] {source.title}
            </strong>

            <p className="small">
              Published: {source.published_at || 'Unknown date'}
            </p>

            <p className="small">
              Source type: {source.source_type || 'External source'}
            </p>

            {source.relevance_score !== undefined && (
              <p className="small">
                Relevance score: {source.relevance_score}
              </p>
            )}

            {source.link && (
              <a
                href={source.link}
                target="_blank"
                rel="noreferrer"
                className="highlight"
              >
                Open source ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}