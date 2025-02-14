import { TextField } from '@mui/material'

export const TextInput = (p: {
  label: string
  value: any
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  textarea?:
    | {
        rows?: number
      }
    | true
}) => {
  const hasTextarea = !!p.textarea
  const textarea = {
    rows: 10,
    ...(p.textarea === true ? {} : p.textarea),
    multiline: true
  }
  return (
    <TextField
      fullWidth
      label={p.label}
      variant="outlined"
      value={p.value}
      onChange={p.onChange}
      sx={{ pb: 2 }}
      {...(hasTextarea ? textarea : {})}
    />
  )
}
