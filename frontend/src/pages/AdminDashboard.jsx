import React, { useEffect, useState } from 'react'
import { fetchHistory, marketSearch } from '../api'

export default function AdminDashboard() {
  const [history, setHistory] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    backend: 'Checking...',
    glm: 'Connected through backend',
    market: 'Checking...',
  })
  const [marketLog, setMarketLog] = useState(null)
  const [loadingMarket, setLoadingMarket] = useState(false)

  useEffect(() => {
    fetchHistory()
      .then((data) => setHistory(data.history || []))
      .catch(() => setHistory([]))

    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then(() =>
        setSystemStatus((prev) => ({
          ...prev,
          backend: 'Online',
        }))
      )
      .catch(() =>
        setSystemStatus((prev) => ({
          ...prev,
          backend: 'Offline',
        }))
      )
  }, [])

  async function testMarketLayer() {
    try {
      setLoadingMarket(true)
      const result = await marketSearch('Malaysia SME business trend')
      setMarketLog(result)
      setSystemStatus((prev) => ({
        ...prev,
        market: 'Online',
      }))
    } catch {
      setSystemStatus((prev) => ({
        ...prev,
        market: 'Error',
      }))
    } finally {
      setLoadingMarket(false)
    }
  }

  const totalAnalyses = history.length
  const avgConfidence =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + Number(item.confidence_score || 0), 0) /
            history.length
        )
      : 0

  const industryCount = history.reduce((acc, item) => {
    const key = item.company_field || 'unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const mostUsedIndustry =
    Object.entries(industryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No data'

  const goalCount = history.reduce((acc, item) => {
    const key = item.goal || 'unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const mostCommonGoal =
    Object.entries(goalCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No data'

  return (
    <div className="container section grid">
      <div className="card">
        <span className="badge">Admin Control Center</span>
        <h1>Ka-ching AI Admin Dashboard</h1>
        <p className="subtitle">
          Monitor platform usage, SME decision activity, AI engine status, market intelligence health, and subscription readiness.
        </p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="small">Total Users</div>
          <div className="kpi-value">Demo Mode</div>
          <p className="small">Full user database planned for production.</p>
        </div>

        <div className="kpi-card">
          <div className="small">Total Analyses</div>
          <div className="kpi-value">{totalAnalyses}</div>
        </div>

        <div className="kpi-card">
          <div className="small">Average Confidence</div>
          <div className="kpi-value">{avgConfidence}%</div>
        </div>

        <div className="kpi-card">
          <div className="small">Most Used Industry</div>
          <div className="kpi-value">{mostUsedIndustry}</div>
        </div>

        <div className="kpi-card">
          <div className="small">Most Common Goal</div>
          <div className="kpi-value" style={{ fontSize: '1.1rem' }}>
            {mostCommonGoal}
          </div>
        </div>

        <div className="kpi-card">
          <div className="small">Active Plan</div>
          <div className="kpi-value">{localStorage.getItem('kaching_plan') || 'Free'}</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>System Health</h3>

          <div className="grid">
            <div className="kpi-card">
              <strong>Backend API</strong>
              <p className={systemStatus.backend === 'Online' ? 'win' : 'loss'}>
                {systemStatus.backend}
              </p>
            </div>

            <div className="kpi-card">
              <strong>Ilmu GLM-5.1</strong>
              <p className="win">{systemStatus.glm}</p>
            </div>

            <div className="kpi-card">
              <strong>Market Intelligence Layer</strong>
              <p className={systemStatus.market === 'Online' ? 'win' : 'small'}>
                {systemStatus.market}
              </p>

              <button
                className="btn-primary"
                onClick={testMarketLayer}
                disabled={loadingMarket}
              >
                {loadingMarket ? 'Testing...' : 'Test Market Layer'}
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Admin Responsibilities</h3>
          <ul>
            <li>Monitor analysis usage and SME activity.</li>
            <li>Check GLM and market intelligence availability.</li>
            <li>Review which industries and goals are most common.</li>
            <li>Prepare subscription and plan management.</li>
            <li>Track future POS / ERP / Shopee integration readiness.</li>
          </ul>
        </div>
      </div>

      <div className="card table-wrap">
        <span className="badge">Analysis Logs</span>
        <h3>Recent Decision Records</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recommended Option</th>
              <th>Sector</th>
              <th>Goal</th>
              <th>Confidence</th>
              <th>AI Mode</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.recommended_option}</td>
                <td>{item.company_field}</td>
                <td>{item.goal}</td>
                <td>{item.confidence_score}%</td>
                <td>{item.ai_mode}</td>
                <td>{item.created_at}</td>
              </tr>
            ))}

            {!history.length && (
              <tr>
                <td colSpan="7">No analysis records yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {marketLog && (
        <div className="card">
          <span className="badge">Market Intelligence Log</span>
          <h3>Latest Market Layer Test</h3>

          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="small">Trend Score</div>
              <div className="kpi-value">
                {marketLog.market_signal?.trend_score}/100
              </div>
            </div>

            <div className="kpi-card">
              <div className="small">Demand Signal</div>
              <div className="kpi-value">
                {marketLog.market_signal?.demand_signal}
              </div>
            </div>

            <div className="kpi-card">
              <div className="small">Competitor Pressure</div>
              <div className="kpi-value">
                {marketLog.market_signal?.competitor_pressure_signal}
              </div>
            </div>
          </div>

          <h4 style={{ marginTop: 20 }}>Retrieved Sources</h4>
          <div className="grid">
            {marketLog.items?.slice(0, 5).map((item, idx) => (
              <div className="kpi-card" key={idx}>
                <strong>[{idx + 1}] {item.title}</strong>
                <p className="small">{item.published_at}</p>
                {item.link && (
                  <a
                    href={item.link}
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
      )}

      <div className="card info-card">
        <h3>Production Roadmap</h3>
        <div className="grid grid-3">
          <div className="kpi-card">
            <strong>User Management</strong>
            <p className="small">Add database-backed users, roles, and encrypted passwords.</p>
          </div>

          <div className="kpi-card">
            <strong>Subscription Management</strong>
            <p className="small">Track Free, Starter, Pro, and Enterprise usage limits.</p>
          </div>

          <div className="kpi-card">
            <strong>Advanced Monitoring</strong>
            <p className="small">Add usage analytics, API cost tracking, and error logging.</p>
          </div>
        </div>
      </div>
    </div>
  )
}