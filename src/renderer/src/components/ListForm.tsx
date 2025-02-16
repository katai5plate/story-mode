import { Button, Grid2 } from '@mui/material'
import { unique } from '@renderer/utils/helpers'
import { ReactNode, useState } from 'react'
import { Group } from './Group'
import { Accord } from './Accord'

export const ListForm = <T extends { uid: string }, F>(p: {
  title: string
  init: Omit<T, 'uid'> & { uid?: string }
  updateForm: any
  list: T[]
  selector: (ref: F) => T[]
  render: (
    item: T,
    index: number,
    /** 非推奨。第二引数が any になるため */
    easySelect: <R>(fn: (ref: T) => any) => any
  ) => ReactNode
  dynamicTitle?: (item: T) => string | null
  accord?: true
  accordItemAutoClose?: (item: T) => boolean
  itemAccord?: true
}) => {
  const random = () => unique(p.list.map((x) => x.uid))
  const [newUnique, setUnique] = useState(random())
  return (
    <Group accord={p.accord} title={p.title}>
      {p.list.map((item, index) => {
        const deleteTitle = p.dynamicTitle?.(item)
        const render = (
          <Group smallLabel title={`ID: ${item.uid}`}>
            {p.render(item, index, (fn) => (r: F) => fn(p.selector(r)[index] as any))}
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
              {deleteTitle ? `${deleteTitle} を` : ''}削除
            </Button>
          </Group>
        )
        return (
          <div key={item.uid}>
            {p.itemAccord ? (
              <Accord
                closeIsEmpty
                open={!p.accordItemAutoClose?.(item)}
                title={deleteTitle || `${p.title} (ID: ${item.uid})`}
              >
                {render}
              </Accord>
            ) : (
              render
            )}
          </div>
        )
      })}
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="outlined"
            onClick={() => {
              p.updateForm(p.selector, () => [...p.list, { uid: newUnique, ...p.init }])
              setUnique(random())
            }}
          >
            {`${p.title} を`}追加
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="text"
            color="inherit"
            sx={{ opacity: 0.5 }}
            onClick={() => setUnique(random())}
          >
            ID: {newUnique}
          </Button>
        </Grid2>
      </Grid2>
    </Group>
  )
}
