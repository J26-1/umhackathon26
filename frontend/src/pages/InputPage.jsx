import React from 'react'
import { useNavigate } from 'react-router-dom'
import OptionForm from '../components/OptionForm'
import LoadingOverlay from '../components/LoadingOverlay'
import BusinessProfileBar from '../components/BusinessProfileBar'
import OptionContextCard from '../components/OptionContextCard'
import DecisionModeInfo from '../components/DecisionModeInfo'
import ProDataImportPanel from '../components/ProDataImportPanel'
import InputLimitsCard from '../components/InputLimitsCard'
import { analyzeDecision } from '../api'

const emptySectorData = {
  fixed_cost: null,
  labor_cost: null,
  marketing_budget: null,
  time_required_hours: null,
  demand_confidence: null,
  conversion_rate: null,
  competitor_pressure: null,
  customer_priority: null,

  ingredient_cost: null,
  preparation_time_minutes: null,
  spoilage_risk: null,
  promotion_cost: null,

  repeat_purchase_score: null,
  packaging_cost: null,
  campaign_cost: null,
  review_sentiment_score: null,

  machine_hours: null,
  raw_material_cost: null,
  defect_risk: null,
  supplier_lead_time_days: null,
}

function createEmptyOption(companyField) {
  return {
    option_name: '',
    company_field: companyField,
    item_name: '',
    selling_price: 1,
    unit_cost: 0,
    estimated_demand: 0,
    available_capacity: 0,
    operating_cost: 0,
    risk_level: 0.1,
    notes: '',
    sector_data: { ...emptySectorData },
  }
}

const demoData = {
  fnb: [
    {
      option_name: 'Matcha Latte Promotion',
      company_field: 'fnb',
      item_name: 'Matcha Latte',
      selling_price: 14,
      unit_cost: 5,
      estimated_demand: 320,
      available_capacity: 400,
      operating_cost: 300,
      risk_level: 0.15,
      notes: 'Popular drink with stable demand and strong student interest.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.8,
        conversion_rate: 0.18,
        marketing_budget: 150,
        labor_cost: 80,
        time_required_hours: 12,
        competitor_pressure: 'medium',
        customer_priority: 'high',
        ingredient_cost: 120,
        preparation_time_minutes: 4,
        spoilage_risk: 0.08,
        promotion_cost: 150,
      },
    },
    {
      option_name: 'Cheesecake Combo',
      company_field: 'fnb',
      item_name: 'Cheesecake Combo',
      selling_price: 18,
      unit_cost: 8,
      estimated_demand: 180,
      available_capacity: 240,
      operating_cost: 260,
      risk_level: 0.22,
      notes: 'High margin but higher waste risk because cakes expire faster.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.65,
        conversion_rate: 0.12,
        marketing_budget: 90,
        labor_cost: 70,
        time_required_hours: 18,
        competitor_pressure: 'medium',
        customer_priority: 'medium',
        ingredient_cost: 150,
        preparation_time_minutes: 8,
        spoilage_risk: 0.18,
        promotion_cost: 90,
      },
    },
  ],
  beauty: [
    {
      option_name: 'Lip Serum Campaign',
      company_field: 'beauty',
      item_name: 'Lip Serum',
      selling_price: 39,
      unit_cost: 14,
      estimated_demand: 190,
      available_capacity: 250,
      operating_cost: 500,
      risk_level: 0.2,
      notes: 'Strong TikTok interest and good repeat purchase potential.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.78,
        conversion_rate: 0.14,
        marketing_budget: 350,
        labor_cost: 120,
        time_required_hours: 20,
        competitor_pressure: 'high',
        customer_priority: 'high',
        repeat_purchase_score: 8,
        packaging_cost: 200,
        campaign_cost: 350,
        review_sentiment_score: 7,
      },
    },
    {
      option_name: 'Glow Mist Launch',
      company_field: 'beauty',
      item_name: 'Glow Mist',
      selling_price: 45,
      unit_cost: 18,
      estimated_demand: 130,
      available_capacity: 180,
      operating_cost: 420,
      risk_level: 0.16,
      notes: 'Premium product with good brand image but lower predicted demand.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.7,
        conversion_rate: 0.1,
        marketing_budget: 280,
        labor_cost: 110,
        time_required_hours: 22,
        competitor_pressure: 'medium',
        customer_priority: 'medium',
        repeat_purchase_score: 7,
        packaging_cost: 250,
        campaign_cost: 280,
        review_sentiment_score: 8,
      },
    },
  ],
  manufacturing: [
    {
      option_name: 'Cutlery Batch A',
      company_field: 'manufacturing',
      item_name: 'Stainless Spoon Set',
      selling_price: 28,
      unit_cost: 11,
      estimated_demand: 420,
      available_capacity: 600,
      operating_cost: 650,
      risk_level: 0.22,
      notes: 'Export customer with stable order volume.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.75,
        conversion_rate: 0.09,
        labor_cost: 350,
        time_required_hours: 40,
        competitor_pressure: 'medium',
        customer_priority: 'high',
        machine_hours: 40,
        raw_material_cost: 300,
        defect_risk: 0.04,
        supplier_lead_time_days: 10,
      },
    },
    {
      option_name: 'Knife Series B',
      company_field: 'manufacturing',
      item_name: 'Kitchen Knife Set',
      selling_price: 36,
      unit_cost: 16,
      estimated_demand: 290,
      available_capacity: 450,
      operating_cost: 700,
      risk_level: 0.18,
      notes: 'Higher margin but longer lead time.',
      sector_data: {
        ...emptySectorData,
        demand_confidence: 0.68,
        conversion_rate: 0.07,
        labor_cost: 420,
        time_required_hours: 52,
        competitor_pressure: 'medium',
        customer_priority: 'medium',
        machine_hours: 52,
        raw_material_cost: 380,
        defect_risk: 0.03,
        supplier_lead_time_days: 14,
      },
    },
  ],
}

