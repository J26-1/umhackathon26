import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('user')

  function handleSignup(e) {
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

    navigate('/profile')
  }

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: 640, margin: '40px auto' }}>
        <span className="badge">Create Account</span>
        <h2>Start using Ka-ching AI</h2>
        <p className="subtitle">
          Set up your SME profile so the system can personalize decision analysis.
        </p>

        <form onSubmit={handleSignup}>
          <label>
            Full Name *
            <input name="fullName" placeholder="Your name" required />
          </label>

          <label>
            Company Name *
            <input name="companyName" placeholder="Your company" required />
          </label>

          <label>
            Email *
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>

          <label>
            Password *
            <input name="password" type="password" placeholder="Create password" required />
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

          <label>
            Register As *
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="user">Business User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button className="btn-primary" style={{ width: '100%', marginTop: 20 }}>
            Create Account
          </button>
        </form>

        <p className="small" style={{ marginTop: 18 }}>
          Already have account? <Link className="highlight" to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}