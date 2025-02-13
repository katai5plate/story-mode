import { useStore } from '@renderer/store/useStore'
import { TemplateJSON } from '@renderer/types/TemplateJSON'

export const useApi = () => {
  const store = useStore()
  return {
    setTemplateToStore: async () => {
      const res = (await window.electron.ipcRenderer.invoke('json')) as TemplateJSON
      console.log({ res })
      store.setTemplateFromApi(res)
    }
  }
}
