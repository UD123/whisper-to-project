export function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="2.4" />
        <path d="M12 2.6v4.6M12 16.8v4.6M2.6 12h4.6M16.8 12h4.6" />
        <path d="M5.4 5.4l3.3 3.3M15.3 15.3l3.3 3.3M18.6 5.4l-3.3 3.3M8.7 15.3l-3.3 3.3" />
      </g>
    </svg>
  );
}
