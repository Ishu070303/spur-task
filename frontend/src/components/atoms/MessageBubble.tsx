import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Sender } from '@/types'
import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  text: string
  sender: Sender
  timestamp: Date
  isLastInGroup: boolean
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const markdownComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h2: ({ children }) => (
    <h2 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, marginTop: 8, color: '#1D1D1F' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, marginTop: 8, color: '#1D1D1F' }}>
      {children}
    </h3>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: 16, margin: '4px 0', color: '#1D1D1F' }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: 16, margin: '4px 0', color: '#1D1D1F' }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ margin: '2px 0', color: '#1D1D1F' }}>{children}</li>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: '#1D1D1F' }}>{children}</strong>
  ),
  p: ({ children }) => (
    <p style={{ margin: '4px 0', color: '#1D1D1F' }}>{children}</p>
  ),
}

export default function MessageBubble({ text, sender, timestamp, isLastInGroup }: MessageBubbleProps) {
  const [hovered, setHovered] = useState(false)
  const isUser = sender === 'user'

  const borderRadius = isLastInGroup
    ? isUser
      ? '18px 18px 4px 18px'
      : '18px 18px 18px 4px'
    : '18px'

  return (
    <div
      className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}
      style={{
        animation: isUser
          ? 'slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both'
          : 'slideInLeft 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          'max-w-[72%] px-4 py-3 text-[15px] leading-[1.5] font-normal break-words transition-colors duration-150',
          isUser
            ? 'bg-black text-white'
            : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EBEBED]'
        )}
        style={{
          borderRadius,
          ...(isUser ? { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' } : {}),
        }}
      >
        {isUser ? (
          text
        ) : (
          <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
        )}
      </div>
      <span
        className="text-[11px] text-[#6E6E73] px-1 mt-1 transition-opacity duration-200 select-none"
        style={{
          opacity: isLastInGroup && hovered ? 1 : 0,
          height: isLastInGroup ? undefined : 0,
          overflow: 'hidden',
        }}
      >
        {formatTime(timestamp)}
      </span>
    </div>
  )
}
