import './svg-icon.css'

export default function SvgIcon({
  type = 'up-arrow',
  size = 24,
  color = '#525577',
  label = '',
}) {
  return type === 'spinner' ? (
    <Spinner label={label} size={size} color={color} />
  ) : (
    <StaticIcon type={type} label={label} size={size} color={color} />
  )
}

export function Spinner({ label = '', size = 24, color = '#525577' }) {
  return (
    <svg
      aria-hidden={!label}
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
    >
      <title>{label}</title>
      <g className="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
      </g>
    </svg>
  )
}

export function StaticIcon({
  type = 'up-arrow',
  label = '',
  size = 24,
  color = '#525577',
}) {
  let d

  switch (type) {
    case 'up-arrow':
      d =
        'M1.802 3.657L5.271.293a1.054 1.054 0 0 1 1.458 0l3.469 3.364a.979.979 0 0 1 0 1.414c-.403.39-1.056.39-1.458 0L7.03 3.414V11c0 .552-.462 1-1.031 1-.57 0-1.031-.448-1.031-1V3.414L3.26 5.071c-.402.39-1.055.39-1.458 0a.979.979 0 0 1 0-1.414z'
      break
    case 'check-mark':
      d =
        'M11.632.725a1 1 0 0 1 .143 1.407l-7.342 9a1 1 0 0 1-1.528.025L.246 8.11a1 1 0 1 1 1.508-1.315L3.633 8.95 10.225.868a1 1 0 0 1 1.407-.143z'
      break
    case 'cross':
      d =
        'M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12zM3.401 3.254a1 1 0 0 1 1.414 0L6.02 4.457l1.203-1.203a1 1 0 1 1 1.415 1.414L7.433 5.87l1.204 1.204a1 1 0 0 1-1.415 1.414L6.02 7.286 4.815 8.489a1 1 0 0 1-1.414-1.414L4.605 5.87 3.4 4.668a1 1 0 0 1 0-1.414z'
      break
    case 'not-allowed':
      d =
        'M12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0zM9.652 6a3.652 3.652 0 0 1-5.39 3.213l4.95-4.951c.281.517.44 1.109.44 1.738zM2.831 7.816L7.816 2.83A3.652 3.652 0 0 0 2.83 7.816z'
  }

  return (
    <svg
      aria-label={label}
      aria-hidden={!label}
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path fill={color} fillRule="evenodd" d={d} clipRule="evenodd" />
    </svg>
  )
}
