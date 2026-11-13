# Design System — Portfolio Jasiel Rasec

Documento derivado do código-fonte (`src/styles/index.css`, `src/components/`, `src/sections/`). A fonte da verdade dos tokens é o bloco `@theme` do Tailwind v4 em [src/styles/index.css](src/styles/index.css).

**Stack visual:** React 19 · Tailwind CSS 4 (`@theme`, sem `tailwind.config`) · Motion (`motion/react`) · lucide-react · simple-icons · fontes via `@fontsource-variable`.

---

## 1. Princípios

1. **Editorial-técnico.** Linguagem de terminal/documentação: numeração de seção (`§03`), caminhos (`~/stack`), rótulos mono em caixa alta, hairlines e grades visíveis.
2. **Dark-only.** Um único tema escuro (`color-scheme: dark`, `theme-color: #08090b`). Não há tokens de tema claro.
3. **Um acento por função.** Ciano = interação/foco/destaque. Violeta = ambiente (halo) e "projeto de cliente". Nada além disso.
4. **Honestidade visual.** Sem telas simuladas: sem captura real, mostra-se a arquitetura documentada ([ProjectImage](src/components/ProjectImage.tsx)). Sem ícone de marca, usa monograma neutro ([TechIcon](src/components/TechIcon.tsx)).
5. **Movimento com propósito e acessível.** Só `transform`/`opacity`; tudo respeita `prefers-reduced-motion`.

---

## 2. Design tokens

### 2.1 Cor (`@theme` → utilitários `bg-*`, `text-*`, `border-*`)

| Token | Hex | Papel |
|---|---|---|
| `ink` | `#08090b` | Fundo base da página (`body`) |
| `ink-2` | `#0c0d11` | Fundo de seção alternada (ex.: Especialidades) |
| `graphite` | `#111318` | Superfície elevada (Contato, `.frame`) |
| `panel` | `#15181e` | Painéis/cartões mais claros que `graphite` |
| `line` | `#23272f` | Hairlines, bordas, divisores, base do `.field` |
| `steel` | `#777d87` | Texto terciário: metadados, rótulos, placeholder |
| `mist` | `#a9aeb6` | Texto secundário: parágrafos, links de navegação |
| `paper` | `#f2f3f5` | Texto primário e botão sólido |
| `cyan` | `#69d9e8` | **Acento principal**: foco, hover, seleção, índices, progresso |
| `violet` | `#9276f5` | **Acento ambiente**: halo/glow do Hero, selo "cliente real" |
| `danger` | `#f0708a` | Erro: borda de campo inválido, mensagens de falha |

**Semântico (aliases de uso):**

| Intenção | Token | Observação |
|---|---|---|
| Fundo da página | `ink` | |
| Superfície alternada | `ink-2`, `graphite` | |
| Borda padrão | `line` | `/70` em header com blur |
| Texto principal / secundário / terciário | `paper` / `mist` / `steel` | |
| Acento interativo | `cyan` | |
| Erro | `danger` | `text-danger`, `border-danger` |

**Contraste** (estimado sobre `ink`, validar com ferramenta): `paper` ≈ 17:1, `cyan` ≈ 12:1, `mist` ≈ 9:1, `violet` ≈ 5:1, `steel` ≈ 4,7:1 (no limite do AA para texto pequeno — evitar abaixo de 12px em fundos mais claros que `ink`).

**Misturas permitidas** (via `color-mix(in oklab, …)`): `paper` a 4–16% para grades/texto de baixo contraste; `violet` 16–22% e `cyan` 10% para halos. Padrão: `color-mix` em vez de hex com alfa.

### 2.2 Tipografia

| Token | Família | Uso |
|---|---|---|
| `font-display` | Bricolage Grotesque Variable (fallback Arial Narrow) | Títulos, logotipo, números grandes |
| `font-sans` | Geist Variable | Corpo (padrão do `body`, com `ss01`, `cv11`) |
| `font-mono` | JetBrains Mono Variable | Metadados, rótulos, tecnologias, índices, erros |

**Escala em uso**

