import { Button, Grid2 } from '@mui/material'
import { TextInput } from './TextInput'
import { toTitle } from '@renderer/utils/helpers'
import { AskContextType } from '@renderer/utils/useAsk'
import { SMNode } from '@renderer/types/SMNode'
import { memo } from 'react'

export const DisableInput = memo(
  (p: {
    label: string
    message?: string
    value: string
    onChange: (text: string) => void | string
    node: SMNode
    ask: AskContextType
  }) => {
    return (
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TextInput label={p.label} disable value={p.value} />
        </Grid2>
        <Grid2 size="auto">
          <Button
            variant="outlined"
            onClick={async () => {
              const text = await p.ask.prompt(
                p.message ?? `${p.label} を入力してください`,
                p.value,
                toTitle(p.node, true)
              )
              if (!text) return
              const res = p.onChange(text)
              if (!res) return
              await p.ask.alert(res)
            }}
          >
            変更
          </Button>
        </Grid2>
      </Grid2>
    )
  }
)
