export default function TypingIndicator() {
  return (
    <div
      style={{ animation: 'slideInLeft 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
    >
      <div
        className="inline-flex items-center gap-[5px] px-4 py-3 bg-[#F5F5F7]"
        style={{ borderRadius: '18px 18px 18px 4px' }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[6px] h-[6px] rounded-full bg-[#6E6E73]"
            style={{
              animation: 'typingDot 1.2s ease infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
