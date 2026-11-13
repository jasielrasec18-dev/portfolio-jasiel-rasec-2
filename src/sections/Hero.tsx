import { motion, useReducedMotion } from 'motion/react'
import { ActionLink } from '../components/ActionLink'
import { ArchGraphic } from '../components/ArchGraphic'
import { profile } from '../data/profile'

const EASE = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  /** Dispara as animações apenas depois da abertura, para não competirem. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const reduce = useReducedMotion()
  const show = ready || reduce

  const lineAnim = (delay: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: show ? { y: '0%' } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  })

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="halo tech-grid relative flex min-h-svh flex-col overflow-hidden pt-24 lg:pt-24"
    >
      {/* Marcadores editoriais nas bordas */}
      <motion.div
        {...fade(0.9)}
        className="pointer-events-none absolute right-5 bottom-10 hidden lg:right-8 lg:block"
      >
        <span className="vertical meta">{profile.coordinates}</span>
      </motion.div>

      <div className="shell flex flex-1 flex-col justify-between gap-8 pb-8 lg:gap-6 lg:pb-8">
        {/* Linha superior: função + disponibilidade */}
        <motion.div
          {...fade(0.5)}
          className="grid gap-3 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          <p className="label lg:col-span-3">{profile.roleEn}</p>
          <p className="meta flex items-center gap-3 lg:col-span-5">
            <span className="pulse-dot relative inline-block size-1.5 rounded-full bg-cyan" />
            {profile.availability}
          </p>
          <p className="meta hidden lg:col-span-4 lg:block lg:text-right">
            {profile.city}, {profile.state} — {profile.country}
          </p>
        </motion.div>

        {/* Nome oversized + gráfico alinhado à direita */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <h1
            id="hero-title"
            className="display -ml-[0.04em] text-[clamp(4.5rem,21vw,9rem)] leading-[0.82] font-bold tracking-[-0.045em] text-paper uppercase lg:col-span-7 lg:text-[clamp(8rem,12.5vw,14rem)]"
            aria-label="Jasiel Rasec"
          >
            <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <motion.span className="block" {...lineAnim(0.15)}>
                Jasiel
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <motion.span className="outline-type block" {...lineAnim(0.28)}>
                Rasec
              </motion.span>
            </span>
          </h1>

          <motion.div
            {...fade(0.7)}
            className="relative hidden text-steel lg:col-span-5 lg:block"
          >
            <span className="label absolute -top-6 left-0">fig. 01 — fluxo de uma requisição</span>
            {show && <ArchGraphic className="h-auto w-full" />}
          </motion.div>
        </div>

        {/* Bloco inferior: tagline, texto e ações */}
        <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <motion.p
              {...fade(0.55)}
              className="display max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.02] font-semibold text-balance text-paper"
            >
              Transformando ideias em experiências digitais.
            </motion.p>
            <motion.p {...fade(0.65)} className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-mist">
              Desenvolvo aplicações web modernas, interfaces intuitivas e soluções completas,
              conectando design, tecnologia e funcionalidade do frontend ao backend.
            </motion.p>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <motion.div {...fade(0.75)} className="flex flex-wrap items-center gap-3">
              <ActionLink href="#projetos" icon="down">
                Explorar projetos
              </ActionLink>
              <ActionLink href="#contato" variant="ghost">
                Entrar em contato
              </ActionLink>
            </motion.div>
            <motion.div {...fade(0.85)} className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="meta underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-cyan"
              >
                github ↗<span className="sr-only"> (abre em nova aba)</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="meta underline decoration-line underline-offset-4 transition-colors hover:text-paper hover:decoration-cyan"
              >
                linkedin ↗<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.a
          {...fade(1)}
          href="#sobre"
          className="group flex items-center gap-3 self-start"
          aria-label="Rolar para a seção Sobre"
        >
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-cyan"
              animate={reduce ? undefined : { y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <span className="label transition-colors group-hover:text-paper">scroll</span>
        </motion.a>
      </div>
    </section>
  )
}
