import axios from 'axios'
import type { Message } from '@/types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const client = axios.create({ baseURL: BASE_URL })

interface PostMessageResponse {
  reply: string
  sessionId: string
}

interface GetHistoryResponse {
  messages: Array<{
    id: string
    text: string
    sender: 'user' | 'ai'
    timestamp: string
  }>
}

export async function postMessage(message: string, sessionId: string): Promise<PostMessageResponse> {
  const { data } = await client.post<PostMessageResponse>('/chat/message', { message, sessionId })
  return data
}

export async function getHistory(sessionId: string): Promise<Message[]> {
  const { data } = await client.get<GetHistoryResponse>(`/chat/${sessionId}/messages`)
  return data.messages.map((m) => ({
    ...m,
    timestamp: new Date(m.timestamp),
  }))
}
