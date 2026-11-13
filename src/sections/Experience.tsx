import { Fade } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { certifications, education, experience } from '../data/career'

export function Experience() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="relative border-t border-line py-24 lg:py-36"
    >
      <div className="shell">
        <SectionHeader
          id="experiencia"
          number="05"
          path="experiencia"
          title={['Experiência', 'e trajetória']}
        >
          <p className="mt-6 max-w-[56ch] leading-relaxed text-mist">
            Uma trajetória que passou por logística e atendimento antes do desenvolvimento de
            software — experiências de outras áreas apresentadas como são, sem reescrita.
          </p>
        </SectionHeader>

        {/* Timeline: linha vertical à esquerda, marcador por item */}
        <ol className="relative mt-14 border-l border-line lg:mt-20 lg:ml-[25%]">
          {experience.map((item, i) => (
            <li key={item.role + item.org} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute top-2 -left-[4.5px] size-2 rounded-full ${
                  item.current ? 'pulse-dot bg-cyan' : 'bg-steel'
                }`}
              />
              <Fade delay={i * 0.08}>
                <div className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm text-paper tabular-nums">
                      {item.start} — {item.end}
                    </span>
                    <span className={`label ${item.area === 'tecnologia' ? 'text-cyan' : ''}`}>
                      {item.area}
                    </span>
                  </div>
                  <div>
                    <h3 className="display text-2xl leading-tight font-semibold text-paper lg:text-3xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-steel">{item.org}</p>
                    <p className="mt-4 max-w-[56ch] leading-relaxed text-mist">{item.description}</p>
                  </div>
                </div>
              </Fade>
            </li>
          ))}
        </ol>

        {/* Formação e certificações */}
        <div id="formacao" className="mt-24 grid gap-10 border-t border-line pt-10 lg:mt-32 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <span className="font-mono text-sm text-cyan tabular-nums">§06</span>
            <span className="meta ml-3">~/formacao</span>
          </div>
          <div className="lg:col-span-9">
            <Fade>
              <h3 className="display text-[clamp(1.8rem,3vw,2.75rem)] leading-tight font-semibold text-paper">
                Formação e certificações
              </h3>
            </Fade>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Fade delay={0.05}>
                <span className="label">Formação</span>
                <p className="mt-3 text-lg leading-snug text-paper">{education.course}</p>
                <p className="mt-1 text-sm text-mist">{education.school}</p>
                <p className="meta mt-2 tabular-nums">
                  {education.period} · {education.status}
                </p>
              </Fade>
              <Fade delay={0.1}>
                <span className="label">Certificações</span>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {certifications.map((c) => (
                    <li key={c.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-paper">{c.name}</span>
                      <span className="meta shrink-0 tabular-nums">
                        {c.issuer} · {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
