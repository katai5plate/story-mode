import { Button, Grid2 } from '@mui/material'
import { unique } from '@renderer/utils/helpers'
import { ReactNode, useEffect, useState } from 'react'
import { Group } from './Group'
import { Accord } from './Accord'
import { Spacer } from './Spacer'
import { useAsk } from '@renderer/utils/useAsk'
import { TextInput } from './TextInput'

export const ListForm = <T extends { uid: string }, F>(p: {
  title: string
  initItem: Omit<T, 'uid'> & { uid?: string }
  updateForm: any
  onAddItem?: (text: string) => Partial<T>
  list: T[]
  selector: (ref: F) => T[]
  render: (
    item: T,
    index: number,
    /** 非推奨。第二引数が any になるため */
    easySelect: <R>(fn: (ref: T) => any) => any
  ) => ReactNode
  itemTitle?: (item: T) => string | null
  accord?: true
  accordItemAutoClose?: (item: T) => boolean
  itemAccord?: true
}) => {
  const ask = useAsk()
  const random = () => unique(p.list.map((x) => x.uid))
  const [newUnique, setUnique] = useState(random())
  const [newName, setName] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const noname = (item: { uid: string }) => `無題 [${item.uid}]`
  useEffect(() => {
    if (!newName) setPlaceholder(noname({ uid: newUnique }))
  }, [newName, newUnique])
  return (
    <Group accord={p.accord} title={p.title}>
      {p.list.map((item, index) => {
        const itemTitle = p.itemTitle?.(item) || noname(item)
        const render = (
          <Group accordDebugLabel title={item.uid}>
            <Spacer half />
            <Button
              disableFocusRipple
              variant="outlined"
              color="secondary"
              onClick={() => {
                ask.confirm(`${itemTitle} を削除しますか？`, p.title).then(
                  (res) =>
                    res &&
                    p.updateForm(
                      p.selector,
                      p.list.filter((x) => x.uid !== item.uid)
                    )
                )
              }}
            >
              {itemTitle ? `${itemTitle} を` : ''}削除
            </Button>
            <Spacer />
            {p.render(item, index, (fn) => (r: F) => fn(p.selector(r)[index] as any))}
          </Group>
        )
        return (
          <div key={item.uid}>
            {p.itemAccord ? (
              <Accord closeIsEmpty open={!p.accordItemAutoClose?.(item)} title={itemTitle}>
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
            onClick={async () => {
              p.updateForm(p.selector, () => [
                ...p.list,
                { uid: newUnique, ...p.initItem, ...(p.onAddItem ? p.onAddItem(newName) : {}) }
              ])
              setName('')
              setUnique(random())
            }}
          >
            {p.title} を追加
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="text"
            color="inherit"
            sx={{ opacity: 0.2 }}
            onClick={() => setUnique(random())}
          >
            {newUnique}
          </Button>
        </Grid2>
        {p.onAddItem && (
          <Grid2>
            <TextInput
              label="追加時の名前"
              value={newName}
              onChange={(text) => setName(text)}
              placeholder={placeholder}
              sx={{ height: '20%' }}
            />
          </Grid2>
        )}
      </Grid2>
    </Group>
  )
}
