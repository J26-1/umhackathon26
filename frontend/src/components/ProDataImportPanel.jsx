import React, { useState } from 'react'
import { extractTextInput, uploadCsvPreview } from '../api'

export default function ProDataImportPanel() {
  const [text, setText] = useState('')
  const [extractResult, setExtractResult] = useState(null)
  const [csvResult, setCsvResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleExtract() {
    if (!text.trim()) {
      alert('Please enter business text first.')
      return
    }

    try {
      setLoading(true)
      const result = await extractTextInput(text)
      setExtractResult(result)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCsvUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      const result = await uploadCsvPreview(file)
      setCsvResult(result)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card info-card">
      <span className="badge">Level 3 · Pro Data Import</span>
      <h3>Advanced / Auto Data Input</h3>
      <p className="subtitle">
        Future Pro workflow: upload CSV / Excel, connect POS / Shopee / ERP, or let Ilmu GLM-5.1 extract useful decision data from text.
      </p>

      <div className="grid grid-3">
        <div className="kpi-card">
          <strong>Upload CSV</strong>
          <p className="small">
            Limit: 1,000 rows or 5 MB. Only key decision columns are extracted.
          </p>
          <input type="file" accept=".csv" onChange={handleCsvUpload} />
        </div>

        <div className="kpi-card">
          <strong>Connect Shopee / POS / ERP</strong>
          <p className="small">
            Planned integration for automatic sales, cost, and inventory data.
          </p>
          <button className="btn-secondary" disabled>
            Coming Soon
          </button>
        </div>

        <div className="kpi-card">
          <strong>AI Text Extraction</strong>
          <p className="small">
            Example: “My monthly rent is RM3000 and demand is around 200 units.”
          </p>
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your business data here..."
          />
          <button
            className="btn-primary"
            style={{ marginTop: 10 }}
            onClick={handleExtract}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Extract with Ilmu GLM-5.1'}
          </button>
        </div>
      </div>

      {extractResult && (
        <div className="card" style={{ marginTop: 20 }}>
          <h4>AI Extracted Preview</h4>
          <pre className="report-box">{JSON.stringify(extractResult, null, 2)}</pre>
        </div>
      )}

      {csvResult && (
        <div className="card" style={{ marginTop: 20 }}>
          <h4>CSV Preview</h4>
          <p className="subtitle">{csvResult.message}</p>
          <p className="small">Rows detected: {csvResult.row_count}</p>
          <pre className="report-box">
            {JSON.stringify(csvResult.preview_rows, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}