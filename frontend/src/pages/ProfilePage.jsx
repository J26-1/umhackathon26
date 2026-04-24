import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const defaultProfile = {
  business_name: '',
  industry_type: 'general',
  business_model: 'B2C',
  number_of_staff: 1,
  number_of_branches: 1,
  monthly_revenue_range: 'Below RM10k',
  main_products_services: '',
  operating_hours: '',
  region_country: 'Malaysia',
}

export default function ProfilePage() {
  const saved = JSON.parse(localStorage.getItem('kaching_profile') || '{}')

  const normalizedSaved = {
    ...saved,
    business_name: saved.business_name || saved.companyName || '',
    industry_type: saved.industry_type || saved.companyField || 'general',
  }

  const [profile, setProfile] = useState({ ...defaultProfile, ...normalizedSaved })

  function update(field, value) {
    setProfile({ ...profile, [field]: value })
  }

  function saveProfile(e) {
    e.preventDefault()
    localStorage.setItem('kaching_profile', JSON.stringify(profile))
    alert('Business profile saved.')
  }

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: 920, margin: '0 auto' }}>
        <span className="badge">Dedicated Business Profile</span>
        <h2>Ka-ching AI Business Profile</h2>
        <p className="subtitle">
          This one-time setup gives Ilmu GLM-5.1 business context for better reasoning.
        </p>

        <form onSubmit={saveProfile}>
          <div className="grid grid-2">
            <label>
              Business Name *
              <input
                value={profile.business_name}
                onChange={(e) => update('business_name', e.target.value)}
                required
              />
            </label>

            <label>
              Industry Type *
              <select
                value={profile.industry_type}
                onChange={(e) => update('industry_type', e.target.value)}
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
              Business Model *
              <select
                value={profile.business_model}
                onChange={(e) => update('business_model', e.target.value)}
                required
              >
                <option>B2C</option>
                <option>B2B</option>
                <option>Both</option>
              </select>
            </label>

            <label>
              Number of Staff *
              <input
                type="number"
                min="1"
                value={profile.number_of_staff}
                onChange={(e) => update('number_of_staff', Number(e.target.value))}
                required
              />
            </label>

            <label>
              Number of Branches *
              <input
                type="number"
                min="1"
                value={profile.number_of_branches}
                onChange={(e) => update('number_of_branches', Number(e.target.value))}
                required
              />
            </label>

            <label>
              Monthly Revenue Range *
              <select
                value={profile.monthly_revenue_range}
                onChange={(e) => update('monthly_revenue_range', e.target.value)}
                required
              >
                <option>Below RM10k</option>
                <option>RM10k - RM50k</option>
                <option>RM50k - RM200k</option>
                <option>RM200k+</option>
              </select>
            </label>

            <label>
              Operating Hours *
              <input
                value={profile.operating_hours}
                onChange={(e) => update('operating_hours', e.target.value)}
                placeholder="Example: 9AM - 9PM"
                required
              />
            </label>

            <label>
              Region / Country *
              <input
                value={profile.region_country}
                onChange={(e) => update('region_country', e.target.value)}
                required
              />
            </label>
          </div>

          <label style={{ marginTop: 16, display: 'block' }}>
            Main Products / Services *
            <textarea
              rows="3"
              value={profile.main_products_services}
              onChange={(e) => update('main_products_services', e.target.value)}
              placeholder="Example: drinks, desserts, skincare products, utensils..."
              required
            />
          </label>

          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-primary">Save Business Profile</button>

            <Link to="/setup">
              <button type="button" className="btn-secondary">
                Continue to Setup
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}