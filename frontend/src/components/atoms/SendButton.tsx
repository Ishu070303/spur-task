import { IoArrowUp } from 'react-icons/io5'
import { cn } from '@/lib/utils'

interface SendButtonProps {
  disabled?: boolean
  visible?: boolean
  onClick?: () => void
}

export default function SendButton({ disabled, visible = true, onClick }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={cn(
        'flex items-center justify-center rounded-full bg-black text-white flex-shrink-0',
        'transition-all duration-200 ease-out',
        'active:scale-[0.90]',
        visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none w-0 overflow-hidden',
        disabled && visible && 'opacity-40 cursor-not-allowed active:scale-100'
      )}
      style={{ width: 32, height: 32 }}
      aria-label="Send message"
    >
      <IoArrowUp size={16} />
    </button>
  )
}
