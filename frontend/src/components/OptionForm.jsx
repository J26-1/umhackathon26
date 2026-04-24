import React from 'react'
import SectorFields from './SectorFields'

export default function OptionForm({
  option,
  index,
  inputMode,
  updateOption,
  updateSectorData,
  removeOption,
}) {
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <span className="badge">Option {index + 1}</span>
          <h3>{option.option_name || 'Unnamed option'}</h3>
          <p className="small">
            {inputMode === 'basic'
              ? 'Basic Mode: only mandatory inputs are shown.'
              : 'Advanced Mode: optional fields improve accuracy.'}
          </p>
        </div>

        <button className="btn-secondary" onClick={() => removeOption(index)}>
          Remove
        </button>
      </div>

      <h4>Level 1 · Mandatory Inputs</h4>
      <p className="small">
        Required to calculate profit, ROI, opportunity cost, and basic recommendation.
      </p>

      <div className="grid grid-2">
        <label>
          Company Field *
          <select
            value={option.company_field}
            onChange={(e) => updateOption(index, 'company_field', e.target.value)}
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
          Option Name *
          <input
            value={option.option_name}
            onChange={(e) => updateOption(index, 'option_name', e.target.value)}
            required
          />
        </label>

        <label>
          Product / Service Name *
          <input
            value={option.item_name}
            onChange={(e) => updateOption(index, 'item_name', e.target.value)}
            required
          />
        </label>

        <label>
          Selling Price *
          <input
            type="number"
            min="0"
            value={option.selling_price}
            onChange={(e) => updateOption(index, 'selling_price', Number(e.target.value))}
            required
          />
        </label>

        <label>
          Unit Cost *
          <input
            type="number"
            min="0"
            value={option.unit_cost}
            onChange={(e) => updateOption(index, 'unit_cost', Number(e.target.value))}
            required
          />
        </label>

        <label>
          Estimated Demand *
          <input
            type="number"
            min="0"
            value={option.estimated_demand}
            onChange={(e) => updateOption(index, 'estimated_demand', Number(e.target.value))}
            required
          />
        </label>

        <label>
          Available Capacity *
          <input
            type="number"
            min="0"
            value={option.available_capacity}
            onChange={(e) => updateOption(index, 'available_capacity', Number(e.target.value))}
            required
          />
        </label>

        <label>
          Operating Cost *
          <input
            type="number"
            min="0"
            value={option.operating_cost}
            onChange={(e) => updateOption(index, 'operating_cost', Number(e.target.value))}
            required
          />
        </label>

        <label>
          Risk Level (0–1) *
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={option.risk_level}
            onChange={(e) => updateOption(index, 'risk_level', Number(e.target.value))}
            required
          />
        </label>
      </div>

      <label style={{ marginTop: 16, display: 'block' }}>
        Business Notes / Context
        <textarea
          rows="3"
          maxLength={500}
          value={option.notes}
          onChange={(e) => updateOption(index, 'notes', e.target.value)}
          placeholder="Example: trending on TikTok but supplier delivery is unstable..."
        />
        <div className="small">{option.notes?.length || 0}/500 characters</div>
      </label>

      {inputMode === 'advanced' && (
        <div style={{ marginTop: 18 }}>
          <SectorFields
            option={option}
            index={index}
            updateSectorData={updateSectorData}
          />
        </div>
      )}
    </div>
  )
}