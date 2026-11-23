import shots from '../data/screenshots.json'

export interface Shot {
  src: string
  width: number
  height: number
}

const manifest = shots as Record<string, Shot>

export function getShot(slug: string, n: 1 | 2 = 1): Shot | undefined {
  return manifest[`${slug}-0${n}`]
}
