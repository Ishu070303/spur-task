import { useEffect, useRef } from 'react'
import { RiRobot2Line } from 'react-icons/ri'
import MessageBubble from '@/components/atoms/MessageBubble'
import TypingIndicator from '@/components/atoms/TypingIndicator'
import type { Message } from '@/types'

const SUGGESTIONS = ['Return policy', 'Shipping to USA?', 'Support hours']

interface MessageListProps {
  messages: Message[]
  loading: boolean
  onSend: (text: string) => void
}

interface GroupedMessage extends Message {
  isLastInGroup: boolean
  isFirstInGroup: boolean
}

function groupMessages(messages: Message[]): GroupedMessage[] {
  return messages.map((msg, i) => ({
    ...msg,
    isFirstInGroup: i === 0 || messages[i - 1].sender !== msg.sender,
    isLastInGroup: i === messages.length - 1 || messages[i + 1].sender !== msg.sender,
  }))
}

export default function MessageList({ messages, loading, onSend }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const grouped = groupMessages(messages)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-8 text-center">
        <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
          {/* Bot icon */}
          <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto mb-4">
            <RiRobot2Line size={22} color="#6E6E73" />
          </div>

          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-2">Hi there! 👋</h2>
          <p className="text-[13px] text-[#6E6E73] font-normal mb-6 max-w-[240px] mx-auto leading-relaxed">
            Ask me anything about Nova Store shipping, returns, or support.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSend(s)}
                className="px-3.5 py-2 rounded-full border border-[#D2D2D7] text-[13px] text-[#1D1D1F] font-normal bg-white"
                style={{ transition: 'transform 0.15s ease, background 0.15s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.background = '#F5F5F7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'white'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="flex flex-col">
        {grouped.map((msg) => (
          <div
            key={msg.id}
            className={msg.isLastInGroup ? 'mb-3' : 'mb-[3px]'}
          >
            <MessageBubble
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isLastInGroup={msg.isLastInGroup}
            />
          </div>
        ))}
        {loading && (
          <div className="mb-2">
            <TypingIndicator />
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
