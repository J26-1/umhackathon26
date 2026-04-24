import React from 'react'

export default function OptionContextCard({ options }) {
  return (
    <div className="card">
      <span className="badge">Visible Options</span>
      <h3>Current Decision Options</h3>

      {!options?.length ? (
        <p className="subtitle">No options added yet.</p>
      ) : (
        <div className="pill-row">
          {options.map((option, index) => (
            <span className="pill" key={`${option.option_name || option.item_name || index}`}>
              {option.option_name || 'Unnamed option'} • {option.company_field}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}