import { Profiler, ReactNode } from 'react'

export const Debug = (p: { name: string; children: ReactNode }) => {
  const onRender = (id: string, phase: 'mount' | 'update', actualDuration: number) => {
    console.log(`${id} は ${phase === 'mount' ? '作成' : '変更'} に ${actualDuration | 0}ms 経過`)
  }
  return (
    <Profiler id={p.name} onRender={onRender}>
      {p.children}
    </Profiler>
  )
}
