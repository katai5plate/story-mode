import { DeepProxy } from '@qiwi/deep-proxy'
import { initScenarioForm } from '@renderer/types/ScenarioForm'
import { SMNode } from '@renderer/types/SMNode'
import { ActorForm, ScenarioJSON } from '@renderer/types/TemplateJSON'

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

export const LEGACY__unique = (list: string[], limit = 10) =>
  `id-${genUnique(
    list,
    () => Math.random().toString(36).slice(2, 7).toUpperCase(),
    limit,
    () => `u4-${window.crypto.randomUUID()}`
  )}`

export const unique = (
  prefix: 'bo' | 'ac' | 'ep' | 'ch' | 'ph' | 'be' | 'sc' | 'tp' | 'id',
  uids?: string[]
) =>
  `${prefix}-${
    uids
      ? genUnique(
          uids,
          () => Math.random().toString(36).slice(2, 7).toUpperCase(),
          10,
          () => window.crypto.randomUUID()
        )
      : window.crypto.randomUUID()
  }`

export const anyObject = (target) => new DeepProxy(target)

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

export const actorTemplateToFlatNodes = (actors: ActorForm[]): SMNode[] => {
  const result: SMNode[] = []
  const uids: string[] = []
  actors.forEach((actor, index) => {
    const uid = unique('ac', uids)
    uids.push(uid)
    console.log(uid)
    result.push({
      parent: 'df-actor',
      uid,
      index,
      name: (actor as any).name, // JSON ではこれがある
      side: 'actor',
      actor
    })
  })
  return result
}
export const scenarioTemplateToFlatNodes = (scenario: ScenarioJSON): SMNode[] => {
  const result: SMNode[] = []
  const uids: string[] = []
  scenario.episode.forEach((ep, epi) => {
    const epid = unique('ep', uids)
    uids.push(epid)
    result.push({
      parent: 'df-scenario',
      uid: epid,
      index: epi,
      name: (ep as any).name,
      prefix: 'EP',
      side: 'episode',
      scenario: { ...initScenarioForm, ...ep }
    })
    scenario.chapter.forEach((ch, chi) => {
      const chid = unique('ch', uids)
      uids.push(chid)
      result.push({
        parent: epid,
        uid: chid,
        index: chi,
        name: (ch as any).name, // JSON ではこれがある
        prefix: 'CH',
        side: 'chapter',
        scenario: { ...initScenarioForm, ...ch }
      })
      scenario.phase.forEach((ph, phi) => {
        const phid = unique('ph', uids)
        uids.push(phid)
        result.push({
          parent: chid,
          uid: phid,
          index: phi,
          name: (ph as any).name, // JSON ではこれがある
          prefix: 'PH',
          side: 'phase',
          scenario: { ...initScenarioForm, ...ph }
        })
        scenario.beat.forEach((be, bei) => {
          const beid = unique('be', uids)
          uids.push(beid)
          result.push({
            parent: phid,
            uid: beid,
            index: bei,
            name: (be as any).name, // JSON ではこれがある
            prefix: 'BE',
            side: 'beat',
            scenario: { ...initScenarioForm, ...be }
          })
          result.push({
            parent: beid,
            uid: unique('sc', []),
            index: 0,
            name: 'default',
            prefix: 'SC',
            side: 'script',
            script: {}
          })
        })
      })
    })
  })
  return result
}

export const toTitle = (node: SMNode) =>
  !node ? '--' : [node.prefix, node.alias || node.name].filter(Boolean).join(' ')
