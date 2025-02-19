import { useCallback } from 'react'

/** `useEffect(() => save(() => ask.popup('saved!')), [save])` */
export const useSave = () =>
  useCallback((callback: () => void) => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
