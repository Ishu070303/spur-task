import { useState, useEffect, useCallback } from 'react'
import type { Message } from '@/types'
import { postMessage, getHistory } from '@/services/api'

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function createFreshSessionId(): string {
  localStorage.removeItem('nova_session_id')
  const id = generateUUID()
  localStorage.setItem('nova_session_id', id)
  return id
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>(createFreshSessionId)

  useEffect(() => {
    getHistory(sessionId)
      .then((history) => {
        if (history.length > 0) setMessages(history)
      })
      .catch(() => {})
  }, [sessionId])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      const userMsg: Message = {
        id: generateUUID(),
        text: trimmed,
        sender: 'user',
        timestamp: new Date(),
      }

      setMessages((prev: Message[]) => [...prev, userMsg])
      setLoading(true)
      setError(null)

      try {
        const { reply } = await postMessage(trimmed, sessionId)
        const aiMsg: Message = {
          id: generateUUID(),
          text: reply,
          sender: 'ai',
          timestamp: new Date(),
        }
        setMessages((prev: Message[]) => [...prev, aiMsg])
      } catch {
        setError('Something went wrong. Please try again.')
        setTimeout(() => setError(null), 5000)
      } finally {
        setLoading(false)
      }
    },
    [loading, sessionId]
  )

  const resetSession = useCallback(() => {
    localStorage.removeItem('nova_session_id')
    const newId = generateUUID()
    localStorage.setItem('nova_session_id', newId)
    setSessionId(newId)
    setMessages([])
    setError(null)
  }, [])

  return { messages, loading, error, sendMessage, resetSession }
}
