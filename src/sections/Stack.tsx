import { Fade } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { TechIcon } from '../components/TechIcon'
import { stack } from '../data/career'

const allItems = stack.flatMap((g) => g.items)

/** Letreiro contínuo com os ícones oficiais; duplicado para o loop ser contínuo. */
function Ticker() {
  const row = [...allItems, ...allItems]
  return (
    <div
      className="relative mt-14 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <div className="marquee gap-10">
        {row.map((item, i) => (
          <span key={`${item.name}-${i}`} className="flex items-center gap-3 text-steel">
            <TechIcon icon={item.icon} name={item.name} size={20} />
            <span className="font-mono text-xs whitespace-nowrap">{item.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="cut-top relative bg-ink py-24 lg:py-36">
      <div className="shell">
        <SectionHeader
          id="stack"
          number="04"
          path="stack"
          title={['Ferramentas que transformam', 'ideias em aplicações.']}
        />
      </div>

      <Ticker />

      <div className="shell">
        {/* Listagem em formato de diretório: ~/stack/<categoria>/ */}
        <div className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {stack.map((group, gi) => (
            <Fade key={group.folder} delay={(gi % 3) * 0.06}>
              <div className="flex items-baseline gap-3 border-b border-line pb-3">
                <span className="font-mono text-xs text-cyan">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h3 className="display text-xl font-semibold text-paper">{group.label}</h3>
                <span className="meta ml-auto hidden sm:inline">~/stack/{group.folder}/</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group/chip flex min-h-10 items-center gap-2.5 border border-line px-3 text-sm text-mist transition-colors duration-300 hover:border-paper/50 hover:text-paper"
                  >
                    <TechIcon
                      icon={item.icon}
                      name={item.name}
                      size={16}
                      className="text-steel transition-colors duration-300 group-hover/chip:text-cyan"
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
            </Fade>
          ))}
        </div>
        <p className="meta mt-10 max-w-[60ch]">
          Ícones oficiais via Simple Icons quando disponíveis; tecnologias sem ícone oficial aparecem
          com um monograma neutro. Sem barras de proficiência — o nível de domínio se demonstra nos
          projetos.
        </p>
      </div>
    </section>
  )
}
