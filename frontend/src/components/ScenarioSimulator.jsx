import React, { useState } from 'react'
import { simulateDecision } from '../api'
import LoadingOverlay from './LoadingOverlay'

export default function ScenarioSimulator({ context, options, analysisResult }) {
  const [optionName, setOptionName] = useState(options?.[0]?.option_name || '')
  const [field, setField] = useState('estimated_demand')
  const [newValue, setNewValue] = useState(100)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function runSimulation() {
    try {
      setLoading(true)

      const payload = {
        options,
        context,
        changes: [
          {
            option_name: optionName,
            field,
            new_value: Number(newValue),
          },
        ],
      }

      const data = await simulateDecision(payload)
      setResult(data)
    } catch (error) {
      alert(error.message || 'Simulation failed. Please check backend connection.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!options?.length) {
    return <div className="card">Please add options first on the Input page.</div>
  }

  const originalBest = analysisResult?.best
  const newBest = result?.best

  return (
    <>
      {loading && (
        <LoadingOverlay text="Running what-if simulation with Ilmu GLM-5.1..." />
      )}

      <div className="grid grid-2">
        <div className="card">
          <span className="badge">What-if Analysis</span>
          <h3 style={{ marginTop: 12 }}>Scenario Simulation</h3>
          <p className="subtitle">
            Change one variable and see whether the best decision changes.
          </p>

          <label>
            Option
            <select value={optionName} onChange={(e) => setOptionName(e.target.value)}>
              {options.map((o) => (
                <option key={o.option_name} value={o.option_name}>
                  {o.option_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Field
            <select value={field} onChange={(e) => setField(e.target.value)}>
              <option value="selling_price">Selling Price</option>
              <option value="unit_cost">Unit Cost</option>
              <option value="available_capacity">Available Capacity</option>
              <option value="estimated_demand">Estimated Demand</option>
              <option value="operating_cost">Operating Cost</option>
              <option value="risk_level">Risk Level</option>
            </select>
          </label>

          <label>
            New Value
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </label>

          <button
            className="btn-primary"
            onClick={runSimulation}
            disabled={loading || !optionName}
            style={{ marginTop: 12 }}
          >
            {loading ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>

        <div className="card">
          <span className="badge">Before vs After</span>
          <h3 style={{ marginTop: 12 }}>Updated Decision</h3>

          {result ? (
            <>
              <div className="grid grid-2">
                <div className="card">
                  <div className="small">Original Best</div>
                  <strong>{originalBest?.option_name || 'No previous analysis'}</strong>
                </div>

                <div className="card">
                  <div className="small">New Best</div>
                  <strong className="highlight">{newBest.option_name}</strong>
                </div>
              </div>

              <div className="grid grid-2" style={{ marginTop: 16 }}>
                <div className="card">
                  <div className="small">New Expected Profit</div>
                  <div className="kpi-value">RM {newBest.expected_profit}</div>
                </div>

                <div className="card">
                  <div className="small">New Risk Score</div>
                  <div className="kpi-value">{newBest.risk_score}%</div>
                </div>
              </div>

              {originalBest && (
                <div className="card" style={{ marginTop: 16 }}>
                  <div className="small">Profit Change</div>
                  <div
                    className={
                      newBest.expected_profit - originalBest.expected_profit >= 0
                        ? 'win kpi-value'
                        : 'loss kpi-value'
                    }
                  >
                    RM{' '}
                    {Math.round(
                      (newBest.expected_profit - originalBest.expected_profit) * 100
                    ) / 100}
                  </div>
                </div>
              )}

              <p className="subtitle" style={{ marginTop: 16 }}>
                {result.insight.summary}
              </p>
            </>
          ) : (
            <p className="small">
              Run a scenario to compare original best option against the updated result.
            </p>
          )}
        </div>
      </div>
    </>
  )
}