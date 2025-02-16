type JsonValue = string | number | boolean | null | JsonObject | Jsonrray
interface JsonObject {
  [key: string | number]: JsonValue
}
interface Jsonrray extends Array<JsonValue> {}
export type JsonData = JsonValue | JsonObject | Jsonrray

export const genUnique = <T extends JsonData>(
  list: T[],
  tryValue: () => T,
  limit = 10,
  onLimit: () => T
): T => {
  for (let i = 0; i < limit; i++) {
    const val = tryValue()
    if (!list.includes(val)) return val
  }
  return onLimit()
}

export const unique = (list: string[], limit = 10) =>
  `id-${genUnique(
    list,
    () => Math.random().toString(36).slice(2, 7).toUpperCase(),
    limit,
    () => `u4-${window.crypto.randomUUID()}`
  )}`

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

export const detectEmptyItem = <O extends { [key: string]: any }, K extends keyof O>(
  item: ({ [N in K]: string } & { uid?: string }) | O,
  key: K | null | undefined
) => {
  const { uid: _1, [key as K]: _2, ...rest } = item
  return Object.values(rest).every((x) =>
    typeof x === 'object'
      ? true
      : typeof x === 'string'
        ? !x
        : Array.isArray(x) && x.every((y) => y === '')
  )
}

export const detectEmptyItems = <O extends { [key: string]: any }, K extends keyof O>(
  base: O,
  items: (
    base: O
  ) => [item: ({ [N in K]: string } & { uid?: string }) | { [key: string]: any }, key?: K | void][]
) =>
  items(base)
    .map(([item, key]) => detectEmptyItem(item, key as string))
    .every(Boolean)

export const copy = (text: string) => {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

export const toCombo = (list: string[]) => list.map((x) => ({ name: x, id: x }))
export const toTextArea = (text: string) => text.split('\n')
