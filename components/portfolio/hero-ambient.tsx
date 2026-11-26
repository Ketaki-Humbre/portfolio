export function HeroAmbient() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full text-brand"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
    >
      <defs>
        <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill="url(#hero-dots)" opacity="0.07" />
      <path
        d="M0 470 C 160 450, 240 380, 380 400 S 600 300, 740 320 S 960 200, 1080 170 L 1200 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.08"
        className="ambient-line"
      />
      <g fill="currentColor" opacity="0.08">
        <circle cx="380" cy="400" r="4" />
        <circle cx="740" cy="320" r="4" />
        <circle cx="1080" cy="170" r="4" />
      </g>
    </svg>
  )
}
