import { useEffect, useState } from 'react'
import type { SectionId } from '../data/types'

export function useActiveSection(ids: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id as SectionId)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
