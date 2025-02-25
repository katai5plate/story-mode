import { Box } from '@mui/material'

export const Spacer = (p: { half?: boolean; double?: boolean }) => {
  const pb = 2 * (p.half ? 0.5 : 1) * (p.double ? 2 : 1)
  return <Box sx={{ pb }} />
}

export const Indent = (p: { space: number }) => {
  return <div style={{ color: 'transparent' }}>{'.'.repeat(p.space)}</div>
}
