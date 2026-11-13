export type SectionId =
  | 'inicio'
  | 'sobre'
  | 'projetos'
  | 'especialidades'
  | 'stack'
  | 'experiencia'
  | 'formacao'
  | 'contato'

export interface NavItem {
  id: SectionId
  label: string
}

/** Diferencia trabalho comercial de projeto autoral (diretriz de integridade nº 6). */
export type ProjectKind = 'cliente' | 'autoral'

export type ProjectLayout = 'feature' | 'feature-reverse' | 'commission' | 'compact'

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'code' | 'docs'
}

/** Camada do diagrama de arquitetura, derivada apenas da stack documentada. */
export interface ArchitectureLayer {
  role: string
  tech: string[]
}

export interface Project {
  slug: string
  index: string
  name: string
  category: string
  kind: ProjectKind
  layout: ProjectLayout
  summary: string
  features: string[]
  tech: string[]
  architecture: ArchitectureLayer[]
  links: ProjectLink[]
  /** Observação honesta sobre o ambiente de demonstração, quando necessária. */
  note?: string
}

export interface ExperienceItem {
  role: string
  org: string
  start: string
  end: string
  current?: boolean
  description: string
  area: 'tecnologia' | 'outras áreas'
}

export interface TechItem {
  name: string
  /** Chave do ícone oficial em simple-icons; ausente quando não existe ícone oficial disponível. */
  icon?: string
}

export interface TechGroup {
  folder: string
  label: string
  items: TechItem[]
}