| Papel | Classe / valor | Notas |
|---|---|---|
| Título de seção | `.display text-[clamp(2.4rem,6.2vw,6rem)] leading-[0.92] font-semibold text-balance` | Via `SectionHeader` |
| Título de Contato | `.display text-[clamp(2.8rem,8vw,8.5rem)] leading-[0.9] font-bold` | Variante maior, única |
| Logotipo | `.display text-[1.05rem] font-bold tracking-[0.08em]` | `JASIEL.RASEC`, ponto em `cyan` |
| Menu mobile | `.display text-3xl font-semibold` | |
| Lead / parágrafo | `text-lg leading-relaxed text-mist`, `max-w-[46ch]` | Medida ~46 caracteres |
| Corpo pequeno | `text-sm leading-snug text-mist` | Listas de features |
| `.meta` | mono `0.75rem`, `leading-relaxed`, `tracking-tight`, `steel` | Metadados reais (`~/caminho`, dimensões) |
| `.label` | mono `0.6875rem`, caixa alta, `tracking-[0.18em]`, `steel` | Rótulos editoriais |
| Índice | `font-mono text-sm text-cyan tabular-nums` | `§03`, `01` |

`.display` aplica `font-stretch: 88%` e `letter-spacing: -0.022em`. Números sempre com `tabular-nums`.

### 2.3 Espaçamento e layout

- **Contêiner `.shell`:** `max-w-[104rem]`, `mx-auto`, `px-5 sm:px-8 lg:px-12`. Todo conteúdo de seção deve estar dentro dele.
- **Ritmo vertical de seção:** `py-24 lg:py-36` (padrão); `py-28 lg:py-40` (Contato, a seção de fechamento).
- **Grade:** 12 colunas em `lg`. Cabeçalho de seção = `lg:col-span-3` (índice + caminho) + `lg:col-span-9` (título). `gap-x-6`.
- **Alvos de toque:** mínimo `min-h-11` (44px) em links de ação; `size-11` em botão de ícone; `min-h-14` em linhas de menu/canais.
- **Âncora:** `scroll-padding-top: 5rem` (compensa o header fixo).
- **Breakpoints:** padrão Tailwind + `3xl: 112rem`.

### 2.4 Bordas, raios, elevação

- Borda padrão: **1px `line`**. Divisores de lista: `divide-y divide-line` + `border-y border-line`.
- Raios: `rounded-full` (botões/pílulas, botão de menu), `rounded-[3px]` (monograma de tecnologia), `2px` (anel de foco). **Cantos retos** nas superfícies (`.frame`).
- **Sem sombras.** Profundidade vem de troca de superfície (`ink` → `graphite`), hairlines, blur de fundo (`backdrop-blur-md` no header) e granulado.

### 2.5 Movimento

| Token / valor | Uso |
|---|---|
| `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` | Easing único do sistema (CSS e `EASE` em Motion) |
| 300ms | Cor/borda em hover |
| 400ms | Traço do `.nav-link` |
| 700–900ms | Entradas (`Fade` 0,7s; `RevealLines` 0,9s, escalonado 80ms/linha) |
| 1,2s | Zoom de imagem em hover (`1.025`) |
| 40s linear | Marquee de stack |

**Regra:** animar apenas `transform` e `opacity`. Com `prefers-reduced-motion`: animações CSS viram ~0ms, `scroll-behavior: auto`, marquee parado, `RevealLines` degrada para fade, `Intro` é pulada.

### 2.6 Camadas (z-index)

| z | Elemento |
|---|---|
| `z-40` | Menu mobile em tela cheia |
| `z-50` | Header fixo |
| `z-60` | Granulado (`.grain::before`), barra de progresso de scroll |
| `z-[100]` | Link "Pular para o conteúdo" (no foco) |

---

## 3. Padrões perceptuais (assinatura visual)

| Classe | O que faz | Onde |
|---|---|---|
| `.frame` | Superfície `graphite` + borda `line` + cantos-marcadores ciano (10px) em topo-esquerdo e base-direito | Capturas de projeto, diagrama de arquitetura |
| `.hero-grid` | Quadriculado de 80px a 6% de branco | Fundo do Hero |
| `.tech-grid` | Colunas verticais (4 mobile / 12 desktop) a 4% de `paper` | Fundo estrutural |
| `.hero-glow`, `.halo` | Radiais violeta/ciano de baixa opacidade | Hero |
| `.hero-outline` | Texto vazado (`-webkit-text-stroke` 1px a 55%) | Nome no Hero |
| `.outline-type` | Texto a 16% de `paper` (alternativa ao stroke, que expõe sobreposições em fonte variável) | Segunda linha do nome |
| `.cut-top` / `.cut-bottom` | `clip-path` diagonal de 3,5vw no limite da seção | Stack, Contato |
| `.grain` | Ruído SVG fixo a 3,5% de opacidade | Raiz do `App` |
| `.caret`, `.blink-dot` | Cursor/ponto piscando (`steps(1)`, 1,1s) | Hero, terminal |
| `.pulse-dot` | Anel ciano que expande (disponibilidade) | Hero |
| `.packet` | Ponto percorrendo `offset-path` | Gráfico de arquitetura do Hero |
| `.vertical` | `writing-mode: vertical-rl` | Marcadores laterais |

