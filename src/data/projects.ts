import type { Project } from './types'

const GH = 'https://github.com/jasielrasec18-dev'

/**
 * Conteúdo extraído do briefing e verificado nos links públicos.
 * Repositórios confirmados na conta GitHub jasielrasec18-dev.
 */
export const projects: Project[] = [
  {
    slug: 'fintrack-ai',
    index: '01',
    name: 'FinTrack AI',
    category: 'Full Stack Application / AI',
    kind: 'autoral',
    layout: 'feature',
    summary:
      'Aplicação de gestão financeira com dashboard, gráficos, gerenciamento de transações, orçamentos e funcionalidades de Inteligência Artificial utilizando Google Gemini.',
    features: [
      'Dashboard financeiro com gráficos',
      'Cadastro e gerenciamento de transações',
      'Controle de orçamentos',
      'Insights gerados com Google Gemini',
      'Autenticação com Better Auth e acesso como visitante',
      'Testes unitários (Vitest) e end-to-end (Playwright)',
    ],
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Better Auth',
      'Gemini',
      'Vitest',
      'Playwright',
    ],
    architecture: [
      { role: 'interface', tech: ['Next.js', 'React', 'Tailwind CSS'] },
      { role: 'auth', tech: ['Better Auth'] },
      { role: 'dados', tech: ['Prisma', 'PostgreSQL'] },
      { role: 'ia', tech: ['Google Gemini'] },
    ],
    links: [
      { label: 'Abrir aplicação', href: 'https://fintrack-ai-app-h3zo.vercel.app/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/fintrack-ai-app`, kind: 'code' },
    ],
  },
  {
    slug: 'syntaxwear',
    index: '02',
    name: 'SyntaxWear',
    category: 'Full Stack E-commerce',
    kind: 'autoral',
    layout: 'feature-reverse',
    summary:
      'E-commerce completo de calçados e vestuário, com API própria, integração com PostgreSQL, pagamentos com Stripe, documentação e testes automatizados.',
    features: [
      'Catálogo de produtos com filtros',
      'Carrinho persistente',
      'Autenticação com JWT e OAuth 2.0',
      'Gestão de usuários, produtos, categorias e pedidos',
      'Pagamentos com Stripe',
      'API documentada com Swagger e testada com Vitest',
    ],
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'Fastify',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'OAuth 2.0',
      'Stripe',
      'Vitest',
    ],
    architecture: [
      { role: 'loja', tech: ['React', 'TypeScript', 'Tailwind CSS'] },
      { role: 'api', tech: ['Node.js', 'Fastify', 'JWT', 'OAuth 2.0'] },
      { role: 'dados', tech: ['Prisma', 'PostgreSQL'] },
      { role: 'pagamentos', tech: ['Stripe'] },
    ],
    links: [
      { label: 'Abrir loja', href: 'https://syntax-wear-app-three.vercel.app/', kind: 'demo' },
      { label: 'Documentação da API', href: 'https://syntax-wear-api-wl91.onrender.com/api-docs/', kind: 'docs' },
      { label: 'Código do frontend', href: `${GH}/syntax-wear-app`, kind: 'code' },
      { label: 'Código da API', href: `${GH}/syntax-wear-api`, kind: 'code' },
    ],
    note: 'A API está hospedada no plano gratuito do Render: o primeiro acesso pode levar alguns segundos enquanto o serviço acorda.',
  },
  {
    slug: 'anny-beatriz',
    index: '03',
    name: 'Anny Beatriz | Nutricionista',
    category: 'Client Project / Institutional Website',
    kind: 'cliente',
    layout: 'commission',
    summary:
      'Site institucional desenvolvido para uma cliente real, com identidade visual personalizada, layout responsivo, otimização para SEO, animações e integração com WhatsApp.',
    features: [
      'Identidade visual personalizada',
      'Layout responsivo',
      'Otimização para SEO',
      'Animações com IntersectionObserver API',
      'Integração com WhatsApp para agendamento',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'IntersectionObserver API'],
    architecture: [
      { role: 'site', tech: ['HTML5', 'CSS3', 'JavaScript'] },
      { role: 'contato', tech: ['WhatsApp'] },
    ],
    links: [
      { label: 'Visitar site', href: 'https://annybeatriznutricionista.com.br/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/anny-nutricionista`, kind: 'code' },
    ],
  },
  {
    slug: 'wm-fit',
    index: '04',
    name: 'WM Fit Academia',
    category: 'Institutional Website / Landing Page',
    kind: 'autoral',
    layout: 'compact',
    summary:
      'Site institucional para uma academia de Petrolina — PE, com apresentação de modalidades, cronograma de aulas, professores e agendamento de aula experimental pelo WhatsApp.',
    features: [
      'Layout responsivo com apresentação de modalidades e serviços',
      'Cronograma de aulas coletivas e seção de professores',
      'Formulário de aula experimental integrado ao WhatsApp',
      'Depoimentos, localização e perguntas frequentes',
    ],
    tech: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Vercel'],
    architecture: [
      { role: 'site', tech: ['React', 'TanStack Start', 'Tailwind CSS'] },
      { role: 'contato', tech: ['WhatsApp'] },
    ],
    links: [
      { label: 'Abrir site', href: 'https://wmfitacademia.vercel.app/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/wmfitacademia`, kind: 'code' },
    ],
    note: 'Desenvolvido para uma academia real; o projeto não seguiu para implantação com o cliente e foi publicado como peça de portfólio.',
  },
  {
    slug: 'atelier-tempo',
    index: '05',
    name: 'Atelier — Tempo',
    category: 'Scroll-driven Experience / Creative',
    kind: 'autoral',
    layout: 'compact',
    summary:
      'Site de uma relojoaria fictícia em que a rolagem controla um vídeo: ao descer, o relógio se desmonta camada por camada; ao subir, se remonta. HTML, CSS e JavaScript puros, sem build.',
    features: [
      'Abertura fixa com o tempo do vídeo seguindo a rolagem nos dois sentidos',
      'Dissolução da cena estática para o filme nos primeiros 3% da rolagem',
      'Menu fixo que acompanha a seção visível; vídeo e layout próprios para celular',
      'Com movimento reduzido ou sem JavaScript, a abertura vira um hero estático',
      'Pipeline com IA: mockup, recorte das camadas em Python (Pillow + numpy) e vídeo exportado com ffmpeg',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'ffmpeg', 'Vercel'],
    architecture: [
      { role: 'página', tech: ['HTML5', 'CSS3', 'JavaScript'] },
      { role: 'mídia', tech: ['Python', 'ffmpeg'] },
    ],
    links: [
      { label: 'Abrir site', href: 'https://site-animado-azure.vercel.app/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/site-animado`, kind: 'code' },
    ],
    note: 'Projeto guiado do Builders Club. A marca "Atelier" e o relógio "Tempo 40" são fictícios, criados para estudo.',
  },
  {
    slug: 'botflix',
    index: '06',
    name: 'Botflix',
    category: 'Web Application / AI Integration',
    kind: 'autoral',
    layout: 'compact',
    summary:
      'Plataforma de consulta e recomendação de filmes integrada à API do TMDB, com recomendações automatizadas por um agente de IA construído com n8n, LangChain e Google Gemini.',
    features: [
      'Consulta de filmes via TMDB API',
      'Agente de recomendação com n8n e LangChain',
      'Respostas geradas com Google Gemini',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'n8n', 'LangChain', 'Google Gemini', 'TMDB API'],
    architecture: [
      { role: 'interface', tech: ['React', 'TypeScript'] },
      { role: 'agente', tech: ['n8n', 'LangChain', 'Gemini'] },
      { role: 'catálogo', tech: ['TMDB API'] },
    ],
    links: [
      { label: 'Abrir aplicação', href: 'https://jasielrasec18-dev.github.io/botflix-filmes/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/botflix-filmes`, kind: 'code' },
    ],
  },
  {
    slug: 'aura-studio',
    index: '07',
    name: 'Aura Studio',
    category: 'Creative Landing Page',
    kind: 'autoral',
    layout: 'compact',
    summary:
      'Landing page conceitual com identidade visual sofisticada, design moderno, animações e foco na experiência do usuário.',
    features: [
      'Direção visual própria',
      'Animações com GSAP',
      'Layout responsivo',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    architecture: [
      { role: 'página', tech: ['HTML5', 'CSS3', 'JavaScript'] },
      { role: 'motion', tech: ['GSAP'] },
    ],
    links: [
      { label: 'Abrir página', href: 'https://jasielrasec18-dev.github.io/aura-studio/', kind: 'demo' },
      { label: 'Código-fonte', href: `${GH}/aura-studio`, kind: 'code' },
    ],
  },
]
