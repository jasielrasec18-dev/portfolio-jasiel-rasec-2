/**
 * Auditoria automatizada do site (Playwright).
 *
 *   npm run build && node scripts/audit.mjs
 *
 * Verifica: erros de console, âncoras da navegação, menu mobile, validação
 * do formulário, imagens carregadas, metadados e rolagem horizontal, e
 * grava capturas em ./audit/ para revisão visual em 4 larguras.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, stat, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const OUT = new URL('../audit/', import.meta.url).pathname
const PORT = 4173
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.xml': 'application/xml',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
}

// Servidor estático mínimo para o build
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (path === '/') path = '/index.html'
  try {
    const file = join(DIST, path)
    await stat(file)
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(await readFile(file))
  } catch {
    res.writeHead(404)
    res.end('not found')
  }
})
await new Promise((r) => server.listen(PORT, r))
await mkdir(OUT, { recursive: true })

const exe = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] })
const problems = []
const ok = (label) => console.log('  ✓', label)
const fail = (label) => { problems.push(label); console.log('  ✗', label) }

for (const [name, viewport] of Object.entries({
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  ultrawide: { width: 2560, height: 1080 },
})) {
  console.log(`\n# ${name} ${viewport.width}×${viewport.height}`)
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`))

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200) // abertura

  // Metadados
  const title = await page.title()
  if (title.includes('Jasiel Rasec')) ok(`title: ${title}`)
  else fail(`title inesperado: ${title}`)
  const desc = await page.getAttribute('meta[name="description"]', 'content')
  if (desc) ok('meta description presente')
  else fail('meta description ausente')
  if (await page.$('script[type="application/ld+json"]')) ok('JSON-LD presente')
  else fail('JSON-LD ausente')

  // Âncoras da navegação apontam para seções existentes
  const hrefs = await page.$$eval('a[href^="#"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  for (const h of hrefs) {
    const exists = await page.$(h)
    if (exists) ok(`âncora ${h}`)
    else fail(`âncora sem alvo: ${h}`)
  }

  // Links externos: todos com rel noopener
  const bad = await page.$$eval('a[target="_blank"]', (as) => as.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href))
  if (bad.length === 0) ok('links externos com rel="noopener"')
  else fail(`sem noopener: ${bad.join(', ')}`)

  // Rolagem horizontal indesejada
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  if (overflow <= 0) ok('sem rolagem horizontal')
  else fail(`rolagem horizontal de ${overflow}px`)

  // Imagens: todas carregadas, com alt e dimensões
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 800))
    window.scrollTo(0, 0)
  })
  const imgs = await page.$$eval('img', (els) =>
    els.map((i) => ({ src: i.currentSrc, ok: i.complete && i.naturalWidth > 0, alt: i.alt, w: i.getAttribute('width') })),
  )
  if (imgs.every((i) => i.ok)) ok(`${imgs.length} imagens carregadas`)
  else fail(`imagens quebradas: ${imgs.filter((i) => !i.ok).map((i) => i.src).join(', ')}`)
  if (imgs.every((i) => i.alt && i.w)) ok('imagens com alt e width/height')
  else fail('imagem sem alt ou dimensões')

  // Menu mobile
  if (viewport.width < 1024) {
    await page.click('button[aria-controls="menu-mobile"]')
    await page.waitForSelector('#menu-mobile', { state: 'visible' })
    ok('menu mobile abre')
    await page.click('#menu-mobile a[href="#projetos"]')
    await page.waitForSelector('#menu-mobile', { state: 'detached', timeout: 3000 })
    ok('menu mobile fecha ao escolher seção')
    const y = await page.evaluate(() => window.scrollY)
    if (y > 100) ok(`navegou para #projetos (scrollY=${Math.round(y)})`)
    else fail('não rolou até #projetos')
    await page.keyboard.press('Home')
  }

  // Formulário: validação sem endpoint
  await page.click('a[href="#contato"]:visible')
  await page.waitForTimeout(600)
  await page.click('form button[type="submit"]')
  const errCount = await page.$$eval('form [aria-invalid="true"]', (els) => els.length)
  if (errCount === 4) ok('validação marca os 4 campos vazios')
  else fail(`validação marcou ${errCount} campos`)
  const pending = await page.$('form [role="status"]')
  const configured = await page.evaluate(() =>
    [...document.scripts].some((s) => s.src) && !document.querySelector('form [role="status"]'),
  )
  if (pending) {
    ok('endpoint ausente: aviso de configuração pendente visível')
  } else if (configured) {
    // Intercepta o POST (nenhuma mensagem real é enviada) e verifica o fluxo de sucesso e de erro
    let body = null
    await page.route('**/formspree.io/**', (route) => {
      body = route.request().postDataJSON()
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
    await page.fill('form input[name="name"]', 'Teste Automatizado')
    await page.fill('form input[name="email"]', 'teste@exemplo.com')
    await page.fill('form input[name="subject"]', 'Auditoria')
    await page.fill('form textarea[name="message"]', 'Mensagem de teste da auditoria automatizada.')
    await page.click('form button[type="submit"]')
    await page.waitForSelector('text=Mensagem enviada', { timeout: 4000 }).catch(() => null)
    if (body && body.email === 'teste@exemplo.com' && (await page.$('text=Mensagem enviada'))) ok('envio do formulário (POST JSON + mensagem de sucesso)')
    else fail('fluxo de envio do formulário')
    await page.unroute('**/formspree.io/**')
    await page.route('**/formspree.io/**', (route) => route.fulfill({ status: 500, body: '{}' }))
    await page.fill('form input[name="name"]', 'Teste Automatizado')
    await page.fill('form input[name="email"]', 'teste@exemplo.com')
    await page.fill('form input[name="subject"]', 'Auditoria')
    await page.fill('form textarea[name="message"]', 'Mensagem de teste da auditoria automatizada.')
    await page.click('form button[type="submit"]')
    await page.waitForSelector('text=Não foi possível enviar', { timeout: 4000 }).catch(() => null)
    if (await page.$('text=Não foi possível enviar')) ok('erro do serviço exibido ao usuário')
    else fail('erro do serviço não exibido')
    await page.unroute('**/formspree.io/**')
    // O 500 acima foi simulado de propósito; não conta como erro do site
    for (let i = errors.length - 1; i >= 0; i--) if (/status of 500/.test(errors[i])) errors.splice(i, 1)
  } else {
    fail('estado do formulário indefinido')
  }

  // Capturas para revisão visual
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.screenshot({ path: join(OUT, `${name}-hero.png`) })
  await page.screenshot({ path: join(OUT, `${name}-full.png`), fullPage: true })

  if (errors.length === 0) ok('sem erros de console')

  else fail(`erros de console: ${errors.join(' | ')}`)
  await ctx.close()
}

// Reduced motion: conteúdo visível sem animações
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  const op = await page.$eval('#hero-title', (el) => getComputedStyle(el).opacity)
  const intro = await page.$('[class*="z-[90]"]')
  console.log('\n# prefers-reduced-motion')
  if (!intro) ok('abertura pulada')
  else fail('abertura exibida com reduced-motion')
  if (op === '1') ok('título do hero visível')
  else fail('título do hero invisível')
  await ctx.close()
}

await browser.close()
server.close()
console.log(problems.length ? `\n${problems.length} problema(s) encontrado(s).` : '\nTudo certo.')
process.exit(problems.length ? 1 : 0)