**Iconografia:** `lucide-react` com `strokeWidth` 1.5–1.75, tamanhos 16/20. Ícones de marca (GitHub/LinkedIn) são SVGs próprios no mesmo traço (`BrandIcon`, 14px). Logos de tecnologia vêm de `simple-icons`, preenchidos com `currentColor`. Glifos de Especialidades: desenho de linha 64×48 com `.accent` em ciano.

**Voz:** português do Brasil, direta, sem exageros. Rótulos técnicos em minúsculas com caminho (`~/contato`); rótulos editoriais em caixa alta mono.

---

## 4. Componentes

Hierarquia (Atomic Design) conforme o código atual.

### 4.1 Átomos

#### `ActionLink` — [src/components/ActionLink.tsx](src/components/ActionLink.tsx)
**Propósito:** link de ação/CTA (nunca `<button>`; sempre navega).

| Variante | Visual | Uso |
|---|---|---|
| `solid` (padrão) | Pílula `bg-paper`, texto `ink`; hover → `bg-cyan` | CTA primário (1 por viewport) |
| `ghost` | Pílula com `border-line`; hover → `border-paper` | CTA secundário |
| `text` | Sublinhado `decoration-line`, offset 6px; hover → `decoration-cyan` | Links em listas de projeto |

Props: `href`, `variant`, `external`, `icon` (`external` ↗ · `down` ↓ · `none`), `className`, `onClick`.
**Estados:** hover (cor 300ms + ícone desliza 2px na direção da ação), foco (anel ciano global), sem estado disabled (não aplicável a links).
**A11y:** `min-h-11`; `external` adiciona `target="_blank" rel="noopener noreferrer"` e `<span class="sr-only">(abre em nova aba)</span>`; ícone `aria-hidden`.

#### `TechIcon` — [src/components/TechIcon.tsx](src/components/TechIcon.tsx)
Logo `simple-icons` (`currentColor`, 18px padrão) ou, sem correspondência, monograma de 2 letras em caixa de 3px de raio. Decorativo (`aria-hidden`); o nome vem sempre ao lado em texto.

#### Campo de formulário `.field`
Input "sublinhado": sem fundo, só `border-b border-line`; foco → `border-cyan` (outline removido porque a borda assume o foco); `aria-invalid="true"` → borda `danger`; placeholder `steel/70`.

#### Rótulos tipográficos
`.label`, `.meta`, índice `§NN` — ver §2.2.

#### `ScrollProgress` — [src/components/ScrollProgress.tsx](src/components/ScrollProgress.tsx)
Linha de 1px ciano fixa no topo, `scaleX` suavizado por `useSpring`. `aria-hidden`.

### 4.2 Moléculas

#### `SectionHeader` — [src/components/SectionHeader.tsx](src/components/SectionHeader.tsx)
Índice `§NN` (ciano) + `~/caminho` (`.meta`) à esquerda; título `RevealLines` oversized à direita; `children` opcionais abaixo do título. Props: `number`, `path`, `title: string[]` (uma entrada por linha), `id`, `children`.
**A11y:** o `<h2>` recebe `aria-label` com o texto completo; as linhas animadas são `aria-hidden`; `#<id>-title` (sr-only) serve de alvo para `aria-labelledby` da seção.

#### `RevealLines` e `Fade` — [src/components/Reveal.tsx](src/components/Reveal.tsx)
- `RevealLines`: revelação por linha com máscara (`overflow-hidden` + `y: 105% → 0`). `as`: `h1|h2|h3|p`. Dispara uma vez (`whileInView`, margem −12%).
- `Fade`: entrada de bloco (`opacity 0→1`, `y 16→0`, 0,7s). `delay` escalona itens em grade (padrão do projeto: `(i % 3) * 0.06`).

