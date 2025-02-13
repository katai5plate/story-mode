import { RouteNode } from '@renderer/components/RouteMap'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { create } from 'zustand'

export interface Store {
  title: string
  template: null | TemplateJSON
  characterRoutes: RouteNode[]
  scenarioRoutes: RouteNode[]
  setTitle: (r: string) => void
  setCharacterRoutes: (r: RouteNode[]) => void
  setScenarioRoutes: (r: RouteNode[]) => void
  setTemplateFromApi: (r: TemplateJSON) => void
}

export const useStore = create<Store>((set) => ({
  title: '',
  template: null,
  characterRoutes: [],
  scenarioRoutes: [],
  setTitle: (title) => set({ title }),
  setCharacterRoutes: (characterRoutes) => set({ characterRoutes }),
  setScenarioRoutes: (scenarioRoutes) => set({ scenarioRoutes }),
  setTemplateFromApi: (template) => set({ template })
}))
