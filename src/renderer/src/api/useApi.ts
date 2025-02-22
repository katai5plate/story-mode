import { useStore } from '@renderer/store/useStore'
import { TemplateJSON } from '@renderer/types/TemplateJSON'
import { formatTS } from '@renderer/utils/helpers'

export const useApi = () => {
  const store = useStore()
  return {
    setTemplateToStore: async () => {
      const json = (await window.electron.ipcRenderer.invoke('json')) as TemplateJSON
      store.setTemplateJSONFromApi(json)
      const ts = (await window.electron.ipcRenderer.invoke('template')) as string
      store.setTemplateJSONFromApi(json)
      store.setTemplateTSFromApi(await formatTS(ts))
    }
  }
}
