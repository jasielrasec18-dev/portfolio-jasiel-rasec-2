import { navItems, profile, whatsappHref } from '../data/profile'

const social = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'WhatsApp', href: whatsappHref },
  { label: 'E-mail', href: `mailto:${profile.email}` },
]

const year = new Date().getFullYear()

export function Footer() {

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="shell grid gap-10 py-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <p className="display text-2xl font-bold tracking-[0.06em] text-paper">
            JASIEL<span className="text-cyan">.</span>RASEC
          </p>
          <p className="mt-2 text-sm text-mist">{profile.role}</p>
          <p className="meta mt-6">
            {profile.city} — {profile.stateShort}, {profile.country}
          </p>
        </div>

        <nav aria-label="Navegação rápida" className="lg:col-span-3">
          <span className="label">Navegação</span>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="nav-link text-sm">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <span className="label">Redes</span>
          <ul className="mt-4 flex flex-col gap-2">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="nav-link text-sm"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Encerramento: linha de status no estilo de um editor de código */}
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-4 font-mono text-[0.6875rem] text-steel sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Jasiel Rasec. Todos os direitos reservados.</span>
          <span className="flex items-center gap-4">
            <span>React · TypeScript · Tailwind · Motion</span>
            <span className="hidden sm:inline" aria-hidden="true">
              {profile.coordinates}
            </span>
            <span aria-hidden="true" className="text-cyan">
              // EOF
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
