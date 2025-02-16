import { TextField } from '@mui/material'
import { textareaIsEmpty } from '@renderer/utils/helpers'

export interface TextInputProps {
  label: string
  value: any
  onChange?: (text: string) => void
  disable?: boolean
  focus?: boolean
  textarea?:
    | {
        rows?: number
      }
    | true
}

export const TextInput = (p: TextInputProps) => {
  const hasTextarea = !!p.textarea
  const label = `${p.label}${hasTextarea ? ' 🗎' : ''}${p.value === '' || textareaIsEmpty(p.value) ? '（未入力）' : ''}`
  const textarea = {
    minRows: 1,
    ...(p.textarea === true ? {} : p.textarea),
    multiline: true
  }
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      value={(hasTextarea ? p.value.join('\n') : p.value) || ''}
      onChange={(e) => p.onChange(e.target.value)}
      sx={{ pb: 2 }}
      disabled={p.disable}
      autoFocus={p.focus}
      onKeyDown={(e) => {
        if (!p.onChange) return
        const currentValue = p.value
        const isNumber = !isNaN(Number(currentValue)) && currentValue !== ''
        if (isNumber && !hasTextarea) {
          let newValue = Number(currentValue)
          if (e.key === 'ArrowUp') {
            newValue += 1
            e.preventDefault()
          } else if (e.key === 'ArrowDown') {
            newValue -= 1
            e.preventDefault()
          }
          p.onChange(newValue.toString())
        }
      }}
      {...(hasTextarea ? textarea : {})}
    />
  )
}
