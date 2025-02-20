import { FlatNode } from '@renderer/types/FlatNode'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { Params } from 'react-router'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Store {
  template: null | TemplateJSON
  setTemplateFromApi: (r: TemplateJSON) => void
  nodes: FlatNode[]
  setNodes: (r: FlatNode[]) => void
  updateNodes: (fn: (n: FlatNode[]) => FlatNode[]) => void
  addNodes: (r: FlatNode[]) => void
  getNode: (nodeId: string) => FlatNode | undefined
  updateNode: (uid: string, fn: (n: FlatNode) => Partial<FlatNode>) => void
  openNodes: Record<string, boolean>
  toggleOpen: (uid: string) => void
  setOpenNodes: (patch: Record<string, boolean>) => void
  isEditing: boolean
  setEditing: (r: boolean) => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      template: null,
      setTemplateFromApi: (template) => set({ template }),
      nodes: [],
      setNodes: (nodes) => set({ nodes }),
      updateNodes: (fn) => set((store) => ({ ...store, nodes: fn(store.nodes) })),
      addNodes: (nodes) => set({ nodes: [...get().nodes, ...nodes] }),
      getNode: (nodeId) => get().nodes.find((x) => x.uid === nodeId),
      updateNode: (uid, fn) =>
        set((state) => ({
          nodes: state.nodes.map((node) => (node.uid === uid ? { ...node, ...fn(node) } : node))
        })),
      openNodes: {},
      toggleOpen: (uid) => {
        set((state) => {
          const wasOpen = !!state.openNodes[uid]
          const newOpenNodes = { ...state.openNodes }
          newOpenNodes[uid] = !wasOpen
          if (wasOpen) {
            const closeDescendants = (parentUid: string) => {
              const children = state.nodes.filter((node) => node.parent === parentUid)
              children.forEach((child) => {
                newOpenNodes[child.uid] = false
                closeDescendants(child.uid)
              })
            }
            closeDescendants(uid)
          }

          return { openNodes: newOpenNodes }
        })
      },
      setOpenNodes: (openNodes) => set({ openNodes }),
      isEditing: false,
      setEditing: (isEditing) => set({ isEditing })
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
