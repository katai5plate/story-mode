import { JsonData } from '@renderer/utils/helpers'

export interface TemplateJSON {
  scenario: ScenarioJSON
  actor: ActorJSON
  command: CommandJSON
}
export interface ScenarioJSON {
  episode: ScenarioNode[]
  chapter: ScenarioNode[]
  phase: ScenarioNode[]
  beat: ScenarioNode[]
  tag: Tag[]
  customForm: {
    id: string
    name: string
    target: string[]
    form: string
  }[]
}
interface ActorJSON {
  preset: Actor[]
  dictionaly: Dictionaly
}
export interface Dictionaly {
  duty: Duty[]
  personality: Personality[]
  body: BodyMake[]
  gender: string[]
  weakness: string[]
  motivation: string[]
  sensitivity: string[]
  question: string[]
}
export interface BodyMake {
  id: string
  name: string
  bmi: [number | null, number | null]
  fat: [number | null, number | null]
}
export interface CommandArg {
  name: string
  type:
    | 'label' // テキスト入力後、名前空間内ラベル化
    | 'goto' // 名前空間ラベルのセレクトボックス
    | 'json' // JSON文字列
    | 'num' // 数値型
    | 'text' // 文字列型
    | 'toggle' // 真偽型
    | 'value' // number | string | boolean | null
    | 'vec' // [x, y, z?]
    | 'actor' // アクター
    // id 指定（ユーザーカスタム）
    | `id.${string}`
  id: string
  labeling?: boolean // id, name を名前空間内ラベルにする
}
interface CommandJSON {
  method: CommandMethod[]
  customId: CommandCustomId[]
}
export type CommandMethod = CommandCommonNamespace<CommandMethodMember>
export type CommandCustomId = CommandCommonNamespace<CommandCustomIdMember>
export type CommandCommonNamespace<T> = {
  name: string
  members: T[]
}
export interface CommandMethodMember {
  name: string // ラベルにもなる
  id: string
  summary: string
  arg: CommandArg[]
  // 自動追加する終端コマンド
  end?: {
    mid: string
    arg?: Record<
      string,
      // 通常値
      | string
      | number
      | boolean
      | null
      // arg.id 参照
      | [string]
    >
    when?: string[] // arg.id が入力されている場合に生成
  }[]
}
interface CommandCustomIdMember {
  name: string
  id: string
  options: {
    name: string
    value: JsonData
  }[]
}

export interface Duty {
  id: string
  name: string
  questions: string[]
}

export interface Personality {
  id: string
  name: string
  types: {
    id: string
    name: string
    link: { name: string; href: string }[]
  }[]
}

interface Node {
  name: string // Node で管理する
  summary: string
}

export interface ScenarioNode extends Node {
  checklist: string[]
}

export interface Tag extends Node {
  limit: number
  target: string[]
  list: ScenarioNode[]
}

export type Actor = {
  name: string // Node で管理する
  typeName: string
  dutyId: string
  dutyDetail: string[]
  basic: {
    gender: string
    genderDetail: string[]
    age: string
    height: string
    weight: string
    fat: number | string
    body: string
    bodyDetail: string[]
    iq: string
    memo: string[]
  }
  experience: {
    life: CharacterLife[]
    histories: CharacterHistory[]
    dialogExamples: {
      uid: string
      question: string
      answer: string[]
      hint: string[]
    }[]
    memo: ['']
  }
  appendix: {
    features: string[]
    memo: string[]
  }
}

interface CharacterLife {
  uid: string
  name: string
  date: string
  daily: string[]
  skills: string[]
  socialRelationships: string[]
  memo: string[]
}

export interface CharacterHistory {
  uid: string
  name: string
  appearance: string[]
  personality: {
    ref: {
      categoryId: string
      typeId: string
    }
    basic: string[]
    different: string[]
    reason: string[]
  }
  weakness: {
    combo: string
    content: string[]
  }
  desire: {
    detail: string[]
    motivation: ComboxFields
    sensitivity: ComboxFields
    likesAndDislikes: string[]
  }
  memo: string[]
}

interface ComboxFields {
  combo: string
  content: string[]
}
