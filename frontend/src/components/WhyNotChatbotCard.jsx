import React from 'react'

export default function WhyNotChatbotCard() {
  return (
    <div className="card">
      <h3>Why This Is Not Just a Chatbot</h3>

      <div className="grid grid-2">
        <div className="kpi-card">
          <strong>Structured scoring engine</strong>
          <p className="small">Calculates profit, ROI, risk, confidence, and opportunity cost.</p>
        </div>

        <div className="kpi-card">
          <strong>Real-world market retrieval</strong>
          <p className="small">Searches fresh market information before GLM generates insights.</p>
        </div>

        <div className="kpi-card">
          <strong>Knowledge base injection</strong>
          <p className="small">Stores and retrieves relevant snippets for decision context.</p>
        </div>

        <div className="kpi-card">
          <strong>Ilmu GLM-5.1 reasoning</strong>
          <p className="small">Explains trade-offs and strategies using user data + market signals.</p>
        </div>
      </div>
    </div>
  )
}