import { ScenarioNode, Tag } from './TemplateJSON'

export interface ScenarioForm extends Omit<ScenarioNode, 'name'> {
  tags: {
    tag: Tag
    detail: string[]
  }[]
  detail: string[]
  plots: {
    uid: string
    name: string
    content: string[]
  }[]
  memo: string[]
}

export const initScenarioForm: ScenarioForm = {
  summary: '',
  checklist: [''],
  tags: [],
  detail: [''],
  plots: [],
  memo: ['']
}

export const initPlotForm: Omit<ScenarioForm['plots'][0], 'uid'> = {
  name: '',
  content: ['']
}
