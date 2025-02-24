import { Actor } from './TemplateJSON'

export type ActorForm = Omit<Actor, 'name'>

export const initActor: ActorForm = {
  typeName: '',
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
    bodyDetail: [''],
    iq: '',
    memo: ['']
  },
  experience: {
    life: [],
    histories: [],
    dialogExamples: [],
    memo: ['']
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
    combo: '',
    content: ['']
  },
  desire: {
    detail: [''],
    motivation: {
      combo: '',
      content: ['']
    },
    sensitivity: {
      combo: '',
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
