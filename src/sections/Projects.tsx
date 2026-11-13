import { ArrowUpRight } from 'lucide-react'
import { ActionLink } from '../components/ActionLink'
import { Fade, RevealLines } from '../components/Reveal'
import { ProjectImage } from '../components/ProjectImage'
import { getShot } from '../lib/screenshots'
import { SectionHeader } from '../components/SectionHeader'
import { projects } from '../data/projects'
import type { Project, ProjectLink } from '../data/types'

const kindLabel: Record<Project['kind'], string> = {
  cliente: 'Projeto comercial · cliente real',
  autoral: 'Projeto autoral',
}

/** "Nome | Subtítulo" vira nome + subtítulo em corpo menor. */
function Title({ name }: { name: string }) {
  const [main, sub] = name.split(' | ')
  if (!sub) return <>{name}</>
  return (
    <>
      {main}
      <span className="mt-2 block font-sans text-[0.4em] font-normal tracking-normal text-mist">{sub}</span>
    </>
  )
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono text-sm text-cyan tabular-nums">{project.index}</span>
      <span className="label">{project.category}</span>
      <span
        className={`label ${project.kind === 'cliente' ? 'text-violet' : ''}`}
      >
        {kindLabel[project.kind]}
      </span>
    </div>
  )
}

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1.5" aria-label="Tecnologias">
      {items.map((t) => (
        <li key={t} className="font-mono text-xs text-mist">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2" aria-label="Principais funcionalidades">
      {items.map((f) => (
        <li key={f} className="flex gap-3 text-sm leading-snug text-mist">
          <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-cyan" />
          {f}
        </li>
      ))}
    </ul>
  )
}

function Links({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((l, i) => (
        <ActionLink
          key={l.href}
          href={l.href}
          external
          variant={i === 0 ? 'solid' : 'text'}
          className={i === 0 ? 'mr-1' : ''}
        >
          {l.label}
        </ActionLink>
      ))}
    </div>
  )
}

/** Estudo de caso principal: imagem grande + segunda captura sobreposta. */
function FeatureCase({ project, reverse }: { project: Project; reverse?: boolean }) {
  const hasSecond = Boolean(getShot(project.slug, 2))
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-6 lg:pt-10"
    >
      <Fade className={`relative lg:col-span-7 ${reverse ? 'lg:order-2 lg:col-start-6' : ''}`}>
        <ProjectImage
          slug={project.slug}
          name={project.name}
          eager={project.index === '01'}
          architecture={project.architecture}
          caption="captura real · interface em produção"
        />
        {hasSecond && (
          <div
            className={`relative z-10 -mt-10 w-[58%] sm:-mt-16 ${reverse ? 'mr-auto' : 'ml-auto'}`}
          >
            <ProjectImage
              slug={project.slug}
              name={project.name}
              n={2}
              architecture={project.architecture}
              className="shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
            />
          </div>
        )}
      </Fade>

      <div
        className={`flex flex-col gap-6 lg:col-span-5 lg:pt-2 ${reverse ? 'lg:order-1 lg:col-start-1' : ''}`}
      >
        <Fade>
          <Meta project={project} />
          <h3
            id={`${project.slug}-title`}
            className="display mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-semibold text-paper"
          >
            {project.name}
          </h3>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-mist">{project.summary}</p>
        </Fade>
        <Fade delay={0.1}>
          <Features items={project.features} />
        </Fade>
        <Fade delay={0.15} className="border-t border-line pt-5">
          <Tech items={project.tech} />
        </Fade>
        {project.note && (
          <Fade delay={0.18}>
            <p className="meta max-w-[48ch] border-l border-violet pl-3">{project.note}</p>
          </Fade>
        )}
        <Fade delay={0.2}>
          <Links links={project.links} />
        </Fade>
      </div>
    </article>
  )
}

/** Trabalho comercial: faixa de largura total com a captura à direita. */
function CommissionCase({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="relative mt-20 overflow-hidden border border-line bg-graphite lg:mt-28"
    >
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-6 -right-4 text-[clamp(6rem,20vw,16rem)] leading-none font-bold text-paper/[0.035] select-none"
      >
        {project.index}
      </span>
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Fade>
            <Meta project={project} />
            <h3
              id={`${project.slug}-title`}
              className="display mt-4 text-[clamp(2.2rem,4.2vw,3.75rem)] leading-[0.98] font-semibold text-balance text-paper"
            >
              <Title name={project.name} />
            </h3>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-mist">{project.summary}</p>
          </Fade>
          <Fade delay={0.1}>
            <Features items={project.features} />
          </Fade>
          <Fade delay={0.15} className="border-t border-line pt-5">
            <Tech items={project.tech} />
          </Fade>
          <Fade delay={0.2}>
            <Links links={project.links} />
          </Fade>
        </div>
        <Fade className="lg:col-span-7">
          <ProjectImage
            slug={project.slug}
            name={project.name}
            architecture={project.architecture}
            caption="captura real · site publicado para a cliente"
          />
        </Fade>
      </div>
    </article>
  )
}

/** Demonstrações complementares: duas colunas. */
function CompactCase({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group flex flex-col gap-5 border-t border-line pt-6"
    >
      <Fade>
        <ProjectImage
          slug={project.slug}
          name={project.name}
          architecture={project.architecture}
        />
      </Fade>
      <Fade delay={0.08}>
        <Meta project={project} />
        <h3
          id={`${project.slug}-title`}
          className="display mt-3 text-[clamp(1.9rem,3vw,2.75rem)] leading-none font-semibold text-paper"
        >
          {project.name}
        </h3>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-mist">{project.summary}</p>
      </Fade>
      <Fade delay={0.12} className="flex flex-col gap-4">
        <ul className="flex flex-col gap-1.5" aria-label="Principais funcionalidades">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-snug text-mist">
              <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-cyan" />
              {f}
            </li>
          ))}
        </ul>
        <Tech items={project.tech} />
        {project.note && <p className="meta max-w-[48ch] border-l border-violet pl-3">{project.note}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1 text-sm text-paper underline decoration-line underline-offset-[6px] transition-colors hover:decoration-cyan"
            >
              {l.label}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          ))}
        </div>
      </Fade>
    </article>
  )
}

export function Projects() {
  const feature = projects.filter((p) => p.layout === 'feature' || p.layout === 'feature-reverse')
  const commission = projects.find((p) => p.layout === 'commission')
  const compact = projects.filter((p) => p.layout === 'compact')

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="cut-top relative bg-ink-2 py-24 lg:py-36"
    >
      <div className="shell">
        <SectionHeader
          id="projetos"
          number="02"
          path="projetos"
          title={['Projetos', 'em destaque']}
        >
          <p className="mt-6 max-w-[56ch] leading-relaxed text-mist">
            Estudos de caso de aplicações completas, do banco de dados à interface. Capturas reais
            das versões publicadas; trabalhos comerciais e projetos autorais sinalizados
            separadamente.
          </p>
        </SectionHeader>

        <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-32">
          {feature.map((p) => (
            <FeatureCase key={p.slug} project={p} reverse={p.layout === 'feature-reverse'} />
          ))}
        </div>

        {commission && <CommissionCase project={commission} />}

        <div className="mt-20 lg:mt-28">
          <RevealLines
            as="h3"
            lines={['Mais projetos']}
            className="display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight font-semibold text-paper"
          />
          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-6">
            {compact.map((p) => (
              <CompactCase key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
