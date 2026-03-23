// src/App.tsx
import { useEffect, useRef, useState } from 'react'
import { initSDK } from './runanywhere'
import { speechToText } from './services/stt'
import { generateResponseStream } from './services/llm'
import { speakText } from './services/tts'

export default function App() {
  const [sdkReady, setSdkReady] = useState(false)
  const [status, setStatus]     = useState('Initializing SDK...')
  const [transcript, setTranscript] = useState('')
  const [response, setResponse]     = useState('')
  const isRunning = useRef(false)

  useEffect(() => {
    initSDK()
      .then(() => {
        setSdkReady(true)
        setStatus('Ready — press Speak')
      })
      .catch((err) => {
        console.error(err)
        setStatus('SDK init failed — check console')
      })
  }, [])

  const handleVoiceInput = async () => {
    if (!sdkReady || isRunning.current) return
    isRunning.current = true

    try {
      setStatus('Listening...')
      const userText = await speechToText()
      setTranscript(userText)

      setStatus('Thinking...')
      setResponse('')
      await generateResponseStream(userText, (token) => {
        setResponse((prev) => prev + token)
      })

      setStatus('Speaking...')
      await speakText(response)
      setStatus('Done ✓ — press Speak again')
    } catch (err) {
      console.error(err)
      setStatus('Error — check console')
    } finally {
      isRunning.current = false
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 600 }}>
      <h1>🎙️ Voice AI</h1>
      <p><strong>Status:</strong> {status}</p>
      <button
        onClick={handleVoiceInput}
        disabled={!sdkReady || isRunning.current}
        style={{ fontSize: 18, padding: '10px 24px', cursor: sdkReady ? 'pointer' : 'not-allowed' }}
      >
        🎤 Speak
      </button>
      {transcript && <p><strong>You said:</strong> {transcript}</p>}
      {response   && <p><strong>Response:</strong> {response}</p>}
    </div>
  )
}