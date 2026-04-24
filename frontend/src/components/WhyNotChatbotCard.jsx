import React from 'react'

export default function WhyNotChatbotCard() {
  return (
    <div className="card">
      <h3>Why This Is Not Just a Chatbot</h3>

      <div className="grid grid-2">
        <div className="kpi-card">
          <strong>Structured comparison</strong>
          <p className="small">Compares 2–5 business options side by side.</p>
        </div>

        <div className="kpi-card">
          <strong>Opportunity cost engine</strong>
          <p className="small">Calculates hidden profit loss between choices.</p>
        </div>

        <div className="kpi-card">
          <strong>Prediction logic</strong>
          <p className="small">Estimates revenue, profit, ROI, risk, confidence, and score.</p>
        </div>

        <div className="kpi-card">
          <strong>Ilmu GLM-5.1 reasoning</strong>
          <p className="small">Explains trade-offs, interprets notes, and recommends actions.</p>
        </div>
      </div>
    </div>
  )
}