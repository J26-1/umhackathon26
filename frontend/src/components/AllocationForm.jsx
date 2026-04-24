import React from 'react'

export default function AllocationForm({
  option,
  index,
  updateOption,
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
        }}
      >
        <h3>Option {index + 1}</h3>
        <button className="btn-secondary" onClick={() => removeOption(index)}>
          Remove
        </button>
      </div>

      <div className="grid grid-2">
        <label>
          Option Name
          <input
            value={option.option_name}
            onChange={(e) => updateOption(index, 'option_name', e.target.value)}
          />
        </label>

        <label>
          Fuel Type
          <select
            value={option.fuel_type}
            onChange={(e) => updateOption(index, 'fuel_type', e.target.value)}
          >
            <option>Diesel</option>
            <option>Petrol</option>
            <option>Industrial Fuel</option>
            <option>Jet Fuel</option>
            <option>LPG</option>
          </select>
        </label>

        <label>
          Customer Name
          <input
            value={option.customer_name}
            onChange={(e) => updateOption(index, 'customer_name', e.target.value)}
          />
        </label>

        <label>
          Selling Price / Litre
          <input
            type="number"
            value={option.selling_price_per_litre}
            onChange={(e) =>
              updateOption(index, 'selling_price_per_litre', Number(e.target.value))
            }
          />
        </label>

        <label>
          Unit Cost / Litre
          <input
            type="number"
            value={option.unit_cost_per_litre}
            onChange={(e) =>
              updateOption(index, 'unit_cost_per_litre', Number(e.target.value))
            }
          />
        </label>

        <label>
          Available Volume (L)
          <input
            type="number"
            value={option.available_volume_litres}
            onChange={(e) =>
              updateOption(index, 'available_volume_litres', Number(e.target.value))
            }
          />
        </label>

        <label>
          Estimated Demand (L)
          <input
            type="number"
            value={option.estimated_demand_litres}
            onChange={(e) =>
              updateOption(index, 'estimated_demand_litres', Number(e.target.value))
            }
          />
        </label>

        <label>
          Transport Cost
          <input
            type="number"
            value={option.transport_cost}
            onChange={(e) => updateOption(index, 'transport_cost', Number(e.target.value))}
          />
        </label>

        <label>
          Delivery Distance (km)
          <input
            type="number"
            value={option.delivery_distance_km}
            onChange={(e) =>
              updateOption(index, 'delivery_distance_km', Number(e.target.value))
            }
          />
        </label>

        <label>
          Tanker Capacity Used Ratio
          <input
            type="number"
            step="0.01"
            value={option.tanker_capacity_used_ratio}
            onChange={(e) =>
              updateOption(index, 'tanker_capacity_used_ratio', Number(e.target.value))
            }
          />
        </label>

        <label>
          Storage Cost
          <input
            type="number"
            value={option.storage_cost}
            onChange={(e) => updateOption(index, 'storage_cost', Number(e.target.value))}
          />
        </label>

        <label>
          Customer Priority
          <select
            value={option.customer_priority}
            onChange={(e) => updateOption(index, 'customer_priority', e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label>
          Contract Type
          <select
            value={option.contract_type}
            onChange={(e) => updateOption(index, 'contract_type', e.target.value)}
          >
            <option>Spot</option>
            <option>Long-term</option>
          </select>
        </label>

        <label>
          Return Risk
          <input
            type="number"
            step="0.01"
            value={option.return_risk}
            onChange={(e) => updateOption(index, 'return_risk', Number(e.target.value))}
          />
        </label>
      </div>

      <label style={{ marginTop: 16, display: 'block' }}>
        Notes
        <textarea
          rows="3"
          value={option.notes}
          onChange={(e) => updateOption(index, 'notes', e.target.value)}
        />
      </label>
    </div>
  )
}