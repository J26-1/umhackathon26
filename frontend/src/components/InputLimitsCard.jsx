import React, { useEffect, useState } from 'react'
import { fetchInputLimits } from '../api'

export default function InputLimitsCard() {
  const [limits, setLimits] = useState(null)

  useEffect(() => {
    fetchInputLimits().then(setLimits).catch(() => setLimits(null))
  }, [])

  if (!limits) return null

  return (
    <div className="card">
      <span className="badge">Input Policy</span>
      <h3>Maximum Input Size</h3>

      <div className="grid grid-3">
        <div className="kpi-card">
          <strong>Level 1 Basic</strong>
          <p className="small">Max options: {limits.level_1_basic.max_options}</p>
          <p className="small">{limits.level_1_basic.notes_limit}</p>
          <p className="small">{limits.level_1_basic.behavior}</p>
        </div>

        <div className="kpi-card">
          <strong>Level 2 Advanced</strong>
          <p className="small">Max options: {limits.level_2_advanced.max_options}</p>
          <p className="small">{limits.level_2_advanced.fields_per_option}</p>
          <p className="small">{limits.level_2_advanced.behavior}</p>
        </div>

        <div className="kpi-card">
          <strong>Level 3 Pro Data</strong>
          <p className="small">Rows: {limits.level_3_pro_data.csv_excel_row_limit}</p>
          <p className="small">File: {limits.level_3_pro_data.file_size_limit}</p>
          <p className="small">{limits.level_3_pro_data.behavior}</p>
        </div>
      </div>
    </div>
  )
}