import React from 'react'

function numberValue(value) {
  return value ?? ''
}

function parseOptionalNumber(value) {
  return value === '' ? null : Number(value)
}

export default function SectorFields({ option, index, updateSectorData }) {
  const sector = option.company_field
  const data = option.sector_data || {}

  return (
    <div className="grid">
      <div className="card">
        <span className="badge">Level 2 · Smart Optional Inputs</span>
        <h4>Improve Accuracy</h4>
        <p className="small">
          Leave unknown fields blank. Ka-ching AI will use transparent SME fallback assumptions.
        </p>

        <div className="grid grid-2">
          <label>
            Marketing Budget
            <input
              type="number"
              value={numberValue(data.marketing_budget)}
              onChange={(e) =>
                updateSectorData(index, 'marketing_budget', parseOptionalNumber(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          <label>
            Labor Cost
            <input
              type="number"
              value={numberValue(data.labor_cost)}
              onChange={(e) =>
                updateSectorData(index, 'labor_cost', parseOptionalNumber(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          <label>
            Fixed Cost
            <input
              type="number"
              value={numberValue(data.fixed_cost)}
              onChange={(e) =>
                updateSectorData(index, 'fixed_cost', parseOptionalNumber(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          <label>
            Time Required (hours)
            <input
              type="number"
              value={numberValue(data.time_required_hours)}
              onChange={(e) =>
                updateSectorData(index, 'time_required_hours', parseOptionalNumber(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          <label>
            Demand Confidence (0–1)
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={numberValue(data.demand_confidence)}
              onChange={(e) =>
                updateSectorData(index, 'demand_confidence', parseOptionalNumber(e.target.value))
              }
              placeholder="Example: 0.8"
            />
          </label>

          <label>
            Conversion Rate (0–1)
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={numberValue(data.conversion_rate)}
              onChange={(e) =>
                updateSectorData(index, 'conversion_rate', parseOptionalNumber(e.target.value))
              }
              placeholder="Example: 0.12"
            />
          </label>

          <label>
            Competitor Pressure
            <select
              value={data.competitor_pressure ?? ''}
              onChange={(e) =>
                updateSectorData(index, 'competitor_pressure', e.target.value || null)
              }
            >
              <option value="">Unknown</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label>
            Customer Priority
            <select
              value={data.customer_priority ?? ''}
              onChange={(e) =>
                updateSectorData(index, 'customer_priority', e.target.value || null)
              }
            >
              <option value="">Unknown</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
      </div>

      {sector === 'fnb' && (
        <div className="card">
          <h4>F&B Optional Inputs</h4>
          <div className="grid grid-2">
            <label>
              Ingredient Cost
              <input
                type="number"
                value={numberValue(data.ingredient_cost)}
                onChange={(e) =>
                  updateSectorData(index, 'ingredient_cost', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Preparation Time (minutes)
              <input
                type="number"
                value={numberValue(data.preparation_time_minutes)}
                onChange={(e) =>
                  updateSectorData(index, 'preparation_time_minutes', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Spoilage Risk (0–1)
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={numberValue(data.spoilage_risk)}
                onChange={(e) =>
                  updateSectorData(index, 'spoilage_risk', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Promotion Cost
              <input
                type="number"
                value={numberValue(data.promotion_cost)}
                onChange={(e) =>
                  updateSectorData(index, 'promotion_cost', parseOptionalNumber(e.target.value))
                }
              />
            </label>
          </div>
        </div>
      )}

      {sector === 'beauty' && (
        <div className="card">
          <h4>Beauty Optional Inputs</h4>
          <div className="grid grid-2">
            <label>
              Repeat Purchase Score (0–10)
              <input
                type="number"
                min="0"
                max="10"
                value={numberValue(data.repeat_purchase_score)}
                onChange={(e) =>
                  updateSectorData(index, 'repeat_purchase_score', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Packaging Cost
              <input
                type="number"
                value={numberValue(data.packaging_cost)}
                onChange={(e) =>
                  updateSectorData(index, 'packaging_cost', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Campaign Cost
              <input
                type="number"
                value={numberValue(data.campaign_cost)}
                onChange={(e) =>
                  updateSectorData(index, 'campaign_cost', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Review Sentiment Score (0–10)
              <input
                type="number"
                min="0"
                max="10"
                value={numberValue(data.review_sentiment_score)}
                onChange={(e) =>
                  updateSectorData(index, 'review_sentiment_score', parseOptionalNumber(e.target.value))
                }
              />
            </label>
          </div>
        </div>
      )}

      {sector === 'manufacturing' && (
        <div className="card">
          <h4>Manufacturing Optional Inputs</h4>
          <div className="grid grid-2">
            <label>
              Machine Hours
              <input
                type="number"
                value={numberValue(data.machine_hours)}
                onChange={(e) =>
                  updateSectorData(index, 'machine_hours', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Raw Material Cost
              <input
                type="number"
                value={numberValue(data.raw_material_cost)}
                onChange={(e) =>
                  updateSectorData(index, 'raw_material_cost', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Defect Risk (0–1)
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={numberValue(data.defect_risk)}
                onChange={(e) =>
                  updateSectorData(index, 'defect_risk', parseOptionalNumber(e.target.value))
                }
              />
            </label>

            <label>
              Supplier Lead Time (days)
              <input
                type="number"
                value={numberValue(data.supplier_lead_time_days)}
                onChange={(e) =>
                  updateSectorData(index, 'supplier_lead_time_days', parseOptionalNumber(e.target.value))
                }
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}