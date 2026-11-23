import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

interface RevealLinesProps {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string
  delay?: number
}

export function RevealLines({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  delay = 0,
}: RevealLinesProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '105%' },
              show: reduce
                ? { opacity: 1, transition: { duration: 0.3 } }
                : { y: '0%', transition: { duration: 0.9, ease: EASE, delay: delay + i * 0.08 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface FadeProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Fade({ children, className = '', delay = 0 }: FadeProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
