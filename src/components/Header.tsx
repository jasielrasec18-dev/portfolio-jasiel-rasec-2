import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollState } from '../hooks/useScrollState'

const sectionIds = navItems.map((n) => n.id)
const EASE = [0.16, 1, 0.3, 1] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrolled, hidden } = useScrollState()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? 'border-b border-line/70 bg-ink/70 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <div className="shell flex h-16 items-center justify-between lg:h-[4.5rem]">
          <a
            href="#inicio"
            className="display text-[1.05rem] font-bold tracking-[0.08em] text-paper"
            onClick={close}
            aria-label="Voltar ao início"
          >
            JASIEL<span className="text-cyan">.</span>RASEC
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="hidden min-h-10 items-center rounded-full border border-paper/80 px-5 text-sm font-medium text-paper transition-colors duration-300 hover:border-cyan hover:bg-cyan hover:text-ink lg:inline-flex"
            >
              Vamos conversar
            </a>
            <button
              type="button"
              className="inline-grid size-11 place-items-center rounded-full border border-line text-paper transition-colors hover:border-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-lg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            <nav aria-label="Menu mobile" className="shell mt-24 flex flex-1 flex-col">
              <span className="label mb-6">~/navegação</span>
              <ul className="flex flex-col divide-y divide-line border-y border-line">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      className="display flex min-h-14 items-center justify-between py-3 text-3xl font-semibold text-paper"
                      aria-current={active === item.id ? 'true' : undefined}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-steel tabular-nums">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto mb-10 flex flex-col gap-4">
                <a
                  href="#contato"
                  onClick={close}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-paper px-6 text-sm font-medium text-ink"
                >
                  Vamos conversar
                </a>
                <div className="flex justify-between">
                  <span className="meta">{profile.coordinates}</span>
                  <span className="meta">
                    {profile.city} — {profile.stateShort}
                  </span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
