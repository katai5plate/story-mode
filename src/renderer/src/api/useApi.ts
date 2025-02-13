import { TemplateJSON } from '@renderer/types/TemplateJSON'

export const useApi = () => {
  return {
    getTemplate: async () => {
      return (await window.electron.ipcRenderer.invoke('json')) as TemplateJSON
    }
  }
}
