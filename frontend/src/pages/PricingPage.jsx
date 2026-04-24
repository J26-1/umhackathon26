import React from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: 'RM0',
    tag: 'Try first',
    features: [
      '5 analyses/month',
      'Basic Mode only',
      '1 demo sector',
      'No report export',
    ],
  },
  {
    name: 'Starter',
    price: 'RM29/mo',
    tag: 'For small SMEs',
    features: [
      '50 analyses/month',
      'Basic + Advanced Mode',
      'Scenario simulation',
      'Decision history',
    ],
  },
  {
    name: 'Pro',
    price: 'RM79/mo',
    tag: 'Recommended',
    featured: true,
    features: [
      'Unlimited analyses',
      'Ilmu GLM-5.1 assistant',
      'Report export',
      'Pro Data Import',
      'All sectors',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    tag: 'For teams',
    features: [
      'Admin dashboard',
      'Team users',
      'API access',
      'POS / ERP integration',
      'Custom sector templates',
    ],
  },
]

export default function PricingPage() {
  function choosePlan(plan) {
    localStorage.setItem('kaching_plan', plan.name)
  }

  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="badge">Subscription Plans</span>
        <h1>Choose the plan that fits your SME</h1>
        <p className="subtitle">
          Start free, then upgrade when your team needs deeper analysis, reports,
          and automated data import.
        </p>
      </div>

      <div className="grid grid-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card ${plan.featured ? 'success-card' : ''}`}
            style={{ position: 'relative' }}
          >
            {plan.featured && (
              <span className="badge" style={{ position: 'absolute', top: 16, right: 16 }}>
                Best Value
              </span>
            )}

            <h2>{plan.name}</h2>
            <p className="small">{plan.tag}</p>

            <div className="kpi-value">{plan.price}</div>

            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <Link to="/profile" onClick={() => choosePlan(plan)}>
              <button
                className={plan.featured ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%' }}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="card info-card" style={{ marginTop: 28 }}>
        <h3>Why this pricing works</h3>
        <p className="subtitle">
          Free reduces adoption friction. Starter supports small SMEs. Pro is the main
          revenue plan with AI assistant, report export, and Pro Data Import. Enterprise
          supports larger teams and integrations.
        </p>
      </div>
    </div>
  )
}