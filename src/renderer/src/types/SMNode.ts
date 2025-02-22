import { ActorForm } from './ActorForm'
import { CommandForm } from './CommandForm'
import { CustomIdForm } from './CustomIdForm'
import { ScenarioForm } from './ScenarioForm'
import { ScriptForm } from './ScriptForm'

export interface SMNode {
  parent: null | string
  uid: string
  index: number
  name: string
  alias?: string
  prefix?: string
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
  favorite?: string
  actor?: ActorForm
  scenario?: ScenarioForm
  script?: ScriptForm
  customId?: CustomIdForm
  command?: CommandForm
}
