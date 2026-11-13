import type { ExperienceItem, TechGroup } from './types'

export const experience: ExperienceItem[] = [
  {
    role: 'Desenvolvedor Full Stack',
    org: 'Freelancer',
    start: 'abr 2026',
    end: 'atual',
    current: true,
    area: 'tecnologia',
    description:
      'Desenvolvimento de sites e aplicações web sob demanda, desde o levantamento de requisitos até o deploy em produção. Integração de APIs, autenticação, bancos de dados e serviços externos.',
  },
  {
    role: 'Motorista Parceiro',
    org: 'Autônomo',
    start: 'jun 2023',
    end: 'abr 2026',
    area: 'outras áreas',
    description:
      'Atendimento ao cliente, organização, planejamento e resolução de problemas em tempo real.',
  },
  {
    role: 'Auxiliar de Expedição/Faturamento',
    org: 'São Francisco Têxtil',
    start: 'dez 2020',
    end: 'mar 2023',
    area: 'outras áreas',
    description:
      'Faturamento, conferência de notas fiscais via ERP, controle de planilhas e apoio logístico.',
  },
]

export const education = {
  course: 'Desenvolvimento Web Full Stack',
  school: 'DevQuest — Dev em Dobro',
  period: '2026 – 2027',
  status: 'em andamento',
}

export const certifications = [
  { name: 'Desenvolvedor Front-End', issuer: 'DevQuest', year: '2026' },
  { name: 'Desenvolvedor Back-End', issuer: 'DevQuest', year: '2026' },
  { name: 'Automações com n8n', issuer: 'DevQuest', year: '2026' },
]

/** Competências comportamentais, conforme o currículo. */
export const softSkills = [
  'Aprendizado rápido',
  'Resolução de problemas',
  'Proatividade',
  'Pensamento analítico',
  'Adaptabilidade',
  'Comunicação',
  'Trabalho em equipe',
  'Organização',
  'Criatividade',
  'Foco em resultados',
  'Melhoria contínua',
  'Autonomia',
]

export const specialties = [
  {
    key: 'frontend',
    title: 'Frontend Development',
    text: 'Interfaces modernas, responsivas, acessíveis e focadas na experiência do usuário.',
  },
  {
    key: 'backend',
    title: 'Backend Development',
    text: 'APIs REST, autenticação, regras de negócio, integração de serviços e arquitetura de aplicações.',
  },
  {
    key: 'fullstack',
    title: 'Full Stack Applications',
    text: 'Desenvolvimento completo de aplicações, conectando frontend, backend e banco de dados.',
  },
  {
    key: 'ai',
    title: 'AI & Automation',
    text: 'Automações com n8n, integração com modelos de IA e desenvolvimento de soluções inteligentes.',
  },
] as const

export type SpecialtyKey = (typeof specialties)[number]['key']

export const stack: TechGroup[] = [
  {
    folder: 'linguagens',
    label: 'Linguagens',
    items: [
      { name: 'JavaScript', icon: 'siJavascript' },
      { name: 'TypeScript', icon: 'siTypescript' },
      { name: 'SQL' },
    ],
  },
  {
    folder: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', icon: 'siReact' },
      { name: 'Next.js', icon: 'siNextdotjs' },
      { name: 'HTML5', icon: 'siHtml5' },
      { name: 'CSS3', icon: 'siCss' },
      { name: 'Tailwind CSS', icon: 'siTailwindcss' },
    ],
  },
  {
    folder: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: 'siNodedotjs' },
      { name: 'Express', icon: 'siExpress' },
      { name: 'REST APIs' },
    ],
  },
  {
    folder: 'banco-de-dados',
    label: 'Banco de dados',
    items: [
      { name: 'PostgreSQL', icon: 'siPostgresql' },
      { name: 'Prisma ORM', icon: 'siPrisma' },
    ],
  },
  {
    folder: 'cloud-devops',
    label: 'Cloud & DevOps',
    items: [
      { name: 'Docker', icon: 'siDocker' },
      { name: 'GitHub Actions', icon: 'siGithubactions' },
      { name: 'Vercel', icon: 'siVercel' },
      { name: 'GitHub Pages', icon: 'siGithubpages' },
    ],
  },
  {
    folder: 'automacao-ia',
    label: 'Automação e IA',
    items: [
      { name: 'n8n', icon: 'siN8n' },
      { name: 'LangChain', icon: 'siLangchain' },
      { name: 'Google Gemini', icon: 'siGooglegemini' },
      { name: 'Claude', icon: 'siClaude' },
      { name: 'ChatGPT' },
    ],
  },
  {
    folder: 'ferramentas',
    label: 'Ferramentas',
    items: [
      { name: 'Git', icon: 'siGit' },
      { name: 'GitHub', icon: 'siGithub' },
      { name: 'VS Code' },
      { name: 'Cursor', icon: 'siCursor' },
      { name: 'Antigravity IDE' },
      { name: 'DBeaver', icon: 'siDbeaver' },
    ],
  },
]
