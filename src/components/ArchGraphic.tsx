import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Nós do diagrama abstrato: uma requisição atravessando as camadas de uma aplicação. */
const nodes = [
  { x: 40, y: 200, label: 'client' },
  { x: 200, y: 90, label: 'ui' },
  { x: 360, y: 200, label: 'api' },
  { x: 520, y: 110, label: 'auth' },
  { x: 520, y: 290, label: 'db' },
  { x: 680, y: 200, label: 'ai' },
] as const

const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
]

/**
 * Grafo abstrato desenhado progressivamente — referência visual à
 * arquitetura de uma aplicação full stack. Só transform/opacity/pathLength.
 */
export function ArchGraphic({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 720 380"
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
    >
      <defs>
        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="720" height="380" fill="url(#dots)" />

      {edges.map(([a, b], i) => {
        const na = nodes[a]
        const nb = nodes[b]
        const mx = (na.x + nb.x) / 2
        const d = `M ${na.x} ${na.y} C ${mx} ${na.y}, ${mx} ${nb.y}, ${nb.x} ${nb.y}`
        return (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 + i * 0.12 }}
          />
        )
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.12 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <rect
            x={n.x - 34}
            y={n.y - 16}
            width="68"
            height="32"
            rx="2"
            stroke={i === 2 ? 'var(--color-cyan)' : 'currentColor'}
            strokeWidth="1"
            fill="var(--color-ink)"
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill={i === 2 ? 'var(--color-cyan)' : 'currentColor'}
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* Pacote de dados percorrendo o grafo */}
      {!reduce && <circle r="3" fill="var(--color-cyan)" className="packet" />}
    </svg>
  )
}
