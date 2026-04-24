const BASE_URL = 'https://kaching-ai-backend.onrender.com'

async function handleResponse(response, fallbackMessage) {
  if (!response.ok) {
    let errorMessage = fallbackMessage

    try {
      const error = await response.json()
      errorMessage = error.detail || fallbackMessage
    } catch {
      errorMessage = fallbackMessage
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

export async function analyzeDecision(payload) {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return handleResponse(response, 'Analysis failed')
}

export async function simulateDecision(payload) {
  const response = await fetch(`${BASE_URL}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return handleResponse(response, 'Simulation failed')
}

export async function fetchHistory() {
  const response = await fetch(`${BASE_URL}/history`)
  return handleResponse(response, 'Failed to fetch history')
}

export async function sendChat(message, analysisResult) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      analysis_result: analysisResult,
    }),
  })

  return handleResponse(response, 'Chat failed')
}

export async function fetchInputLimits() {
  const response = await fetch(`${BASE_URL}/input-limits`)
  return handleResponse(response, 'Failed to fetch input limits')
}

export async function extractTextInput(text) {
  const response = await fetch(`${BASE_URL}/extract-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  return handleResponse(response, 'Text extraction failed')
}

export async function uploadCsvPreview(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${BASE_URL}/upload-csv-preview`, {
    method: 'POST',
    body: formData,
  })

  return handleResponse(response, 'CSV upload failed')
}