export default function InputPage({
  context,
  options,
  setOptions,
  setAnalysisResult,
}) {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [inputMode, setInputMode] = React.useState('basic')

  function addOption() {
    if (options.length >= 5) {
      alert('Maximum 5 decision options allowed. Please choose your top 5 options.')
      return
    }

    setOptions([...options, createEmptyOption(context.company_field)])
  }

  function updateOption(index, field, value) {
    const updated = [...options]
    updated[index][field] = value

    if (field === 'company_field') {
      updated[index].sector_data = { ...emptySectorData }
    }

    setOptions(updated)
  }

  function updateSectorData(index, field, value) {
    const updated = [...options]
    updated[index].sector_data = {
      ...updated[index].sector_data,
      [field]: value,
    }
    setOptions(updated)
  }

  function removeOption(index) {
    setOptions(options.filter((_, i) => i !== index))
  }

  function loadDemo() {
    setOptions(
      demoData[context.company_field] ||
        [createEmptyOption('general'), createEmptyOption('general')]
    )
    setInputMode('advanced')
  }

  function validateOptions() {
    if (options.length < 2) return 'Please add at least 2 options.'
    if (options.length > 5) return 'Maximum 5 options only.'

    for (const option of options) {
      if (!option.option_name || !option.item_name) {
        return 'Every option needs option name and product/service name.'
      }

      if (option.selling_price <= 0) {
        return 'Selling price must be greater than 0.'
      }

      if (option.estimated_demand <= 0) {
        return 'Estimated demand must be greater than 0.'
      }

      if (option.available_capacity <= 0) {
        return 'Available capacity must be greater than 0.'
      }

      if (option.risk_level < 0 || option.risk_level > 1) {
        return 'Risk level must be between 0 and 1.'
      }
    }

    return null
  }

  async function submitAnalysis() {
    const error = validateOptions()
    if (error) {
      alert(error)
      return
    }

    try {
      setLoading(true)

      const profile = JSON.parse(localStorage.getItem('kaching_profile') || '{}')

      const payload = {
        options,
        context: {
          ...context,
          input_mode: inputMode,
          business_profile: profile.business_name ? profile : undefined,
        },
      }

      const result = await analyzeDecision(payload)
      setAnalysisResult(result)
      navigate('/results')
    } catch (error) {
      alert(error.message || 'Analysis failed. Please check backend connection.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container section grid">
      {loading && <LoadingOverlay text="Ka-ching AI is reasoning with Ilmu GLM-5.1..." />}

      <BusinessProfileBar context={context} />
      <DecisionModeInfo />
      <InputLimitsCard />
      <OptionContextCard options={options} />

      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="badge">Input Mode</span>
            <h2>Decision Option Input</h2>
            <p className="subtitle">
              Basic Mode uses mandatory inputs only. Advanced Mode reveals optional fields
              and sector-specific inputs.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className={inputMode === 'basic' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setInputMode('basic')}
            >
              Basic Mode
            </button>

            <button
              className={inputMode === 'advanced' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setInputMode('advanced')}
            >
              Advanced Mode
            </button>

            <button className="btn-secondary" onClick={loadDemo}>
              Auto-fill Demo Data
            </button>

            <button className="btn-primary" onClick={addOption}>
              Add Option
            </button>
          </div>
        </div>
      </div>

      {inputMode === 'advanced' && <ProDataImportPanel />}

      <div className="grid">
        {options.map((option, index) => (
          <OptionForm
            key={index}
            option={option}
            index={index}
            inputMode={inputMode}
            updateOption={updateOption}
            updateSectorData={updateSectorData}
            removeOption={removeOption}
          />
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={submitAnalysis}
        disabled={loading || options.length < 2}
      >
        {loading ? 'Analyzing...' : 'Analyze Opportunity Cost'}
      </button>
    </div>
  )
}