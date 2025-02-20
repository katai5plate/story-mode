import { ActorForm } from './ActorForm'
import { ScenarioForm } from './ScenarioForm'

interface ScriptForm {}
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
  favorite?: string
  actor?: ActorForm
  scenario?: ScenarioForm
  script?: ScriptForm
}
