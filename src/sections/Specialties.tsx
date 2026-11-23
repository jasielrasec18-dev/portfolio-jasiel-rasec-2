import { Fade } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { specialties, type SpecialtyKey } from '../data/career'


const glyphs: Record<SpecialtyKey, React.ReactNode> = {
  frontend: (
    <>
      <rect x="4" y="4" width="56" height="40" rx="1" />
      <line x1="4" y1="14" x2="60" y2="14" />
      <line x1="22" y1="14" x2="22" y2="44" />
      <rect x="28" y="20" width="26" height="8" className="accent" />
    </>
  ),
  backend: (
    <>
      <rect x="24" y="16" width="16" height="16" rx="1" className="accent" />
      <line x1="4" y1="10" x2="24" y2="20" />
      <line x1="4" y1="24" x2="24" y2="24" />
      <line x1="4" y1="38" x2="24" y2="28" />
      <line x1="40" y1="24" x2="60" y2="24" />
      <circle cx="4" cy="10" r="2" />
      <circle cx="4" cy="24" r="2" />
      <circle cx="4" cy="38" r="2" />
      <circle cx="60" cy="24" r="2" />
    </>
  ),
  fullstack: (
    <>
      <path d="M32 6 L58 16 L32 26 L6 16 Z" />
      <path d="M6 26 L32 36 L58 26" />
      <path d="M6 36 L32 46 L58 36" className="accent" />
    </>
  ),
  ai: (
    <>
      <line x1="4" y1="24" x2="20" y2="24" />
      <path d="M20 24 L32 12 L44 24 L32 36 Z" className="accent" />
      <line x1="44" y1="24" x2="60" y2="24" />
      <line x1="32" y1="36" x2="32" y2="44" />
      <line x1="20" y1="44" x2="44" y2="44" />
    </>
  ),
}

export function Specialties() {
  return (
    <section
      id="especialidades"
      aria-labelledby="especialidades-title"
      className="relative bg-ink-2 py-24 lg:py-36"
    >
      <div className="shell">
        <SectionHeader
          id="especialidades"
          number="03"
          path="especialidades"
          title={['Da interface à arquitetura', 'por trás da aplicação.']}
        />

        <ol className="mt-14 grid border-t border-line md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {specialties.map((s, i) => (
            <li
              key={s.key}
              className="group relative border-b border-line md:border-r md:nth-[2n]:border-r-0 xl:nth-[2n]:border-r xl:nth-[4n]:border-r-0"
            >
              <Fade delay={i * 0.08} className="flex h-full flex-col gap-8 p-6 lg:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-cyan tabular-nums">0{i + 1}</span>
                  <svg
                    viewBox="0 0 64 48"
                    className="h-12 w-16 text-steel transition-colors duration-500 group-hover:text-paper [&_.accent]:text-cyan [&_.accent]:transition-transform [&_.accent]:duration-700 [&_.accent]:ease-[var(--ease-out-expo)] group-hover:[&_.accent]:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {glyphs[s.key]}
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="display text-2xl leading-tight font-semibold text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </Fade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
