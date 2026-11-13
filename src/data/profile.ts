import type { NavItem } from './types'

export const SITE_URL = 'https://jasielrasec18-dev-portfolio-jasiel-mu.vercel.app'

export const profile = {
  name: 'Jasiel Rasec',
  role: 'Desenvolvedor Full Stack',
  roleEn: 'Full Stack Developer',
  city: 'Petrolina',
  state: 'Pernambuco',
  stateShort: 'PE',
  country: 'Brasil',
  /** Coordenadas do centro de Petrolina — usadas como detalhe editorial. */
  coordinates: '09°23′S  40°30′W',
  availability: 'Disponível para oportunidades profissionais e projetos freelance',
  email: 'jasielrasec18@gmail.com',
  whatsappDisplay: '+55 87 98874-8263',
  whatsappNumber: '5587988748263',
  whatsappMessage:
    'Olá, Jasiel! Vi seu portfólio e gostaria de conversar sobre um projeto/oportunidade.',
  linkedin: 'https://www.linkedin.com/in/jasielrasec-dev/',
  github: 'https://github.com/jasielrasec18-dev',
  languages: [
    { name: 'Português', level: 'nativo' },
    { name: 'Inglês', level: 'intermediário (leitura, escrita e conversação)' },
  ],
} as const

export const whatsappHref = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
  profile.whatsappMessage,
)}`

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'stack', label: 'Stack' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'contato', label: 'Contato' },
]
