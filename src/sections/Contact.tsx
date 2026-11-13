import { useId, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from 'lucide-react'
import { Fade, RevealLines } from '../components/Reveal'
import { profile, whatsappHref } from '../data/profile'
import {
  CONTACT_ENDPOINT,
  sendContact,
  validate,
  type ContactPayload,
  type FieldErrors,
} from '../lib/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'

const empty: ContactPayload = { name: '', email: '', subject: '', message: '' }

const channels = [
  { label: 'E-mail', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: 'WhatsApp', value: profile.whatsappDisplay, href: whatsappHref, external: true },
  { label: 'LinkedIn', value: 'in/jasielrasec-dev', href: profile.linkedin, external: true },
  { label: 'GitHub', value: 'jasielrasec18-dev', href: profile.github, external: true },
]

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      <span id={`${id}-error`} className="min-h-5 font-mono text-xs text-[#f0708a]" aria-live="polite">
        {error}
      </span>
    </div>
  )
}

export function Contact() {
  const uid = useId()
  const [data, setData] = useState<ContactPayload>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const configured = Boolean(CONTACT_ENDPOINT)

  const set = (key: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const inputProps = (key: keyof ContactPayload) => ({
    id: `${uid}-${key}`,
    name: key,
    value: data[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
    className: 'field',
    disabled: status === 'sending',
  })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Honeypot: bots preenchem o campo oculto
    const trap = (e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value
    if (trap) return

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0] as keyof ContactPayload
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await sendContact(data)
      setStatus('success')
      setData(empty)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Não foi possível enviar a mensagem.')
    }
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="cut-top relative bg-graphite py-28 lg:py-40"
    >
      <div className="shell">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-cyan tabular-nums">§07</span>
          <span className="meta">~/contato</span>
        </div>
        <RevealLines
          as="h2"
          lines={['Tem uma ideia?', 'Vamos transformar', 'em realidade.']}
          className="display mt-6 text-[clamp(2.8rem,8vw,8.5rem)] leading-[0.9] font-bold text-balance text-paper"
        />
        <span id="contato-title" className="sr-only">
          Tem uma ideia? Vamos transformar em realidade.
        </span>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {/* Canais diretos */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Fade>
              <p className="max-w-[46ch] text-lg leading-relaxed text-mist">
                Estou aberto a novas oportunidades profissionais, conexões na área de tecnologia e
                projetos que desafiem minha capacidade de criar soluções digitais.
              </p>
            </Fade>
            <Fade delay={0.1}>
              <ul className="divide-y divide-line border-y border-line">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-cyan"
                    >
                      <span className="label w-24 shrink-0">{c.label}</span>
                      <span className="flex-1 truncate font-mono text-sm text-paper transition-colors group-hover:text-cyan">
                        {c.value}
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-steel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
                      />
                      {c.external && <span className="sr-only">(abre em nova aba)</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="meta mt-4">
                {profile.city} — {profile.stateShort}, {profile.country} · {profile.coordinates}
              </p>
            </Fade>
          </div>

          {/* Formulário */}
          <Fade className="lg:col-span-6 lg:col-start-7" delay={0.15}>
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
              {!configured && (
                <p
                  role="status"
                  className="mb-4 border border-violet/60 bg-violet/10 p-4 text-sm leading-relaxed text-paper"
                >
                  <span className="label block text-violet">configuração pendente</span>
                  O envio deste formulário depende de um endpoint externo
                  (<code className="font-mono text-xs">VITE_CONTACT_ENDPOINT</code>) que ainda não
                  foi configurado. Enquanto isso, use o e-mail ou o WhatsApp ao lado.
                </p>
              )}

              <div className="grid gap-x-6 sm:grid-cols-2">
                <Field id={`${uid}-name`} label="Nome" error={errors.name}>
                  <input type="text" autoComplete="name" placeholder="Seu nome" {...inputProps('name')} />
                </Field>
                <Field id={`${uid}-email`} label="E-mail" error={errors.email}>
                  <input type="email" autoComplete="email" placeholder="voce@exemplo.com" {...inputProps('email')} />
                </Field>
              </div>
              <Field id={`${uid}-subject`} label="Assunto" error={errors.subject}>
                <input type="text" placeholder="Sobre o que vamos conversar?" {...inputProps('subject')} />
              </Field>
              <Field id={`${uid}-message`} label="Mensagem" error={errors.message}>
                <textarea rows={5} placeholder="Conte um pouco sobre a ideia ou a oportunidade." {...inputProps('message')} />
              </Field>

              {/* Honeypot — invisível para pessoas, preenchido por bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${uid}-gotcha`}>Não preencha</label>
                <input id={`${uid}-gotcha`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-7 text-sm font-medium text-ink transition-colors duration-300 hover:bg-cyan disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    'Enviar mensagem'
                  )}
                </button>
                <span className="meta">
                  {configured ? 'Respondo normalmente em até 1 dia útil.' : 'Envio indisponível até a configuração.'}
                </span>
              </div>

              <div aria-live="polite" className="min-h-6 pt-2">
                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-cyan">
                    <Check size={16} aria-hidden="true" /> Mensagem enviada. Obrigado — retorno em breve.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-start gap-2 text-sm text-[#f0708a]">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Não foi possível enviar: {errorMsg} Use o e-mail ou o WhatsApp.
                    </span>
                  </p>
                )}
              </div>
            </form>
          </Fade>
        </div>
      </div>
    </section>
  )
}
