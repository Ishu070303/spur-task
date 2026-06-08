import { useState } from 'react'
import { IoChatbubbleEllipses, IoClose } from 'react-icons/io5'
import ChatWindow from '@/components/organisms/ChatWindow'
import { useChat } from '@/hooks/useChat'

type WidgetState = 'closed' | 'opening' | 'open' | 'closing'

export default function ChatPage() {
  const [widgetState, setWidgetState] = useState<WidgetState>('closed')
  const { messages, loading, error, sendMessage, resetSession } = useChat()

  const isLogicallyOpen = widgetState !== 'closed'

  function handleOpen() {
    setWidgetState('opening')
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setWidgetState('open'))
    )
  }

  function handleClose() {
    setWidgetState('closing')
    setTimeout(() => setWidgetState('closed'), 300)
  }

  function handleToggle() {
    if (widgetState === 'closed' || widgetState === 'closing') {
      handleOpen()
    } else {
      handleClose()
    }
  }

  const widgetAnimation =
    widgetState === 'open'
      ? 'widgetOpen 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both'
      : widgetState === 'closing'
        ? 'widgetClose 0.3s cubic-bezier(0.4, 0, 0.2, 1) both'
        : 'none'

  return (
    <>
      {/* Fake e-commerce landing page */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#AEAEB2] mb-5">
          New Collection 2024
        </p>
        <h1
          className="text-[60px] font-semibold text-[#1D1D1F] leading-tight mb-4"
          style={{ letterSpacing: '-0.03em' }}
        >
          Nova Store
        </h1>
        <p className="text-[18px] text-[#6E6E73] font-normal mb-10 max-w-[380px] leading-relaxed">
          Premium quality, delivered to your door
        </p>
        <button className="px-8 py-3.5 bg-black text-white text-[15px] font-medium rounded-full transition-all duration-200 hover:opacity-80 active:scale-[0.97]">
          Shop Now
        </button>
      </div>

      {/* Chat window */}
      {widgetState !== 'closed' && (
        <div
          className="fixed overflow-hidden flex flex-col bg-white"
          style={{
            bottom: 80,
            right: 24,
            width: 380,
            height: 580,
            borderRadius: 20,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            transformOrigin: 'bottom right',
            ...(widgetState === 'opening'
              ? { opacity: 0, transform: 'scale(0.8)' }
              : { animation: widgetAnimation }),
          }}
        >
          <ChatWindow
            messages={messages}
            loading={loading}
            error={error}
            onSend={sendMessage}
            onReset={resetSession}
            onClose={handleClose}
          />
        </div>
      )}

      {/* Floating toggle button — wrapper div handles pulse, inner button handles rotation */}
      <div
        className="fixed"
        style={{
          bottom: 24,
          right: 24,
          animation: !isLogicallyOpen ? 'buttonPulse 3s ease infinite' : 'none',
        }}
      >
        <button
          onClick={handleToggle}
          className="flex items-center justify-center bg-black text-white rounded-full"
          style={{
            width: 56,
            height: 56,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            transform: isLogicallyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label={isLogicallyOpen ? 'Close chat' : 'Open chat'}
        >
          {isLogicallyOpen ? (
            <IoClose size={20} color="white" />
          ) : (
            <IoChatbubbleEllipses size={22} color="white" />
          )}
        </button>
      </div>
    </>
  )
}
