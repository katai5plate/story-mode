import { RouteNode } from '@renderer/components/RouteMap'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { create } from 'zustand'

interface Store {
  template: null | TemplateJSON
  characterRoutes: RouteNode[]
  scenarioRoutes: RouteNode[]
  setCharacterRoutes: (r: RouteNode[]) => void
  setScenarioRoutes: (r: RouteNode[]) => void
  setTemplateFromApi: (r: TemplateJSON) => void
}

export const useStore = create<Store>((set) => ({
  template: null,
  characterRoutes: [],
  scenarioRoutes: [],
  setCharacterRoutes: (characterRoutes) => set({ characterRoutes }),
  setScenarioRoutes: (scenarioRoutes) => set({ scenarioRoutes }),
  setTemplateFromApi: (template) => set({ template })
}))