#### `ProjectImage` — [src/components/ProjectImage.tsx](src/components/ProjectImage.tsx)
Dois estados mutuamente exclusivos: **captura real** (`<figure class="frame zoom-img">`, `width`/`height` explícitos, `loading` lazy/eager, legenda `.meta` com dimensões) ou **lâmina de arquitetura** (`role="img"` + `aria-label`, linhas `role — tecnologias`). Props: `slug`, `name`, `n` (1|2), `caption`, `eager`, `architecture`. Fonte: `src/data/screenshots.json`.

#### Linha de canal / item de lista
`min-h-14`, `label` + valor mono + ícone ↗; hover → `text-cyan` e ícone desliza. Usada em Contato (`channels`). Padrão replicado em listas de links.

#### `Field` (Contato)
`label` + controle + mensagem de erro mono `text-xs` com `aria-live="polite"` e `min-h-5` (reserva espaço, evitando salto de layout). Erro ligado ao controle por `aria-describedby`.

### 4.3 Organismos

| Componente | Função | Pontos-chave |
|---|---|---|
| `Header` | Navegação fixa | Transparente no topo → `bg-ink/70 backdrop-blur-md` ao rolar; recolhe ao descer, reaparece ao subir (`useScrollState`); item ativo via `useActiveSection` (`aria-current`); menu mobile `fixed inset-0` com `Esc`, trava de scroll, `aria-expanded`/`aria-controls`; **skip link** |
| `Intro` | Abertura ≈1,2s | Contador mono + nome em máscara; pulada com reduced-motion; conteúdo já está renderizado por baixo |
| `Hero` | Primeira dobra | `min-h-svh`, grade 80px + glow, nome com `.hero-outline`, gráfico de arquitetura animado; animações só depois de `ready` |
| `Projects` | Lista de projetos | Subcomponentes `Title` (`"Nome | Subtítulo"`), `Meta`, `Tech`, `Features`, `Links`; selo violeta para `kind: 'cliente'` |
| `Specialties` | 4 especialidades | Glifos de linha próprios |
| `Stack` | Tecnologias | `Ticker` (marquee com máscara de gradiente, `aria-hidden`) + listagem tipo diretório `~/stack/<categoria>/` |
| `Contact` | Formulário + canais | Validação client-side, honeypot `_gotcha`, estados `idle/sending/success/error`, foco no primeiro erro |
| `Footer`, `About`, `Experience` | Conteúdo | Seguem os mesmos padrões |

### 4.4 Template / página

`App.tsx`: `Intro → ScrollProgress → Header → <main>[Hero, About, Projects, Specialties, Stack, Experience, Contact] → Footer`, tudo dentro de `.grain`.

**Alternância de fundo entre seções** cria o ritmo: `ink` → … → `ink-2` (Especialidades) → `ink` com `.cut-top` (Stack) → … → `graphite` com `.cut-top` (Contato).

### 4.5 Hooks de comportamento

- `useActiveSection(ids)` — `IntersectionObserver` com `rootMargin: -40% 0px -50% 0px`; devolve a seção no centro da viewport.
- `useScrollState()` — `{ scrolled, hidden }` para o header.

---

## 5. Padrões de interação

| Estado | Tratamento |
|---|---|
| **Foco** | Global: `outline: 2px solid cyan; offset 3px; radius 2px`. Nunca remover sem substituto equivalente (`.field` usa `border-cyan`). |
| **Hover** | Mudança de cor em 300ms; ícones deslizam 2px; `.nav-link` desenha traço ciano da esquerda (400ms). |
| **Ativo (nav)** | `aria-current="true"` → texto `paper` + traço completo. |
| **Seleção de texto** | Fundo `cyan`, texto `ink`. |
| **Erro** | Borda `danger` + mensagem mono + `aria-invalid` + `aria-live`. |
| **Carregando (envio)** | Campos `disabled`, ícone `LoaderCircle`. |
| **Vazio** | Sem captura → lâmina de arquitetura (nunca placeholder falso). |

---

## 6. Acessibilidade (o que já está embutido)

