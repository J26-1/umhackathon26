import React from 'react'

export default function LoadingOverlay({
  text = 'Ka-ching AI is reasoning with Ilmu GLM-5.1...',
}) {
  return (
    <div className="loading-overlay">
      <div className="card loading-card">
        <div className="spinner" />
        <h2>{text}</h2>
        <p className="subtitle">
          Comparing options, calculating opportunity cost, and generating AI advice.
        </p>
      </div>
    </div>
  )
}