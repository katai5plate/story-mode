import { RouteNode } from '@renderer/components/RouteMap'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Store {
  template: null | TemplateJSON
  characterRoutes: RouteNode[]
  scenarioRoutes: RouteNode[]
  currentRoute: null | RouteNode
  setCurrentRoute: (r: RouteNode) => void
  setCharacterRoutes: (r: RouteNode[]) => void
  setScenarioRoutes: (r: RouteNode[]) => void
  setTemplateFromApi: (r: TemplateJSON) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      template: null,
      characterRoutes: [],
      scenarioRoutes: [],
      currentRoute: null,
      setCurrentRoute: (currentRoute) => set({ currentRoute }),
      setCharacterRoutes: (characterRoutes) => set({ characterRoutes }),
      setScenarioRoutes: (scenarioRoutes) => set({ scenarioRoutes }),
      setTemplateFromApi: (template) => set({ template })
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
