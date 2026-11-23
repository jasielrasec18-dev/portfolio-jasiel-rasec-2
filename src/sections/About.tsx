import { Fade } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { profile } from '../data/profile'
import { education, experience, softSkills } from '../data/career'

const paragraphs = [
  'Sou Desenvolvedor Full Stack, com experiência prática na criação de aplicações web, sites institucionais e sistemas completos. Trabalho desde a concepção da interface até a implementação do backend, integração com APIs, banco de dados, testes e publicação em produção.',
  'Tenho interesse constante em arquitetura de software, boas práticas de desenvolvimento, automação de processos e integração de Inteligência Artificial.',
  'Meu objetivo é transformar necessidades reais em soluções digitais funcionais, eficientes e bem estruturadas.',
]

const current = experience.find((e) => e.current)

const facts: Array<[string, string]> = [
  ['local', `${profile.city} — ${profile.stateShort}, ${profile.country}`],
  ['desde', current ? `${current.role} ${current.org.toLowerCase()} · ${current.start}` : '—'],
  ['formação', `${education.course} — ${education.school} (${education.period})`],
  ['idiomas', profile.languages.map((l) => `${l.name} ${l.level}`).join(' · ')],
  ['competências', softSkills.join(' · ')],
]

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative py-24 lg:py-36">
      <div className="shell">
        <SectionHeader
          id="sobre"
          number="01"
          path="sobre"
          title={['Mais do que escrever código,', 'construir soluções.']}
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Coluna editorial: parágrafo de abertura em corpo maior, demais em coluna */}
          <div className="lg:col-span-7 lg:col-start-4">
            <Fade>
              <p className="text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.45] text-paper">
                {paragraphs[0]}
              </p>
            </Fade>
            <div className="mt-8 grid gap-6 border-t border-line pt-8 md:grid-cols-2">
              {paragraphs.slice(1).map((p, i) => (
                <Fade key={p} delay={0.08 * (i + 1)}>
                  <p className="leading-relaxed text-mist">{p}</p>
                </Fade>
              ))}
            </div>
          </div>

          {/* Ficha técnica */}
          <Fade className="lg:col-span-9 lg:col-start-4" delay={0.2}>
            <dl className="grid border-t border-line sm:grid-cols-2">
              {facts.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4 sm:odd:pr-6 sm:even:pl-6"
                >
                  <dt className="label pt-0.5">{k}</dt>
                  <dd className="text-sm leading-relaxed text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </Fade>
        </div>
      </div>

      {/* Numeração gigante de fundo, puramente decorativa */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute top-16 right-0 hidden text-[18vw] leading-none font-bold text-paper/[0.03] select-none lg:block"
      >
        01
      </span>
    </section>
  )
}
