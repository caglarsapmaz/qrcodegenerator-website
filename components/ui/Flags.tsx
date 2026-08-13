export function TurkishFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#E30A17" />
      <circle cx="11.5" cy="10" r="5.2" fill="#fff" />
      <circle cx="12.8" cy="10" r="4" fill="#E30A17" />
      <path
        d="M18.2 10l1.1 0.9-0.4-1.4 1.1-0.9h-1.4l-0.4-1.4-0.4 1.4z"
        fill="#fff"
      />
    </svg>
  );
}

export function EnglishFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#012169" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2" />
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="7" />
      <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3.5" />
    </svg>
  );
}
