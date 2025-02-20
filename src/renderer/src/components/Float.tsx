import { ReactNode } from 'react'
import { Spacer } from './Spacer'

export const Float = (p: { top?: number; children: ReactNode }) => {
  return (
    <>
      <div
        style={{
          position: 'sticky',
          top: p.top ?? 64,
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        {p.children}
      </div>
      <Spacer />
    </>
  )
}
