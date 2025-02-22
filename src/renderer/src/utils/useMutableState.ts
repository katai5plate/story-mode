import { useRef, useState } from 'react'
import { unique } from './helpers'

export const useMutableState = <T, V extends T | undefined = T | undefined>(
  data?: V
): [() => V, (d: V, rerender?: boolean) => void] => {
  const [, render] = useState(unique('id'))
  const value = useRef(data)
  const get = (): V => value.current
  const set = (d: V, rerender?: boolean) => {
    value.current = d
    if (rerender) render(unique('id'))
  }
  return [get, set]
}