- `lang="pt-BR"`, landmarks (`header`, `nav` com `aria-label`, `main`, `footer`), `section[aria-labelledby]`.
- Skip link "Pular para o conteúdo" visível no foco.
- Alvos ≥ 44px; navegação por teclado completa; `Esc` fecha o menu.
- Texto animado mantém `aria-label` com o conteúdo completo.
- Links externos anunciam "(abre em nova aba)".
- `prefers-reduced-motion` respeitado em CSS e em Motion.
- Imagens com `alt` descritivo, `width`/`height` (sem CLS), `loading`/`fetchPriority` controlados.
- **Meta:** WCAG 2.2 AA. O script `npm run audit` ([scripts/audit.mjs](scripts/audit.mjs)) roda a verificação com Playwright.

---

## 7. Convenções

**Nomenclatura**
- Tokens de cor nomeados por **papel físico/material** (`ink`, `graphite`, `steel`, `mist`, `paper`), não por valor. Para novos acentos, seguir o mesmo tom (substantivo curto).
- Classes utilitárias de componente em `@layer components` com nome por **função**: `.shell`, `.frame`, `.label`, `.meta`, `.field`.
- Componentes: `PascalCase`, um por arquivo, em `src/components/` (reutilizáveis) ou `src/sections/` (blocos de página). Dados em `src/data/`, nunca embutidos no JSX.
- IDs de seção em português sem acento (`inicio`, `contato`, `especialidades`) e espelhados em `SectionId`.

**Regras de uso**
1. Nunca usar hex cru em componente — usar token (`text-cyan`, não `text-[#69d9e8]`).
2. Ciano é para interação/destaque; não usar como cor de texto corrido.
3. Violeta só em ambiente (glow) e no selo de "cliente real".
4. Um CTA `solid` por viewport; demais em `ghost`/`text`.
5. Títulos em `.display`; metadados em mono; corpo em sans. Não misturar papéis.
6. Toda animação nova: `transform`/`opacity`, `--ease-out-expo`, e fallback para reduced-motion.
7. Todo link externo usa `ActionLink external` (ou replica `rel` + texto sr-only).
8. Novas seções: `<section id aria-labelledby>` → `.shell` → `SectionHeader` → conteúdo em `Fade`.

---

## 8. Como estender

**Novo token de cor:** adicionar em `@theme` (`--color-nome`), usar via utilitário; documentar na tabela §2.1.
**Novo componente:** confirmar que aparece em 2+ contextos; definir variantes (máx. 5), estados (hover/foco/disabled), a11y e movimento; documentar aqui na seção de componentes.
**Nova variante de `ActionLink`:** adicionar em `variants` e na tabela §4.1 — hoje há 3.

---

## 9. Dívidas e inconsistências observadas

| # | Achado | Sugestão |
|---|---|---|
| ~~1~~ | ✅ Corrigido: cor de erro virou o token `--color-danger` | — |
| ~~2~~ | ✅ Corrigido: `.meta-label` removido; Hero usa `.label` | — |
| ~~3~~ | ✅ Corrigido: contêiner do Hero usa `.shell` | — |
| 4 | `.hairline` (`border-line`) e `.halo` parecem sem uso | Verificar com busca e remover se confirmado |
| 5 | **Estado de sucesso/aviso sem token** (só há erro); sucesso usa ícone `Check` sem cor semântica própria | Definir `--color-success` se o formulário crescer |
| 6 | **`steel` ≈ 4,7:1** sobre `ink`: cai abaixo de 4,5:1 em `graphite`/`panel` com texto de 11–12px (`.label`) | Medir; se necessário clarear `steel` ~5% ou usar `mist` em rótulos sobre `graphite` |
| 7 | **Tokens `ink-2` e `panel`** têm uso raro (1–2 lugares) | Manter apenas se houver intenção de uso; senão consolidar em `graphite` |
| 8 | Easing duplicado: `--ease-out-expo` (CSS) e `EASE` em 4 arquivos TSX | Exportar uma constante única (`src/lib/motion.ts`) |
| 9 | **Sem tema claro** e sem `forced-colors` | Aceitável para portfólio dark-only; considerar `forced-colors` para acessibilidade |

---

## 10. Maturidade

Nível **2 → 3 (Emergente → Gerenciado)**: tokens e padrões consistentes e bem documentados no código, componentes reutilizáveis pequenos, mas sem biblioteca isolada (Storybook), sem tokens semânticos em camadas (só global) e sem testes visuais. Para um portfólio de autoria única, o nível atual é adequado; o ganho real está em fechar as dívidas da §9 (itens 1–3 primeiro).
