import { useEffect, useState } from 'react'

interface ScrollState {
  /** Página rolou além do topo (header ganha fundo). */
  scrolled: boolean
  /** Usuário está rolando para baixo (header se recolhe). */
  hidden: boolean
}

/**
 * Observa a direção e a posição do scroll com rAF para evitar
 * recálculos a cada evento. O header só se esconde depois de 120px
 * e sempre reaparece ao rolar para cima.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false })

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const goingDown = y > last && y > 120
      setState((prev) => {
        const next = { scrolled: y > 24, hidden: goingDown }
        return prev.scrolled === next.scrolled && prev.hidden === next.hidden ? prev : next
      })
      last = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
