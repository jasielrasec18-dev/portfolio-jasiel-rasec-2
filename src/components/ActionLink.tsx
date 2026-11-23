import { ArrowUpRight, ArrowDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface ActionLinkProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'text'
  external?: boolean
  icon?: 'external' | 'down' | 'none'
  className?: string
  onClick?: () => void
}

const base =
  'group relative inline-flex min-h-11 items-center gap-2 overflow-hidden font-medium transition-colors duration-300'

const variants = {
  solid:
    'rounded-full bg-paper px-6 text-ink text-sm hover:bg-cyan',
  ghost:
    'rounded-full border border-line px-6 text-paper text-sm hover:border-paper',
  text: 'text-paper text-sm underline decoration-line underline-offset-[6px] hover:decoration-cyan',
}

export function ActionLink({
  href,
  children,
  variant = 'solid',
  external = false,
  icon = external ? 'external' : 'none',
  className = '',
  onClick,
}: ActionLinkProps) {
  const Icon = icon === 'external' ? ArrowUpRight : icon === 'down' ? ArrowDown : null
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          size={16}
          strokeWidth={1.75}
          className={`transition-transform duration-300 ease-out ${
            icon === 'down' ? 'group-hover:translate-y-0.5' : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
          }`}
        />
      )}
      {external && <span className="sr-only">(abre em nova aba)</span>}
    </a>
  )
}
