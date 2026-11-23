import { RevealLines } from './Reveal'

interface SectionHeaderProps {
  number: string
  path: string
  title: string[]
  id: string
  children?: React.ReactNode
}

export function SectionHeader({ number, path, title, id, children }: SectionHeaderProps) {
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
      <div className="flex items-baseline gap-3 lg:col-span-3 lg:flex-col lg:gap-2">
        <span className="font-mono text-sm text-cyan tabular-nums">§{number}</span>
        <span className="meta">~/{path}</span>
      </div>
      <div className="lg:col-span-9">
        <RevealLines
          as="h2"
          lines={title}
          className="display text-[clamp(2.4rem,6.2vw,6rem)] leading-[0.92] font-semibold text-balance"
        />
        <span id={`${id}-title`} className="sr-only">
          {title.join(' ')}
        </span>
        {children}
      </div>
    </header>
  )
}
