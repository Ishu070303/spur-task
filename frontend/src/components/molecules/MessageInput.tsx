import { useState, useRef, KeyboardEvent } from 'react'
import SendButton from '@/components/atoms/SendButton'

interface MessageInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

const LINE_HEIGHT = 24
const MAX_LINES = 3
const PADDING_V = 8
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES + PADDING_V

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + 'px'
  }

  const hasContent = value.trim().length > 0

  return (
    <div
      className="flex items-end gap-2 px-4 py-3 flex-shrink-0"
      style={{
        background: 'white',
        borderTop: '1px solid #D2D2D7',
        borderRadius: '0 0 20px 20px',
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        disabled={disabled}
        placeholder="Message..."
        rows={1}
        className="flex-1 resize-none bg-transparent text-[14px] text-[#1D1D1F] placeholder-[#AEAEB2] outline-none leading-6 font-normal disabled:opacity-50 overflow-y-auto py-1"
        style={{ maxHeight: MAX_HEIGHT }}
      />
      <SendButton
        disabled={!hasContent || disabled}
        visible={hasContent}
        onClick={submit}
      />
    </div>
  )
}
