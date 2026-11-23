import { brandIcons } from '../lib/icons'

interface TechIconProps {
  icon?: string
  name: string
  size?: number
  className?: string
}

export function TechIcon({ icon, name, size = 18, className = '' }: TechIconProps) {
  const brand = icon ? brandIcons[icon] : undefined

  if (!brand) {
    const initials = name
      .replace(/[^A-Za-z0-9 ]/g, '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    return (
      <span
        aria-hidden="true"
        className={`inline-grid place-items-center rounded-[3px] border border-current/40 font-mono text-[0.55rem] leading-none ${className}`}
        style={{ width: size, height: size }}
      >
        {initials}
      </span>
    )
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={brand.path} />
    </svg>
  )
}
