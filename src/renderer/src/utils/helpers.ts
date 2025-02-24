import { DeepProxy } from '@qiwi/deep-proxy'
import { initScenarioForm } from '@renderer/types/ScenarioForm'
import { initScriptForm } from '@renderer/types/ScriptForm'
import { ComboId, SMNode } from '@renderer/types/SMNode'
import {
  Actor,
  CommandCustomId,
  CommandMethod,
  Dictionaly,
  ScenarioJSON
} from '@renderer/types/TemplateJSON'
import stringify from 'fast-json-stable-stringify'
import * as parserTypescript from 'prettier/parser-typescript'
import parserBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import * as prettier from 'prettier/standalone'
import { FunctionComponent, memo, ReactNode, useMemo } from 'react'

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
  prefix:
    | 'id'
    | 'bkm'
    | 'act'
    | 'eps'
    | 'chp'
    | 'phs'
    | 'bet'
    | 'scr'
    | 'tpl'
    | 'cid'
    | 'cmg'
    | 'cmd'
    | 'dct'
    | 'cmb',
  uids?: string[],
  onDone?: (uid: string) => void
) => {
  const res = `${prefix}-${
    uids
      ? genUnique(
          uids,
          () => Math.random().toString(36).slice(2, 7).toUpperCase(),
          10,
          () => window.crypto.randomUUID()
        )
      : window.crypto.randomUUID()
  }`
  onDone?.(res)
  return res
}

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

export const actorTemplateToFlatNodes = (actors: Actor[]): SMNode[] => {
  const result: SMNode[] = []
  const uids: string[] = []
  actors.forEach((actor, index) => {
    const uid = unique('act', uids)
    uids.push(uid)
    console.log(uid)
    result.push({
      parent: 'df-actor',
      uid,
      index,
      name: actor.name,
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
    const epid = unique('eps', uids)
    uids.push(epid)
    result.push({
      parent: 'df-scenario',
      uid: epid,
      index: epi,
      name: ep.name,
      prefix: 'EP',
      side: 'episode',
      scenario: { ...initScenarioForm, ...ep }
    })
    scenario.chapter.forEach((ch, chi) => {
      const chid = unique('chp', uids)
      uids.push(chid)
      result.push({
        parent: epid,
        uid: chid,
        index: chi,
        name: ch.name,
        prefix: 'CH',
        side: 'chapter',
        scenario: { ...initScenarioForm, ...ch }
      })
      scenario.phase.forEach((ph, phi) => {
        const phid = unique('phs', uids)
        uids.push(phid)
        result.push({
          parent: chid,
          uid: phid,
          index: phi,
          name: ph.name,
          prefix: 'PH',
          side: 'phase',
          scenario: { ...initScenarioForm, ...ph }
        })
        scenario.beat.forEach((be, bei) => {
          const beid = unique('bet', uids)
          uids.push(beid)
          result.push({
            parent: phid,
            uid: beid,
            index: bei,
            name: be.name,
            prefix: 'BE',
            side: 'beat',
            scenario: { ...initScenarioForm, ...be }
          })
          result.push({
            parent: beid,
            uid: unique('scr', []),
            index: 0,
            name: 'default',
            prefix: 'SC',
            side: 'script',
            script: initScriptForm
          })
        })
      })
    })
  })
  return result
}
export const customIdTemplateToFlatNodes = (groups: CommandCustomId[]): SMNode[] => {
  const result: SMNode[] = []
  const uids: string[] = []
  groups.forEach((group, gi) => {
    const auid = unique('cmg', uids)
    uids.push(auid)
    result.push({
      parent: 'df-custom-id',
      uid: auid,
      index: gi,
      name: group.name,
      side: 'dir'
    })
    group.members.forEach((cid, ci) => {
      const customId = {
        ...cid,
        options: cid.options.map(({ name, value }, i) => ({
          uid: `tp-${i + 1}`,
          name,
          value
        }))
      }
      const buid = unique('cmd', uids)
      uids.push(buid)
      result.push({
        parent: auid,
        uid: buid,
        index: ci,
        name: cid.name,
        side: 'customId',
        customId
      })
    })
  })
  return result
}
export const commandTemplateToFlatNodes = (groups: CommandMethod[]): SMNode[] => {
  const result: SMNode[] = []
  const uids: string[] = []
  groups.forEach((group, gi) => {
    const guid = unique('cmg', uids)
    uids.push(guid)
    result.push({
      parent: 'df-command',
      uid: guid,
      index: gi,
      name: group.name,
      side: 'dir'
    })
    group.members.forEach((command, mi) => {
      const cuid = unique('cmd', uids)
      uids.push(cuid)
      result.push({
        parent: guid,
        uid: cuid,
        index: mi,
        name: command.name,
        side: 'command',
        command
      })
    })
  })
  return result
}
export const dictionalyTemplateToFlatNodes = (dictionaly: Dictionaly): SMNode[] => {
  const result: SMNode[] = []

  const duids: string[] = []
  const dict: [string, Partial<SMNode>][] = [
    ['役割', { dictDuty: dictionaly.duty }],
    ['性格', { dictPersonality: dictionaly.personality }],
    ['体型', { dictBody: dictionaly.body }]
  ]
  dict.forEach(([name, value], index) => {
    result.push({
      parent: 'hidden',
      uid: unique('dct', duids, (x) => duids.push(x)),
      index,
      name,
      side: 'dict',
      ...value
    })
  })

  const cuids: string[] = []
  const combo: [string, ComboId, string[]][] = [
    ['性別', 'gender', dictionaly.gender],
    ['弱点', 'weakness', dictionaly.weakness],
    ['モチベーション', 'motivation', dictionaly.motivation],
    ['感受性', 'sensitivity', dictionaly.sensitivity],
    ['質問', 'question', dictionaly.question]
  ]
  combo.forEach(([name, comboId, dictCombo], index) => {
    result.push({
      parent: 'hidden',
      uid: unique('cmb', cuids, (x) => cuids.push(x)),
      index,
      name,
      side: 'combo',
      comboId,
      dictCombo
    })
  })

  return result
}

export const toTitle = (node: SMNode, onlyName?: boolean) =>
  !node ? '--' : `${onlyName || !node.prefix ? '' : `${node.prefix} `}${node.alias || node.name}`

export const equal = (a: any, b: any) => stringify(a) === stringify(b)

/** Props が変化するまで再描画しない */
export const moc = <P, T extends FunctionComponent<P>>(c: T) =>
  memo(c, (prev, next) => equal(prev, next))

/** deps が変化するまで再描画しない */
export const mem = (deps: unknown[], c: ReactNode) => {
  const d = useMemo(() => deps.map(stringify), [deps])
  return useMemo(() => c, d)
}

export const formatTS = (code: string) =>
  prettier.format(code, {
    parser: 'typescript',
    plugins: [parserTypescript, parserBabel, prettierPluginEstree],
    semi: true,
    tabWidth: 2
  })
