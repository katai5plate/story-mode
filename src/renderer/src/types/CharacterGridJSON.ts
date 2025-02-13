export type CharacterGridJSON = {
  name: string
  dutyId: string
  basic: {
    gender: string
    genderDetail: string[]
    age: number
    height: number
    weight: number
    fat: number
    body: string
  }
  experience: {
    life: {
      name: string
      date: string
      daily: string[]
      skills: string[]
      socialRelationships: string[]
    }[]
    histories: {
      name: string
      appearance: string[]
      personality: {
        ref: {
          categoryId: string
          typeId: string
        }
        basic: string[]
        different: string[]
        reason: string[]
      }
      weakness: {
        combox: string
        content: string[]
      }
      desire: {
        detail: string[]
        motivation: ComboxFields
        sensitivity: ComboxFields
        likesAndDislikes: string[]
      }
    }[]
    dialogExamples: {
      question: string
      answer: string[]
      hint: string[]
    }[]
  }
  appendix: {
    features: string[]
    memo: string[]
  }
}[]

interface ComboxFields {
  combox: string
  content: string[]
}
