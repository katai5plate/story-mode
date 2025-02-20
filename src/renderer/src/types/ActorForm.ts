import { Actor } from './TemplateJSON'

export type ActorForm = Omit<Actor, 'name'>

export const initActor: ActorForm = {
  dutyId: '',
  dutyDetail: [''],
  basic: {
    gender: '',
    genderDetail: [''],
    age: '',
    height: '',
    weight: '',
    fat: '',
    body: '',
    bodyDetail: ['']
  },
  experience: {
    life: [],
    histories: [],
    dialogExamples: []
  },
  appendix: {
    features: [''],
    memo: ['']
  }
}
export const initActorLife: Omit<ActorForm['experience']['life'][0], 'uid'> = {
  name: '',
  date: '',
  daily: [''],
  skills: [''],
  socialRelationships: [''],
  memo: ['']
}
export const initActorHistory: Omit<ActorForm['experience']['histories'][0], 'uid'> = {
  name: '',
  appearance: [''],
  personality: {
    ref: {
      categoryId: '',
      typeId: ''
    },
    basic: [''],
    different: [''],
    reason: ['']
  },
  weakness: {
    combox: '',
    content: ['']
  },
  desire: {
    detail: [''],
    motivation: {
      combox: '',
      content: ['']
    },
    sensitivity: {
      combox: '',
      content: ['']
    },
    likesAndDislikes: ['']
  },
  memo: ['']
}
export const initActorDialog: Omit<ActorForm['experience']['dialogExamples'][0], 'uid'> = {
  question: '',
  answer: [''],
  hint: ['']
}
