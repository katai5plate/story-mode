export interface TemplateJSON {
  scenario: ScenarioJSON
  actor: ActorJSON
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
  duty: Duty[]
  dictionaly: {
    personality: Personality[]
    body: {
      id: string
      name: string
      bmi: [number | null, number | null]
      fat: [number | null, number | null]
    }[]
  }
  combox: {
    gender: string[]
    weakness: string[]
    motivation: string[]
    sensitivity: string[]
    question: string[]
  }
}

interface Duty {
  id: string
  name: string
  questions: string[]
}

interface Personality {
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
    combox: string
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
  combox: string
  content: string[]
}
