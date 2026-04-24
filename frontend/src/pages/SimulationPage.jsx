import React from 'react'
import ScenarioSimulator from '../components/ScenarioSimulator'
import AIChatbox from '../components/AIChatbox'
import OptionContextCard from '../components/OptionContextCard'

export default function SimulationPage({ context, options, analysisResult }) {
  return (
    <div className="container section grid">
      <div className="card">
        <span className="badge">Scenario Simulation</span>
        <h2>What-if Decision Testing</h2>
        <p className="subtitle">
          Change one variable and see whether the recommended decision changes.
        </p>
      </div>

      <OptionContextCard options={options} />

      <ScenarioSimulator
        context={context}
        options={options}
        analysisResult={analysisResult}
      />

      <AIChatbox analysisResult={analysisResult} />
    </div>
  )
}