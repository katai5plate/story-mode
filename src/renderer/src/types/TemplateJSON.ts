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
export interface ActorJSON {
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
export interface CommandArgRequire {
  name: string
  type: (
    | 'text' // テキスト
    | 'textarea' // テキストエリア
    | 'vec' // [x, y, z?]
    | 'choice' // 選択肢
    | 'num' // 少数含む数値
    | 'json' // JSON 文字列 (オブジェクト許可)
    | 'value' // number, boolean, string
    // 動的指定（アクターなど）
    | `$.${string}`
    // id 指定（ユーザーカスタム）
    | `id.${string}`
  )[]
  goto?: string[] // 追加する分岐条件名
}
type CommandArgOptional = CommandArgRequire & {
  id: string // 任意項目オブジェクトのキー名
}
export interface CommandJSON {
  method: CommandMethod[]
  customId: CommandCustomId[]
}
export type CommandMethod = CommandCommonGroup<CommandMethodMember>
export type CommandCustomId = CommandCommonGroup<CommandCustomIdMember>
export type CommandCommonGroup<T> = {
  name: string
  // id: string
  members: T[]
}
export interface CommandMethodMember {
  name: string
  id: string
  req: CommandArgRequire[]
  opt: CommandArgOptional[]
}
export interface CommandCustomIdMember {
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
