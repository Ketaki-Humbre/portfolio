import type { DomainKey } from '@/src/data/portfolioData'

function FlowMotif() {
  const nodes = [24, 100, 176]
  return (
    <svg viewBox="0 0 200 56" className="h-14 w-full" aria-hidden="true">
      <path d="M24 28 H176" stroke="var(--d-accent)" strokeWidth="2" fill="none" opacity="0.7" className="flow-dash" />
      {nodes.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="28" r="13" fill="var(--surface)" stroke="var(--d-accent)" strokeWidth="2" />
          <circle cx={x} cy="28" r="5" fill="var(--d-accent)" className={i === 1 ? 'soft-pulse' : undefined} />
        </g>
      ))}
    </svg>
  )
}

function BarsMotif() {
  const bars = [18, 28, 36, 46]
  return (
    <svg viewBox="0 0 200 56" className="h-14 w-full" aria-hidden="true">
      <line x1="40" y1="52" x2="160" y2="52" stroke="var(--line)" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect
          key={h}
          x={52 + i * 26}
          y={52 - h}
          width="16"
          height={h}
          rx="3"
          fill="var(--d-accent)"
          opacity={0.45 + i * 0.18}
          className="bar-grow"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      <path d="M60 30 L86 22 L112 16 L138 6" stroke="var(--d-text)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function BranchMotif() {
  return (
    <svg viewBox="0 0 200 56" className="h-14 w-full" aria-hidden="true">
      <path d="M24 20 H176" stroke="var(--ok)" strokeWidth="2" fill="none" pathLength={1} className="draw-path" />
      <path
        d="M100 20 C 120 20, 120 44, 144 44 H170"
        stroke="var(--d-accent)"
        strokeWidth="2"
        fill="none"
        className="flow-dash"
      />
      <circle cx="24" cy="20" r="6" fill="var(--ok)" />
      <circle cx="100" cy="20" r="6" fill="var(--d-accent)" />
      <circle cx="176" cy="20" r="6" fill="var(--ok)" />
      <rect x="166" y="38" width="12" height="12" rx="3" fill="var(--d-accent)" />
    </svg>
  )
}

export function CardMotif({ domain }: { domain: DomainKey }) {
  if (domain === 'mfg') return <FlowMotif />
  if (domain === 'ecom') return <BarsMotif />
  return <BranchMotif />
}
