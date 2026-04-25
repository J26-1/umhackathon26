import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('user')

  function handleLogin(e) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const profile = {
      fullName: form.get('fullName'),
      email: form.get('email'),
      companyName: form.get('companyName'),
      companyField: form.get('companyField'),
      companySize: form.get('companySize'),
      decisionNeed: form.get('decisionNeed'),
      role,
    }

    localStorage.setItem('kaching_role', role)
    localStorage.setItem('kaching_profile', JSON.stringify(profile))

    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/profile')
    }
  }

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: 620, margin: '40px auto' }}>
        <span className="badge">Welcome Back</span>
        <h2>Login to Ka-ching AI</h2>
        <p className="subtitle">
          Login as an SME user for decision analysis, or as admin for platform monitoring.
        </p>

        <form onSubmit={handleLogin}>
          <label>
            Full Name *
            <input name="fullName" placeholder="Your name" required />
          </label>

          <label>
            Email *
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>

          <label>
            Password *
            <input name="password" type="password" placeholder="Enter password" required />
          </label>

          <label>
            Login As *
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="user">Business User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {role === 'user' && (
            <>
              <label>
                Company Name *
                <input name="companyName" placeholder="Your company name" required />
              </label>

              <div className="grid grid-2">
                <label>
                  Company Field *
                  <select name="companyField" required>
                    <option value="">Select field</option>
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
                  Company Size *
                  <select name="companySize" required>
                    <option value="">Select size</option>
                    <option value="solo">Solo / Freelancer</option>
                    <option value="micro">1–5 employees</option>
                    <option value="small">6–30 employees</option>
                    <option value="medium">31–100 employees</option>
                  </select>
                </label>
              </div>

              <label>
                Main Decision Need *
                <select name="decisionNeed" required>
                  <option value="">Select need</option>
                  <option value="product_priority">Product priority</option>
                  <option value="campaign_budget">Campaign budget</option>
                  <option value="inventory_capacity">Inventory / capacity</option>
                  <option value="risk_reduction">Risk reduction</option>
                </select>
              </label>
            </>
          )}

          {role === 'admin' && (
            <div className="card info-card" style={{ marginTop: 16 }}>
              <h3>Admin Login</h3>
              <p className="small">
                Admin dashboard focuses on user monitoring, analysis logs, market intelligence status, and system health.
              </p>
            </div>
          )}

          <button className="btn-primary" style={{ width: '100%', marginTop: 20 }}>
            Login
          </button>
        </form>

        <p className="small" style={{ marginTop: 18 }}>
          New here? <Link className="highlight" to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}