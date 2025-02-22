import { JsonData } from '@renderer/utils/helpers'

export interface CustomIdForm {
  id: string
  options: {
    uid: string
    name: string
    value: JsonData
  }[]
}

export const initCustomIdForm: CustomIdForm = {
  id: '',
  options: []
}

export const initCustomIdOption: Omit<CustomIdForm['options'][0], 'uid'> = {
  name: '',
  value: 'null'
}
