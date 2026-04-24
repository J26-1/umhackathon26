import React from 'react'
import { Link } from 'react-router-dom'

export default function BusinessProfileBar({ context }) {
  const profile = JSON.parse(localStorage.getItem('kaching_profile') || '{}')

  return (
    <div className="card info-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <span className="badge">Business Profile</span>
          <h3>{profile.business_name || profile.companyName || 'Business profile not completed'}</h3>
          <p className="subtitle">
            {profile.industry_type || profile.companyField || context?.company_field || 'general'} •{' '}
            {profile.business_model || 'SME'} • {profile.region_country || 'Region not set'}
          </p>
        </div>

        <Link to="/profile">
          <button className="btn-secondary">Edit Profile</button>
        </Link>
      </div>
    </div>
  )
}