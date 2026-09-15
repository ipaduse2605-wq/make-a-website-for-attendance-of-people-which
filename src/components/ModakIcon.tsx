export function ModakIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="modakBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* plate */}
      <ellipse cx="32" cy="54" rx="22" ry="5" fill="#7c2d12" opacity="0.18" />
      {/* body */}
      <path
        d="M32 8c-5 8-13 14-13 26 0 9 6 14 13 14s13-5 13-14C45 22 37 16 32 8Z"
        fill="url(#modakBody)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      {/* pleats */}
      <path d="M32 12v36" stroke="#b45309" strokeWidth="1.2" opacity="0.55" />
      <path d="M25 18c1 12 1 22 3 28" stroke="#b45309" strokeWidth="1.2" opacity="0.4" />
      <path d="M39 18c-1 12-1 22-3 28" stroke="#b45309" strokeWidth="1.2" opacity="0.4" />
      {/* tip */}
      <circle cx="32" cy="7" r="3" fill="#f97316" stroke="#b45309" strokeWidth="1.2" />
    </svg>
  )
}
