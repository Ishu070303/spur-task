import ChatHeader from '@/components/molecules/ChatHeader'
import MessageList from '@/components/organisms/MessageList'
import MessageInput from '@/components/molecules/MessageInput'
import ErrorBanner from '@/components/atoms/ErrorBanner'
import type { Message } from '@/types'

interface ChatWindowProps {
  messages: Message[]
  loading: boolean
  error: string | null
  onSend: (text: string) => void
  onReset: () => void
  onClose: () => void
}

export default function ChatWindow({ messages, loading, error, onSend, onClose }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader onClose={onClose} />
      <MessageList messages={messages} loading={loading} onSend={onSend} />
      {error && <ErrorBanner message={error} />}
      <MessageInput onSend={onSend} disabled={loading} />
    </div>
  )
}
