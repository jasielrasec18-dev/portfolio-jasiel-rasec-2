/**
 * Envio do formulário de contato.
 *
 * O endpoint vem de `VITE_CONTACT_ENDPOINT` (ex.: https://formspree.io/f/xxxxxxx).
 * Qualquer serviço que aceite POST JSON com `Accept: application/json`
 * (Formspree, Web3Forms, Basin, uma função própria) funciona.
 * Sem o endpoint configurado o formulário NÃO simula envio: ele informa
 * que depende de configuração e aponta para e-mail/WhatsApp.
 */
export const CONTACT_ENDPOINT: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(data: ContactPayload): FieldErrors {
  const errors: FieldErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Informe um e-mail válido.'
  if (data.subject.trim().length < 3) errors.subject = 'Informe um assunto.'
  if (data.message.trim().length < 10) errors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return errors
}

export async function sendContact(data: ContactPayload): Promise<void> {
  if (!CONTACT_ENDPOINT) {
    throw new Error('Formulário sem endpoint configurado (VITE_CONTACT_ENDPOINT).')
  }
  const res = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, _subject: `[Portfólio] ${data.subject}` }),
  })
  if (!res.ok) {
    throw new Error(`O serviço de envio respondeu com status ${res.status}.`)
  }
}
