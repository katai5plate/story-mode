import { Button, Grid2 } from '@mui/material'
import { unique } from '@renderer/utils/helpers'
import { ReactNode, useState } from 'react'
import { Group } from './Group'
import { Accord } from './Accord'
import { Spacer } from './Spacer'
import { useAsk } from '@renderer/utils/useAsk'

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
  const ask = useAsk()
  const random = () => unique(p.list.map((x) => x.uid))
  const [newUnique, setUnique] = useState(random())
  const itemName = (item: T) => (item as any)?.name as string
  const title = (item?: T) =>
    item ? itemName(item) || (p.itemAccord ? `無題 [${item.uid}]` : item.uid) : p.title
  return (
    <Group accord={p.accord} title={title()}>
      {p.list.map((item, index) => {
        const deleteTitle = p.dynamicTitle?.(item)
        const render = (
          <Group smallLabel title={title(item)}>
            <Button
              disableFocusRipple
              variant="outlined"
              color="secondary"
              onClick={() => {
                ask.confirm(`${title(item)} を削除しますか？`).then(
                  (res) =>
                    res &&
                    p.updateForm(
                      p.selector,
                      p.list.filter((x) => x.uid !== item.uid)
                    )
                )
              }}
            >
              {deleteTitle ? `${deleteTitle} を` : ''}削除
            </Button>
            <Spacer />
            {p.render(item, index, (fn) => (r: F) => fn(p.selector(r)[index] as any))}
          </Group>
        )
        return (
          <div key={item.uid}>
            {p.itemAccord ? (
              <Accord closeIsEmpty open={!p.accordItemAutoClose?.(item)} title={title(item)}>
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
            {`${title()} を`}追加
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="text"
            color="inherit"
            sx={{ opacity: 0.2 }}
            onClick={() => setUnique(random())}
          >
            追加時: {newUnique}
          </Button>
        </Grid2>
      </Grid2>
    </Group>
  )
}
