import { Button, Typography } from '@mui/material'
import { unique } from '@renderer/utils/helpers'
import { ReactNode } from 'react'
import { Group } from './Group'

export const ListForm = <T extends { uid: string }, F>(p: {
  title: string
  init: Omit<T, 'uid'> & { uid?: string }
  updateForm: any
  list: T[]
  selector: (ref: F) => T[]
  render: (item: T, select: (fn: (ref: T) => any) => any) => ReactNode
}) => {
  return (
    <Group label={p.title}>
      {p.list.map((item, index) => (
        <Group
          label={<Typography sx={{ fontSize: '12px', color: 'gray' }}>ID: {item.uid}</Typography>}
          key={item.uid}
        >
          {p.render(item, (fn) => (r: F) => fn(p.selector(r)[index] as any))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              p.updateForm(
                p.selector,
                p.list.filter((x) => x.uid !== item.uid)
              )
            }
          >
            削除
          </Button>
        </Group>
      ))}
      <Button
        variant="outlined"
        onClick={() => p.updateForm(p.selector, () => [...p.list, { uid: unique(), ...p.init }])}
      >
        追加
      </Button>
    </Group>
  )
}
