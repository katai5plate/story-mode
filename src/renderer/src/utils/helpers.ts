export const unique = (list: string[], limit = 10) => {
  let attempts = 0
  let newId = ''
  do {
    if (attempts >= limit) return `u4-${window.crypto.randomUUID()}`
    newId = Math.random().toString(36).slice(2, 7).toLocaleUpperCase()
    attempts++
  } while (list.includes(newId))
  return `un-${newId}`
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
