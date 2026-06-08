import { IoClose } from 'react-icons/io5'

interface ChatHeaderProps {
  onClose: () => void
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-[14px] bg-black flex-shrink-0"
      style={{ borderRadius: '20px 20px 0 0' }}
    >
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-semibold text-white leading-tight">Nova Store Support</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="block w-[6px] h-[6px] rounded-full bg-[#34C759]" aria-hidden="true" />
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Online
          </span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150"
        style={{ color: 'rgba(255,255,255,0.8)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        aria-label="Close chat"
      >
        <IoClose size={18} />
      </button>
    </div>
  )
}
