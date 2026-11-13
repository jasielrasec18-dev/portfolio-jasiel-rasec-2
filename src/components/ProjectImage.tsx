import type { ArchitectureLayer } from '../data/types'
import { getShot } from '../lib/screenshots'

interface ProjectImageProps {
  slug: string
  name: string
  n?: 1 | 2
  caption?: string
  /** Prioridade de carregamento (apenas para a primeira dobra de projetos). */
  eager?: boolean
  architecture: ArchitectureLayer[]
  className?: string
}

/**
 * Figura do projeto. Mostra a captura real quando existe em
 * `src/data/screenshots.json`; caso contrário, uma lâmina neutra com a
 * arquitetura documentada — nunca uma tela simulada.
 */
export function ProjectImage({
  slug,
  name,
  n = 1,
  caption,
  eager = false,
  architecture,
  className = '',
}: ProjectImageProps) {
  const shot = getShot(slug, n)

  if (shot) {
    return (
      <figure className={`frame zoom-img overflow-hidden ${className}`}>
        <img
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={`Captura de tela da interface de ${name}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          className="block h-auto w-full"
        />
        {caption && (
          <figcaption className="meta flex items-center justify-between border-t border-line px-3 py-2">
            <span>{caption}</span>
            <span className="tabular-nums">
              {shot.width}×{shot.height}
            </span>
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div
      className={`frame flex aspect-[16/10] flex-col justify-between p-5 ${className}`}
      role="img"
      aria-label={`Diagrama de arquitetura de ${name}`}
    >
      <span className="label">arquitetura</span>
      <ul className="flex flex-col gap-2">
        {architecture.map((layer) => (
          <li key={layer.role} className="flex items-baseline gap-3 font-mono text-xs">
            <span className="w-20 shrink-0 text-cyan">{layer.role}</span>
            <span className="h-px flex-1 bg-line" />
            <span className="text-mist">{layer.tech.join(' · ')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
