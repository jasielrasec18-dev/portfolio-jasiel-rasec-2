import { useEffect, useState } from 'react'

interface ScrollState {
  scrolled: boolean
  hidden: boolean
}

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
