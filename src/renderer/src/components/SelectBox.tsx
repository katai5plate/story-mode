import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useCallback, useMemo } from 'react'

// <SelectBox
//   label="役割"
//   combo
//   value={form.duty}
//   options={duties}
//   onChange={(text) => updateField('duty', text || '')}
// />
// <SelectBox
//   label="役割"
//   value={form.duty}
//   options={duties}
//   onChange={(text) => updateField('duty', text || '')}
// />
export const SelectBox = (p: {
  combo?: boolean
  value: string
  label: string
  options: { name: string; id: string | number }[]
  onChange: (text: string, option: { name: string; id: string | number } | null) => void
}) => {
  const optionsMap = useMemo(() => new Map(p.options.map((opt) => [opt.name, opt])), [p.options])
  const selectedOption = p.options.find((x) => x.name === p.value) || null
  const onCombo = useCallback(
    (_: any, v: string | null) => {
      const option = v ? optionsMap.get(v) || null : null
      p.onChange(v || '', option)
    },
    [p.onChange, optionsMap]
  )
  const onSelect = useCallback(
    (event: { target: { value: string | number } }) => {
      const option = p.options.find((x) => x.id === event.target.value) || null
      p.onChange(option ? option.name : '', option)
    },
    [p.options, p.onChange]
  )

  return p.combo ? (
    <Autocomplete
      freeSolo
      options={p.options.map((x) => x.name)}
      value={p.value || ''}
      onChange={onCombo}
      onInputChange={onCombo}
      renderInput={(params) => (
        <TextField {...params} fullWidth label={p.label} variant="outlined" sx={{ mt: 2 }} />
      )}
      sx={{ pb: 2 }}
    />
  ) : (
    <FormControl fullWidth sx={{ pb: 2 }}>
      <InputLabel id={`select-${p.label}`}>{p.label}</InputLabel>
      <Select
        labelId={`select-${p.label}`}
        label={p.label}
        value={selectedOption?.id || ''}
        onChange={onSelect}
      >
        {p.options.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
