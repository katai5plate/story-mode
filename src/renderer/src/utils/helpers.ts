import { BASE_777_TABLE } from '@renderer/constants/system'

export const randomJoin = (arr: string[], separators: string[]) =>
  arr
    .map((word, i) =>
      i < arr.length - 1 ? word + separators[Math.floor(Math.random() * separators.length)] : word
    )
    .join('')

export const unique = () => {
  return randomJoin(
    window.crypto
      .randomUUID()
      .split('-')
      .map((x) => {
        let big = BigInt('0x' + x)
        if (big === BigInt(0)) return '0'
        const base = BigInt(BASE_777_TABLE.length)
        const result = []
        while (big > BigInt(0)) {
          const index = big % base
          result.push(BASE_777_TABLE[Number(index)])
          big = big / base
        }
        return result.reverse().join('')
      }),
    Array.from('、。・／！？＋－＝＊＆～ー')
  )
}

export const anyObject = () => {
  const handler = {
    get(target, prop) {
      if (!(prop in target)) target[prop] = new Proxy(() => target, handler)
      return target[prop]
    },
    apply(target) {
      return target
    }
  }
  return new Proxy({}, handler) as any
}

export const textareaIsEmpty = (texts: string[]) =>
  texts.length === 0 ? true : texts.length === 1 ? (texts[0] === '' ? true : false) : false

export const appendNote = (a: string | void, b: string | void, line?: boolean) =>
  `${a ? `${a}${line ? '\n' : ' '}→ ${b ?? ''}` : ''}`
