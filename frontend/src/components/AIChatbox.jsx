import React, { useState } from 'react'
import { sendChat } from '../api'

export default function AIChatbox({ analysisResult }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hi, I am your Ilmu GLM-5.1 assistant. Ask me why one option is better than another.',
    },
  ])

  async function handleSend() {
    if (!message.trim()) return

    const userText = message
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setMessage('')
    setLoading(true)

    try {
      const data = await sendChat(userText, analysisResult)
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, I could not connect to the AI service.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>AI Assistant</strong>
                <div className="small">Powered by Ilmu GLM-5.1</div>
              </div>
              <button className="btn-secondary" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>

            <div className="chat-messages" style={{ marginTop: 12 }}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'message-user' : 'message-ai'}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="message-ai">Thinking...</div>}
            </div>

            <textarea
              rows="2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask why this option is recommended..."
            />

            <button className="btn-primary" style={{ marginTop: 10 }} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}

      <button className="chat-floating-btn" onClick={() => setOpen(!open)}>
        💬
      </button>
    </>
  )
}