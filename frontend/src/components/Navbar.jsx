import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const role = localStorage.getItem('kaching_role') || 'guest'
  const profile = JSON.parse(localStorage.getItem('kaching_profile') || '{}')

  const isAdmin = role === 'admin'
  const isUser = role === 'user'

  function logout() {
    localStorage.removeItem('kaching_role')
    localStorage.removeItem('kaching_profile')
    localStorage.removeItem('kaching_plan')
    window.location.href = '/'
  }

  return (
    <nav className="navbar">
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 0',
          gap: 18,
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
          <strong>Ka-ching AI</strong>
        </Link>

        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {!isAdmin && !isUser && (
            <>
              <Link className="nav-link" to="/pricing">Pricing</Link>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          )}

          {isUser && (
            <>
              <Link className="nav-link" to="/profile">Profile</Link>
              <Link className="nav-link" to="/setup">Setup</Link>
              <Link className="nav-link" to="/input">Input</Link>
              <Link className="nav-link" to="/results">Results</Link>
              <Link className="nav-link" to="/simulation">Simulation</Link>
              <Link className="nav-link" to="/history">History</Link>
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              <Link className="nav-link" to="/history">Analysis Logs</Link>
              <Link className="nav-link" to="/pricing">Plans</Link>
            </>
          )}

          {(isAdmin || isUser) && (
            <>
              <span className="pill">
                {isAdmin ? 'Admin' : 'SME User'}
                {profile?.business_name ? ` · ${profile.business_name}` : ''}
              </span>
              <button className="btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}