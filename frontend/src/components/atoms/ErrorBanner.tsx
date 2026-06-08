import { useEffect, useState } from 'react'

interface ErrorBannerProps {
  message: string
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  const [leaving, setLeaving] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    setLeaving(false)
    setMounted(true)
    const leaveTimer = setTimeout(() => setLeaving(true), 4600)
    const unmountTimer = setTimeout(() => setMounted(false), 5000)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(unmountTimer)
    }
  }, [message])

  if (!mounted) return null

  return (
    <div
      className="mx-4 mb-3 overflow-hidden"
      style={{
        animation: leaving
          ? 'errorSlideUp 0.35s ease forwards'
          : 'errorSlideDown 0.3s ease',
      }}
    >
      <div className="px-4 py-2.5 bg-[#FFF2F2] border border-[#FFCDD2] rounded-xl text-[13px] text-[#D32F2F] font-normal">
        {message}
      </div>
    </div>
  )
}
