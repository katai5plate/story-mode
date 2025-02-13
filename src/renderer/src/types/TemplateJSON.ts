export interface TemplateJSON {
  scenario: {
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
  character: {
    duty: {
      id: string
      name: string
      rules: string[]
    }[]
    generator: {
      personality: {
        id: string
        name: string
        types: {
          id: string
          name: string
          link: string[]
        }[]
      }[]
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
