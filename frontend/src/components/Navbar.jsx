import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const role = localStorage.getItem('kaching_role')

  return (
    <div className="navbar">
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 0',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #22c55e, #2563eb)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 900,
            }}
          >
            K
          </div>

          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>Ka-ching AI</div>
            <div className="small" style={{ fontSize: '0.72rem' }}>
              Opportunity Cost Intelligence
            </div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link className="nav-link" to="/pricing">Pricing</Link>
          <Link className="nav-link" to="/setup">Setup</Link>
          <Link className="nav-link" to="/input">Input</Link>
          <Link className="nav-link" to="/results">Results</Link>
          <Link className="nav-link" to="/simulation">Simulation</Link>
          <Link className="nav-link" to="/history">History</Link>

          {role && <Link className="nav-link" to="/profile">Profile</Link>}

          <Link to="/login">
            <button className="btn-secondary">Login</button>
          </Link>

          <Link to="/signup">
            <button className="btn-primary">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}