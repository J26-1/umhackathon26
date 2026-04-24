import React from 'react'
import { Link } from 'react-router-dom'
import BusinessProfileBar from '../components/BusinessProfileBar'
import DecisionModeInfo from '../components/DecisionModeInfo'

export default function SetupPage({ context, setContext }) {
  const profile = JSON.parse(localStorage.getItem('kaching_profile') || '{}')

  function continueSetup() {
    const businessProfile = profile.business_name ? profile : undefined
    setContext({ ...context, business_profile: businessProfile })
  }

  return (
    <div className="container section grid">
      <BusinessProfileBar context={context} />
      <DecisionModeInfo />

      <div className="card" style={{ maxWidth: 780, margin: '0 auto', width: '100%' }}>
        <span className="badge">Decision Setup</span>
        <h2>Choose Your Analysis Direction</h2>
        <p className="subtitle">
          Select the business field, goal, and time horizon. Ka-ching AI will adjust
          the scoring logic based on your goal.
        </p>

        <div className="grid grid-2" style={{ marginTop: 20 }}>
          <label>
            Company Field *
            <select
              value={context.company_field}
              onChange={(e) =>
                setContext({ ...context, company_field: e.target.value })
              }
              required
            >
              <option value="general">General SME</option>
              <option value="fnb">F&B</option>
              <option value="beauty">Beauty</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="service">Service</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Time Horizon *
            <select
              value={context.time_horizon}
              onChange={(e) =>
                setContext({ ...context, time_horizon: e.target.value })
              }
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        </div>

        <label style={{ marginTop: 16, display: 'block' }}>
          Main Goal *
          <select
            value={context.goal}
            onChange={(e) => setContext({ ...context, goal: e.target.value })}
            required
          >
            <option value="maximize_profit">Maximize Profit</option>
            <option value="reduce_risk">Reduce Risk</option>
            <option value="fast_sales">Fast Sales</option>
            <option value="optimize_capacity">Optimize Capacity</option>
          </select>
        </label>

        <div className="grid grid-4" style={{ marginTop: 24 }}>
          <div className="kpi-card">
            <div className="small">Profit Goal</div>
            <strong>Profit + ROI weighted higher</strong>
          </div>

          <div className="kpi-card">
            <div className="small">Risk Goal</div>
            <strong>Risk and confidence weighted higher</strong>
          </div>

          <div className="kpi-card">
            <div className="small">Fast Sales</div>
            <strong>Demand and conversion weighted higher</strong>
          </div>

          <div className="kpi-card">
            <div className="small">Capacity</div>
            <strong>Utilization and output weighted higher</strong>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/input" onClick={continueSetup}>
            <button className="btn-primary">Continue to Input</button>
          </Link>

          <Link to="/profile">
            <button className="btn-secondary">Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  )
}