import { set, get } from 'lodash'
import { useCallback, useState } from 'react'

const collectKeys = <T>(fn: (dummy: T) => unknown): (string | number)[] => {
  const keys: (string | number)[] = []
  const proxy = new Proxy(
    {},
    {
      get(_, prop) {
        if (typeof prop === 'symbol') return // シンボルアクセスを無視
        keys.push(prop)
        return proxy // ネストアクセス用
      }
    }
  ) as T
  try {
    fn(proxy) // 型安全用記述
  } catch {
    console.warn('collectKeys failed')
  }
  return keys
}

export const useEditForm = <T extends Record<string, any>>(initialState: T) => {
  const [form, setAllField] = useState<T>(initialState)

  const itemControllers = useCallback(<R extends any[]>(fn: (ref: T) => R, init: R[number]) => {
    return {
      addItem: () => updateForm(fn, (prev) => [...prev, init] as R),
      removeItem: (index: number) =>
        updateForm(fn, (prev) => prev.filter((_, i) => i !== index) as R),
      updateItem: (index: number, newItem: R[number]) =>
        updateForm(fn, (prev) => {
          const newArray = [...prev] as R
          newArray[index] = newItem
          return newArray
        })
    }
  }, [])

  const toCombo = (list: string[]) => list.map((x) => ({ name: x, id: x }))
  const toTextArea = (text: string) => text.split('\n')

  /** MEMO: 関数はセレクタ目的のため、内部に `ref => ref.hoge.fuga` 的な処理以外を入れないこと */
  const updateForm = useCallback(<R>(fn: (ref: T) => R, value: R | ((prev: R) => R)) => {
    const keys = collectKeys(fn)
    setAllField((prev) => {
      const previousValue = get(prev, keys)
      if (get(prev, keys) === undefined) {
        console.error(
          '事前に入るべきオブジェクトが事前に追加されていないか、フォームの初期化ができていない'
        )
        throw new Error(`存在しないものを変更しようとしている: ${keys.join('.')}`)
      }
      const newForm = { ...prev }
      if (typeof value === 'function') set(newForm, keys, (value as Function)(previousValue))
      else set(newForm, keys, value)
      return newForm
    })
  }, [])

  return {
    form,
    setAllField,
    itemControllers,
    toCombo,
    toTextArea,
    updateForm
  }
}
