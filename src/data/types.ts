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

export type ProjectKind = 'cliente' | 'autoral'

export type ProjectLayout = 'feature' | 'feature-reverse' | 'commission' | 'compact'

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'code' | 'docs'
}

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
  icon?: string
}

export interface TechGroup {
  folder: string
  label: string
  items: TechItem[]
}
