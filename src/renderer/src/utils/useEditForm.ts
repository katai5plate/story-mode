import { useCallback, useState } from 'react'

export const useEditForm = <T extends Record<string, any>>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState)

  const updateField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setForm((prev) => {
      const newForm = { ...prev, [key]: value }
      console.log('Updated Field:', { key, value, newForm })
      return newForm
    })
  }, [])

  const updateListItem = useCallback(
    <K extends keyof T>(key: K, index: number, newItem: T[K][number]) => {
      setForm((prev) => {
        if (!Array.isArray(prev[key])) return prev
        const newList = [...prev[key]]
        newList[index] = newItem
        const newForm = { ...prev, [key]: newList }
        console.log('Updated List:', { key, newItem, newForm })
        return newForm
      })
    },
    []
  )

  const addListItem = useCallback(<K extends keyof T>(key: K, newItem: T[K][number]) => {
    setForm((prev) => {
      if (!Array.isArray(prev[key])) return prev
      const newList = [...prev[key], newItem]
      const newForm = { ...prev, [key]: newList }
      console.log('Added Item:', { key, newItem, newForm })
      return newForm
    })
  }, [])

  const removeListItem = useCallback(<K extends keyof T>(key: K, index: number) => {
    setForm((prev) => {
      if (!Array.isArray(prev[key])) return prev
      const newList = prev[key].filter((_, i) => i !== index)
      const newForm = { ...prev, [key]: newList }
      console.log('Removed Item:', { key, index, newList, newForm })
      return newForm
    })
  }, [])

  const itemControllers = useCallback(
    <K extends keyof T>(key: K, init: T[K][number]) => ({
      addItem: () => addListItem(key, init),
      removeItem: (index) => removeListItem(key, index),
      updateItem: (index, newItem) => updateListItem(key, index, newItem)
    }),
    []
  )

  return {
    form,
    setAllField: setForm,
    updateField,
    updateListItem,
    addListItem,
    removeListItem,
    itemControllers
  }
}
