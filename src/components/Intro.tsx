import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Abertura discreta (≈1,2s): contador mono e o nome revelado por máscara,
 * depois a cortina sobe. Com prefers-reduced-motion a abertura é pulada.
 * O conteúdo da página já está renderizado por baixo — nada depende dela.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(!reduce)

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    const start = performance.now()
    const duration = 900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="shell flex w-full items-end justify-between">
            <span className="display overflow-hidden text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none text-paper">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                Jasiel Rasec
              </motion.span>
            </span>
            <span className="font-mono text-sm text-steel tabular-nums">
              {String(count).padStart(3, '0')}%
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <motion.div
              className="h-full bg-cyan"
              style={{ width: `${count}%` }}
              transition={{ duration: 0 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
