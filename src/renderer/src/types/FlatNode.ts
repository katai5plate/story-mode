import { Actor } from './TemplateJSON'

interface PlotForm {}
interface ScriptForm {}
export interface FlatNode {
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
  actor?: Actor
  plot?: PlotForm
  script?: ScriptForm
}
