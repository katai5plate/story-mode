import { TextField } from '@mui/material'

export const TextInput = (p: {
  label: string
  value: any
  onChange?: (text: string) => void
  disable?: true
  textarea?:
    | {
        rows?: number
      }
    | true
}) => {
  const hasTextarea = !!p.textarea
  const textarea = {
    minRows: 1,
    ...(p.textarea === true ? {} : p.textarea),
    multiline: true
  }
  return (
    <TextField
      fullWidth
      label={`${p.label}${hasTextarea ? ' 🗎' : ''}`}
      variant="outlined"
      value={(hasTextarea ? p.value.join('\n') : p.value) || ''}
      onChange={(e) => p.onChange(e.target.value)}
      sx={{ pb: 2 }}
      disabled={p.disable}
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
