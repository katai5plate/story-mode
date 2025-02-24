import { ActorForm } from './ActorForm'
import { CommandForm } from './CommandForm'
import { CustomIdForm } from './CustomIdForm'
import { ScenarioForm } from './ScenarioForm'
import { ScriptForm } from './ScriptForm'
import { BodyMake, Duty, Personality } from './TemplateJSON'

export type ComboId = 'gender' | 'weakness' | 'motivation' | 'sensitivity' | 'question'

export interface SMNode {
  parent: null | string
  uid: string
  index: number
  name: string
  alias?: string
  prefix?: string
  comboId?: ComboId
  side:
    | 'dir'
    | 'condir'
    | 'call'
    | 'favorite'
    | 'actor'
    | 'episode'
    | 'chapter'
    | 'phase'
    | 'beat'
    | 'script'
    | 'command'
    | 'customId'
    | 'dict'
    | 'combo'
  favorite?: string
  actor?: ActorForm
  scenario?: ScenarioForm
  script?: ScriptForm
  customId?: CustomIdForm
  command?: CommandForm
  dictDuty?: Duty[]
  dictPersonality?: Personality[]
  dictBody?: BodyMake[]
  dictCombo?: string[]
}
