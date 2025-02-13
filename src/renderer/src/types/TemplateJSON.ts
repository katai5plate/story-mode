export interface TemplateJSON {
  scenario: ScenarioJSON
  character: CharacterJSON
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
export interface CharacterJSON {
  preset: Character[]
  duty: Duty[]
  dictionaly: {
    personality: Personality[]
    body: {
      id: string
      name: string
      bmi: number
      fat: number
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
  rules: string[]
}

interface Personality {
  id: string
  name: string
  types: {
    id: string
    name: string
    link: string[]
  }[]
}

interface Node {
  path: string
  name: string
  summary: string
}

interface ScenarioNode extends Node {
  checklist: string[]
}

interface Tag extends Node {
  limit: number
  target: string[]
  list: ScenarioNode[]
}

export type Character = {
  id: string
  name: string
  dutyId: string
  basic: {
    gender: string
    genderDetail: string[]
    age: number | string
    height: number | string
    weight: number | string
    fat: number | string
    body: string
  }
  experience: {
    life: {
      name: string
      date: string
      daily: string[]
      skills: string[]
      socialRelationships: string[]
    }[]
    histories: {
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
    }[]
    dialogExamples: {
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

interface ComboxFields {
  combox: string
  content: string[]
}
