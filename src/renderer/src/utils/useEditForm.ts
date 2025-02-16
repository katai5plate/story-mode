import { set, get } from 'lodash'
import { useCallback, useState } from 'react'
import { anyObject } from './helpers'

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
  const [formOrigin, setAllField] = useState<T>(initialState)

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

  /** MEMO: 関数はセレクタ目的のため、内部に `ref => ref.hoge.fuga` 的な処理以外を入れないこと */
  const updateForm = useCallback(<R>(fn: (ref: T) => R, value: R | ((prev: R) => R)) => {
    const keys = collectKeys(fn)
    setAllField((prev) => {
      const previousValue = get(prev, keys)
      const isGetError = get(prev, keys) === undefined
      // 画面遷移中に onMount を待たずして useMemo 内のフォームを読んでしまうことがあるのでその対策
      const isMounted = isGetError && get(initialState, keys) !== undefined
      if (isMounted) return prev
      if (get(prev, keys) === undefined) {
        console.error(
          '事前に入るべきオブジェクトが事前に追加されていないか、フォームの初期化ができていない',
          [JSON.stringify(formOrigin)],
          prev,
          keys
        )
        throw new Error(`存在しないものを変更しようとしている: ${keys.join('.')}`)
      }
      const newForm = { ...prev }
      if (typeof value === 'function') set(newForm, keys, (value as Function)(previousValue))
      else set(newForm, keys, value)
      return newForm
    })
  }, [])

  // 画面遷移中に onMount を待たずして useMemo 内のフォームを読んでしまうことがあるのでその対策
  const safeForm = () => {
    try {
      if (!formOrigin) throw new Error()
      return formOrigin
    } catch {
      return anyObject(initialState) as any as T
    }
  }

  return {
    form: safeForm(),
    setAllField,
    itemControllers,
    updateForm
  }
}
